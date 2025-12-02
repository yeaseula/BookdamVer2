"use client"
import styled from "styled-components"
import { Books } from "@/app/lib/userfetch"
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
    checkIdRef: React.RefObject<string[]>
    editObj: Books
}

export default function EditModal({editObj,setEditPopup,checkIdRef}:ModalProps) {
    const [modalTitle,setModalTitle] = useState<string>(editObj.title)
    const [modalPage,setModalPage] = useState<number | null>(editObj.total_pages)
    const [modalCurrentPage,setModalCurrentPage] = useState<number | null>(editObj.current_page)
    const editingId = editObj.id
    const supabase = createClient()
    const setToast = useToastStore((state)=>state.setToast)
    const [loading,setIsLoading] = useState<boolean>(false)
    let debounce:boolean = false;

    const handleModalEdit = async () => {
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

            if (error) {
                console.error(error);
                setToast("읽고있는 책 수정에 실패했습니다!", "error")
                return;
            }

            const updatedBooks:Books = data?.[0];
            if (!updatedBooks) return;

            // Zustand 상태 업데이트
            useAuthStore.getState().updateData<Books>('books',updatedBooks);
            setToast("수정이 완료됐습니다!", "success")
            setEditPopup(false)
            checkIdRef.current = []

        } catch(err) {
            const errorMessage = err instanceof Error
                ? err.message
                : '읽고있는 책 수정 중 오류가 발생했습니다'
            setToast(errorMessage, "error")
        } finally {
            debounce = false;
            setIsLoading(false)
        }
    };

    const handleClose = () => {
        setEditPopup(false)
        checkIdRef.current = []
    }

    return(
        <>
        <ModalBack onClick={handleClose}/>
        <Modal>
            <div className="relative">
                <h2 className="mb-8 text-center font-bold text-3xl">읽고있는 책 수정하기</h2>
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
                        placeholder="총 페이지"
                        name="modalpage"
                        width="calc((100% - 7px) / 2)"
                        value={modalPage ?? ''}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>{
                        const value = e.target.value;
                            if (value === '') {
                                setModalPage(null);
                                return;
                            }
                            if (/^\d+$/.test(value)) {
                                setModalPage(Number(value));
                            } else {
                                alert('숫자만 입력 가능합니다!');
                            }
                        }}
                    />
                    <InputFields
                        type="text"
                        name="current-page"
                        placeholder="읽고있는 페이지"
                        width="calc((100% - 7px) / 2)"
                        value={modalCurrentPage}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>{
                        const value = e.target.value;
                            if (value === '') {
                                setModalCurrentPage(null);
                                return;
                            }
                            if (/^\d+$/.test(value)) {
                                setModalCurrentPage(Number(value));
                            } else {
                                alert('숫자만 입력 가능합니다!');
                            }
                        }}
                    />
                </div>
                <EditCloseButton onClick={handleClose} />
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
        </>
    )
}