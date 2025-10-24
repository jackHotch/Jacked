import styles from './Card.module.css'
import { Header } from './card-header'
import { Title } from './card-title'
import { Description } from './card-description'
import { Content } from './card-content'
import { Footer } from './card-footer'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode | React.ReactNode[]
  sx?: React.CSSProperties
}

export const Card = ({ children, sx, className, ...props }: CardProps) => {
  return (
    <div className={`${styles.card_container} ${className}`} style={sx} {...props}>
      {children}
    </div>
  )
}

Card.Header = Header
Card.Title = Title
Card.Description = Description
Card.Content = Content
Card.Footer = Footer
