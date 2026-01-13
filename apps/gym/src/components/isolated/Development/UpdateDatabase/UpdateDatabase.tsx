import sectionStyles from '../Section.module.css'
import styles from './UpdateDatabase.module.css'
import { Database } from 'lucide-react'

export function UpdateDatabase() {
  return (
    <div className={sectionStyles.section}>
      <h3 className={sectionStyles.header}>
        <Database color='var(--primary)' />
        Update Database:
      </h3>

      <p>Database Scripts </p>
    </div>
  )
}
