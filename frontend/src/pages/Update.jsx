import React, { useState,useRef, useEffect } from 'react'
import HeadingCom from '../components/HeadingCom'
import InputBox from '../components/InputBox'
import Subheading from '../components/Subheading'
import ButtonComp from '../components/ButtonComp'
import Wrappercom from '../components/Wrappercom'
import {useForm} from "react-hook-form"
import axios from "axios"
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { userAuth } from '../store/UserAtom'
const Update = () => {
 const navigate=useNavigate();
 const {register,handleSubmit,formState:{errors}}=useForm();
 const [isUserAuthenticated,setIsUserAuthenticated]=useRecoilState(userAuth);
 
 useEffect(()=>{
  if(!isUserAuthenticated){
    toast.error("Don't have account. Sign up to create account or Sign-in to the existing account")
    navigate("/signup")
  }

 },[])
  

 const errorMessage=()=>{
  const keys=Object.keys(errors)
   keys.map(key=>{
    if(key=="password") toast.error(`${key} is required and should have atleast 6 character`,{duration:1000})
    else{
      toast.error(`${key} is required`,{duration:1000})
    }
   })
 }

const Onsubmit=(data)=>{
   
    const toastId=toast.loading("Siging up user",{style:{minWidth:"300px",fontSize:"20px",color:"skyblue"}})
    try {
      axios.put("http://localhost:7000/api/v1/user/update",{...data},{
        headers:{Authorization:"Bearer "+localStorage.getItem("token")}
      })
      .then((response)=>{
       console.log(response)
        toast.dismiss(toastId)
        toast.success("User updated successfully",{duration:3000})
        setIsUserAuthenticated(true)
        navigate(`/?user=${response.data.username}`) 
        .catch((error)=>{
         toast.dismiss(toastId)
        toast.error(`${error.response.data.msg}`,{duration:3000})
        })
      })
      .catch((error)=>{
       toast.dismiss(toastId)
       toast.error(`${error.response.msg}`,{duration:3000})
      })
    }catch (error) {
       toast.dismiss(toastId)
       toast.error("something went wrong | check your network else try again later",{duration:3000})
    }
} 


  return (
    <Wrappercom >
     
        <div className='flex flex-col p-5  bg-white rounded  justify-center align-middle content-stretch'>
            <HeadingCom text={"Update"}/>
            <Subheading text={"Enter your information to update account"} className={"border-b border-zinc-800"}/>
            <div >
           
                <form onSubmit={handleSubmit(Onsubmit)}>
                <InputBox     type={"text"} label={"First Name"} placeholder={"Enter First Name"} {...register("firstName",{required:true})}/>
                <InputBox    type={"text"} label={"Last Name"} placeholder={"Enter Last Name"} {...register("lastName",{required:true})}/>
               
                <InputBox   type={"password"} label={"Password"} placeholder={"Enter Password"} {...register("password",{required:true,minLength:6})}/>
              
                <ButtonComp onclick={errorMessage} text={"Update"} type={"submit"}></ButtonComp>

            <ButtonComp  text={"Back to Dashboard"} className={"mt-2"} onclick={()=>{navigate("/")}} ></ButtonComp>
                </form>

            </div>
           
            
        </div>
    </Wrappercom>
  )
}

export default Update