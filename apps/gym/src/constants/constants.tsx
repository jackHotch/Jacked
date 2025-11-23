import Dashboard from '@mui/icons-material/SpaceDashboardOutlined'
import Profile from '@mui/icons-material/AccountCircleOutlined'
import List from '@mui/icons-material/FormatListBulletedOutlined'
import Barbell from '@mui/icons-material/FitnessCenterOutlined'
import Scale from '@mui/icons-material/MonitorWeightOutlined'
import TrendingUp from '@mui/icons-material/MovingOutlined'
import CodeIcon from '@mui/icons-material/Code'
import dayjs from 'dayjs'
import { z } from 'zod'

export const DESKTOP_NAV_OPTIONS = [
  { name: 'Home', path: '/dashboard', icon: null },
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: <Dashboard />,
  },
  {
    name: 'Profile',
    path: '/profile',
    icon: <Profile />,
  },
  {
    name: 'Record',
    path: '/record',
    icon: <Barbell />,
  },
  {
    name: 'Weight',
    path: '/weight',
    icon: <Scale />,
  },
  {
    name: 'Splits',
    path: '/splits',
    icon: <List />,
  },
  {
    name: 'Progress',
    path: '/progress',
    icon: <TrendingUp />,
  },
  {
    name: 'Development',
    path: '/development',
    icon: <CodeIcon />,
  },
]

export const MOBILE_NAV_OPTIONS = [
  { name: 'Home', path: '/dashboard', icon: null },
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: <Dashboard sx={{ fontSize: 60, color: 'white' }} />,
  },
  {
    name: 'Profile',
    path: '/profile',
    icon: <Profile sx={{ fontSize: 60, color: 'white' }} />,
  },
  {
    name: 'Record',
    path: '/record',
    icon: <Barbell sx={{ fontSize: 60, color: 'white' }} />,
  },
  {
    name: 'Weight',
    path: '/weight',
    icon: <Scale sx={{ fontSize: 60, color: 'white' }} />,
  },
  {
    name: 'Splits',
    path: '/splits',
    icon: <List sx={{ fontSize: 60, color: 'white' }} />,
  },
  {
    name: 'Progress',
    path: '/progress',
    icon: <TrendingUp sx={{ fontSize: 60, color: 'white' }} />,
  },
  {
    name: 'Development',
    path: '/development',
    icon: <CodeIcon sx={{ fontSize: 60, color: 'white' }} />,
  },
]

export const RangeSelectorOptions = [
  { name: '1 Week', startDate: dayjs().subtract(1, 'w'), endDate: dayjs() },
  { name: '1 Month', startDate: dayjs().subtract(1, 'M'), endDate: dayjs() },
  { name: '2 Months', startDate: dayjs().subtract(2, 'M'), endDate: dayjs() },
  { name: '3 Months', startDate: dayjs().subtract(3, 'M'), endDate: dayjs() },
  { name: '6 Months', startDate: dayjs().subtract(6, 'M'), endDate: dayjs() },
  { name: '1 Year', startDate: dayjs().subtract(1, 'y'), endDate: dayjs() },
  { name: 'Since Starting Date' },
  { name: 'Custom' },
]

export const unauthorizedUrls = ['/', '/login', '/signup', 'forgot-password', 'reset-password']

export const emailSchema = z
  .string({ required_error: 'Email is required' })
  .trim()
  .email({ message: 'Invalid email address' })

export const passwordSchema = z
  .string({ required_error: 'Password is required' })
  .trim()
  .min(6, { message: 'Password must be at least 6 charaters long' })

export const firstNameSchema = z
  .string({ required_error: 'First Name is required' })
  .trim()
  .min(1, { message: 'First Name cannot be empty' })

export const lastNameSchema = z
  .string({ required_error: 'Last Name is required' })
  .trim()
  .min(1, { message: 'Last Name cannot be empty' })

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
})

export const signUpSchema = z.object({
  firstName: firstNameSchema,
  lastName: lastNameSchema,
  email: emailSchema,
  password: passwordSchema,
})
