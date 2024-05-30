import React from 'react'
import InputBox from './InputBox'
import ButtonComp from './ButtonComp'
import { useNavigate } from 'react-router-dom'
const UserCom = ({user}) => {
  const navigate=useNavigate()
  
  return (
    <div className='flex justify-between  p-1 m-2'>
        <div  className='flex'>
            <div className='rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2'>
              <div className='flex flex-col justify-center h-full text-xl'>
                {user.firstName[0]}
              </div>
            </div>
            <div className='flex flex-col justify-center font-semibold h-full'>
              <div>
                {user.firstName}  {user.lastName}
              </div>
            </div>
        </div> 
        <div className='flex flex-col justify-center h-full mt-2 mr-2'>
          <ButtonComp onclick={(e)=>{
            navigate("/transfer?id="+user._id+"&name="+user.firstName)
          }}  text={"Send Money"} className={"p-1 text-sm w-full"}/>
        </div>
    </div>
  )
}

export default UserCom