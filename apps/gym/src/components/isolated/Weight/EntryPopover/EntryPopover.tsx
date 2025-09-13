'use client'

import styles from './EntryPopover.module.css'
import { EntryPopoverProps } from '@/types'
import { Popover } from '@gymapp/gymui/Popover'
import MoreVertIcon from '@mui/icons-material/MoreVert'

export const EntryPopover = ({ open, setOpen, deleteEntry }: EntryPopoverProps) => {
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Popover.Trigger>
        <MoreVertIcon style={{ cursor: 'pointer' }} />
      </Popover.Trigger>
      <Popover.Content>
        <Popover.Item variant='danger' onClick={deleteEntry}>
          Delete Entry
        </Popover.Item>
      </Popover.Content>
    </Popover>
  )
}
