import React, { useState } from 'react'
import HeadingCom from '../components/HeadingCom'
import InputBox from '../components/InputBox'
import ButtonComp from '../components/ButtonComp'
import {toast} from "react-hot-toast"
import Wrappercom from '../components/Wrappercom'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
function SendMoney() {
  const navigate=useNavigate()
  const [searchParams]=useSearchParams()
  const [amount,setAmount]=useState(0);
  const id=searchParams.get("id");
  const name=searchParams.get("name")
  return (
  <Wrappercom>
    <div className='bg-white p-4 border rounded-lg w-2/5 ' >
        <HeadingCom text={"Send Money"}/>
        <div className='flex flex-row  mt-4'>
            <div className=' flex w-12 h-12 border rounded-full justify-center items-center text-white bg-slate-800'>{ name[0].toUpperCase() }</div>
            <div className=' flex text-lg font-semibold ml-4  items-center'>{name}</div>
        </div>
        <InputBox onchange={e=>{
            setAmount(e.target.value)
        }} label={"Amount {in Rs}"} type={"number"}/>
        <ButtonComp onclick={async()=>{
          axios.post("http://localhost:7000/api/v1/account/transfer",{
            to:id,
            amount
          },{
            headers:{Authorization:"Bearer "+localStorage.getItem("token")}
          })
          .then((response)=>{
            if(response.status==200)toast.success(`Mony sent to ${name}`,{duration:5000})
            navigate("/")
          })
          .catch(()=>{
            toast.error("Transaction failed try again else try after sometime")
          })
        }}   text={"Transfer Money"} className={"mt-5"}/>
        <ButtonComp text={"Back to Dashboard"} className={"mt-5"}  onclick={()=>{navigate("/")}}></ButtonComp>
    </div>

  </Wrappercom>
        
   
  )
}

export default SendMoney