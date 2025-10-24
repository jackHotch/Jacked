import { Card } from '@gymapp/gymui/Card'
import styles from './split-card.module.css'
import { SplitCardProps } from '@/types'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import dayjs from 'dayjs'
import { motion } from 'motion/react'

export const SplitCard = ({ split }: SplitCardProps) => {
  const MotionCard = motion.create(Card)
  const createdAtDisplay = dayjs(split.created_at).format('MMM D, YYYY')

  return (
    <motion.div className={styles.container} whileHover={{ scale: 1.02 }}>
      <Card className={`${split.is_active ? styles.active_split : null}`}>
        <Card.Content>
          <div className={styles.header}>
            <span className={styles.name}>
              {split.name}
              {split.is_active ? <span className={styles.active_tag}>Active</span> : null}
            </span>
            <ChevronRightIcon />
          </div>

          <div className={styles.bottom_row}>
            <span>
              <span>{split.total_template_days}</span> days per week
            </span>
            <span>{split.total_template_exercises} total exercises</span>
          </div>

          <div className={styles.footer}>
            <hr className={styles.hr} />
            <div className={styles.footer_content}>
              <span className={styles.last_used}>Last used: {split.last_used_display}</span>
              <span>Created {createdAtDisplay}</span>
            </div>
          </div>
        </Card.Content>
      </Card>
    </motion.div>
  )
}
