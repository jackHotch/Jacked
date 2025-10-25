import styles from './split-card.module.css'
import { SplitCardProps } from '@/types'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import dayjs from 'dayjs'
import { motion } from 'motion/react'

export const SplitCard = ({ split }: SplitCardProps) => {
  const createdAtDisplay = dayjs(split.created_at).format('MMM D, YYYY')

  return (
    <motion.div
      className={`${styles.container} ${split.is_active ? styles.active_split : null}`}
      whileHover={{ scale: 1.02 }}
    >
      <div className={styles.header}>
        <span className={styles.name}>
          {split.name}
          {split.is_active ? <span className={styles.active_tag}>Active</span> : null}
        </span>
        <ChevronRightIcon sx={{ color: 'var(--primary)' }} />
      </div>

      <div className={styles.split_attributes}>
        <span className={styles.days_per_week}>
          <CalendarTodayIcon />
          <span>{split.total_template_days} days</span>
        </span>
        <span className={styles.total_workouts}>
          <FitnessCenterIcon />
          <span>{split.total_workouts_completed} workouts</span>
        </span>
      </div>

      <div className={styles.footer}>
        <hr className={styles.hr} />
        <div className={styles.footer_content}>
          <span>Last used: {split.last_used_display}</span>
          <span>Created {createdAtDisplay}</span>
        </div>
      </div>
    </motion.div>
  )
}
