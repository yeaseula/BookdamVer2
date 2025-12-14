"use client"
import createClient from "@/utils/supabase/client"

const supabase = createClient()

export interface EmailValidation {
    touched?: boolean;
    valid: boolean | null;
    exists?: boolean
}

export const CheckEmail = (value:string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(value);
    return isValid
}

export const checkEmailExistence = async (email:string) => {
    const { data, error } = await supabase
        .from('profiles')
        .select('email')
        .eq('email', email)
        .maybeSingle();

    const ExistEmail = !!data

    if(error) {
        return error
    }

    return ExistEmail
};

export const CheckNickname = (value:string,setState:(v:boolean | null)=>void) => {
    if(!value) {
        setState(null)
        return
    }

    const valueRegex = value.length >= 2;
    const isValid = valueRegex;
    if(isValid) { setState(true) } else {setState(false)}
}

export const CheckPassword = (value: string,setState:(v:boolean | null)=>void) => {
    if(value === '') {
        setState(null)
        return
    }

    const valueRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const isValid = valueRegex.test(value)
    if(isValid) { setState(true) } else {setState(false)}
}

export const handlePassCheck = (
    value:string,
    value2:string,
    setState:(v:boolean | null)=>void) => {

    if(value2 === '') { setState(null); return } //비밀번호 재확인값 없을 시 비교하지 않음
    setState(value === value2);
}

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const PASS_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

export interface SignFormValid {
    email: string
    password: string
    passwordCheck: string
    nickname: string
    checkbox: boolean
    interests: string[]
}