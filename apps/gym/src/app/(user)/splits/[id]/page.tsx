import styles from './split-id.module.css'

interface SplitId {
  params: {
    id: number
  }
}

const Page = ({ params }: SplitId) => {
  return <div className={styles.container}>{params.id}</div>
}

export default Page
