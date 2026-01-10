'use client'

import { useEffect, useState } from 'react'
import styles from './development.module.css'
import { Switch } from '@gymapp/gymui/Switch'
import { Button } from '@gymapp/gymui/Button'
import { useDevelopmentSettings } from '@/hooks/api/useDevelopmentSettings'

const Development = () => {
  // get dev settings
  const { data, isLoading } = useDevelopmentSettings()
  const [originalSettings, setOriginalSettings] = useState(null)
  const [updatedSettings, setUpdatedSettings] = useState(null)
  const [isDirty, setIsDirty] = useState(false)

  useEffect(() => {
    if (data?.data) {
      const { id, user_id, ...settings } = data.data
      setOriginalSettings(settings)
      setUpdatedSettings(settings)
    }
  }, [data])

  const handleChange = (key, newValue) => {
    setUpdatedSettings((prev) => {
      const updated = { ...prev, [key]: newValue }

      // Check if settings match original
      const hasChanges = Object.keys(updated).some((k) => updated[k] !== originalSettings[k])

      setIsDirty(hasChanges)
      return updated
    })
  }

  if (isLoading || !updatedSettings) {
    return <div>Loading...</div>
  }

  return (
    <div className={styles.container}>
      <h2>Development Options</h2>
      <hr />

      <div>
        <h4>Caching:</h4>
        <ul>
          <li>
            <Switch
              onValueChange={handleChange}
              settingsKey='is_caching_enabled'
              label='Caching enabled'
              defaultValue={updatedSettings.is_caching_enabled === true}
            />
          </li>
        </ul>
      </div>

      {isDirty ? <Button.Primary>Save</Button.Primary> : <Button.Disabled>Save</Button.Disabled>}
    </div>
  )
}

export default Development
