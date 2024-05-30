import React, { useEffect, useState } from 'react'
import axios from 'axios'
const BalanceCom = () => {
  const [balance,setBalance]=useState(0)
  useEffect(()=>{
    axios.get("http://localhost:7000/api/v1/account/balance",{
      headers:{Authorization:"Bearer "+localStorage.getItem("token")}
    })
    .then((response)=>{
      setBalance(response.data.balance)
    })
    .catch((error)=>{
      console.log(error)
    })

  },[])
  return (
    <div className='flex flex-row p-2 m-2 '>
        <div className='text-lg font-bold '>Your balance Rs</div>
        <div className='text-lg font-medium ml-2 '>{balance}</div>
    </div>
  )
}

export default BalanceCom