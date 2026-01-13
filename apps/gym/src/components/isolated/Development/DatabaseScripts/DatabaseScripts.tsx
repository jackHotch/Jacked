import sectionStyles from '../Section.module.css'
import styles from './DatabaseScripts.module.css'
import { Terminal } from 'lucide-react'

export const DatabaseScripts = () => {
  return (
    <div className={sectionStyles.section}>
      <h2 className={sectionStyles.header}>
        <Terminal color='var(--primary)' />
        Database Scripts
      </h2>

      <div className={styles.script_list}>
        <div className={styles.script}>
          <div>Update Workouts</div>
          <div className={sectionStyles.description}>Update the workout and workout sets table</div>
        </div>

        <div className={styles.script}>
          <div>Update Weight</div>
          <div className={sectionStyles.description}>Update weight table</div>
        </div>

        <div className={styles.script}>
          <div>Clear cache</div>
          <div className={sectionStyles.description}>Remove all cached data from database</div>
        </div>
      </div>
    </div>
  )
}
