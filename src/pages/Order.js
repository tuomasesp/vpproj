import React, { useState, useEffect, createRef } from "react";
import uuid from "react-uuid";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Order({cart, removeFromCart, updateAmount}) {
    const [inputs,_] = useState([]);
    const [inputIndex, setInputIndex] = useState(-1);

    useEffect(() => {
      for (let i = 0;i<cart.length;i++) {
        inputs[i] = createRef();
      }
    }, [cart.length])

    useEffect(() => {
      if (inputs.length > 0 && inputIndex > -1 && inputs[inputIndex].current !== null) {
        inputs[inputIndex].current.focus();
      }
    }, [cart])
    
    
    let sum = 0;

    function changeAmount(e,product,index) {
        updateAmount(e.target.value, product);
        setInputIndex(index);
    }

    return (
        <>
    <Navbar />
        <div>
            <h3 className="header">Tuotteet ostoskorissa</h3>
            <table className="table">
                <tbody>
                    {cart.map((product, index) => {
                        sum+=parseFloat(product.price)
                        return (
                            <tr key={uuid()}>
                                <td>{product.name}</td>
                                <td>{product.price} €</td>
                                <td>
                                    <input ref={inputs[index]} style={{width: '60px'}} value={product.amount} onChange={e => changeAmount(e, product, index)} />
                                </td>
                                <td><a href="#" onClick={() => removeFromCart(product)}>Poista</a></td>
                            </tr>
                        )
                    })}
                    <tr key={uuid()}>
                        <td></td>
                        <td>{sum.toFixed(2)}</td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>   
    <Footer />   
        </>
    )
}
