"use client";

import styled, { keyframes } from "styled-components";

const pulse = keyframes`
    0%, 100% { transform: scale(0.4); opacity: 0.4; }
    50% { transform: scale(1); opacity: 1; }
`;

const BurstWrapper = styled.div`
    position: relative;
    width: 50px;
    height: 50px;
`;

const Dot = styled.div`
    background: var(--point-color);
    width: 10px;
    height: 10px;
    border-radius: 50%;
    position: absolute;
    animation: ${pulse} 1s infinite ease-in-out;
`;

export const FireworkSpinner = () => {
    const dots = [...Array(8)];

    return (
        <BurstWrapper>
        {dots.map((_, i) => (
            <Dot
            key={i}
            style={{
                top: `${50 - 5 + Math.sin((i * 45 * Math.PI) / 180) * 20}%`,
                left: `${50 - 5 + Math.cos((i * 45 * Math.PI) / 180) * 20}%`,
                animationDelay: `${i * 0.1}s`,
            }}
            />
        ))}
        </BurstWrapper>
    );
};
