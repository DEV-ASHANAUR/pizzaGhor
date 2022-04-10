import React from 'react'
import Image from 'next/image';
import styles from '../styles/PizzaList.module.css'
import Link from 'next/link';
const PizzaCard = ({pizza}) => {
    return (
        <div className="col">
            <div className={`card ${styles.customCard}`}>
                <Image src={pizza.img} className="card-img-top p-1" width="200" height="200" objectFit='contain' alt="..." />
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                        <h5 className={styles.cardTitle}>{pizza.title}</h5>
                        <h5 className={styles.cardPrice}>{pizza.prices[0]}$</h5>
                    </div>
                    <p className={styles.cardTitle}>{pizza.desc}</p>
                    <Link href={`/product/${pizza._id}`}>
                        <button className={styles.buyBtn}>
                            Order Now
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default PizzaCard