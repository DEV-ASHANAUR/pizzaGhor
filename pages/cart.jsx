import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import BackspaceRoundedIcon from '@mui/icons-material/BackspaceRounded';
import Image from 'next/image';
import styles from '../styles/Cart.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, remove,reset } from '../redux/cartSlice';
import { ToastContainer, toast } from 'react-toastify';
import BillingModal from '../components/BillingModal';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";

const cart = () => {
    const [lgShow, setLgShow] = useState(false);
    const [user, setUser] = useState(null);
    const [paymentSetp,setPaymentStep] = useState(false);
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);
    const [billing,setBilling] = useState(null);
    const dispatch = useDispatch();
    const { cartItems, total, quantity } = useSelector(state => state.cart)
    const router = useRouter();
    // console.log("cartItems", cartItems);
    useEffect(()=>{
        setLoading(true);
        handleUser();
        setLoading(false);
    },[router.pathname])
    //get login user
    const handleUser = async () => {
        const res = await axios.get('http://localhost:3000/api/user');
        if (res.data.success === true) {
            setStatus(200);
            setUser(res.data.user);
        } else {
            setStatus('');
        }
    }
    //handleModalShow
    const handleModalShow = ()=> {
        setLgShow(false);
    }
    //requestForPayment
    const requestForPayment = (billingData) => {
        setBilling(billingData);
        setPaymentStep(true);
        setLgShow(false);
        toast.success("choose Your Payment Option!");
    }
    //loading
    if(loading){
        return <h1>Loading</h1>
    }
    //make order 
    const makeOrder = async (data) => {
        try {
            const res = await axios.post('http://localhost:3000/api/order', {
                customerId: user?._id,
                customer: data.customer,
                method:data.method,
                address:data.address,
                item: cartItems,
                total: total,
                quantity: quantity
            });
            dispatch(reset());
            toast.success('Your Order Pleced Successfully!');
            router.push(`/dashboard/user/orders/${res.data._id}`);
        } catch (error) {
            console.log(error);
        }
    }
    //for paypal
    const amount = total;
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
                    return actions.order.capture().then(function (details) {
                        const shipping = details.purchase_units[0].shipping;
                        makeOrder({
                            customer: user?.name,
                            address: billing.address,
                            method: 1,
                        });
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
            {/* <button onClick={()=>setLgShow(true)}>make order</button> */}
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
                                {
                                    cartItems.length === 0 && (
                                        <tr>
                                            <td colspan="6">Yout Cart is Empty!</td>
                                        </tr>
                                    )
                                }
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
                            paymentSetp && (
                                <div>
                                    <button className={styles.checkoutBtn} onClick={()=>makeOrder({customer: user?.name,address: billing.address, method: 0,})}>Cash on Delivery</button>
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
                            )
                        }

                        { 
                            !paymentSetp && (
                            <>
                                {
                                    (status == 200 && user && user?.role === 'user' && cartItems.length) ? (
                                <div>
                                    <button className={styles.checkoutBtn} onClick={()=>setLgShow(true)}>Checkout</button>
                                </div>
                            ) : 
                                (status == 200 && user && user.role === 'user') ? (
                                    <button className={styles.checkoutBtn}>shop first</button>
                                ):(
                                    <Link href="/login" passHref>
                                        <button className={styles.checkoutBtn}>Please Login As User for checkout</button>
                                    </Link>
                                ) 
                                }
                            </>
                            )
                        }

                        {
                            lgShow && <BillingModal lgShow={lgShow} handleModalShow={handleModalShow} user={user} requestForPayment={requestForPayment} />
                        }
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default cart