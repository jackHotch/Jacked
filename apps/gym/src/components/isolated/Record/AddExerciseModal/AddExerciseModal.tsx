'use client'

import { useState } from 'react'
import { AddExerciseModalProps, IExercises } from '@/types'
import { IWorkout } from '@/types'
import styles from './AddExerciseModal.module.css'
import { Searchbar } from '@/components/reusable/Searchbar/Searchbar'
import { CreateNewExerciseModal } from '../CreateNewExerciseModal'
import { useExercises } from '@/hooks'
import { Button } from '@gymapp/gymui/Button'
import { Modal } from '@gymapp/gymui/Modal'

export const AddExerciseModal = ({ open, setOpen, workout, setWorkout }: AddExerciseModalProps) => {
  const [newExercises, setNewExercises] = useState<IWorkout[]>([])
  const [showCreateExerciseModal, setShowCreateExerciseModal] = useState(false)

  const { data } = useExercises()
  var exercises: IExercises[]
  if (data?.status == 'success') {
    exercises = data.data
  } else {
    // add toast error message
  }

  const removeExercise = (i: number) => {
    const temp = [...newExercises]
    temp.splice(i, 1)
    setNewExercises(temp)
  }

  const addExercises = () => {
    let temp = [...workout]
    temp = temp.concat(newExercises)
    setWorkout(temp)
    setNewExercises([])
    setOpen(false)
  }

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <Modal.Trigger>
        <Button.Secondary type='button'>Add Exercise</Button.Secondary>
      </Modal.Trigger>
      <Modal.Content sx={{ width: '500px', height: '600px' }}>
        <Modal.Header>
          <Modal.Title>
            <CreateNewExerciseModal open={showCreateExerciseModal} setOpen={setShowCreateExerciseModal} />
          </Modal.Title>
        </Modal.Header>
        <div className={styles.searchbar}>
          <Searchbar
            placeholder='Add Exercise'
            data={exercises}
            newExercise={newExercises}
            setNewExercise={setNewExercises}
          />
        </div>
        <div className={styles.future_exercise_list}>
          {newExercises.map((value, key) => {
            return (
              <div key={key} className={styles.future_exercise}>
                {value.name}
                <span className={styles.exercises_clear_btn} onClick={() => removeExercise(key)}>
                  X
                </span>
              </div>
            )
          })}
        </div>
        <Modal.Footer>
          <Button.Danger type='button' onClick={() => setOpen(false)}>
            Cancel
          </Button.Danger>

          <Button.Primary type='button' onClick={addExercises}>
            Add Exercises
          </Button.Primary>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  )
}
