import React from 'react'

const Footer = () => {
  return (
    <>
    <div className='flex bg-purple-800 text-white w-full flex-col items-center justify-center bottom-0'>
        <div className="logo font-bold text-white text-2xl">
            <span className="text-purple-400">&lt; </span><span className='text-white'>Pass</span><span className='text-purple-300 text-2xl'>Op</span><span className="text-purple-400">/&gt; </span>
            </div>
        <div className='flex justify-center items-center p-1 gap-2'>
        Created with<span><img className='invert py-1' width={17} src="icons/heart.png" alt="" /></span><span> by SomttuDesu</span>
        </div>
    </div>
    </>
  )
}

export default Footer
