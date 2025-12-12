"use client"
import styled from "styled-components"
import { DataState, Books } from "@/app/lib/userfetch"
import { Dispatch, SetStateAction, useState } from "react"
import InputFields from "@/app/components/form/input"
import EditModalButton from "./EditButton"
import EditCloseButton from "./EditCloseButton"
import createClient from "@/utils/supabase/client"
import { useAuthStore } from "@/app/lib/userfetch"
import { useToastStore } from "@/app/lib/useToastStore"
import { motion } from "framer-motion"
import ReactFocusLock from "react-focus-lock"

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
    background: var(--board_background);
`

interface ModalProps {
    setModal: Dispatch<SetStateAction<boolean>>
    setEditPopup: Dispatch<SetStateAction<boolean>>
    editObj: Books
    onClick: ()=>void
}

export default function EditModal({setModal,setEditPopup,editObj,onClick}:ModalProps) {
    const [modalTitle,setModalTitle] = useState<string>(editObj.title)
    const [modalPage,setModalPage] = useState<number | null>(editObj.total_pages)
    const [modalCurrentPage,setModalCurrentPage] = useState<number | null>(editObj.current_page)
    const editingId = editObj.id
    const supabase = createClient()
    const setToast = useToastStore((state)=>state.setToast)
    const [loading,setIsLoading] = useState<boolean>(false)
    let debounce:boolean = false;

    const handlePageNumeric = () => {
        if(!modalPage || !modalCurrentPage) return

        if(modalPage < modalCurrentPage) {
            return false
        }
        return true
    }

    const handleModalEdit = async () => {

        if(!handlePageNumeric()) {
            setToast('총 페이지보다 읽은 페이지수가 많아요!','info')
            return
        }

        if(debounce || loading) return
        debounce = true;
        setIsLoading(true)

        try {

            if(!modalTitle) throw new Error("제목을 입력해주세요.")
            else if(!modalPage) throw new Error("총 페이지를 입력해주세요.")
            else if(!modalCurrentPage) throw new Error("읽은 페이지를 입력해주세요.")

            const { data, error } = await supabase
                .from("books")
                .update({
                    title: modalTitle,
                    total_pages: modalPage,
                    current_page: modalCurrentPage,
                    updated_at: new Date().toISOString()
                })
                .eq("id", editingId)
                .select();

            const updatedBooks:DataState<Books> = {
                data: data?.[0],
                error: error,
                ok: !error
            }

            if(!updatedBooks.ok || updatedBooks.error) {
                throw new Error("수정이 실패했습니다.")
            } else {
                // Zustand 상태 업데이트
                useAuthStore.getState().updateData('books',updatedBooks);
                setToast("수정이 완료됐습니다!", "success")
                setEditPopup(false)
                setModal(false)
            }

        } catch(err) {
            const errorMessage = err instanceof Error
                ? err.message
                : '수정 중 오류가 발생했습니다'
            setToast(errorMessage, "error")
        } finally {
            debounce = false;
            setIsLoading(false)
        }
    };

    return(
        <motion.div
            initial={{ opacity:0 }}
            animate={{  opacity: 1 }}
            exit={{  opacity: 0 }}
            transition={{ ease: "easeOut", duration: 0.15 }}
            style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                translateX: '-50%',
                maxWidth: '450px',
                width: '100%',
                zIndex: 100
            }}
        >
        <ReactFocusLock returnFocus={true}>
        <Modal>
            <div className="relative">
                <h2 className="mb-8 text-center font-bold text-3xl" style={{ color: 'var(--color_black)' }}>읽고있는 책 수정하기</h2>
                <EditCloseButton onClick={onClick} />
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
                        inputMode="numeric"
                        pattern="[0-9]*"
                        placeholder="총 페이지(숫자만 입력)"
                        name="modalpage"
                        width="calc((100% - 7px) / 2)"
                        value={modalPage ?? ''}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            const value = e.target.value.replace(/\D/g, '');
                            setModalPage(value ? Number(value) : null);
                        }}
                    />
                    <InputFields
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        placeholder="읽은 페이지(숫자만 입력)"
                        name="bookpage-read"
                        width="calc((100% - 7px) / 2)"
                        value={modalCurrentPage ?? ''}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            const value = e.target.value.replace(/\D/g, '');
                            setModalCurrentPage(value ? Number(value) : null);
                        }}
                    />
                </div>

                <div className="mt-8">
                    <EditModalButton
                    modalTitle={modalTitle}
                    modalPage={modalPage}
                    modalContent={modalCurrentPage}
                    loading={loading}
                    onClick={handleModalEdit}
                    />
                </div>
            </div>
        </Modal>
        </ReactFocusLock>
        </motion.div>

    )
}