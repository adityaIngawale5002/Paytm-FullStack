import React from 'react'

const HeadingCom = ({
    text="Heading",
    className,
    ...props
}) => {
  return (
    <div className='flex flex-row p-2 justify-center '>
        <h2 className={`text-2xl font-medium ${className}`} {...props}>{text}</h2>
    </div>
  )
}

export default HeadingCom