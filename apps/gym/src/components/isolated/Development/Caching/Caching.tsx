import { CachingProps } from '@/types'
import sectionStyles from '../Section.module.css'
import styles from './Caching.module.css'
import { Switch } from '@gymapp/gymui/Switch'
import { Gauge } from 'lucide-react'

export function Caching({ handleChange, updatedSettings }: CachingProps) {
  return (
    <div className={sectionStyles.section}>
      <h3 className={sectionStyles.header}>
        <Gauge color='var(--primary)' />
        Performance
      </h3>
      <div className={sectionStyles.switch}>
        <div>
          <div>Enable cache</div>
          <div className={sectionStyles.description}>Cache API response for faster loading</div>
        </div>
        <Switch
          onValueChange={handleChange}
          settingsKey='is_caching_enabled'
          defaultValue={updatedSettings?.is_caching_enabled === true}
        />
      </div>
    </div>
  )
}
