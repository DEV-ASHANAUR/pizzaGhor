import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import BackspaceRoundedIcon from '@mui/icons-material/BackspaceRounded';
import Image from 'next/image';
import styles from '../styles/Cart.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, remove } from '../redux/cartSlice';
import { ToastContainer, toast } from 'react-toastify';
import Link from 'next/link';
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";

const cart = () => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const { cartItems, total } = useSelector(state => state.cart)

    //for paypal
    const amount = "2";
    const currency = "USD";
    const style = { "layout": "vertical" };
    const ButtonWrapper = ({ currency, showSpinner }) => {
        // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
        // This is the main reason to wrap the PayPalButtons in a new component
        const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

        useEffect(() => {
            dispatch({
                type: "resetOptions",
                value: {
                    ...options,
                    currency: currency,
                },
            });
        }, [currency, showSpinner]);


        return (<>
            {(showSpinner && isPending) && <div className="spinner" />}
            <PayPalButtons
                style={style}
                disabled={false}
                forceReRender={[amount, currency, style]}
                fundingSource={undefined}
                createOrder={(data, actions) => {
                    return actions.order
                        .create({
                            purchase_units: [
                                {
                                    amount: {
                                        currency_code: currency,
                                        value: amount,
                                    },
                                },
                            ],
                        })
                        .then((orderId) => {
                            // Your code here after create the order
                            return orderId;
                        });
                }}
                onApprove={function (data, actions) {
                    return actions.order.capture().then(function () {
                        // Your code here after capture the order
                    });
                }}
            />
        </>
        );
    }

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
                                {cartItems.map((item, index) => (
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
                                                    <span className='badge rounded-pill bg-primary' key={extra._id}>{extra.text}</span>
                                                ))
                                            }
                                        </td>
                                        <td>{item.price}$</td>
                                        <td>
                                            <div className={styles.quantityUpdateBtn}>
                                                <button className={styles.decrement} onClick={() => dispatch(decrement({ index }))}><RemoveIcon /></button>
                                                <span>{item.qty}</span>
                                                <button className={styles.increment} onClick={() => dispatch(increment({ index }))}><AddIcon /></button>
                                            </div>
                                        </td>
                                        <td style={{ color: 'red', cursor: 'pointer' }}><BackspaceRoundedIcon onClick={() => dispatch(remove({ index }))} /></td>
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

                        {
                            open ? (
                                <div>
                                    <button className={styles.checkoutBtn} onClick={() => setOpen(true)}>Cash on Delivery</button>
                                    <PayPalScriptProvider
                                        options={{
                                            "client-id": "ATXDS4PbGYOHGQMmtE_FS-npcfIRC9OmrRDWxNOFlhzE-NtrH8bwGvmBMplRqsP64rpvcgFGZgDUVghq",
                                            components: "buttons",
                                            currency: "USD",
                                            "disable-funding": "credit,card,p24",
                                        }}
                                    >
                                        <ButtonWrapper
                                            currency={currency}
                                            showSpinner={false}
                                        />
                                    </PayPalScriptProvider>
                                </div>
                            ) : (
                                <button className={styles.checkoutBtn} onClick={() => setOpen(true)}>checkout now</button>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default cart