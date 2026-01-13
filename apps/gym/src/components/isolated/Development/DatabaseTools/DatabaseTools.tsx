import sectionStyles from '../Section.module.css'
import styles from './DatabaseTools.module.css'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { Database } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function UpdateDatabase() {
  const router = useRouter()

  return (
    <div className={sectionStyles.section}>
      <h3 className={sectionStyles.header}>
        <Database color='var(--primary)' />
        Database Tools
      </h3>

      <div className={styles.scripts} onClick={() => router.push('/development/dbscripts')}>
        <div>
          <div>Database Scripts</div>
          <div className={sectionStyles.description}>Update tables, clear cache, and other scripts</div>
        </div>
        <ChevronRightIcon sx={{ color: 'var(--primary)' }} />
      </div>
    </div>
  )
}
