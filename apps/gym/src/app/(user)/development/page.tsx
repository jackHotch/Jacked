'use client'

import { useEffect, useState } from 'react'
import styles from './development.module.css'
import { Switch } from '@gymapp/gymui/Switch'
import { Button } from '@gymapp/gymui/Button'
import { useDevelopmentSettings } from '@/hooks/api/useDevelopmentSettings'
import { useSetDevelopmentSettings } from '@/hooks/api/useSetDevelopmentSettings'
import { toast } from '@gymapp/gymui/Toast'
import { FormEvent } from '@/types'

const Development = () => {
  const { data, isLoading } = useDevelopmentSettings()
  const { mutate: updateDevSettings } = useSetDevelopmentSettings()
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

      const hasChanges = Object.keys(updated).some((k) => updated[k] !== originalSettings[k])

      setIsDirty(hasChanges)
      return updated
    })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    updateDevSettings(updatedSettings, {
      onSuccess: () => {
        toast('Dev settings updated', 'success')
      },
      onError: () => {
        toast('Error updated dev settings', 'error')
      },
    })
    setIsDirty(false)
  }

  if (isLoading || !updatedSettings) {
    return <div>Loading...</div>
  }

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <h2>Development Settings</h2>

      <div>
        <h4>Caching:</h4>
        <ul>
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

      {isDirty ? <Button.Primary type='submit'>Save</Button.Primary> : <Button.Disabled>Save</Button.Disabled>}
    </form>
  )
}

export default Development
