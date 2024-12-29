import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-purple-700 flex justify-between items-center px-12 py-3 h-18'>
        <div className="logo font-bold text-white text-2xl">
        <span className="text-purple-300">&lt; </span><span className='text-white'>Pass</span><span className='text-purple-300 text-2xl'>Op</span><span className="text-purple-300">/&gt; </span>
        </div>

        <button className='text-white bg-purple-900 flex ring-white ring-1 gap-2 rounded-2xl p-1 active:bg-purple-500 active:text-black'>
          <img className=' invert cursor-pointer' width={30} src="icons/git.png" alt="github logo" /><span className=' px-1 py-1 font-bold'><a href="https://github.com/1saumya/Password-Manager">Github</a></span>
        </button>
      
    </nav>
  )
}

export default Navbar