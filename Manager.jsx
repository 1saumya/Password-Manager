import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
  const ref = useRef();
  const [form, setform] = useState({site:"", username:"", password:""});

  const [passwordArray, setpasswordArray] = useState([])

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    let passwordArray;

    if(passwords) {
      setpasswordArray(JSON.parse(passwords))
    }
  }, [])

  const savePassword = () => {
    if(form.site.length > 3 && form.username.length > 1 && form.password.length > 1) {

      setpasswordArray([...passwordArray, {...form, id:uuidv4()}])
      localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id:uuidv4()}]))
      console.log([...passwordArray, form]);
      setform({site:"", username:"", password:""})
      toast('🦄 Password Saved successfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  const deletePassword = (id) => {
    console.log("Deleting password with id", id)
    const c = confirm("Do you want to delete this password?")
    if(c) {
      setpasswordArray(passwordArray.filter(item=>item.id !== id))
      localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id !== id)))
    }
    toast('🦄 Password Deleted successfully!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
  }

  const editPassword = (id) => {
    console.log("Editing password with id", id)
    setform(passwordArray.filter(i=>i.id===id)[0])
    setpasswordArray(passwordArray.filter(item=>item.id !== id))
  }
  const copyText = (text) => {
    toast('🦄 Copied to clipboard!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
    navigator.clipboard.writeText(text)
  }
  const showPassword = () => {
    console.log(ref.current.src);
    const pass = document.getElementById("pass")
    if(ref.current.src.includes("icons/eyecross.png")) {
      ref.current.src = "icons/eye.png";
      pass.type = "password"
    }
    else {
      ref.current.src = "icons/eyecross.png";
      pass.type = "text"
    }
    
  }

  const handleChange = (e) => {
    setform({...form, [e.target.name]: e.target.value})
  }
  return (
    <>
    <ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
    />
{/* Same as */}
<ToastContainer />
      <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
      <div className="p-4 container mx-auto max-w-5xl min-h-[82.2vh]">
        <div className="logo font-bold text-slate-800 text-3xl text-center ">
          <span className="text-2xl text-purple-600 font-bold">&lt; </span><span className="">Pass</span>
          <span className="text-purple-600 text-3xl">Op</span>
          <span className="text-2xl text-purple-600 font-bold"> /&gt; </span>
        </div>
        <p className="text-center text-purple-600">
          Manage your password here!!
        </p>
        <div className="text-white flex flex-col p-5 gap-5 items-center">
          <input value={form.site} onChange={handleChange} placeholder="Enter website URL"
            className="rounded-full border-2 border-purple-600 px-4 py-1 text-black w-full"
            type="text"
            name="site"
            id=""
          />
          <div className="flex flex-col md:flex-row w-full justify-between gap-5">
            <input value={form.username} onChange={handleChange} placeholder="Enter Username"
              className="rounded-full text-black w-full border-2 border-purple-600 px-5 py-1"
              type="text" name="username"
            />
            <div className="relative">
              <input value={form.password} onChange={handleChange} placeholder="Enter Password"
                className="rounded-full text-black w-full border-2 border-purple-600 px-4 py-1 "
                type="password" name="password" id="pass"
                />
                <span className="absolute text-black right-1 top-2 cursor-pointer" onClick={showPassword}>
                  <img ref={ref} width={20} src="icons/eye.png" alt="eye" />
                </span>
              </div>
          </div>
          <button onClick={savePassword} className="flex justify-center items-center gap-2 text-black bg-purple-400 rounded-full px-5 border border-purple-800 py-1 w-fit hover:bg-purple-300">
          <lord-icon
            src="https://cdn.lordicon.com/jgnvfzqg.json"
            trigger="hover"
          ></lord-icon>
            Save</button>
        </div>
        <div className="passwords">
          <h2 className="text-purple-900 font-bold m-2 text-2xl">Your Passwords :- </h2>
          {passwordArray.length === 0 && <div className="">No passwords to show</div>}
          {passwordArray.length !== 0 && <table class="table-auto w-full rounded-md overflow:hidden mb-10">
            <thead className="bg-purple-900 text-white">
              <tr>
                <th className="text-center min-w-34 py-2 px-3">Site</th>
                <th className="text-center min-w-34 py-2 px-3">Username</th>
                <th className="text-center min-w-34 py-2 px-3">Passwords</th>
                <th className="text-center min-w-34 py-2 px-3">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-purple-100">
              {passwordArray.map((item, index) => {
                return <tr key = {index}>
                <td className="text-center py-1 border border-white flex items-center justify-center"><a href={item.site} target="_blank">{item.site}</a>
                <span className="cursor-pointer hover:bg-purple-200" onClick={() => {copyText(item.site)}}>
                <lord-icon 
                    style={{"width":"20px", "height":"20px", "paddingTop":"4px", "paddingLeft":"5px"}}
                    src="https://cdn.lordicon.com/iykgtsbt.json"
                    trigger="hover">
                </lord-icon>
                </span>
                </td>
                <td className="text-center py-1 border border-white min-w-34">{item.username}<span className="cursor-pointer hover:bg-purple-200" onClick={() => {copyText(item.username)}}>
                <lord-icon 
                    style={{"width":"20px", "height":"20px", "paddingTop":"4px", "paddingLeft":"5px"}}
                    src="https://cdn.lordicon.com/iykgtsbt.json"
                    trigger="hover">
                </lord-icon>
                </span>
                </td>
                <td className="text-center py-1 border border-white min-w-34">{item.password}
                <span className="cursor-pointer hover:bg-purple-200" onClick={() => {copyText(item.password)}}>
                <lord-icon 
                    style={{"width":"20px", "height":"20px", "paddingTop":"4px", "paddingLeft":"5px"}}
                    src="https://cdn.lordicon.com/iykgtsbt.json"
                    trigger="hover">
                </lord-icon>
                </span>
                </td>
                <td className="text-center py-1 border border-white">
                  <span className="cursor-pointer mx-1" onClick={() => {editPassword(item.id)}}>
                  <lord-icon 
                    style={{"width":"22px", "height":"22px", "paddingTop":"4px", "paddingLeft":"5px"}}
                    src="https://cdn.lordicon.com/gwlusjdu.json"
                    trigger="hover">
                </lord-icon>
                  </span>
                  <span className="cursor-pointer mx-2" onClick={() => {deletePassword(item.id)}}>
                  <lord-icon 
                    style={{"width":"22px", "height":"22px", "paddingTop":"4px", "paddingLeft":"5px"}}
                    src="https://cdn.lordicon.com/skkahier.json"
                    trigger="hover">
                </lord-icon>
                  </span>
                </td>
              </tr>
              })}
            </tbody>
          </table>}
        </div>
      </div>
    </>
  );
};

export default Manager;
