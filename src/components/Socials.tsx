import styles from '../styles/Home.module.css'
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function Socials() {
  return (
    <div>
      {/* <a
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by{' '}
        <span className={styles.logo}>
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </span>
      </a> */}
      <GitHubIcon onClick={() => window.open("https://github.com/verumlotus/ZK-Hashes", '_blank', 'noopener,noreferrer')} />
      <TwitterIcon onClick={() => window.open("https://twitter.com/verumlotus", '_blank', 'noopener,noreferrer')} />
    </div>
  )
}