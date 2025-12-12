"use client"
import styled from "styled-components"
import { DataState, Memo } from "@/app/lib/userfetch"
import { Dispatch, SetStateAction, useState } from "react"
import InputFields from "@/app/components/form/input"
import TextArea from "@/app/components/form/textarea"
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
    editObj: Memo
    onClick: ()=>void
}

export default function EditModal({setModal,setEditPopup,editObj,onClick}:ModalProps) {
    const [modalTitle,setModalTitle] = useState<string>(editObj.title)
    const [modalPage,setModalPage] = useState<number | null>(editObj.page)
    const [modalContent,setModalContent] = useState<string>(editObj.content)
    const editingId = editObj.id
    const supabase = createClient()
    const [isLoading,setIsLoading] = useState<boolean>(false)
    const setToast = useToastStore((state)=>state.setToast)
    let debounce:boolean = false;

    const handleModalEdit = async () => {

        if(debounce || isLoading) return
        debounce = true
        setIsLoading(true)

        try {
            if(!modalTitle) throw new Error("제목을 입력해주세요.")
            else if(!modalPage) throw new Error("페이지를 입력해주세요.")
            else if(!modalContent) throw new Error("내용을 입력해주세요.")

            const { data, error } = await supabase
                .from("memo")
                .update({
                title: modalTitle,
                page: modalPage,
                content: modalContent,
                updated_at: new Date().toISOString()
                })
                .eq("id", editingId)
                .select();

            const updatedMemo:DataState<Memo> = {
                data: data?.[0],
                error: error,
                ok: !error
            };
            if (!updatedMemo) return;

            if(!updatedMemo.data || !updatedMemo.ok) {
                throw new Error
            } else {
                useAuthStore.getState().updateData('memo',updatedMemo);
                setToast("수정이 완료됐습니다!", "success")
                setModal(false)
                setEditPopup(false)
            }
        } catch (err) {
            const errorMessage = err instanceof Error
                ? err.message
                : '메모 수정 중 오류가 발생했습니다'
            setToast(errorMessage, "error")
        } finally {
            debounce = false;
            setIsLoading(false)
        }
    };

    return(
        <>
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
                <h2 className="mb-8 text-center font-bold text-3xl" style={{ color: 'var(--color_black)' }}>메모 수정하기</h2>
                <EditCloseButton onClick={onClick} />
                <div className="flex flex-wrap gap-[7px]">
                    <InputFields
                        type="text"
                        placeholder="책 제목"
                        name="modaltitle"
                        width="calc((100% - 7px) / 2)"
                        value={modalTitle}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setModalTitle(e.target.value)
                        }
                    />
                    <InputFields
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        placeholder="페이지"
                        name="modalpage"
                        width="calc((100% - 7px) / 2)"
                        value={modalPage ?? ''}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            const value = e.target.value.replace(/\D/g, '');
                            setModalPage(value ? Number(value) : null);
                        }}
                    />
                    <TextArea
                        name="memo-content"
                        placeholder="100자 이내로 입력하세요."
                        height={90}
                        value={modalContent}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                            setModalContent(e.target.value)
                        }
                    />
                </div>
                <div className="mt-8">
                    <EditModalButton
                    modalTitle={modalTitle}
                    modalPage={modalPage}
                    modalContent={modalContent}
                    isLoading={isLoading}
                    onClick={handleModalEdit}
                    />
                </div>
            </div>
        </Modal>
        </ReactFocusLock>
        </motion.div>
        </>
    )
}