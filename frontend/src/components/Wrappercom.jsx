import React from 'react'

const Wrappercom = ({children,className}) => {
  return (
    <div className={`w-screen bg-gray-300 flex align-middle items-center justify-center h-screen ${className}`}>{children}</div>
  )
}

export default Wrappercom