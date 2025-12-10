import {  PostgrestError } from "@supabase/supabase-js";

export const ERROR_MESSAGES: Record<number, string> = {
    400: '잘못된 요청입니다',
    401: '로그인이 필요합니다',
    403: '접근 권한이 없습니다',
    404: '요청한 정보를 찾을 수 없습니다',
    409: '이미 존재하거나 충돌하는 데이터입니다',
    500: '서버 오류가 발생했습니다',
    502: '서버 연결에 실패했습니다',
    503: '서비스를 일시적으로 사용할 수 없습니다',
};

export class BaseError extends Error {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
    }
}

//critical -> 상위 바운더리로 토스
export class CriticalError extends BaseError {
    constructor(message:string) {
        super(message)
    }
}

export class NetworkError extends CriticalError {
    constructor() {
        super('네트워크 연결을 확인해주세요')
    }
}

export class ServerError extends CriticalError {
    constructor(message:string) {
        super(message)
    }
}

export class UnauthorizedError extends CriticalError {
    constructor() {
        super('로그인이 필요합니다');
    }
}

//컴포넌트 단위의 국소적 에러
export class LocalError extends BaseError {
    constructor(message: string) {
        super(message);
    }
}

export class NotFoundError extends LocalError {
    constructor(resource: string = '요청한 정보') {
        super(`${resource}를 찾을 수 없습니다`);
    }
}

export class ValidationError extends LocalError {
    constructor(message: string = '입력 정보를 확인해주세요') {
        super(message);
    }
}

export function isCriticalError(error: unknown): boolean {
    return error instanceof CriticalError;
}

export function supabaseErrorToHttpStatus(error: PostgrestError | null): number | null {
    if (!error) return null;

    const code = error.code;

    // PostgREST Errors
    if (code === 'PGRST116') return 404;
    if (code === 'PGRST205') return 404;
    if (code.startsWith('PGRST30')) return 400;

    if (code.startsWith('PGRST1')) return 400;
    if (code.startsWith('PGRST4')) return 403;
    if (code.startsWith('PGRST5')) return 500;


    // Postgres Errors (DB 레벨)
    if (code === '42501') return 403;
    if (code == '42P01') return 404;
    if (code === '23505') return 409;
    if (code.startsWith('22')) return 400;
    if (code.startsWith('53')) return 500;

    // 기타 알 수 없는 오류->서버 오류 취급
    return 500;
}

export function throwSupabaseError(error: PostgrestError) {
    const status = supabaseErrorToHttpStatus(error);
    const message = ERROR_MESSAGES[status] ?? '알 수 없는 오류가 발생했습니다.';

    if (status === 401) throw new UnauthorizedError;
    if (status >= 400 || status < 500 && status !== 401) throw new LocalError(message);
    if (status >= 500) throw new ServerError(message);

    throw new LocalError('데이터를 불러올 수 없습니다.');
}

export function throwHttpError(res: Response): never {
    const message = ERROR_MESSAGES[res.status]

    if (res.status === 400) {
        throw new LocalError(message)
    }

    if (res.status === 401) {
        throw new UnauthorizedError()
    }

    if (res.status === 404) {
        throw new NotFoundError('정보')
    }

    if (res.status === 409) {
        throw new LocalError(message)
    }

    if (res.status >= 500) {
        throw new ServerError(message ?? '서버 오류')
    }

    throw new LocalError('데이터를 읽을 수 없습니다')
}