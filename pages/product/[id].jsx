import axios from 'axios';
import React, { useState } from 'react'
import Image from 'next/image';
import styles from '../../styles/Product.module.css'
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { useSelector, useDispatch } from 'react-redux';
import {addToCart} from '../../redux/cartSlice';
import { ToastContainer, toast } from 'react-toastify';
const Product = ({ pizza }) => {
    const [price,setPrice] = useState(pizza.prices[0])
    const [size, setSize] = useState(0);
    const [qty, setQty] = useState(1);
    const [extras,setExtras] = useState([]);
    const dispatch = useDispatch();
    //handlePrice
    const handlePrice = (number) =>{
        setPrice(price + number);
    }
    //handleSize
    const handleSize = (sizeIndex) =>{
        const difference = pizza.prices[sizeIndex] - pizza.prices[size];
        setSize(sizeIndex);
        handlePrice(difference);
    }
    //handleChange option
    const handleChange = (e,option)=>{
        const checked = e.target.checked;
        if(checked){
            handlePrice(option.price);
            setExtras((prev)=>[...prev,option]);
        }else{
            handlePrice(-option.price);
            setExtras(extras.filter((extra)=>extra._id !== option._id));
        }
    }
    // console.log(extras);
    const handleAddToCart = () =>{
        dispatch(addToCart({...pizza,extras,price,qty}));
    }

    return (
        <div className='container pb-5'>
        <ToastContainer />
            <h5 className="pt-2 pb-3">Home/Product</h5>
            <div className="row">
                <div className="col-md-6 d-flex justify-content-center align-items-center">
                    <Image src={pizza.img} width="445" height="445" />
                </div>
                <div className="col-md-6">
                    <h2 style={{ color: "1D2228", fontSize: '26px', marginBottom: '15px' }}>{pizza.title}</h2>
                    <p className={`${styles.productPrice}`}>{price}$</p>
                    <p className='mb-3'>{pizza.desc}</p>
                    <h3 className="py-2">Choose Size: </h3>
                    <div className="d-flex justify-content-between align-items-center w-50">
                        <button className={`${styles.sizeBtn} ${(size == 0) && styles.active}`} onClick={() => handleSize(0)}>Small</button>
                        <button className={`${styles.sizeBtn} ${(size == 1) && styles.active}`} onClick={() => handleSize(1)}>Medium</button>
                        <button className={`${styles.sizeBtn} ${(size == 2) && styles.active}`} onClick={() => handleSize(2)}>Large</button>
                    </div>
                    <h3 className="pb-1 pt-4">Choose additional  ingredients: </h3>
                    <div className="d-flex justify-content-between align-items-center">
                        {
                            pizza.extraoptions.map((option,i) => (
                                <div className={styles.checkboxWrapper} key={i} >
                                    <input id={option.text} name={option.text} type="checkbox" onChange={(e)=>handleChange(e,option)} className={styles.checkbox} />
                                    <label htmlFor={option.text} className='px-2'>{option.text}</label>
                                </div>
                            ))
                        }
                    </div>
                    <h3 className="pb-1 pt-4">Quantity </h3>
                    <div className="d-flex align-items-center justify-content-between">
                        <div className={styles.counter}>
                            <button className={styles.minus} onClick={() => { (qty > 1) && setQty(qty - 1) }}><RemoveIcon /></button>
                            <span className={styles.qty}>{qty}</span>
                            <button className={styles.plus} onClick={() => { (qty < 9) && setQty(qty + 1) }}><AddIcon /></button>
                        </div>
                        <div className="orderBtn">
                            <button className={styles.addToCartBtn} onClick={handleAddToCart}>ADD TO CART  <ShoppingBasketIcon /> </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export const getServerSideProps = async ({ params }) => {
    const res = await axios.get(`http://localhost:3000/api/product/${params.id}`);
    return {
        props: {
            pizza: res.data
        }
    }
}

export default Product