import sectionStyles from '../Section.module.css'
import styles from './UpdateDatabase.module.css'

export function UpdateDatabase() {
  return (
    <div className={sectionStyles.section}>
      <h4>Update Database:</h4>

      <ul className={styles.list}>
        <li>Update Workouts Script</li>
        <li>Update Weight Script</li>
      </ul>
    </div>
  )
}
