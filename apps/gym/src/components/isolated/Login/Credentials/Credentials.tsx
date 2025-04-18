import styles from './Credentials.module.css'
import { motion } from 'motion/react'

export const Credentials = () => {
  const motionVariants = {
    hidden: {
      right: '-500px',
    },
    visible: {
      right: 32,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 14,
        delay: 1,
      },
    },
  }
  return (
    <motion.div
      className={styles.container}
      variants={motionVariants}
      initial='hidden'
      animate='visible'
    >
      <h3>Please use the following credentials to login</h3>
      <p>Email: public@gmail.com</p>
      <p>Password: password</p>
    </motion.div>
  )
}
