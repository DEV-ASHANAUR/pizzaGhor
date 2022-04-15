import axios from 'axios'
import React,{useEffect,useState} from 'react'
import NextPlanIcon from '@mui/icons-material/NextPlan';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Link from 'next/Link';
import Image from 'next/image';
import styles from '../../../styles/Profile.module.css';

const index = ({orders}) => {
    const [user, setUser] = useState(null);
    const [orderList, setOrderList] = useState(orders);
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(true);
    const orderStatus = ["preparing", "on the way","awaiting shipment", "delivered"];

    useEffect(() => {
        setLoading(true);
        handleUser();
        setLoading(false);
    }, [loading,user]);

    
    const handleStatus = async (id) => {
    const item = orderList.filter((order) => order._id === id)[0];
    const currentStatus = item.status;

    try {
      const res = await axios.put("http://localhost:3000/api/order/" + id, {
        status: currentStatus + 1,
      });
      setOrderList([
        res.data,
        ...orderList.filter((order) => order._id !== id),
      ]);
    } catch (err) {
      console.log(err);
    }
  };

    const handleUser = async () => {
        const res = await axios.get('http://localhost:3000/api/user');
        if (res.data.success === true) {
            setStatus(200);
            setUser(res.data.user);
        } else {
            setStatus('');
        }  
    }

    // console.log(orders);
    if(!user && loading){
        return <h1>Loading</h1>
    }

    return (
        <div className='container my-5 '>
            <div className='row'>
                <div className='col-md-3'>
                    <div className='text-center bg-primary text-white p-4'>
                        <h5 className="text-center pb-3">My Account</h5>
                        <div className={styles.profileWrapper}>
                            <Image src="/img/person.jpg" width="150px" height="150px" className='img-fluid rounded-circle' />
                        </div>
                        <p>{user?.name}</p>
                        <p>{user?.email}</p>
                    </div>
                </div>
                <div className='col-md-9'>
                    <h5 className="text-center pb-3">All Order</h5>
                    <div className="table-responsive">
                        <table className='table text-center'>
                            <thead>
                                <tr>
                                    <th>Order Id</th>
                                    <th>Customer</th>
                                    <th>Address</th>
                                    <th>Total</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                              orderList.length && orderList.map((order,index)=>(
                                <tr key={index}>
                                    <td>{order._id.slice(0, 5)}...</td>
                                    <td>{order.customer}</td>
                                    <td>{order.address}</td>
                                    <td>{order.total}$</td>
                                    <td>
                                        {
                                            order.status === 3 ? (
                                                <span className="badge rounded-pill bg-success">{orderStatus[order.status]}
                                                </span>
                                            ):(
                                                <span className="badge rounded-pill bg-primary">{orderStatus[order.status]}
                                                </span>
                                            )
                                        }
                                        
                                    </td>
                                    <td className="d-flex justify-content-center"> 
                                        {
                                            order.status === 3 ? (
                                            <button className={styles.stepBtn} disabled onClick={() => handleStatus(order._id)} title="Done">
                                                <NextPlanIcon />
                                            </button>
                                            ):(
                                                <button className={styles.stepBtn} onClick={() => handleStatus(order._id)} title="Next Step">
                                                    <NextPlanIcon />
                                                </button>
                                            )
                                        }
                                        <Link href={`/dashboard/admin/orders/${order._id}`} passHref>
                                            <button className="btn btn-primary mx-2" title="View Order">
                                                <RemoveRedEyeIcon />
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                                ))
                            }
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
export const getServerSideProps = async () => {
  const res = await axios.get('http://localhost:3000/api/order');
  return {
    props: {
      orders: res.data,
    }
  }
}

export default index

