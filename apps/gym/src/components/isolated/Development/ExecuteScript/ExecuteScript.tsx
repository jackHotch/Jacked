import { ExecuteScriptProps } from '@/types'
import sectionStyles from '../Section.module.css'
import styles from './ExecuteScript.module.css'
import { Card } from '@gymapp/gymui/Card'
import { Button } from '@gymapp/gymui/Button'

export const ExecuteScript = ({ title, description, onClick }: ExecuteScriptProps) => {
  return (
    <div className={sectionStyles.section}>
      <h2>{title}</h2>
      <div className={sectionStyles.description}>{description}</div>

      <div>
        <input type='file' />
      </div>

      <div className={styles.footer}>
        <Button.Primary>Execute Script</Button.Primary>
      </div>
    </div>
  )
}
