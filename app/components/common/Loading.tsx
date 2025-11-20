import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const SpinnerWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items:center;
    width: 40px;
    height: 40px;
    text-align:center;
`

const SpinnerCircle = styled.div`
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 4px solid #3498db;
    border-top: 4px solid transparent;
    border-radius: 50%;
    animation: ${spin} 1s linear infinite;
`

export default function LoadingSpinner() {
  return (
    <SpinnerWrapper>
      <SpinnerCircle />
    </SpinnerWrapper>
  )
}
