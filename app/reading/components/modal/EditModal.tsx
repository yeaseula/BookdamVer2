"use client"
import styled from "styled-components"
import { DataState, Books } from "@/app/lib/userfetch"
import { Dispatch, SetStateAction } from "react"
import InputFields from "@/app/components/form/input"
import EditCloseButton from "./EditCloseButton"
import createClient from "@/utils/supabase/client"
import { useAuthStore } from "@/app/lib/userfetch"
import { useToastStore } from "@/app/lib/useToastStore"
import { motion } from "framer-motion"
import ReactFocusLock from "react-focus-lock"
import { useForm, SubmitHandler } from "react-hook-form"
import { ReadingFormType } from "@/app/lib/dataTypes"
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
    const editingId = editObj.id
    const supabase = createClient()
    const setToast = useToastStore((state)=>state.setToast)
    const {
        register,
        formState: { errors, isValid, isSubmitting },
        getValues,trigger,
        handleSubmit
    } = useForm<ReadingFormType>({
        mode: "onChange",
        defaultValues: {
            booktitle: editObj.title,
            totalpage: editObj.total_pages,
            readedpage: editObj.current_page
        }
    })

    const onSubmit: SubmitHandler<ReadingFormType> = (data) => handleModalEdit(data)

    const handleModalEdit = async (readdata:ReadingFormType) => {
        try {
            if(!readdata.booktitle) throw new Error("제목을 입력해주세요.")
            else if(!readdata.totalpage) throw new Error("총 페이지를 입력해주세요.")
            else if(!readdata.readedpage) throw new Error("읽은 페이지를 입력해주세요.")

            const { data, error } = await supabase
                .from("books")
                .update({
                    title: readdata.booktitle,
                    total_pages: readdata.totalpage,
                    current_page: readdata.readedpage,
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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-wrap gap-[7px]">
                        <InputFields
                        placeholder="책 제목"
                        {...register("booktitle",{
                            required: true,
                        })}
                        />
                        <InputFields
                        type="number"
                        inputMode="numeric"
                        width="calc((100% - 7px) / 2)"
                        placeholder="총 페이지(숫자만 입력)"
                        {...register("totalpage",{
                            required: true,
                            onChange:() => {
                                trigger('readedpage')
                            }
                        })}
                        />
                        <InputFields
                        type="number"
                        inputMode="numeric"
                        width="calc((100% - 7px) / 2)"
                        placeholder="읽은 페이지(숫자만 입력)"
                        {...register("readedpage",{
                            required: true,
                            validate: (value) => {
                                return value < getValues('totalpage') ? true : '총 페이지보다 읽은 페이지 수가 많아요!'
                            }
                        })}
                        />
                    </div>
                    {errors.readedpage && <p className="text-xl mt-3.5 text-cyan-600">{errors.readedpage.message}</p>}
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