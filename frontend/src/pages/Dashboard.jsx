import React, { useEffect, useState } from 'react'
import AppBar from '../components/AppBar'
import BalanceCom from '../components/BalanceCom'
import UserCom from '../components/UserCom'
import Wrappercom from '../components/Wrappercom'
import InputBox from '../components/InputBox'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userAuth } from '../store/UserAtom'
import toast from 'react-hot-toast'
import { useSearchParams } from 'react-router-dom'

const Dashboard = () => {
  const [nameParams]=useSearchParams()
  const name=nameParams.get("user")
  const navigate=useNavigate()
  const [isUserAuthenticated,setIsUserAuthenticated]=useRecoilState(userAuth);
 
  const [users,setUsers]=useState([{
    username:"aditya",
    firstName:"aditya",
    lastName:"inweale",
    password:"1234"
  }])
  const [filter,setfilter]=useState(null)
  

  

  useEffect(()=>{
    
    if(!isUserAuthenticated){
      navigate("/signup")
    }
    else{
      setIsUserAuthenticated(true)
      toast.success("You are already logged-in ")
    }
   
    axios.get("http://localhost:7000/api/v1/user/bulk?filter="+filter,{
      headers:{Authorization:"Bearer "+localStorage.getItem("token")}
    })
    .then((response)=>{
      setUsers(response.data.user)
    })
    
  },[filter])

  return (
    <><Wrappercom>
      <div className='bg-gray-400 w-full h-screen'>
        <AppBar HeaderText={"PayTM App"}  Logo={name} />
        <BalanceCom/>
        <div className='text-xl font-medium  mr-2 ml-2 pl-2'>Users:  {name}</div>
        <InputBox onchange={e=>{setfilter(e.target.value)}} placeholder={"Search User here"}/>
        
        {
          users.map(user=>(<UserCom user={user} key={user.username}/>))
        }
      </div>
      </Wrappercom>
    </>
  )
}

export default Dashboard