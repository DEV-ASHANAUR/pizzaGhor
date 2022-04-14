import React,{useState} from 'react'
import { Modal,Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
const BillingModal = (props) => {
    const [customer,setCustomer] = useState(props.user.name);
    const [email,setEmail] = useState(props.user.email);
    const [address,setAddress] = useState('');

    const handleForNext = () =>{
        if(customer && email && address){
            props.requestForPayment({customer,email,address});
        }else{
            toast.error('All Field are Required!');
        }
    }
  return (
    <div>
       <ToastContainer />
        {/* cart modal start */}
        <Modal
          size="lg"
          show={props.lgShow}
          onHide={props.handleModalShow}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
                <h6>Billing Information</h6>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <label htmlFor="">Customer Name</label>
            <input type="text" class="form-control my-2" onChange={(e)=>setCustomer(e.target.value)} value={customer} readOnly />

            <label htmlFor="">Customer Email</label>
            <input type="text" class="form-control my-2" onChange={(e)=>setEmail(e.target.value)} value={email} readOnly />

            <label htmlFor="">Enter Address</label>
            <textarea class="form-control mt-2 mb-5" onChange={(e)=>setAddress(e.target.value)} value={address} placeholder="Enter Shiping Address.."> </textarea>

            <Button variant="warning" onClick={handleForNext} >Next Step for Payment</Button>
          </Modal.Body>
        </Modal>
        {/* cart modal start */}
    </div>
  )
}

export default BillingModal