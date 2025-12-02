import styled from "styled-components"

const ProgressContainer = styled.div`
    position: relative;
    top: 0px;
    width: 100%;
    height: 6px;
    background: #e5e5e5;
    border-radius: 3px;
    overflow: hidden;
`;

const Progress = styled.div`
    height: 100%;
    background: var(--sub_color);
    border-radius: 3px;
    transition: width .3s ease;
`;

interface ProgressProps {
    total: number;
    current: number
}

export default function ProgressBar({total, current}:ProgressProps) {

    return(
        <ProgressContainer>
            <Progress style={{ width: `${(current/total)*100}%` }} />
        </ProgressContainer>
    )
}