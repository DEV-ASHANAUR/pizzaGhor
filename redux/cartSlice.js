import { createSlice } from '@reduxjs/toolkit'
import { toast } from "react-toastify";
// let getCart=[];

// if (typeof window !== 'undefined') {
//   // Perform localStorage action
//    getCart = JSON.parse(localStorage.getItem('cartItems'));
// }

// const data = typeof window !== "undefined" && localStorage.getItem("cart") ? 
//  JSON.parse(localStorage.getItem("cart")) : []

const initialState = {
    cartItems: [],
    quantity: 0,
    total: 0,
}

export const cartSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.cartItems.push(action.payload);
            state.quantity = 0;
            state.total = 0;
            state.cartItems.map((item) => {
                state.quantity += item.qty;
                state.total += item.qty * item.price;
            })
            localStorage.setItem('cart',JSON.stringify(state.cartItems));
            toast.success('Product added to cart!', {
                position: "bottom-right",
            });
        },
        increment: (state, action) => {
            // console.log("payload",typeof action.payload.index)
            const existingIndex = action.payload.index;
            state.cartItems[existingIndex] = {
                ...state.cartItems[existingIndex],
                qty: state.cartItems[existingIndex].qty + 1,
            };
            state.quantity = 0;
            state.total = 0;
            state.cartItems.map((item) => {
                state.quantity += item.qty;
                state.total += item.qty * item.price;
            })
        },
        decrement: (state, action) => {
            const existingIndex = action.payload.index;
            if(state.cartItems[existingIndex].qty>1){
                state.cartItems[existingIndex] = {
                    ...state.cartItems[existingIndex],
                    qty: state.cartItems[existingIndex].qty - 1,
                };
            }

            state.quantity = 0;
            state.total = 0;
            state.cartItems.map((item) => {
                state.quantity += item.qty;
                state.total += item.qty * item.price;
            })
        },
        remove:(state,action)=>{
            const existingIndex = action.payload.index;
            state.cartItems.splice(existingIndex, 1)
            toast.info("Item removed from cart!", {
                position: "bottom-right",
            });
        },

        reset: () => {
            cartItems = []
            quantity = 0
            total = 0
        },

    }
})

// Action creators are generated for each case reducer function
export const { addToCart, increment, decrement, getTotals, reset,remove } = cartSlice.actions

export default cartSlice.reducer