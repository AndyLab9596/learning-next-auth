import Link from 'next/link';
import classes from './main-navigation.module.css';
import { useSession, signOut } from 'next-auth/client';

function MainNavigation() {
    const [session, loading] = useSession();
    console.log('session', session);
    console.log('loading', loading);

    function logoutHandler () {
        signOut();
    }

    return (
        <header className={classes.header}>
            <Link href='/' legacyBehavior>
                <a>
                    <div className={classes.logo}>Next Auth</div>
                </a>
            </Link>
            <nav>
                <ul>
                    {!session && !loading && (
                        <li>
                            <Link href='/auth'>Login</Link>
                        </li>
                    )}

                    {session && (
                        <>
                            <li>
                                <Link href='/profile'>Profile</Link>
                            </li>
                            <li>
                                <button onClick={logoutHandler}>Logout</button>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
}

export default MainNavigation;