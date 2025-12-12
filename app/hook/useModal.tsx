import { useEffect } from "react";

export function useInitialToggle({
    checkId,
    setCheckId,
    modal,
    setModal,
    selectModal,
    setSelectModal
}) {
    useEffect(() => {
        if (checkId) {
        setModal(true);
        setSelectModal(true);
        } else {
        setModal(false);
        setSelectModal(false);
        }
    }, [checkId]);

    useEffect(() => {
        if (!modal) {
        setCheckId(null);
        }
    }, [modal]);
}

export function AllModalClose ({
    setModal,
    setSelectModal,
    setEditPopup,
    setDeleteModal
}) {
    setModal(false)
    setSelectModal(false)
    setEditPopup(false)
    setDeleteModal(false)
}

export function SelectModalClose({
    setModal,
    setSelectModal
}) {
    setModal(false)
    setSelectModal(false)
}

export function handleEditClose ({
    setEditPopup,
    setModal
}) {
    setEditPopup(false)
    setModal(false)
}

export function DeleteModalClose ({
    setDeleteModal,
    setModal
}) {
    setDeleteModal(false)
    setModal(false)
}

export function handleDelete({ //삭제 버튼 클릭
    setDeleteModal,
    setSelectModal
}) {
    setDeleteModal(true) //삭제여부 모달 오픈
    setSelectModal(false) //선택 모달 닫기
}