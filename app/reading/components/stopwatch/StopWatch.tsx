"use client"
import { useState,useRef,useEffect } from "react"
import { DataState, Books, Log } from "@/app/lib/userfetch"
import createClient from "@/utils/supabase/client"
import { useAuthStore } from "@/app/lib/userfetch"
import { useToastStore } from "@/app/lib/useToastStore"
import { RiAlarmFill, RiCloseLine } from "@remixicon/react"
import ModalBack from "@/app/components/modal/ModalBack"
import InputFields from "@/app/components/form/input"
import { Container, Card, Close, Title, Timer, BtnWrap, Btn, Circle } from "../Modal.styled"
import { motion, AnimatePresence } from "framer-motion";
import ReactFocusLock from "react-focus-lock"

export default function StopWatch() {
    const { timer, timeObj, isMinimalize} = useAuthStore()
    const [time,setTime] = useState<number>(timer) //초기값:zustand
    const [running,setRunning] = useState<boolean>(false)
    const interval = useRef<NodeJS.Timeout | null>(null)
    const [isValid,setIsValid] = useState(false)
    const [isValidLoading,setIsValidLoading] = useState(false)
    const [minimalize,setMinimalize] = useState(isMinimalize) //초기값:zustand
    const [isReaded,setIsReaded] = useState(false)
    const [radingPage,setReadingPage] = useState<number | null>(null)
    const [isPulse,setIsPulse] = useState<boolean>(true)

    const setTimerObj = useAuthStore((state)=>state.setTimerObj)

    const setToast = useToastStore((state)=>state.setToast)
    const supabase = createClient()

    const format = (sec:number)=>{
        const h = Math.floor(sec/3600).toString().padStart(2,'0')
        const m = Math.floor((sec%3600)/60).toString().padStart(2,'0')
        const s = (sec%60).toString().padStart(2,'0')
        return `${h}:${m}:${s}`
    }

    const start=()=>{ setRunning(true); setIsPulse(false) }
    const pause=()=>{ setRunning(false); setIsPulse(true) }
    const stop=()=>{ setRunning(false); setTime(0) }

    useEffect(()=>{
        if(running){
            interval.current = setInterval(()=>setTime(t=>t+1),1000)
        }else{
            if(interval.current) clearInterval(interval.current)
        }
        return ()=>interval.current && clearInterval(interval.current)
    },[running])

    useEffect(()=>{
        setTimerObj("timer",time)
        //console.log(timer + ':주스탠드 타이머')
    },[time])

    useEffect(()=> {setTimerObj("isMinimalize",minimalize)},[minimalize])

    const handleClose = () => {
        setTimerObj("isTimer",false) //timer 종료
        setTimerObj("timeObj",null) //timer 대상 객체 클린
        setTimerObj("timer",0) //timer 시간 제거
    }

    const handleBooksTable = async() => {
        const { data, error } = await supabase
            .from("books")
            .update({
            title: timeObj.title,
            total_pages: timeObj.total_pages,
            current_page: radingPage,
            updated_at: new Date().toISOString()
            })
            .eq("id", timeObj.id)
            .select();

        const updatedBooks:DataState<Books> = {
            data: data?.[0],
            error: error,
            ok: !error
        }

        if(!updatedBooks.ok || updatedBooks.error) {
            throw new Error('기록 저장에 실패했습니다.')
        } else {
            useAuthStore.getState().updateData('books',updatedBooks)
        }
    }

    const handleLogTable = async() => {
        const { data, error } = await supabase
        .from("reading_logs")
        .insert([
            {
                book_id: timeObj.id,
                user_id: timeObj.user_id,
                current_page:radingPage,
                duration_minutes: time
            },
        ]).select();

        const updatedLogs:DataState<Log> = {
            data: data?.[0],
            error: error,
            ok: !error
        }
        if(!updatedLogs.ok || updatedLogs.error) {
            throw new Error('로그 저장에 실패했습니다.')
        } else {
            useAuthStore.getState().addData('log',updatedLogs)
        }
    }

    const handleSubmit= async()=>{
        if(isValidLoading) return
        if(time === 0) {
            setToast('기록을 측정해주세요','info')
            return
        }
        if(!radingPage) {
            setToast('페이지를 입력해주세요','info');
            return
        }
        if(timeObj.total_pages < radingPage) {
            setToast('총 페이지보다 읽은 페이지수가 많아요!', 'info')
            return
        }

        setIsValidLoading(true)

        try {
            await handleBooksTable();
            await handleLogTable();

            setToast("기록이 저장됐습니다","success")
            handleClose()

        } catch(err) {
            console.error('Submit 실패:', err);
            const errorMessage = err instanceof Error
                ? err.message
                : '오류가 발생했습니다'
            setToast(errorMessage, "error")

        } finally {
            setIsValidLoading(false)
        }
    }


    return(
        <>
        <AnimatePresence>
            {!isMinimalize &&
                <ModalBack onClick={()=>{}} />
            }
        </AnimatePresence>
        <div style={{
            position: 'fixed',
            top: isMinimalize ? 'unset' : '0',
            left: isMinimalize ? 'unset' : '0',
            bottom: isMinimalize ? '100px' : 'unset',
            right: isMinimalize ? 'calc((100% - 420px) / 2)' : 'unset',
            width: isMinimalize ? 'auto' :'100%',
            height: isMinimalize? 'auto' : '100%',
            display:isMinimalize ? "block" : "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: '101'
        }}>
            <motion.div
                layout
                style={{
                    maxWidth: isMinimalize ? '45px' : '380px',
                    width: '100%',
                    height: isMinimalize ? '45px' : '',
                    zIndex: 99,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
                {isMinimalize ?
                <Circle onClick={()=>setMinimalize(!isMinimalize)} $minimal={isMinimalize}>
                    <RiAlarmFill size={28} color="#fff" />
                </Circle>
            :
            <ReactFocusLock>
                <Container>
                    <Card>
                        <Close><RiCloseLine onClick={handleClose}/></Close>
                        <Title>{timeObj.title}</Title>
                        <Timer>{format(time)}</Timer>
                        <BtnWrap>

                            <Btn color="#6ac8d8" disabled={isValid} onClick={start} $pulse={isPulse}>
                                ▶ Start
                            </Btn>
                            <Btn color="#108377" disabled={isValid} onClick={pause}>⏸ Pause</Btn>
                            <Btn color="#f48c6a"
                            disabled={isValidLoading}
                            onClick={()=>{
                                if(time === 0) {
                                    setToast('기록을 시작해주세요!','info')
                                    return
                                }
                                setIsReaded(!isReaded)
                                setIsValid(!isValid)
                                setRunning(false)

                                if(isReaded === true) { // 아직 독서중이면 pulse 작동
                                    setIsPulse(true)
                                } else {
                                    setIsPulse(false)
                                }
                            }}
                            >{isReaded? '▶ RePlay' : '■ Stop'}</Btn>
                        </BtnWrap>
                        <BtnWrap>
                            <Btn color="#424242" disabled={isValid} onClick={stop}>초기화</Btn>
                            <Btn color="#757575"
                            onClick={()=>{setMinimalize(!minimalize)}}
                            >작게보기</Btn>
                        </BtnWrap>
                        {isReaded &&
                        <>
                            <InputFields
                                type="text"
                                placeholder="읽은 페이지"
                                name="bookpage-read"
                                value={radingPage ?? ""}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>{
                                    const value = e.target.value;
                                    if (value === '') {
                                        setReadingPage(null);
                                        return;
                                    }
                                    if (/^\d+$/.test(value)) {
                                        setReadingPage(Number(value));
                                    } else {
                                        setToast("숫자만 입력 가능합니다!","info")
                                    }
                                }}
                            />
                            <Btn color="#6ac8d8" disabled={isValidLoading} onClick={handleSubmit}>기록하기</Btn>
                        </>
                        }
                    </Card>
                </Container>
            </ReactFocusLock>
            }
            </motion.div>
        </div>
        </>
    )
}