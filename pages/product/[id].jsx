import React,{useState} from 'react'
import Image from 'next/image';
import styles from '../../styles/Product.module.css'
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
const Product = () => {
    const [size, setSize] = useState(0);
    const [qty,setQty] = useState(1);
    const pizza = {
        id: 1,
        img: "/img/pizza_PNG44090.png",
        name: "CAMPAGNOLA",
        price: [19.9, 23.9, 27.9],
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis arcu purus, rhoncus fringilla vestibulum vel, dignissim vel ante. Nulla facilisi. Nullam a urna sit amet tellus pellentesque egestas in in ante.",
    };
  return (
    <div className='container pb-5'>
        <h5 className="pt-2 pb-3">Home/Product</h5>
        <div className="row">
            <div className="col-md-6 d-flex justify-content-center align-items-center">
                <Image src={pizza.img}  width="445" height="445"  />
            </div>
            <div className="col-md-6">
                <h2 style={{color:"1D2228",fontSize:'26px',marginBottom:'15px'}}>{pizza.name}</h2>
                <p className={`${styles.productPrice}`}>{pizza.price[size]}$</p>
                <p className='mb-3'>{pizza.desc}</p>
                <h3 className="py-2">Choose Size: </h3>
                <div className="d-flex justify-content-between align-items-center w-50">
                    <button className={`${styles.sizeBtn} ${(size==0)&&styles.active}`} onClick={()=>setSize(0)}>Small</button>
                    <button className={`${styles.sizeBtn} ${(size==1)&&styles.active}`} onClick={()=>setSize(1)}>Medium</button>
                    <button className={`${styles.sizeBtn} ${(size==2)&&styles.active}`} onClick={()=>setSize(2)}>Large</button>
                </div>
                <h3 className="pb-1 pt-4">Choose additional  ingredients: </h3>
                <div className="d-flex justify-content-between align-items-center">
                    <div className={styles.checkboxWrapper}>
                        <input id="double" name="double" type="checkbox" className={styles.checkbox} />
                        <label htmlFor='double' className='px-2'>Double</label>
                    </div>
                    <div className={styles.checkboxWrapper}>
                        <input id="extraCheese" name="extraCheese" type="checkbox" className={styles.checkbox} />
                        <label htmlFor='extraCheese' className='px-2'>Extra Cheese</label>
                    </div>
                    <div className={styles.checkboxWrapper}>
                        <input id="spicySauce" name="spicySauce" type="checkbox" className={styles.checkbox} />
                        <label htmlFor='spicySauce' className='px-2'>Spicy Sauce</label>
                    </div>
                    <div className={styles.checkboxWrapper}>
                        <input id="garlicSauce" name="garlicSauce" type="checkbox" className={styles.checkbox} />
                        <label htmlFor='garlicSauce' className='px-2'>Garlic Sauce</label>
                    </div>
                </div>
                <h3 className="pb-1 pt-4">Quantity </h3>
                <div className="d-flex align-items-center justify-content-between">
                    <div className={styles.counter}>
                        <button className={styles.minus} onClick={()=>{(qty>1) && setQty(qty-1)}}><RemoveIcon /></button>
                        <span className={styles.qty}>{qty}</span>
                        <button className={styles.plus} onClick={()=>{(qty<9) && setQty(qty+1)}}><AddIcon /></button>
                    </div>
                    <div className="orderBtn">
                        <button className={styles.addToCartBtn}>ADD TO CART  <ShoppingBasketIcon /> </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Product