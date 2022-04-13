import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import styles from '../styles/Navbar.module.css';
import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
const Navbar = () => {
    const [user, setUser] = useState(null);
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    useEffect(() => {
        setLoading(true);
        handleUser();
        setLoading(false);
    }, [router.pathname])

    useEffect(() => {
        scrollEffect();
    }, []);

    const handleUser = async () => {
        const res = await axios.get('http://localhost:3000/api/user');
        if (res.data.success === true) {
            setStatus(200);
            setUser(res.data.user);
        } else {
            setStatus('');
        }
    }

    const handleLogout = async()=>{
        await axios.get('http://localhost:3000/api/logout');
        setUser(null);
        setStatus('');
    }

    const { cartItems } = useSelector(state => state.cart)
    const headerScroll = useRef();

    //scrollEffect
    const scrollEffect = () => {
        window.addEventListener('scroll', function () {
            let getScrollposition = window.scrollY;
            if (getScrollposition > 0) {
                headerScroll.current.id = 'scrollEffect';
            } else {
                headerScroll.current.id = 'hello';
            }
        });
    }
    if(!user && loading){
        return <h1>Loading</h1>
    }

    return (
        <div className={`${styles.navWrapper} sticky-top`} ref={headerScroll}>
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-dark">

                    <div className="container-fluid">
                        <a className="navbar-brand" href="#"><Image src="/img/logo.png" objectFit="contain" width="60" height="60" /></a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav m-auto mb-2 mb-lg-0 text-center text-uppercase">
                                <li className="nav-item">
                                    <Link href="/" passHref>
                                        <a className="nav-link active" aria-current="page">Home</a>
                                    </Link>
                                </li>
                                {
                                    (status == 200 && user) ? (
                                        user?.role === 'user' ? (
                                            <>
                                            <li className="nav-item">
                                                <Link href="/dashboard/user/" passHref>
                                                    <a className="nav-link active" aria-current="page" >dashboard</a>
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <button className="btn btn-danger" onClick={handleLogout}>logout</button>
                                            </li>
                                            </>
                                        ) : (
                                            <li className="nav-item">
                                                <Link href="/dashboard/admin/" passHref>
                                                    <a className="nav-link active" aria-current="page" >dashboard</a>
                                                </Link>
                                            </li>
                                        )

                                    ) : (
                                        <li className="nav-item">
                                            <Link href="/login" passHref>
                                                <a className="nav-link active" aria-current="page" >Login</a>
                                            </Link>
                                        </li>
                                    )
                                }


                            </ul>
                            <div className={styles.cartIconWrapper}>
                                <div className={styles.counterWrapper}>
                                    <Link href="/cart" passHref>
                                        <a>
                                            <Image src="/img/cart.png" width="30" height="30" />
                                            <small className={styles.counter}>{cartItems.length}</small>
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    )
}
export const getServerSideProps = async (ctx) => {
    const myCookie = ctx.req?.cookies || "";
    let login = false;

    if (myCookie.token) {
        login = true;
    }
    return {
        props: {
            login
        }
    }
}

export default Navbar;