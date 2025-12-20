import styled from "styled-components"
import BookCover from "./BookCover"
import BookDesc from "./BookDes"
import createClient from "@/utils/supabase/client"
import { useAuthStore, DataState, Wish } from "@/app/lib/userfetch"
import { useToastStore } from "@/app/lib/useToastStore"
import { useState } from "react"

const SwiperDepth = styled.div`
    display: flex;
    gap: 10px;
    padding: 15px;
    background-color: var(--board_background);
    color: var(--color_black);
    border: 1px solid #e0e0e0;
    border-radius: 15px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
`

export default function RealSlide({book}) {
    const supabase = createClient()
    const { session } = useAuthStore()
    const setToast = useToastStore((state)=>state.setToast)
    const [isWorking,setIsWorking] = useState(false)
    let debounse:boolean = false

    const handleWishAdd = async(title:string,author:string,price:number) => {

        if(isWorking || debounse) return
        setIsWorking(true)
        debounse = true

        try {
            const { data, error } = await supabase.from("wish").insert([
                {
                    user_id: session.user.id,
                    title,
                    author,
                    price,
                },
            ]).select();

            const newWish: DataState<Wish> = {
                data : data?.[0],
                error: error,
                ok: !error
            }

            if(!newWish.data || !newWish.ok) {
                throw new Error('위시리스트 추가 실패')
            } else {
                setToast("읽고싶은 책 추가 성공!","success")
                useAuthStore.getState().addData('wish',newWish)
            }

        } catch(error) {
            setToast("읽고싶은 책 업로드 실패","error")
            throw new Error('위시리스트 추가 실패')
        } finally {
            debounse = false
            setIsWorking(false)
        }
    }
    return (
        <SwiperDepth>
            <BookCover book={book} />
            <BookDesc book={book}
            onClick={()=>{
                handleWishAdd(book.title,book.authors[0],book.price)
            }}/>
        </SwiperDepth>
    )
}