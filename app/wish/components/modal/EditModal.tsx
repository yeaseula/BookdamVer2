"use client"
import styled from "styled-components"
import { Wish, DataState } from "@/app/lib/userfetch"
import { Dispatch, SetStateAction } from "react"
import InputFields from "@/app/components/form/input"
import EditCloseButton from "./EditCloseButton"
import createClient from "@/utils/supabase/client"
import { useAuthStore } from "@/app/lib/userfetch"
import { useToastStore } from "@/app/lib/useToastStore"
import { motion } from "framer-motion"
import ReactFocusLock from "react-focus-lock"
import { useForm, SubmitHandler } from "react-hook-form"
import { WishFormType } from "@/app/lib/dataTypes"
import SubmitButton from "@/app/components/common/SubmitButton"

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
    background-color: var(--board_background);
    box-shadow: 0 4px 10px rgba(0,0,0,0.15);
    padding: 25px 15px;
`

interface ModalProps {
    setModal: Dispatch<SetStateAction<boolean>>
    setEditPopup: Dispatch<SetStateAction<boolean>>
    editObj: Wish
    onClick: ()=>void
}

export default function EditModal({setModal,setEditPopup,editObj,onClick}:ModalProps) {
    const editingId = editObj.id
    const supabase = createClient()
    const setToast = useToastStore((state)=>state.setToast)

    const {
        register,
        formState: { isValid, isSubmitting },
        handleSubmit
    } = useForm<WishFormType>({
        mode: "onChange",
        defaultValues: {
            booktitle: editObj.title,
            price: editObj.price,
            author: editObj.author
        }
    })

    const onSubmit: SubmitHandler<WishFormType> = (data) => handleModalEdit(data)

    const handleModalEdit = async (wishdata:WishFormType) => {
        try {
            if(!wishdata.booktitle) throw new Error("제목을 입력해주세요.")
            else if(!wishdata.price) throw new Error("가격을 입력해주세요.")
            else if(!wishdata.author) throw new Error("작가명을 입력해주세요.")

            const { data, error } = await supabase
                .from("wish")
                .update({
                title: wishdata.booktitle,
                author: wishdata.author,
                price: wishdata.price,
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
                setModal(false)
                setEditPopup(false)
            }
        } catch(err) {
            const errorMessage = err instanceof Error
                ? err.message
                : '위시리스트 수정 중 오류가 발생했습니다'
            setToast(errorMessage, "error")
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
        <ReactFocusLock>
        <Modal>
            <div className="relative">
                <h2 className="mb-8 text-center font-bold text-3xl" style={{ color: 'var(--color_black)' }}>읽고싶은 책 수정하기</h2>
                <EditCloseButton onClick={onClick} />
                <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-wrap gap-[7px]">
                    <InputFields
                    label="제목"
                    name="booktitle"
                    required
                    register={register}
                    show={true}
                    placeholder="책 제목"
                    rules={{
                        required: true
                    }}
                    />
                    <InputFields
                    label="작가명"
                    name="author"
                    width="calc((100% - 7px) / 2)"
                    required
                    show={true}
                    register={register}
                    rules={{
                        required: true
                    }}
                    placeholder="작가명"
                    />
                    <InputFields
                    label="가격"
                    name="price"
                    type="number"
                    inputMode="numeric"
                    width="calc((100% - 7px) / 2)"
                    placeholder="가격(숫자만 입력)"
                    show={true}
                    register={register}
                    rules={{
                        required: true
                    }}
                    />
                </div>
                    {!isValid && <p className="text-xl mt-3.5 text-cyan-600">모든 내용을 입력해주세요!</p>}
                    <div className="mt-8 h-[40px]">
                        <SubmitButton disabled={!isValid || isSubmitting} type="submit">수정하기</SubmitButton>
                    </div>
                </form>
            </div>
        </Modal>
        </ReactFocusLock>
        </motion.div>
    )
}