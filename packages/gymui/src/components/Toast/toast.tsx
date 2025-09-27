import styles from './toast.module.css'
import { toast as sonnerToast } from 'sonner'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'

type toastType = 'default' | 'success' | 'error'

export const toast = (message: string, type: toastType = 'default') => {
  switch (type) {
    case 'success':
      return sonnerToast(
        <div className={styles.success}>
          <CheckCircleRoundedIcon color='success' />
          {message}
        </div>
      )
    case 'error':
      return sonnerToast(
        <div className={styles.error}>
          <CheckCircleRoundedIcon color='error' />
          {message}
        </div>
      )
    case 'default':
      return sonnerToast(message)
  }
}
