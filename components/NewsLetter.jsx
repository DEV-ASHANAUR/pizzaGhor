import React from 'react'
import styles from '../styles/NewsLetter.module.css';
import Image from 'next/image'
const NewsLetter = () => {
  return (
    <div className={styles.newsWrapper}>
        <div className="container">
            <div className="row">
                <div className="col-md-6 d-flex justify-content-center align-items-center py-5">
                    <Image src="/img/news.png" width="451" height="312" objectFit='contain' />
                </div>
                <div className={`col-md-6 py-5 ${styles.newsletterTitle}`}>
                    <h2>Newsletter</h2>
                    <p>Sign up to receive updates and exclusive information from Company Take action against mentos waste today!</p>
                    <div className={styles.newsInput}>
                        <input placeholder='Enter Your Email' />
                        <button className={styles.subBtn}>subscripe</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default NewsLetter