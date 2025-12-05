import styled from "styled-components"

interface InputProps {
    children: string
    value: number
    set: (newValue: number) => void
    min?: number
    max?: number
}

const Number = styled.input`
    border: 0;
    color: #ff0088;
    margin-left: 5px;
    &:focus {
        outline: none;
    }
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
`
const Range = styled.input`
    margin-top: 20px;
    height: 8px;
    -webkit-appearance: none;
    background: #eeeeee;
    border: 1px solid #e0e0e0;
    box-shadow:0 3px 6px rgba(0,0,0,0.15);
    border-radius: 10px;
    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        height: 15px;
        width: 15px;
        border-radius: 50%;
        background: var(--point-color);
        position: relative;
    }
`
const Flex = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`
const TextBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
`

export default function RangeInput({ value, children, set, min = 12, max = 24 }: InputProps) {
    return (
        <label>
            <Flex>
                현재 폰트 크기는
                <Number
                    type="number"
                    value={value}
                    min={min}
                    max={max}
                    id="font-size-number"
                    onChange={(e) => set(parseFloat(e.target.value) || 0)}
                /> 입니다.
            </Flex>
            <TextBox>
                <p style={{ fontSize: `${value}px` }}>{children}</p>
            </TextBox>
            <Range
                value={value}
                type="range"
                min={min}
                max={max}
                id="font-size-range"
                onChange={(e) => set(parseFloat(e.target.value))}
                style={{ width: '100%' }}
            />
        </label>
    )
}