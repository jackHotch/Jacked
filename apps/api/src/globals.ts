export interface IExercises {
  name: string
  notes: string
  sets: ISet[]
}

export interface ISet {
  weight: string
  reps: string
  rpe: string
}

export interface IUser {
  id?: number
  email: string
  password: string
  firstName: string
  lastName: string
}

export interface signUpFormData {
  firstName: string
  lastName: string
  email: string
  password: string
}

export interface loginFormData {
  email: string
  password: string
}

export interface IDevSettings {
  is_caching_enabled: boolean
}
