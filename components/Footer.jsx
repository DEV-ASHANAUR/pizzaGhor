import React from 'react'
import  Image  from 'next/image';
import styles from '../styles/Footer.module.css'
const Footer = () => {
  return (
    <div className={styles.footer}>
            <div className='container py-3'>
                <div className="row pt-4">
                    <div className="col-md-6 pb-3 text-center text-md-start text-lg-start">
                        <Image src="/img/logo.png" alt="" width='144' height="144" objectFit='contain' />
                    </div>
                    <div className={`col-md-3 pb-3 ${styles.customListItem} text-center text-md-start text-lg-start`}>
                        <li><a href="/">About online food</a></li>
                        <li><a href="/">Read out blog</a></li>
                        <li><a href="/">Sign up to deliver</a></li>
                        <li><a href="/">Add your restaurant</a></li>
                    </div>
                    <div className={`col-md-3 pb-3 ${styles.customListItem} text-center text-md-start text-lg-start`}>
                        <li><a href="/">Get help</a></li>
                        <li><a href="/">Read FAQs</a></li>
                        <li><a href="/">View all Cities</a></li>
                        <li><a href="/">Restaurant near me</a></li>
                    </div>
                </div>
                <div className='row py-4'>
                    <div className='col-md-6 text-center text-md-start text-sm-center text-xs-center'>
                        <p className='text-white m-0'>copyright &copy; 2021 online food</p>
                    </div>
                    <div className={`col-md-6 ${styles.lastFotArea} justify-content-center justify-content-sm-center`}>
                        <li><a href="/">Privacy Policy</a></li>
                        <li><a href="/">Terms of use</a></li>
                        <li><a href="/">Pricing</a></li>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Footer