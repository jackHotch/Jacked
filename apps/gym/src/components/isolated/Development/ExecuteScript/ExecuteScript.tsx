import { ExecuteScriptProps } from '@/types'
import sectionStyles from '../Section.module.css'
import styles from './ExecuteScript.module.css'
import { Button } from '@gymapp/gymui/Button'
import { Terminal, Upload, File } from 'lucide-react'
import { useState } from 'react'
import { CloseIcon } from '@gymapp/gymui/CloseIcon'

export const ExecuteScript = ({ title, description, onClick }: ExecuteScriptProps) => {
  const [file, setFile] = useState(null)

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const removeFile = () => {
    setFile(null)
  }

  return (
    <div className={sectionStyles.section} style={{ gap: '48px' }}>
      <div>
        <h2 className={sectionStyles.header}>
          <Terminal color='var(--primary)' />
          {title}
        </h2>
        <div className={sectionStyles.description}>{description}</div>
      </div>

      <div className={styles.file_input_container}>
        {file ? (
          <p className={styles.selected}>
            <File color='var(--primary)' /> {file.name} <CloseIcon onClick={removeFile} />
          </p>
        ) : (
          <>
            <Upload color='var(--primary)' size={32} />
            <input
              className={styles.file_input}
              type='file'
              accept='.csv'
              id={`file-upload-${title}`}
              onChange={handleFileChange}
            />
            <label className={styles.label} htmlFor={`file-upload-${title}`}>
              Choose a file
            </label>
            <p className={styles.accepted_formats}>Accepted formats: .csv</p>
          </>
        )}
      </div>

      <div className={styles.footer}>
        <Button.Primary>Execute Script</Button.Primary>
      </div>
    </div>
  )
}
