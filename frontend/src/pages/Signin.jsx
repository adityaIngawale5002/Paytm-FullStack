import React, { useEffect, useState } from 'react'
import HeadingCom  from '../components/HeadingCom'
import Subheading from '../components/Subheading'
import Wrappercom from '../components/Wrappercom'
import InputBox from '../components/InputBox'
import BottomWarning from '../components/BottomWarning'
import ButtonComp from '../components/ButtonComp'
import axios from 'axios'
import {toast} from "react-hot-toast"
import {useForm} from "react-hook-form"
import { userAuth } from '../store/UserAtom'
import { useNavigate } from 'react-router-dom'
import { useRecoilState, } from 'recoil'

const Signin = () => {
  
const {register,handleSubmit,formState:{errors}}=useForm();
const [isUserAuthenticated,setIsUserAuthenticated]=useRecoilState(userAuth);
const navigate=useNavigate()
useEffect(()=>{
  if(isUserAuthenticated){
    navigate("/")
  }
},[])

const errorMessage=()=>{

  const keys=Object.keys(errors)
   keys.map(key=>{
     toast.error(`${key} is required and should have atleast 6 character`,{duration:1000})
   })
 }
  const onSubmitForm=async(data)=>{
     const toastId=toast.loading("Siging in user",{style:{minWidth:"300px",fontSize:"20px",color:"skyblue"}})
      try {
        axios.post("http://localhost:7000/api/v1/user/signin",{...data})
        .then((response)=>{
         
          localStorage.setItem("token",response.data.token)
          toast.dismiss(toastId)
          toast.success("User logged in successfully",{duration:2000})
          toast.success(` Hello ${response.data.username} !!..`,{duration:4000})
          setIsUserAuthenticated(true)
          navigate(`/?user=${response.data.username}`)
        })
        .catch((error)=>{
          toast.dismiss(toastId)
          toast.error(`${error.response.data.msg}`,{duration:3000})
        })
      } catch (error) {
        toast.dismiss(toastId)
        toast.error("something went wrong | check your network else try again later",{duration:3000})
      }
  }
  
  return (
    <Wrappercom >
        <div className='flex flex-col p-5  bg-white rounded  justify-center align-middle'>
            <HeadingCom text={"Sign In"}/>
            <Subheading text={"Enter your credential to access your account"} className={"border-b border-zinc-800"}/>
            <div >
                <form onSubmit={handleSubmit(onSubmitForm)}>
                  <InputBox {...register("username",{required:true,minLength:6})} type={"text"} label={"Username"} placeholder={"Enter Username"}/>
                  <InputBox {...register("password",{required:true,minLength:6})} type={"password"} label={"Password"} placeholder={"Enter Password"}/>
                  <ButtonComp onclick={errorMessage} type={"submit"} text={"Sign In"}/>
                </form>
            </div>
            <div>
                <BottomWarning  text={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"}/>
            </div>
        </div>
    </Wrappercom>
  )
}

export default Signin