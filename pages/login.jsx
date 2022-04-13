import axios from 'axios';
import React,{useState} from 'react'
import styles from '../styles/Login.module.css';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import {useRouter} from 'next/router';
const login = () => {
  const router = useRouter();
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  
  //handleSubmit
  const handleSubmit = async() => {
    if(email && password){
          try {
              await axios.post(`http://localhost:3000/api/login`,{email,password});
              toast.success("login Success!",{
                  position: "bottom-right",
              });
              router.push('/');
          } catch (error) {
              console.log(error);
              if(error){
                toast.error("Invalid User",{
                    position: "bottom-right",
                });
              }
          }
    }else{
      toast.error("All Field Are required!",{
          position: "bottom-right",
      });
    }
}
  return (
    <div className="container">
        <ToastContainer />
        <div className={styles.loginWrapper}>
            <h3>login Here</h3>
            <div className={`${styles.formGroup} my-2`}>
                <label>Enter Email</label>
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control" />
            </div>
            <div className={`${styles.formGroup} my-2`}>
                <label>Enter Password</label>
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className='form-control' />
            </div>
            <Link href="/register" passHref>
                <a>Create an Account?</a>
            </Link>
            <button className={styles.loginBtn} onClick={handleSubmit}>Submit</button>
        </div>
    </div>
  )
}

export default login