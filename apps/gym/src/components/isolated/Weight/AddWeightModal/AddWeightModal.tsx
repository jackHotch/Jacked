'use client'

import { useState } from 'react'
import styles from './AddWeightModal.module.css'
import { AddWeightModalProps } from '@/types'
import { TextInputChangeEvent } from '@/types'
import dayjs from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useAddWeight, useWindowDimensions } from '@/hooks'
import { Button } from '@gymapp/gymui/Button'
import { Modal } from '@gymapp/gymui/Modal'
import { Form } from '@gymapp/gymui/Form'
import { DatePicker } from '@/components/reusable'
import AddIcon from '@mui/icons-material/Add'

export const AddWeightModal = ({ open, setOpen }: AddWeightModalProps) => {
  const [weight, setWeight] = useState('')
  const [date, setDate] = useState<any>(dayjs())
  const { mutate: addWeight } = useAddWeight()
  const screen = useWindowDimensions()
  const isMobile = screen.width < 480

  const updateWeight = (e: TextInputChangeEvent) => {
    setWeight(e.target.value)
  }

  const handleSubmit = () => {
    addWeight(
      { weight: weight, date: date.format('YYYY-MM-DD') },
      {
        onSuccess: () => {
          setOpen(false)
        },
        onError: () => {
          // show toast error here
        },
      }
    )
  }

  const handleChange = (d: any) => {
    setDate(d)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Modal
        open={open}
        onOpenChange={setOpen}
        sx={{ width: isMobile ? '50%' : 'unset' }}
      >
        <Modal.Trigger>
          <Button.Primary sx={{ width: isMobile ? '100%' : 'unset' }}>
            Add
            <AddIcon />
          </Button.Primary>
        </Modal.Trigger>
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>Add Entry</Modal.Title>
          </Modal.Header>

          <div className={styles.entry}>
            <div className={styles.weight}>
              <label>Weight: </label>
              <Form.Text.Outline
                placeholder='lbs'
                value={weight}
                onChange={updateWeight}
                sx={{ width: '215px', margin: '10px 0 0 10px' }}
              />
            </div>

            <div className={styles.date}>
              <label>Date: </label>
              <DatePicker
                value={date}
                onChange={handleChange}
                sx={{ margin: '10px 0 0 10px' }}
                sxCalendar={{
                  position: 'absolute',
                  top: isMobile ? '-125px' : 'unset',
                  left: isMobile ? '185px' : 'unset',
                }}
              />
            </div>
          </div>
          <Modal.Footer>
            <Button.Primary type='button' onClick={handleSubmit}>
              Add Entry
            </Button.Primary>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </LocalizationProvider>
  )
}
