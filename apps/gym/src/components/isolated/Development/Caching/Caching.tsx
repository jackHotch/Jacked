import { CachingProps } from '@/types'
import sectionStyles from '../Section.module.css'
import styles from './Caching.module.css'
import { Switch } from '@gymapp/gymui/Switch'

export function Caching({ handleChange, updatedSettings }: CachingProps) {
  return (
    <div className={`${styles.settings_section} ${sectionStyles.section}`}>
      <h4>Caching:</h4>
      <ul className={styles.settings_list}>
        <li>
          <Switch
            onValueChange={handleChange}
            settingsKey='is_caching_enabled'
            label='Caching enabled'
            defaultValue={updatedSettings?.is_caching_enabled === true}
          />
        </li>
      </ul>
    </div>
  )
}
