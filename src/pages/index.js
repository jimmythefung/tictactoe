import Head from 'next/head'
import Board from '../components/board'
import styles from '@/styles/Home.module.css'

export default function Home() {
  return (
    <>
      <Head>
        <title>TicTacToe</title>
        <meta name="description" content="TicTacToe Game" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Board />
      </main>
    </>
  )
}
