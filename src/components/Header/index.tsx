import { SignInButton } from '../SignInButton';
import styles from './styles.module.scss';
import { ActiveLink } from '../ActiveLink';
import Link from 'next/link';

export function Header(){

    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href="/">
                    <img src="/logo.svg" alt="ig.news" />                
                </Link>
                <nav>
                    <ActiveLink href="/" activeClassName={styles.active}>
                        <a  className={styles.active}>Home</a>
                    </ActiveLink>
                    <ActiveLink href="/posts" activeClassName={styles.active}>
                        <a >Posts</a>
                    </ActiveLink>
                </nav>
                <SignInButton />
            </div>
        </header>
    );
}