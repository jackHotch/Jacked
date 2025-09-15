'use client'

import { Button } from '@gymapp/gymui/Button'
import styles from './Profile.module.css'
import { toast } from '@gymapp/gymui/Toast'

const Profile = () => {
  return (
    <>
      <div className={styles.container}>Profile Page</div>
      <Button.Primary onClick={() => toast('this should be a error')}>
        toast
      </Button.Primary>
    </>
  )
}

export default Profile
