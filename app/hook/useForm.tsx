import { useMemo } from "react";

interface ValidationState {
    emailValid: {
        valid: boolean|null,
        exists: undefined
    }
    nicknameValue: boolean | null;
    passValue: boolean | null;
    passCheck: boolean | null;
    interest: string[]
}

export function useForm(state: ValidationState) {
    return useMemo(()=>{
        return (
            state.emailValid.valid === true &&
            state.nicknameValue === true &&
            state.passValue === true &&
            state.passCheck === true &&
            !state.emailValid.exists &&
            state.interest.length > 0
        )
    },[
        state.emailValid.valid,
        state.emailValid.exists,
        state.nicknameValue,
        state.passValue,
        state.passCheck,
        state.interest
    ])
}