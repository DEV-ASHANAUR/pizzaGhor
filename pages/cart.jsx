import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import BackspaceRoundedIcon from '@mui/icons-material/BackspaceRounded';
import Image from 'next/image';
import styles from '../styles/Cart.module.css'
import { useSelector, useDispatch } from 'react-redux';
import {increment,decrement,remove} from '../redux/cartSlice';
import { ToastContainer, toast } from 'react-toastify';
import Link from 'next/link';
const cart = () => {
    const dispatch = useDispatch();
    const {cartItems,total,quantity} = useSelector(state=>state.cart)
    // console.log(total);
    // console.log(quantity)
    return (
        <div className='container'>
        <ToastContainer />
            <h5 className="pt-2 pb-3">Home/Product/Cart</h5>
            <div className="row">
                <div className="col-md-9">
                    <div className="table-responsive">
                        <table className='table text-center'>
                            <thead>
                                <tr>
                                    <th>Thumbnail</th>
                                    <th>Title</th>
                                    <th>Extra</th>
                                    <th>Unit Price</th>
                                    <th>Quantity</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((item,index)=>(
                                    <tr key={index}>
                                    <td>
                                        <Image src={item.img} width='60' height="60"
                                            objectFit="cover"
                                            alt="" />
                                    </td>
                                    <td>{item.title}</td>
                                    <td>
                                        {
                                            item.extras.map(extra=>(
                                                <span className='badge rounded-pill bg-primary' key={extra._id}>{extra.text}</span>
                                            ))
                                        }
                                    </td>
                                    <td>{item.price}$</td>
                                    <td>
                                        <div className={styles.quantityUpdateBtn}>
                                            <button className={styles.decrement} onClick={()=>dispatch(decrement({index}))}><RemoveIcon /></button>
                                            <span>{item.qty}</span>
                                            <button className={styles.increment} onClick={()=>dispatch(increment({index}))}><AddIcon /></button>
                                        </div>
                                    </td>
                                    <td style={{ color: 'red', cursor: 'pointer' }}><BackspaceRoundedIcon onClick={()=>dispatch(remove({index}))} /></td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="my-3">
                            <Link href="/" passHref>
                                <button className={styles.conBtn}>continue shopping</button>
                            </Link>
                            
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className={styles.cartDeltailsBox}>
                        <h4 className="mb-3">CART TOTAL</h4>
                        <h6>cart total : {total}$ </h6>
                        <h6>discount : 0 </h6>
                        <h6 className="mb-3">total : {total}$ </h6>
                        <button className={styles.checkoutBtn}>checkout now</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default cart