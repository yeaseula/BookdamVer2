
import { useState,useRef,useEffect, Dispatch, SetStateAction } from "react"
import { Books, Log } from "@/app/lib/userfetch"
import createClient from "@/utils/supabase/client"
import { useAuthStore } from "@/app/lib/userfetch"
import { useToastStore } from "@/app/lib/useToastStore"
import { RiAlarmFill, RiCloseLine } from "@remixicon/react"
import ModalBack from "@/app/components/modal/ModalBack"
import InputFields from "@/app/components/form/input"
import { Container, Card, Close, Title, Timer, BtnWrap, Btn, Circle } from "../Modal.styled"
import { motion, AnimatePresence } from "framer-motion";

interface StopWatchProps {
    setStopWatchNum: Dispatch<SetStateAction<string[]>>;
    stopObj: Books;
}

export default function StopWatch({stopObj,setStopWatchNum}:StopWatchProps) {

    const [time,setTime] = useState<number>(0)
    const [running,setRunning] = useState<boolean>(false)
    const interval = useRef<NodeJS.Timeout | null>(null)
    const [isValid,setIsValid] = useState(false)
    const [isValidLoading,setIsValidLoading] = useState(false)
    const [minimalize,setMinimalize] = useState(false)
    const [isReaded,setIsReaded] = useState(false)
    const [radingPage,setReadingPage] = useState<number | null>(null)
    const setToast = useToastStore((state)=>state.setToast)
    const supabase = createClient()

    const format = (sec:number)=>{
        const h = Math.floor(sec/3600).toString().padStart(2,'0')
        const m = Math.floor((sec%3600)/60).toString().padStart(2,'0')
        const s = (sec%60).toString().padStart(2,'0')
        return `${h}:${m}:${s}`
    }

    const start=()=>{ setRunning(true) }
    const pause=()=>{ setRunning(false) }
    const stop=()=>{ setRunning(false); setTime(0) }

    useEffect(()=>{
        if(running){
            interval.current = setInterval(()=>setTime(t=>t+1),1000)
        }else{
            if(interval.current) clearInterval(interval.current)
        }
        return ()=>interval.current && clearInterval(interval.current)
    },[running])

    const handleBooksTable = async() => {
        const { data, error } = await supabase
            .from("books")
            .update({
            title: stopObj.title,
            total_pages: stopObj.total_pages,
            current_page: radingPage,
            updated_at: new Date().toISOString()
            })
            .eq("id", stopObj.id)
            .select();

        if (error) {
            console.error(error);
            setToast("기록 실패했습니다!", "error")
            return;
        }

        const updatedBooks:Books = data?.[0];
        if (!updatedBooks) return;

        useAuthStore.getState().updateData<Books>('books',updatedBooks);
    }

    const handleLogTable = async() => {
        const { data, error } = await supabase
        .from("reading_logs")
        .insert([
            {
                book_id: stopObj.id,
                user_id:stopObj.user_id,
                current_page:radingPage,
                duration_minutes: time
            },
        ]).select();

        if (error) {
            console.error(error)
            setToast("로그 저장 실패했습니다!","error")
            return;
        }

        const updatedLogs:Log = data?.[0];
        if (!updatedLogs) return;

        useAuthStore.getState().addData<Log>('log',updatedLogs);
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

        setIsValidLoading(true)

        try {
            await handleBooksTable();
            await handleLogTable();

            setToast("기록이 저장됐습니다","success")
            setStopWatchNum([]);
            setIsValidLoading(false)

        } catch(error) {
            console.error('Submit 실패:', error);
        }
    }

    return(
        <>
        <AnimatePresence>
            {!minimalize &&
                <ModalBack onClick={()=>{}} />
            }
        </AnimatePresence>
        <div style={{
            position: 'fixed',
            top: minimalize ? 'unset' : '0',
            left: minimalize ? 'unset' : '0',
            bottom: minimalize ? '100px' : 'unset',
            right: minimalize ? 'calc((100% - 420px) / 2)' : 'unset',
            width: minimalize ? 'auto' :'100%',
            height: minimalize? 'auto' : '100%',
            display:minimalize ? "block" : "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: '101'
        }}>
            <motion.div
                layout
                style={{
                    maxWidth: minimalize ? '45px' : '380px',
                    width: '100%',
                    height: minimalize ? '45px' : '',
                    zIndex: 99,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
                {minimalize ?
                <Circle onClick={()=>setMinimalize(!minimalize)}>
                    <RiAlarmFill size={28} color="#fff" />
                </Circle>
            :
                <Container>
                    <Card>
                        <Close><RiCloseLine onClick={()=>setStopWatchNum([])}/></Close>
                        <Title>{stopObj.title}</Title>
                        <Timer>{format(time)}</Timer>
                        <BtnWrap>
                            <Btn color="#6ac8d8" disabled={isValid} onClick={start}>▶ Start</Btn>
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
                                setRunning(!running)
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
            }
            </motion.div>
        </div>
        </>
    )
}