import React, { useState,useRef, useEffect } from 'react'
import HeadingCom from '../components/HeadingCom'
import InputBox from '../components/InputBox'
import Subheading from '../components/Subheading'
import ButtonComp from '../components/ButtonComp'
import Wrappercom from '../components/Wrappercom'
import BottomWarning from '../components/BottomWarning'
import {useForm} from "react-hook-form"
import axios from "axios"
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { userAuth } from '../store/UserAtom'
const Signup = () => {
 const navigate=useNavigate();
 const {register,handleSubmit,formState:{errors}}=useForm();
 const [isUserAuthenticated,setIsUserAuthenticated]=useRecoilState(userAuth);
 
 useEffect(()=>{
  if(!isUserAuthenticated){
    toast.error("Don't have account. Sign up to create account or Sign-in to the existing account")
  }
  else{
    navigate("/")
  }
 },[])
  

 const errorMessage=()=>{
  const keys=Object.keys(errors)
   keys.map(key=>{
    if(key=="password" || key=="username") toast.error(`${key} is required and should have atleast 6 character`,{duration:1000})
    else{
      toast.error(`${key} is required`,{duration:1000})
    }
   })
 }

  const Onsubmit=(data)=>{
      // console.log(data)
      const toastId=toast.loading("Siging up user",{style:{minWidth:"300px",fontSize:"20px",color:"skyblue"}})
     try {
       axios.post("http://localhost:7000/api/v1/user/signup",{...data})
       .then((response)=>{
        
         localStorage.setItem("token",response.data.token)
         toast.dismiss(toastId)
         toast.success("User created successfully",{duration:3000})
         toast.success(` Hello ${response.data.username} !!..`)
         
         setIsUserAuthenticated(true)
         navigate(`/?user=${response.data.username}`)
         .catch((error)=>{
          toast.dismiss(toastId)
         toast.error(`${error.response.data.msg}`,{duration:3000})
         })
       })
       .catch((error)=>{
        
        toast.dismiss(toastId)
        toast.error(`${error.response.data.msg}`,{duration:3000})
       })
     }catch (error) {
      
        toast.dismiss(toastId)
        toast.error("something went wrong | check your network else try again later",{duration:3000})
     }
      
     
  }


  return (
    <Wrappercom >
     
        <div className='flex flex-col p-5  bg-white rounded  justify-center align-middle content-stretch'>
            <HeadingCom text={"Sign up"}/>
            <Subheading text={"Enter your information to create an account"} className={"border-b border-zinc-800"}/>
            <div >
           
                <form onSubmit={handleSubmit(Onsubmit)}>
                <InputBox     type={"text"} label={"First Name"} placeholder={"Enter First Name"} {...register("firstName",{required:true})}/>
                <InputBox    type={"text"} label={"Last Name"} placeholder={"Enter Last Name"} {...register("lastName",{required:true})}/>
                <InputBox    type={"text"} label={"username"} placeholder={"Enter username"} {...register("username",{required:true,minLength:6})}/>
               
                <InputBox   type={"password"} label={"Password"} placeholder={"Enter Password"} {...register("password",{required:true,minLength:6})}/>
              
                <ButtonComp onclick={errorMessage} text={"Sign up"} type={"submit"}></ButtonComp>
               
                </form>

            </div>
            <div>
                <BottomWarning text={"Already have an account?"} buttonText={"Sign in"} to={"/signin"}/>
            </div>
            
        </div>
    </Wrappercom>
  )
}

export default Signup