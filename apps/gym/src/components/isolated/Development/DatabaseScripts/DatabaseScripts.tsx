import sectionStyles from '../Section.module.css'
import styles from './DatabaseScripts.module.css'
import { Terminal, Download, Upload, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'

export const DatabaseScripts = () => {
  const router = useRouter()

  return (
    <div className={sectionStyles.section}>
      <h2 className={sectionStyles.header}>
        <Terminal color='var(--primary)' />
        Database Scripts
      </h2>

      <div className={styles.script_list}>
        <div className={styles.script} onClick={() => router.push('/development/dbscripts/update-workouts')}>
          <div>
            <div>Update Workouts</div>
            <div className={sectionStyles.description}>Update the workout and workout sets table</div>
          </div>
          <Upload color='var(--primary)' />
        </div>

        <div className={styles.script} onClick={() => router.push('/development/dbscripts/update-weight')}>
          <div>
            <div>Update Weight</div>
            <div className={sectionStyles.description}>Update weight table</div>
          </div>
          <Upload color='var(--primary)' />
        </div>

        <div className={styles.script}>
          <div>
            <div>Export Weight</div>
            <div className={sectionStyles.description}>Download weight data to a CSV file</div>
          </div>
          <Download color='var(--primary)' />
        </div>

        <div className={styles.script}>
          <div>
            <div>Clear Cache</div>
            <div className={sectionStyles.description}>Remove all cached data from database</div>
          </div>
          <Trash color='var(--primary)' />
        </div>
      </div>
    </div>
  )
}
