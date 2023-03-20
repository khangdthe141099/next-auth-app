import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'

export default function Home() {
  return (
    <>
      <Head>
        <title>Home Page</title>
      </Head>
      <main className={styles.main}>
      <h1>Hello world</h1>
      </main>
    </>
  )
}
