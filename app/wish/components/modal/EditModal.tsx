"use client"
import styled from "styled-components"
import { Wish } from "@/app/lib/userfetch"
import { Dispatch, SetStateAction, useState } from "react"
import InputFields from "@/app/components/form/input"
import TextArea from "@/app/components/form/textarea"
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
    setCheckId: Dispatch<SetStateAction<string[]>>
    editObj: Wish
}

export default function EditModal({editObj,setEditPopup,setCheckId}:ModalProps) {
    const [modalTitle,setModalTitle] = useState<string>(editObj.title)
    const [modalAuthor,setModalAuthor] = useState<string>(editObj.author)
    const [modalPrice,setModalPrice] = useState<number | null>(editObj.price)
    const editingId = editObj.id
    const supabase = createClient()
    const setToast = useToastStore((state)=>state.setToast)

    const handleModalEdit = async () => {
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

        if (error) {
            console.error(error);
            setToast("수정 실패했습니다!", "error")
            return;
        }

        const updatedWish:Wish = data?.[0];
        if (!updatedWish) return;

        // Zustand 상태 업데이트
        useAuthStore.getState().updateData<Wish>('wish',updatedWish);
        setToast("수정이 완료됐습니다!", "success")
        // setShowModal(false)
        setEditPopup(false)
        setCheckId([])
    };

    const handleClose = () => {
        setEditPopup(false)
        setCheckId([])
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
                        placeholder="가격"
                        name="price"
                        width="calc((100% - 47px) / 2)"
                        value={modalPrice ?? ""}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>{
                            const value = e.target.value;
                            if (value === '') {
                                setModalPrice(null);
                                return;
                            }
                            if (/^\d+$/.test(value)) {
                                setModalPrice(Number(value));
                            } else {
                                setToast("숫자만 입력 가능합니다!","info")
                            }
                        }}
                    />
                </div>
                <EditCloseButton onClick={handleClose} />
                <div className="mt-8">
                    <EditModalButton
                    modalTitle={modalTitle}
                    modalPage={modalAuthor}
                    modalContent={modalPrice}
                    onClick={handleModalEdit}
                    />
                </div>
            </div>
        </Modal>
        </>
    )
}