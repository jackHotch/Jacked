'use client'

import { useState } from 'react'
import styles from './Workout.module.css'
import {
  AddExerciseModal,
  WorkoutConfirmationModal,
  Exercise,
} from '@/components/isolated/Record'
import { IWorkout } from '@/types'
import { ButtonEvent } from '@/types'
import { AnimatePresence } from 'motion/react'
import { useToggle, useWorkoutNumber, useCreateWorkout } from '@/hooks'
import ClipLoader from 'react-spinners/ClipLoader'
import { Card } from '@gymapp/gymui/Card'
import { useRouter } from 'next/navigation'

const Workout = () => {
  const [workout, setWorkout] = useState<IWorkout[]>([])
  const [showAddExerciseModal, setShowAddExerciseModal] = useState(false)
  const [showConfirmationModal, setShowConfirmationModal] = useToggle()
  const { data, isLoading } = useWorkoutNumber()
  const workoutNumber =
    !isLoading && data?.data.count != null ? data.data.count + 1 : null
  const { mutate: createWorkout } = useCreateWorkout()
  const router = useRouter()

  const handleSubmit = (e: ButtonEvent) => {
    e.preventDefault()
    createWorkout(workout, {
      onSuccess: () => {
        router.push('/record/workout/finished')
      },
    })
  }

  return (
    <form style={{ display: 'flex', justifyContent: 'center' }}>
      <Card sx={{ width: '550px' }}>
        <Card.Content>
          <h1 className={styles.title}>
            {isLoading ? (
              <ClipLoader size={20} />
            ) : data?.data.count === 0 ? (
              'First Workout!'
            ) : (
              `Workout #${workoutNumber}`
            )}
          </h1>
          <div className={styles.exercises}>
            <AnimatePresence>
              {workout.map((_, key) => {
                return (
                  <Exercise
                    workout={workout}
                    setWorkout={setWorkout}
                    index={key}
                    key={key}
                  />
                )
              })}
            </AnimatePresence>
          </div>

          <div className={styles.button_container}>
            <AddExerciseModal
              open={showAddExerciseModal}
              setOpen={setShowAddExerciseModal}
              workout={workout}
              setWorkout={setWorkout}
            />

            <WorkoutConfirmationModal
              open={showConfirmationModal}
              setOpen={setShowConfirmationModal}
              handleSubmit={handleSubmit}
            />
          </div>
        </Card.Content>
      </Card>
    </form>
  )
}

export default Workout
