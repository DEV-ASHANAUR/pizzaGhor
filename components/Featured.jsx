import React, { useState } from 'react'
import Image from 'next/image'
import styles from '../styles/Featured.module.css';
const Featured = () => {
    const [index, setIndex] = useState(0);
    const images = [
        "/img/slider1.png",
        "/img/slider2.png",
        "/img/sliderimg.png",
        "/img/fastdeleivery.png"
    ];
    //handleArrow
    const handleArrow = (dirrection)=>{
        if(dirrection === 'r'){  
            setIndex(index!==3?index+1:0)
        }else if(dirrection === 'l'){
            setIndex(index!==0?index-1:3)
        }
    }
    return (
        <div className={styles.container}>
            <div className={styles.arrowContainer} style={{left:0}} onClick={()=>handleArrow("l")}>
                <Image src="/img/arrowl.png" alt='' objectFit='contain' layout='fill' />
            </div>
            <div className={styles.wrapper} style={{transform: `translateX(${-100*index}vw)`}}>
                {
                    images.map((img,i)=>(
                        <div className={styles.imgContainer} key={i}>
                            <Image src={img} objectFit="contain" layout='fill' alt='' />
                        </div>
                    ))
                }
            </div>
            <div className={styles.arrowContainer} style={{right:0}} onClick={()=>handleArrow("r")}>
                <Image src="/img/arrowr.png" alt='' objectFit='contain' layout='fill' />
            </div>
        </div>
    )
}
export default Featured;