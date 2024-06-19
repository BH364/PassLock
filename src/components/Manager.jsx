import React, { useEffect } from 'react'
import { useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const ref = useRef()
  const passwordRef = useRef()
  const [form, setform] = useState({ site: "", username: "", password: "" })
  const [passwordArray, setpasswordArray] = useState([])
  const getPasswords = async()=>{
    let req=await fetch("http://localhost:3000/")
    let passwords=await req.json()
    setpasswordArray(passwords)
  }
  useEffect(() => {
    getPasswords()

  },[])
  const showPassword = () => {
    passwordRef.current.type = "text"
    if (ref.current.src.includes("icons/hidden.png")) {
      ref.current.src = "icons/view.png"
      passwordRef.current.type = "text"

    }
    else {
      ref.current.src = "icons/hidden.png"
      passwordRef.current.type = "password"

    }
  }
  const savePassword = async() => {
    if(form.site.length>3 && form.username.length > 3 && form.password.length > 3){
      await fetch("http://localhost:3000/",{method:"DELETE",headers:{"Content-Type":"application/json"},
  body:JSON.stringify({id:form.id})})
      setpasswordArray([...passwordArray, {...form,id:uuidv4()}])
    await fetch("http://localhost:3000/",{method:"POST",headers:{"Content-Type":"application/json"},
  body:JSON.stringify({...form,id:uuidv4()})})
    // localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form,id:uuidv4()}]))
    setform({site:"",username:"",password:""})
    toast.success('Password saved!', {
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
  else{
    toast.error('Password not saved!');
  }
}
  const deletePassword =async (id) => {
   let c=confirm("Do you really want to delete your password?")
   if(c){
    setpasswordArray(passwordArray.filter(item=>item.id!==id))
    await fetch("http://localhost:3000/",{method:"DELETE",headers:{"Content-Type":"application/json"},
  body:JSON.stringify({id})})
    // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id)))
    toast.success('Password Deleted!', {
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
    
  }
  const editPassword = (id) => {
    setform({...passwordArray.filter(i=>i.id===id)[0],id:id})
   setpasswordArray(passwordArray.filter(item=>item.id!==id))
   
  // localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]))
}
  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }
  const copyText = (text) => {
    toast.success('Copied', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text)
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
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div></div>
      <div className="p-3 md:mycontainer min-h-[88.2vh]">
        <h1 className='logo font-bold text-center text-4xl'>PassLock&#128274;</h1>
        <p className='text-green-700 text-center text-lg'>Where Security Meets Simplicity</p>
        <div className='flex flex-col p-3 text-black gap-8 items-center'>
          <input type="text" value={form.site} onChange={handleChange} placeholder='Enter website URL' className='rounded-full border border-green-500 w-full p-4 py-1' name='site' id="site" />
          <div className='flex flex-col md:flex-row md:gap-2 w-full gap-8  justify-between'>
            <input type="text" value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-green-500 w-full p-4 py-1' name='username' id="username" />
            <div className="relative">
              <input type="password" ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-green-500 w-full p-4 py-1' name='password' id="password" />

              <span className='absolute right-0 top-[4px] cursor-pointer' onClick={showPassword}><img ref={ref} width={30} className='p-1' src="icons/hidden.png" /></span>
            </div> </div>
          <button onClick={savePassword} className='flex gap-2 border border-s-green-600 justify-center items-center bg-green-500 rounded-full px-2 py-2 w-fit hover:bg-green-400 text-white'><lord-icon src="https://cdn.lordicon.com/jgnvfzqg.json" trigger="hover">
          </lord-icon>
            Save Password</button>
        </div>
        <div className="passwords">
          <h2 className='font-bold text-xl py-4'>Your Passwords</h2>
          {passwordArray.length === 0 && <div>No passwords to show</div>}
          {passwordArray.length != 0 &&
            <table className="table-auto w-full rounded-md overflow-hidden" >
              <thead className='bg-green-800'>
                <tr>
                  <th className='py-2'>Site</th>
                  <th className='py-2'>Username</th>
                  <th className='py-2'>Password</th>
                  <th className='py-2'>Action</th>
                </tr>
              </thead>
              <tbody className='bg-green-100'>
                {passwordArray.map((item, index) => {
                  return <tr key={index}>

                    <td className='py-2 border border-white text-center' >
                      <div className='lorniconcopy items-center justify-center flex'><a href={item.site} target='_blank'>{item.site}</a>
                        <div className='size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>
                          <lord-icon style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover" >
                          </lord-icon>
                        </div>
                      </div></td>
                    <td className='py-2 border border-white text-center'>
                      <div className='lorniconcopy items-center justify-center flex'>
                        <span>{item.username}</span>
                        <div className='size-7 cursor-pointer' onClick={() => { copyText(item.username) }}>
                          <lord-icon style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover" >
                          </lord-icon>
                        </div>
                      </div></td>
                    <td className='py-2 border border-white text-center'>
                      <div className='lorniconcopy items-center justify-center flex'>
                        <span>{"*".repeat(item.password.length)}</span>
                        <div className='size-7 cursor-pointer' onClick={() => { copyText(item.password) }}>
                          <lord-icon style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover" >
                          </lord-icon>
                        </div></div></td>
                    <td className='py-2 border border-white text-center'>
                      <div className='lorniconcopy items-center justify-center flex'>
                        <span className='mx-1' onClick={()=>{editPassword(item.id)}}>  <lord-icon
                          src="https://cdn.lordicon.com/gwlusjdu.json"
                          trigger="hover"
                          style={{ "width": "25px", "height": "25px" }}>
                        </lord-icon></span>
                         <span className='mx-1' onClick={()=>{deletePassword(item.id)}}>  <lord-icon
                          src="https://cdn.lordicon.com/skkahier.json"
                          trigger="hover"
                          style={{ "width": "25px", "height": "25px" }}>
                        </lord-icon></span>
                      </div></td>
                  </tr>
                })}
              </tbody>
            </table>}
        </div>
      </div>
    </>
  )
}

export default Manager
