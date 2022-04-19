import type { NextPage } from 'next'
import styles from '../styles/index.module.css'

const Home: NextPage = () => {
  return (
    <h1 className={styles.header}>{'{'}Organization Name{'}'} Dashboard</h1>
  )
}

export default Home
