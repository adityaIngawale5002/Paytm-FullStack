import React from 'react'

const ButtonComp = ({
    text="button",
    className,
    onclick,
    type,
    ...props
}) => {
  return (
    <div className='flex justify-center'>
      <button onClick={onclick} type={type} className={`bg-slate-900 rounded p-2 w-2/4  text-white text-lg  ${className}`}>{text}</button>
    </div>
   
  )
}

export default ButtonComp