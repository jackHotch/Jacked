import { CSSProperties, useEffect, useState } from 'react'
import styles from './Switch.module.css'
import { motion } from 'motion/react'

interface SwitchProps {
  label?: string
  onValueChange?: (a: string, b: boolean) => void
  settingsKey?: string
  defaultValue?: boolean
  sx?: CSSProperties
}

export const Switch = ({ label = '', onValueChange, settingsKey, defaultValue = false, sx, ...props }: SwitchProps) => {
  const [checked, setChecked] = useState(defaultValue)

  useEffect(() => {
    setChecked(defaultValue)
  }, [defaultValue])

  const handleClick = () => {
    const newValue = !checked
    setChecked(newValue)
    onValueChange(settingsKey, newValue)
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
