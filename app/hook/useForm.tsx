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

interface ValidLoginState {
        emailValid: boolean,
        passValid: boolean
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

export function useLogin(state:ValidLoginState ) {
    return useMemo(()=>{
        return (
            state.emailValid === true &&
            state.passValid === true
        )
    },[
        state.emailValid,
        state.passValid
    ])
}