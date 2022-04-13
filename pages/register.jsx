import axios from 'axios';
import React,{useState} from 'react'
import styles from '../styles/Login.module.css';
import { ToastContainer, toast } from 'react-toastify';
import {useRouter} from 'next/router';
import Link from 'next/Link';
const Register = () => {
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [confirmPassword,setConfirmPassword] = useState('');
  const router = useRouter();
  
  //handleSubmit
  const handleSubmit = async() => {
      if(name && email && password && confirmPassword){
        if(password === confirmPassword){
            try {
                await axios.post(`http://localhost:3000/api/register`,{name,email,password});
                toast.success("Registation Success! Please login",{
                    position: "bottom-right",
                });
                router.push('/login');
            } catch (error) {
                console.log(error);
                toast.error("User Already Exist",{
                    position: "bottom-right",
                });
            }
        }else{
            toast.error("password Not match!",{
                position: "bottom-right",
            });
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
            <h3>SignUp Here</h3>
            <div className={`${styles.formGroup} my-2`}>
                <label>Enter Name</label>
                <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className="form-control" />
            </div>
            <div className={`${styles.formGroup} my-2`}>
                <label>Enter Email</label>
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control" />
            </div>
            <div className={`${styles.formGroup} my-2`}>
                <label>Enter Password</label>
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className='form-control' />
            </div>
            <div className={`${styles.formGroup} my-2`}>
                <label>Confirm Password</label>
                <input type="password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} className='form-control' />
            </div>
            <Link href="/login" passHref>
                <a>Already Have an Account?</a>
            </Link>
            <button className={styles.loginBtn} onClick={handleSubmit}>Submit</button>
        </div>
    </div>
  )
}

export default Register