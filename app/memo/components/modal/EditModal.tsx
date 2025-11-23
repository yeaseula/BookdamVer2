"use client"
import styled from "styled-components"
import { Memo } from "@/app/lib/userfetch"
import { Dispatch, SetStateAction, useState } from "react"
import InputFields from "@/app/components/form/input"
import TextArea from "@/app/components/form/textarea"
import EditModalButton from "./EditButton"
import EditCloseButton from "./EditCloseButton"
import createClient from "@/utils/supabase/client"
import { useAuthStore } from "@/app/lib/userfetch"

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
const ModalBack = styled.div`
    width: 100%;
    max-width: 450px;
    height: 100%;
    background-color: rgba(0,0,0, 0.15);
    position: fixed;
    top:0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 99;
`

interface ModalProps {
    setEditPopup: Dispatch<SetStateAction<boolean>>
    setCheckId: Dispatch<SetStateAction<string[]>>
    editObj: Memo
}

export default function EditModal({editObj,setEditPopup,setCheckId}:ModalProps) {
    const [modalTitle,setModalTitle] = useState<string>(editObj.title)
    const [modalPage,setModalPage] = useState<number | null>(editObj.page)
    const [modalContent,setModalContent] = useState<string>(editObj.content)
    const editingId = editObj.id
    const supabase = createClient()

    const handleModalEdit = async () => {
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

        if (error) {
            console.error(error);
            alert("수정 실패");
            return;
        }

        const updatedMemo:Memo = data?.[0];
        if (!updatedMemo) return;

        // Zustand 상태 업데이트
        useAuthStore.getState().updateData<Memo>('memo',updatedMemo);

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
        <ModalBack />
        <Modal>
            <div className="relative">
                <h2 className="mb-8 text-center font-bold text-3xl">메모 수정하기</h2>
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
                        type="number"
                        placeholder="페이지"
                        name="modalpage"
                        width="calc((100% - 7px) / 2)"
                        value={modalPage ?? ''}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setModalPage(Number(e.target.value))
                        }
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
                <EditCloseButton onClick={handleClose} />
                <div className="mt-8">
                    <EditModalButton
                    modalTitle={modalTitle}
                    modalPage={modalPage}
                    modalContent={modalContent}
                    onClick={handleModalEdit}
                    />
                </div>
            </div>
        </Modal>
        </>
    )
}