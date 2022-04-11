import {useEffect,useRef} from 'react';
import styles from '../styles/Navbar.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
const Navbar = () => {
    const {cartItems} = useSelector(state=>state.cart)
    const headerScroll = useRef();
    useEffect(()=>{
        scrollEffect();
    },[])
    //scrollEffect
    const scrollEffect = () =>{
        window.addEventListener('scroll', function () {
            let getScrollposition = window.scrollY;
            if (getScrollposition > 0) {
                headerScroll.current.id = 'scrollEffect';
            } else {
                headerScroll.current.id = 'hello';
            }
        });
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
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="#">Product</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="#">Contact</a>
                                </li>
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

export default Navbar;