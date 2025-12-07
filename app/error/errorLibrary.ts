export const ERROR_MESSAGES: Record<number, string> = {
    400: '잘못된 요청입니다',
    401: '로그인이 필요합니다',
    403: '접근 권한이 없습니다',
    404: '요청한 정보를 찾을 수 없습니다',
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

    if (res.status >= 500) {
        throw new ServerError(message ?? '서버 오류')
    }

    throw new LocalError('데이터를 읽을 수 없습니다')
}