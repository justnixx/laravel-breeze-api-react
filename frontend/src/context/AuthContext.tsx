import { ReactNode, createContext, useEffect, useState } from 'react'
import axios from '../lib/axios'
import { useNavigate } from 'react-router-dom'

type AuthProviderProps = {
  children: ReactNode
}

type User = {
  name?: string,
  email?: string
  created_at?: string
  id?: string
  updated_at?: string
  email_verified_at?: string
}

type Errors = {
  name?: string[]
  email?: string[]
  password?: string[]
}

type LoginParams = { email: string, password: string }

type RegisterParams = {
  name: string,
  email: string,
  password: string,
  password_confirmation: string
}

type NewPasswordParams = {
  email: string | null
  token: string | undefined
  password: string
  password_confirmation: string
}

export interface AuthContextValues {
  csrf: () => void
  errors: Errors
  user: User | null
  login: (data: LoginParams) => void
  register: (data: RegisterParams) => void
  logout: () => void
  loading: boolean
  sessionVerified: boolean 
  status: string | null
  setStatus: React.Dispatch<React.SetStateAction<string | null>>
  sendPasswordResetLink: (data: { email: string }) => void
  newPassword: (data: NewPasswordParams) => void
  sendEmailVerificationLink: () => void
}

export const AuthContext = createContext<AuthContextValues>({} as AuthContextValues)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState(null)
  const [errors, setErros] = useState({})
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<string | null>(null)
  const navigate = useNavigate()

  const sessionData = window.localStorage.getItem('sessionVerified');
  const initialSessionVerified = sessionData ? JSON.parse(sessionData) : false;
  const [sessionVerified, setSessionVerified] = useState(initialSessionVerified);

  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const getUser = async () => {
    const { data } = await axios.get('/api/user')
    setUser(data)
    setSessionVerified(true)
    window.localStorage.setItem('sessionVerified','true')
  }

  const login = async ({ ...data }) => {
    setErros({})
    setLoading(true)
    try {
      await csrf()
      await axios.post('/login', data)
      await getUser()
    } catch (e) {
      if (typeof e === 'object' && e !== null && 'response' in e) {
        console.warn((e as { response: { data: unknown } }).response.data)
        setErros((e as { response: { data: { errors: [] } } }).response.data.errors)
      } else {
        console.warn(e)
      }
    } finally {
      setTimeout(() => setLoading(false), 2000)
    }
  }

  const register = async ({ ...data }) => {
    setErros({})
    setLoading(true)
    try {
      await csrf()
      await axios.post('/register', data)
      await getUser()
    } catch (e) {
      if (typeof e === 'object' && e !== null && 'response' in e) {
        console.warn((e as { response: { data: unknown } }).response.data)
        setErros((e as { response: { data: { errors: [] } } }).response.data.errors)
      } else {
        console.warn(e)
      }
    } finally {
      setTimeout(() => setLoading(false), 2000)
    }
  }

  const sendPasswordResetLink = async ({ ...data }) => {
    setErros({})
    setLoading(true)
    setStatus(null)
    try {
      await csrf()
      const response = await axios.post('/forgot-password', data)
      setStatus(response.data?.status)
    } catch (e) {
      if (typeof e === 'object' && e !== null && 'response' in e) {
        console.warn((e as { response: { data: unknown } }).response.data)
        setErros((e as { response: { data: { errors: [] } } }).response.data.errors)
      } else {
        console.warn(e)
      }
    } finally {
      setTimeout(() => setLoading(false), 2000)
    }
  }


  const newPassword = async ({ ...data }) => {
    setErros({})
    setLoading(true)
    setStatus(null)
    try {
      await csrf()
      const response = await axios.post('/reset-password', data)
      setStatus(response.data?.status)
      setTimeout(() => {
        navigate('/login')
      }, 2000)
    } catch (e) {
      if (typeof e === 'object' && e !== null && 'response' in e) {
        console.warn((e as { response: { data: unknown } }).response.data)
        setErros((e as { response: { data: { errors: [] } } }).response.data.errors)
      } else {
        console.warn(e)
      }
    } finally {
      setTimeout(() => setLoading(false), 2000)
    }
  }

  const sendEmailVerificationLink = async () => {
    setErros({})
    setLoading(true)
    setStatus(null)
    try {
      await csrf()
      const response = await axios.post('/email/verification-notification')
      setStatus(response.data?.status)
    } catch (e) {
      if (typeof e === 'object' && e !== null && 'response' in e) {
        console.warn((e as { response: { data: unknown } }).response.data)
        setErros((e as { response: { data: { errors: [] } } }).response.data.errors)
      } else {
        console.warn(e)
      }
    } finally {
      setTimeout(() => setLoading(false), 2000)
    }
  }

  const logout = async () => {
    try {
      setSessionVerified(false)
      await axios.post('/logout')
      setUser(null)
      window.localStorage.removeItem('sessionVerified')
    } catch (e) {
      console.warn(e)
    }
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await getUser()
      } catch (e) {
        console.warn(e)
      } finally {
        setSessionVerified(false)
      }
    }

    if (!user) {
      fetchUser()
    }
  }, [user])

  return (
    <AuthContext.Provider value={{ csrf, errors, user, login, register, logout, loading, status, sessionVerified, setStatus, sendPasswordResetLink, newPassword, sendEmailVerificationLink }}>
      {children}
    </AuthContext.Provider>
  )
}
