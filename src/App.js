import React from "react";
import "./App.css"
import { useState } from "react";
import { useEffect } from "react";
import Modal from 'react-modal';

const App = () => {
  const [cats, setCats] = useState("")
  const [basket, setBasket] = useState ([])
  const [basketTotal, setBasketTotal] = useState (0)
  const [error, setError] = useState(
      { 
        error: false, 
        message: ""
      }
    )
  const [target, setTarget] = useState([])  
  const [modalOpen, setModalOpen] = useState(false)
    //FUNCTIONS
  const adder = (price) => {    
    let basketTotalPrice = parseInt(basketTotal) + parseInt(price)
    setBasketTotal(basketTotalPrice)    
  }
  const activeBasket  = (item) =>{
    let storedBasket = [...basket] 
    storedBasket.push(item)
    setBasket(storedBasket)    
    adder(item.price)
  }
//
  const minus = (price) => {    
    let basketTotalPrice = parseInt(basketTotal) - parseInt(price)
    setBasketTotal(basketTotalPrice)    
  } 
  const removeHandler = (index, price) => {
    let storedList = [...basket]
    storedList.splice(index, 1)
    setBasket(storedList)
    minus(price)
  } 
//API REQUEST
  const getCats = async () => {
    try{
      const response = await fetch("https://api.thecatapi.com/v1/images/search?limit=9&page=9&order=Desc")
      if(response.status !== 200){
        throw new Error("the error is...its messed up")
      }
      const data = await response.json()      

      let catNames = ['Pip','Daniel','Steven','Anthony','Elvis','Ringo','Lennon','Paul','Harrison']
      let arr = []
      for (let i = 0; i < 8; i++) {
        arr.push({cat: data[i], url: data[i].url , name: catNames[i], price: Math.round(((Math.random() * 2) + 15)), quantity: 1})
      }
      setCats(arr)
      }catch(e){
      setError({ error: true, message: e.message})
      }
  }
    //USE EFFECT CALLS ASYNC FUNCTION (Handler)
    useEffect(() => {
      getCats()
    },[])
    //IF CHECKS FOR ERROR  HANDLING
    if(!cats){
      return <p>loading...</p>
    }
    if(error.error){
      return <h1>{error.message}</h1>
    }

    return(
    <>
      <Modal isOpen={modalOpen}>
        <h1 className="basketText">Basket Total: £{basketTotal}</h1>
        <div className = "imageContainer1">
        {basket.map((item, index) => {
      return( 
        <div className="card">  
          <h2>{item.name}</h2>
          <img className="image" src={item.url} alt="Cat"></img>
          <h2>Adoption fee</h2>
          <RemoveFromCart function2={removeHandler} index={index} func3={minus} price2={item.price}/>
          <button onClick={() => setModalOpen(false)}>Close</button>
        </div>
      )
      })}
      </div>
      </Modal>
      <div className = "wholepage">
      <div className = "titleBar">
        <h1 className="navItem" >Cats for life .com</h1>
      </div>
      </div>
    <div className = "Header">
      <div className="textwrap"> 
        <h1 className="headertext">Your new best friend is just a click away</h1>
        
        <button className="navItem navButton" onClick={getCats}>Browse Cats</button>
      </div>
    </div>
    <div className = "navWrap">
      
    </div>
    <div className = "imageContainer">
      {cats.map((item, index) => {
        return( 
          <div className="card">  
          <h2>{item.name}</h2>
          <img className="image" src={item.url} alt="Cat"></img>
          <AddToCart price = {item.price} cat = {item} func={activeBasket} /> 
           <button onClick={() => setModalOpen(true)}> View cart
          </button>
          </div>
        )
      })}
      </div> 
       
    <div className = "footer">
          Built with React - Codenation Master Coding Bootcamp 2021. 
    </div>
  </>
  ) 
}
//ADD TO CART COMPONENT
const AddToCart = (props) => {
  return(
    <div>
      <button className="navButton" onClick = { () => props.func(props.cat)}>£{props.price}</button>
     
    </div>
  )
}
//REMOVE FROM CART COMPONENT
const RemoveFromCart = (props) => {
  return(
    <div>
      <button className="navButton" onClick = { () => props.function2(props.index, props.price2)}>Remove from cart</button>
    </div>
    )
} 

export default App