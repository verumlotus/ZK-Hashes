import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import dynamic from 'next/dynamic'

const inter = Inter({ subsets: ['latin'] })
const Socials = dynamic(import('@/components/Socials'), { ssr: false }) 
const HashForm = dynamic(import('@/components/HashForm'), { ssr: false }) 


export default function Home() {
  return (
    <>
      <Head>
          <title>ZK Hashes</title>
          <meta name="description" content="Online utility for ZK Friendly Hashes (MimC & Poseidon) for BN-128, Vesta, & Pallas" />
          <link rel="icon" type="image/png" sizes="16x16" href="/images/function.png" />
      </Head>
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            ZK Hashes
          </h1>
          <div style={{position: 'absolute', right: '10%'}}>
            <Socials/>
          </div>
        </div>
        <div className={styles.description}>
          <p>
            Online utility for ZK Friendly Hashes (MimC & Poseidon) over different elliptic curves (BN-128,
            Vesta, & Pallas). <b> Poseidon currently only works over BN-128. </b>
          </p>
        </div>
        <div style={{paddingTop: "1%"}}>
          <HashForm/>
        </div>
        {/* <div className={styles.center}>
          <Image
            className={styles.logo}
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
          <div className={styles.thirteen}>
            <Image
              src="/thirteen.svg"
              alt="13"
              width={40}
              height={31}
              priority
            />
          </div>
        </div>

        <div className={styles.grid}>
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Docs <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Find in-depth information about Next.js features and&nbsp;API.
            </p>
          </a>

          <a
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Learn <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Learn about Next.js in an interactive course with&nbsp;quizzes!
            </p>
          </a>

          <a
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Templates <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Discover and deploy boilerplate example Next.js&nbsp;projects.
            </p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Deploy <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Instantly deploy your Next.js site to a shareable URL
              with&nbsp;Vercel.
            </p>
          </a>
        </div> */}
      </main>
    </>
  )
}
