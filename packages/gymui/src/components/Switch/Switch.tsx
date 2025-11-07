import { CSSProperties, useState } from 'react'
import styles from './Switch.module.css'
import { motion } from 'motion/react'

interface SwitchProps {
  label: string
  defaultValue?: boolean
  sx?: CSSProperties
}

export const Switch = ({ label, defaultValue = false, sx, ...props }: SwitchProps) => {
  const [checked, setChecked] = useState(false)

  const handleClick = () => {
    setChecked(!checked)
  }

  return (
    <div className={styles.container} {...props}>
      <label>{label}</label>
      <div className={styles.toggle_container} data-is-on={checked} onClick={handleClick}>
        <motion.div
          layout
          className={styles.toggle_circle}
          transition={{ type: 'spring', stiffness: 700, damping: 32 }}
        ></motion.div>
      </div>
    </div>
  )
}
