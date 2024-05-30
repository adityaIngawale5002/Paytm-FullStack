import React from 'react'
import ButtonComp from './ButtonComp'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { userAuth } from '../store/UserAtom'
const AppBar = ({HeaderText,Logo}) => {
  const navigate=useNavigate()
  const [isUserAuthenticated,setIsUserAuthenticated]=useRecoilState(userAuth);
  return (
        <div className='flex bg-slate-300 flex-row justify-between  rounded p-4 m-2 '>
        <div className='text-xl font-medium'>{HeaderText}</div>
        <div className='flex flex-row mr-5'>
            <div className='text-lg font-bold mr-5'>Hello:</div>
            <div className='text-lg font-bold text-green-500'>{Logo}</div>
        </div>
        <div className='flex  justify-between'>
        <ButtonComp text={"update"} className={"w-full"} onclick={()=>{
          navigate("/update")
          }}></ButtonComp>
        <ButtonComp text={"logout"} className={"w-full ml-2"} onclick={()=>{
          setIsUserAuthenticated(false)
          navigate("/signup")
          }}></ButtonComp>
        </div>
       
    </div>
   
    
  )
}

export default AppBar