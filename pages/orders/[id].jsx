import React from 'react'
import styles from '../../styles/Order.module.css'
import Image from 'next/image';
const Order = () => {
    const status = 0;
    const statusClass = (index) =>{
        if (index - status < 1) return styles.done;
        if (index - status === 1) return styles.inProgress;
        if (index - status > 1) return styles.undone;
    }
    return (
        <div className="container">
            <h5 className="pt-2 pb-3">Home/order</h5>
            <div className='row'>
                <div class="col-md-9">
                    <div className="table-responsive">
                        <table className='table text-center'>
                            <thead>
                                <tr>
                                    <th>Order Id</th>
                                    <th>Customer</th>
                                    <th>Address</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>65483523543331</td>
                                    <td>Md Ashanaur Rahman</td>
                                    <td>dhaka,Bangladesh</td>
                                    <td>7845$</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className={`my-5 d-flex justify-content-between ${styles.statusArea}`}>
                            <div className={statusClass(0)}>
                                <Image src="/img/paid.png" width={30} height={30} alt="" />
                                <span>Payment</span>
                                <div className={styles.checkedIcon}>
                                    <Image
                                        className={styles.checkedIcon}
                                        src="/img/checked.png"
                                        width={20}
                                        height={20}
                                        alt=""
                                    />
                                </div>
                            </div>
                            <div className={statusClass(1)}>
                                <Image src="/img/bake.png" width={30} height={30} alt="" />
                                <span>Preparing</span>
                                <div className={styles.checkedIcon}>
                                    <Image
                                        className={styles.checkedIcon}
                                        src="/img/checked.png"
                                        width={20}
                                        height={20}
                                        alt=""
                                    />
                                </div>
                            </div>
                            <div className={statusClass(2)}>
                                <Image src="/img/bike.png" width={30} height={30} alt="" />
                                <span>On the way</span>
                                <div className={styles.checkedIcon}>
                                    <Image
                                        className={styles.checkedIcon}
                                        src="/img/checked.png"
                                        width={20}
                                        height={20}
                                        alt=""
                                    />
                                </div>
                            </div>
                            <div className={statusClass(3)}>
                                <Image src="/img/delivered.png" width={30} height={30} alt="" />
                                <span>Delivered</span>
                                <div className={styles.checkedIcon}>
                                    <Image
                                        className={styles.checkedIcon}
                                        src="/img/checked.png"
                                        width={20}
                                        height={20}
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div className={styles.orderDeltailsBox}>
                        <h4 className="mb-3">CART TOTAL</h4>
                        <h6>cart total : 7485 </h6>
                        <h6>discount : 7485 </h6>
                        <h6 className="mb-3">total : 7485 </h6>
                        <button className={styles.checkoutBtn}>paid</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Order