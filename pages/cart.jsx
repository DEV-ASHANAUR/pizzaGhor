import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import BackspaceRoundedIcon from '@mui/icons-material/BackspaceRounded';
import Image from 'next/image';
import styles from '../styles/Cart.module.css'
const cart = () => {
    return (
        <div className='container'>
            <h5 className="pt-2 pb-3">Home/Product/Cart</h5>
            <div className="row">
                <div className="col-md-9">
                    <div className="table-responsive">
                        <table className='table text-center'>
                            <thead>
                                <tr>
                                    <th>Thumbnail</th>
                                    <th>Title</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <Image src="/img/pizza.png" width='60' height="60"
                                            objectFit="cover"
                                            alt="" />
                                    </td>
                                    <td>fhjgh</td>
                                    <td>554</td>
                                    <td>
                                        <div className={styles.quantityUpdateBtn}>
                                            <button className={styles.decrement}><RemoveIcon /></button>
                                            <span>1</span>
                                            <button className={styles.increment}><AddIcon /></button>
                                        </div>
                                    </td>
                                    <td style={{ color: 'red', cursor: 'pointer' }}><BackspaceRoundedIcon /></td>
                                </tr>

                                <tr>
                                    <td>
                                        <Image src="/img/pizza.png" width='60' height="60"
                                            objectFit="cover"
                                            alt="" />
                                    </td>
                                    <td>fhjgh</td>
                                    <td>554</td>
                                    <td>
                                        <div className={styles.quantityUpdateBtn}>
                                            <button className={styles.decrement}><RemoveIcon /></button>
                                            <span>1</span>
                                            <button className={styles.increment}><AddIcon /></button>
                                        </div>
                                    </td>
                                    <td style={{ color: 'red', cursor: 'pointer' }}><BackspaceRoundedIcon /></td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="my-3">
                            <button className={styles.conBtn}>continue shopping</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className={styles.cartDeltailsBox}>
                        <h4 className="mb-3">CART TOTAL</h4>
                        <h6>cart total : 7485 </h6>
                        <h6>discount : 7485 </h6>
                        <h6 className="mb-3">total : 7485 </h6>
                        <button className={styles.checkoutBtn}>checkout now</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default cart