import React from 'react'

const Subheading = ({
    text="Heading",
    className,
    ...props
}) => {
  return (
    <div className='flex flex-row  justify-center p-1 m-1 '>
        <h2 className={`text-lg font-medium text-gray-600 p-1 ${className}`} {...props}>{text}</h2>
    </div>
  )
}

export default Subheading