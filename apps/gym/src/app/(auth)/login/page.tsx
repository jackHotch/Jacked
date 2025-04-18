'use client'

import styles from './Login.module.css'
import { useState } from 'react'
import { TextInputChangeEvent } from '@/types'
import { Form } from '@gymapp/gymui/Form'
import { Button } from '@gymapp/gymui/Button'
import { Error } from '@gymapp/gymui/Error'
import Image from 'next/image'
import { motion } from 'motion/react'
import { login, signInWithGoogle } from '@/actions/auth'
import { loginSchema } from '@/constants'
import { Credentials } from '@/components/isolated/Login/Credentials/Credentials'

const Login = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [loginError, setLoginError] = useState('')
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e: TextInputChangeEvent) => {
    setLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsLoading(true)
    const { success, error } = loginSchema.safeParse(loginData)

    if (success) {
      const formData = new FormData()
      formData.append('email', loginData.email)
      formData.append('password', loginData.password)

      const errorMessage = await login(formData)
      if (errorMessage) {
        setLoginError(errorMessage)
        setIsLoading(false)
      }
    } else {
      setLoginError(error.issues[0].message)
      setIsLoading(false)
    }
  }

  const handleGoogleSignUp = async (e) => {
    e.preventDefault()
    // if (authEnabled) await signInWithGoogle()
    // else alert('Not Implemented Yet!')
    alert('Not Implemented Yet!')
  }

  return (
    <>
      <form className={styles.container}>
        <motion.div layout className={styles.card}>
          <h1>Log In</h1>

          <div className={styles.input_container}>
            <Form.Text.Outline
              placeholder='Email Address'
              name='email'
              value={loginData.email}
              onChange={handleChange}
            />
            <Form.Text.Password
              placeholder='Password'
              name='password'
              value={loginData.password}
              onChange={handleChange}
            />
            <Error isVisible={loginError ? true : false}>{loginError}</Error>
          </div>

          <div className={styles.button_container}>
            {isLoading ? (
              <Button.Loading sx={{ padding: '12px' }} />
            ) : (
              <Button.Primary
                type='submit'
                sx={{ padding: '12px', fontSize: '16px' }}
                onClick={handleLogin}
              >
                Log In
              </Button.Primary>
            )}
            <button
              className={styles.google_button}
              type='submit'
              onClick={handleGoogleSignUp}
            >
              <Image src='/images/google.png' alt='Google Icon' width={20} height={20} />
              Sign In With Google
            </button>
          </div>
        </motion.div>
        <Credentials />
      </form>
    </>
  )
}

export default Login
