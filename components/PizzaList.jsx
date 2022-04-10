import React from 'react'
import styles from '../styles/PizzaList.module.css'
import PizzaCard from './PizzaCard';
const PizzaList = ({ pizzaList }) => {
    return (
        <div className='container py-5'>
            <div className={styles.heading}>
                <h2>Best Pizza in town</h2>
                <p className='text-center w-75'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel veritatis maxime, voluptatibus, nihil eum totam nulla hic eaque adipisci perferendis amet nisi corrupti. Cumque nemo voluptatum accusantium explicabo. Quia, dolores.</p>
            </div>
            <div className="row row-cols-1 row-cols-md-3 g-4 py-4">
                {
                    pizzaList.map((pizza, index) => (
                        <PizzaCard key={index} pizza={pizza} />
                    ))
                }
            </div>
        </div>
    )
}

export default PizzaList