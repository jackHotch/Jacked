import { CSSProperties, useState } from 'react'
import styles from './Switch.module.css'
import { motion } from 'motion/react'

interface SwitchProps {
  label: string
  onValueChange?: (a: boolean) => void
  defaultValue?: boolean
  sx?: CSSProperties
}

export const Switch = ({ label, onValueChange, defaultValue = false, sx, ...props }: SwitchProps) => {
  const [checked, setChecked] = useState(false)

  const handleClick = () => {
    setChecked(!checked)
    // onValueChange
  }

  return (
    <div className={styles.container} {...props}>
      <div className={styles.toggle_container} data-is-on={checked} onClick={handleClick}>
        <motion.div
          layout
          className={styles.toggle_circle}
          transition={{ type: 'spring', stiffness: 700, damping: 32 }}
        ></motion.div>
      </div>
      <label>{label}</label>
    </div>
  )
}
