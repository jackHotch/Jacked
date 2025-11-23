'use client'

import { useState } from 'react'
import styles from './development.module.css'
import { Switch } from '@gymapp/gymui/Switch'
import { Button } from '@gymapp/gymui/Button'

const Development = () => {
  // get dev settings
  const [updatedsettings, setUpdatedSettings] = useState({})
  const [isDirty, setIsDirty] = useState(false)

  const handleChange = (newValue) => {
    setIsDirty(true)
  }

  return (
    <div className={styles.container}>
      <h2>Development Options</h2>
      <hr />

      <div>
        <h4>Caching:</h4>
        <ul>
          <li>
            <Switch onValueChange={handleChange} label='Caching enabled' />
          </li>
        </ul>
      </div>

      <Button.Primary>Save</Button.Primary>
    </div>
  )
}

export default Development
