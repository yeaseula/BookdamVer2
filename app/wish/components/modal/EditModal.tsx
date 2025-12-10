"use client"
import styled from "styled-components"
import { Wish, DataState } from "@/app/lib/userfetch"
import { Dispatch, SetStateAction, useState } from "react"
import InputFields from "@/app/components/form/input"
import EditModalButton from "./EditButton"
import EditCloseButton from "./EditCloseButton"
import createClient from "@/utils/supabase/client"
import { useAuthStore } from "@/app/lib/userfetch"
import { useToastStore } from "@/app/lib/useToastStore"
import ModalBack from "@/app/components/modal/ModalBack"

const Modal = styled.section`
    max-width: 400px;
    max-height: 500px;
    overflow: auto;
    width: 100%;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    z-index: 999;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0 4px 10px rgba(0,0,0,0.15);
    padding: 25px 15px;
`

interface ModalProps {
    setEditPopup: Dispatch<SetStateAction<boolean>>
    editObj: Wish
}

export default function EditModal({editObj,setEditPopup}:ModalProps) {
    const [modalTitle,setModalTitle] = useState<string>(editObj.title)
    const [modalAuthor,setModalAuthor] = useState<string>(editObj.author)
    const [modalPrice,setModalPrice] = useState<number | null>(editObj.price)
    const [isLoading,setIsLoading] = useState<boolean>(false)
    const editingId = editObj.id
    const supabase = createClient()
    const setToast = useToastStore((state)=>state.setToast)
    let debounce:boolean = false;

    const handleModalEdit = async () => {

        if(debounce || isLoading) return
        debounce = true
        setIsLoading(true)

        try {
            const { data, error } = await supabase
                .from("wish")
                .update({
                title: modalTitle,
                author: modalAuthor,
                price: modalPrice,
                updated_at: new Date().toISOString()
                })
                .eq("id", editingId)
                .select();

            const updatedWish:DataState<Wish> = {
                data: data?.[0],
                error: error,
                ok: !error
            }
            if (!updatedWish.ok || updatedWish.error) {
                throw new Error
            } else {
                // Zustand 상태 업데이트
                useAuthStore.getState().updateData('wish',updatedWish);
                setToast("수정이 완료됐습니다!", "success")
                setEditPopup(false)
            }
        } catch(err) {
            const errorMessage = err instanceof Error
                ? err.message
                : '위시리스트 수정 중 오류가 발생했습니다'
            setToast(errorMessage, "error")
        } finally {
            debounce = false;
            setIsLoading(false)
        }
    };

    const handleClose = () => {
        setEditPopup(false)
    }

    return(
        <>
        <ModalBack onClick={handleClose}/>
        <Modal>
            <div className="relative">
                <h2 className="mb-8 text-center font-bold text-3xl">읽고싶은 책 수정하기</h2>
                <div className="flex flex-wrap gap-[7px]">
                    <InputFields
                        type="text"
                        placeholder="책 제목"
                        name="modaltitle"
                        value={modalTitle}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setModalTitle(e.target.value)
                        }
                    />
                    <InputFields
                        type="text"
                        placeholder="작가명"
                        name="modalauthor"
                        width="calc((100% - 7px) / 2)"
                        value={modalAuthor}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setModalAuthor(e.target.value)
                        }
                    />
                    <InputFields
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        placeholder="가격(숫자만 입력)"
                        name="price"
                        width="calc((100% - 47px) / 2)"
                        value={modalPrice ?? ""}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            const value = e.target.value.replace(/\D/g, '');
                            setModalPrice(value ? Number(value) : null);
                        }}
                    />
                </div>
                <EditCloseButton onClick={handleClose} />
                <div className="mt-8">
                    <EditModalButton
                    modalTitle={modalTitle}
                    modalPage={modalAuthor}
                    modalContent={modalPrice}
                    isLoading={isLoading}
                    onClick={handleModalEdit}
                    />
                </div>
            </div>
        </Modal>
        </>
    )
}