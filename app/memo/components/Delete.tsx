import { ButtonStyle } from "@/app/components/form/Button.styled"

interface DeleteProps {
    onClick:()=>void;
    edit: string[];
}

export default function DeleteButton({onClick,edit}:DeleteProps) {
    const active = edit.length > 0 ? true : false;
    return (
        <ButtonStyle $width={60} $height={30} disabled={!active} onClick={onClick}>
            <span style={{ fontSize: '1.4rem' }}>삭제</span>
        </ButtonStyle>
    )
}