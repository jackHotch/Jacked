import styles from './modal.module.css'

export interface TitleProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode | React.ReactNode[]
  sx?: React.CSSProperties
}

export const Title = ({ children, sx, ...props }: TitleProps) => {
  return (
    <div style={sx} className={styles.title} {...props}>
      {children}
    </div>
  )
}
