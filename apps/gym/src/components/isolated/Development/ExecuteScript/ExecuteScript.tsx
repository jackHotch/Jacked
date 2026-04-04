import { ExecuteScriptProps } from '@/types'
import sectionStyles from '../Section.module.css'
import styles from './ExecuteScript.module.css'
import { Button } from '@gymapp/gymui/Button'
import { Terminal, Upload, File } from 'lucide-react'
import { useState } from 'react'
import { CloseIcon } from '@gymapp/gymui/CloseIcon'
import { Error } from '@gymapp/gymui/Error'
import Papa from 'papaparse'

export const ExecuteScript = ({ title, description, executeScript }: ExecuteScriptProps) => {
  const [file, setFile] = useState(null)
  const [isRunning, setIsRunning] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const [isSuccessful, setIsSuccessful] = useState(null)

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const removeFile = () => {
    setFile(null)
  }

  const handleExecuteScript = () => {
    if (!file) return
    setIsRunning(true)

    const reader = new FileReader()

    reader.onload = async (e) => {
      const text = e.target.result as string
      const result = Papa.parse(text, { header: true, skipEmptyLines: true })

      const response = await executeScript(result.data)
      setIsFinished(true)
      setIsSuccessful(response?.statusCode == 200 ? true : false)
      setIsRunning(false)
    }

    reader.readAsText(file)
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
            <Upload color='var(--text-gray)' size={32} />
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

      <div className={styles.footer} style={{ justifyContent: isFinished ? 'space-between' : 'flex-end' }}>
        {isFinished ? (
          isSuccessful ? (
            <span style={{ color: 'var(--success)' }}>Script Executed Successfully!</span>
          ) : (
            <Error isVisible={true}>Script Failed</Error>
          )
        ) : null}

        {file ? (
          <Button.Primary onClick={handleExecuteScript}>Execute Script</Button.Primary>
        ) : (
          <Button.Disabled>Execute Script</Button.Disabled>
        )}
      </div>
    </div>
  )
}
