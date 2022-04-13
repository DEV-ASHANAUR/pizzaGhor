import axios from 'axios'
import React,{useEffect,useState} from 'react'

const index = () => {
    const [user, setUser] = useState(null);
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        handleUser();
        setLoading(false);
    }, [loading,user]);

    const handleUser = async () => {
        const res = await axios.get('http://localhost:3000/api/user');
        if (res.data.success === true) {
            setStatus(200);
            setUser(res.data.user);
        } else {
            setStatus('');
        }  
    }

    if(!user && loading){
        return <h1>Loading</h1>
    }

    return (
        <div>Ellcome  {user?.name}</div>
    )
}

export default index

