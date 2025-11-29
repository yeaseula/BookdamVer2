import styled from "styled-components"
import { useState,useRef,useEffect, Dispatch, SetStateAction } from "react"
import { Books, Log } from "@/app/lib/userfetch"
import createClient from "@/utils/supabase/client"
import { useAuthStore } from "@/app/lib/userfetch"
import { useToastStore } from "@/app/lib/useToastStore"
import { RiAlarmFill, RiCloseLine } from "@remixicon/react"
import ModalBack from "@/app/components/modal/ModalBack"
import InputFields from "@/app/components/form/input"

const StopWatchContainer = styled.section`
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 999;
    transform: translate(-50%,-50%);
    max-width: 380px;
    width: 100%;
`
const Card = styled.div`
    position: relative;
    background:#3a3967;
    width:100%;
    padding:20px;
    border-radius:14px;
    box-shadow:0 4px 10px rgba(0,0,0,0.24);
    display:flex;
    flex-direction:column;
    gap:14px;
`
const Close = styled.button`
    position:absolute;
    top: 20px;
    right: 20px;
    color: #fff;
    cursor: pointer;
`
const Title = styled.h3`
    font-size: 1.8rem;
    text-align: center;
    font-weight: 600;
    color:#fff;
`
const Timer = styled.div`
    font-size:36px;
    text-align:center;
    font-weight:800;
    margin:8px 0;
    color:#fff4ba;
`
const BtnWrap = styled.div`
    display:flex;
    justify-content:space-between;
    gap:10px;
`
const Btn = styled.button<{color:string,disabled?:boolean}>`
    flex:1;
    background:${p=>p.disabled ? '#bdbdbd' : p.color} ;
    border:none;
    padding:10px 0;
    border-radius:10px;
    font-weight:700;
    font-size:14px;
    color:${p=>p.disabled ? '#e0e0e0' : '#fff4ba'};
    cursor:${p=>p.disabled ? 'initial' : 'pointer'};
`
const Circle = styled.button`
    position: fixed;
    bottom: 80px;
    right: calc((100% - 420px) / 2);
    z-index: 99;
    background-color: var(--sub_color);
    border-radius: 50%;
    width: 45px;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`

interface StopWatchProps {
    setStopWatchNum: Dispatch<SetStateAction<string[]>>;
    stopObj: Books;
}

export default function StopWatch({stopObj,setStopWatchNum}:StopWatchProps) {

    const [time,setTime] = useState<number>(0)
    const [running,setRunning] = useState<boolean>(false)
    const interval = useRef<NodeJS.Timeout | null>(null)
    const [isValid,setIsValid] = useState(false)
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

        useAuthStore.getState().updateData<Log>('log',updatedLogs);
    }

    const handleSubmit= async()=>{
        if(time === 0) {
            setToast('기록을 측정해주세요','info')
            return
        }
        if(!radingPage) {
            setToast('페이지를 입력해주세요','info');
            return
        }

        try {
            await handleBooksTable();
            await handleLogTable();

            setToast("기록이 저장됐습니다","success")
            setStopWatchNum([]);

        } catch(error) {
            console.error('Submit 실패:', error);
        }
    }

    return(
        <>
        {!minimalize && (
            <>
            <ModalBack onClick={()=>{}}></ModalBack>
            <StopWatchContainer>
                <Card>
                    <Close><RiCloseLine onClick={()=>setStopWatchNum([])}/></Close>
                    <Title>{stopObj.title}</Title>
                    <Timer>{format(time)}</Timer>

                    <BtnWrap>
                        <Btn color="#6ac8d8" disabled={isValid} onClick={start}>▶ Start</Btn>
                        <Btn color="#108377" disabled={isValid} onClick={pause}>⏸ Pause</Btn>
                        <Btn color="#f48c6a"

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
                        <Btn color="#6ac8d8" onClick={handleSubmit}>기록하기</Btn>
                    </>
                    }
                </Card>
            </StopWatchContainer>
            </>
        )}
        {minimalize &&
        <Circle onClick={()=>setMinimalize(!minimalize)}>
            <RiAlarmFill size={28} color="#fff" />
        </Circle>
        }
        </>
    )
}