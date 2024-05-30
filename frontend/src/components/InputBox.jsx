import React,{useId} from 'react'

const InputBox = ({
    type,
    label,
    placeholder,
    className,
    onchange,
    ...props
},ref) => {
    const id=useId();
  return (
    <div className='flex flex-col p-2  '>
        {label && <label htmlFor={id} className=' text-md p-1 text-black font-medium'>{label}:</label>}


        <input onChange={onchange} type={type} className={`outline-none border-2 rounded p-1 ml-2 mr-2 text-gray-600 ${className}`} {...props} htmlFor={id} placeholder={placeholder} ref={ref}/>
    </div>
  )
}

export default React.forwardRef(InputBox)