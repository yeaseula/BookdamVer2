import { RefObject, useState, useEffect, useRef } from "react"

export function useCheckId(index: string) {
    const checkIdRef = useRef<string>(index)

    return checkIdRef.current
}

export function useModal(checkId:RefObject<string[]>, index:string) {
    const [modal,setModal] = useState(false)
    const [ischecked,setisChecked] = useState(false)

    useEffect(()=>{
        //모달 팝업에서 수정했을 시 모든 checkId 배열이 초기화되며 버튼 check여부 초기화
        if(checkId.current.length === 0) {
            setisChecked(false)
        }
    },[checkId])

    useEffect(()=>{
        if(ischecked) {
            //check state
            checkId.current = [...checkId.current, index]
        } else {
            //uncheck state
            const editResult = checkId.current.filter((val)=>val !== index)
            checkId.current = editResult
        }
    },[ischecked])

    return {
        modal,
        setModal,
        ischecked,
        setisChecked,
        checkId
    };
}