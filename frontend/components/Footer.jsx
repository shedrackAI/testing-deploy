import styles from '../styles/Home.module.css'

export default function Footer() {
    return (
        <footer className={styles.footer}>
        <a
          href="https://innvesio.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          A product of {' '}
          <span className={styles.logo}>
           INNVESIO™
          </span>
        </a>
      </footer>
    )
}