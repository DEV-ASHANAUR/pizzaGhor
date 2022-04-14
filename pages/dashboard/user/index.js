import axios from 'axios'
import React,{useEffect,useState} from 'react'
import BackspaceRoundedIcon from '@mui/icons-material/BackspaceRounded';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Link from 'next/Link';

const index = () => {
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        handleUser();
        axios.get(`http://localhost:3000/api/order/myOrder/${user?._id}`)
        .then(res=>{
            setOrders(res.data)
        }).catch(err=>{
            console.log(err);
        })
        setLoading(false);
    }, [loading,user,orders]);

    const handleRemove = async(id)=>{
        axios.post('http://localhost:3000/api/order/myOrder/deleteOrder',{id})
        .then(res=>{
            console.log(res);
            const existOrder = orders.filter((item)=>item._id !== id);
            setOrders(existOrder);
        }).catch(err=>{
            console.log(err);
        })
    }

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
                        <p>{user?.name}</p>
                        <p>{user?.email}</p>
                    </div>
                </div>
                <div className='col-md-9'>
                    <h5 className="text-center pb-3">My All Order</h5>
                    <div className="table-responsive">
                        <table className='table text-center'>
                            <thead>
                                <tr>
                                    <th>Order Id</th>
                                    <th>Customer</th>
                                    <th>Address</th>
                                    <th>Total</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                               orders.length && orders.map((order,index)=>(
                                <tr key={index}>
                                    <td>{order._id}</td>
                                    <td>{order.customer}</td>
                                    <td>{order.address}</td>
                                    <td>{order.total}$</td>
                                    <td className="d-flex justify-content-between">
                                        <span style={{ color: 'red', cursor: 'pointer' }}>
                                            <BackspaceRoundedIcon onClick={()=>handleRemove(order._id)} />
                                        </span>
                                        <span style={{ color: 'green', cursor: 'pointer' }}>    
                                            <Link href={`/dashboard/user/orders/${order._id}`} passHref>
                                                <RemoveRedEyeIcon />
                                            </Link>
                                        </span>
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

export default index

