import React from 'react'
import { Link } from 'react-router-dom'
const BottomWarning = ({text,buttonText,className,to,...props}) => {
  return (
    <div className='flex flex-row  justify-center p-1 m-1 '>
        <h2 className={`text-lg font-medium text-gray-600 p-1 ${className}`} {...props}>{text}</h2>
        <Link to={to}><button className=' text-lg font-medium text-blue-800 p-1'>{buttonText}</button></Link>
    </div>
  )
}

export default BottomWarning