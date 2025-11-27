import { ButtonStyle } from "@/app/components/form/Button.styled"

interface EditProps {
    onClick:()=>void;
    checkId: string[];
}

export default function EditButton({onClick,checkId}:EditProps) {
    const active = checkId.length > 0 ? true : false;

    return (
        <ButtonStyle $width={60} $height={30} disabled={!active} onClick={onClick}>
            <span style={{ fontSize: '1.4rem' }}>수정</span>
        </ButtonStyle>
    )
}