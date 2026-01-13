import { ButtonProps } from './Button'
import styles from './Button.module.css'
import { motion } from 'motion/react'

export const Text = ({ children = 'Text', sx, size = 'medium', ...props }: ButtonProps) => (
  <motion.button {...props} style={sx} className={`${styles.text} ${styles[size]}`}>
    {children}
  </motion.button>
)
