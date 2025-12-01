"use client"

import styled from "styled-components"
import { motion, AnimatePresence } from "framer-motion"

const WarningMsg = styled.p`
    display: inline-block;
    font-size: 1.2rem;
    color: red;
    margin-top: 5px;
    font-weight: 400;
`

interface Props {
  state: boolean | null
  text: string
}

export const WarningMessage = ({ state, text }: Props) => {
  return (
      <AnimatePresence>
      {state === false &&
          <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} transition={{ duration: 0.2 }}>
              <WarningMsg>{text}</WarningMsg>
          </motion.div>
      }
      </AnimatePresence>
  )
}