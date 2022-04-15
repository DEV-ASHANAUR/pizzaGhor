import axios from 'axios';
import React from 'react'
import styles from '../../../../styles/Order.module.css'
import Image from 'next/image';
const Order = ({order}) => {
    console.log(order)
    const status = order.status;
    const statusClass = (index) =>{
        if (index - status < 1) return styles.done;
        if (index - status === 1) return styles.inProgress;
        if (index - status > 1) return styles.undone;
    }
    return (
        <div className="container">
            <h5 className="pt-2 pb-3">Dashboard/Admin/Track order</h5>
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
                                    <td>{order._id}</td>
                                    <td>{order.customer}</td>
                                    <td>{order.address}</td>
                                    <td>{order.total}$</td>
                                </tr>
                            </tbody>
                        </table>
                        <h5>Order Details</h5>
                        <table className='table text-center'>
                            <thead>
                                <tr>
                                    <th>Thumbnail</th>
                                    <th>Title</th>
                                    <th>Extra</th>
                                    <th>Unit Price</th>
                                    <th>Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order.item.map((item, index) => (
                                    <tr key={index}>
                                        <td>
                                            <Image src={item.img} width='60' height="60"
                                                objectFit="cover"
                                                alt="" />
                                        </td>
                                        <td>{item.title}</td>
                                        <td>
                                            {
                                                item.extras.map(extra => (
                                                    <span className='badge rounded-pill bg-primary px-2' key={extra._id}>{extra.text}</span>
                                                ))
                                            }
                                        </td>
                                        <td>{item.price}$</td>
                                        <td>{item.qty}</td>
                                        
                                    </tr>
                                ))}
                                
                            </tbody>
                        </table>
                        <h6>Order Status</h6>
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
                        <h6>cart total : {order.total}$ </h6>
                        <h6>discount : 0 </h6>
                        <h6 className="mb-3">total : {order.total}$ </h6>
                        <button className={styles.checkoutBtn}>{(order.method === 1)?'paid':'cash on devlivery'}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export const getServerSideProps = async ({ params }) => {
    const res = await axios.get(`http://localhost:3000/api/order/${params.id}`);
    return {
        props: {
            order: res.data
        }
    }
}

export default Order