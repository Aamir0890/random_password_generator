import { useCallback, useEffect, useRef, useState } from "react"
import copy from 'clipboard-copy'


function App() {
   const [length,setLength]=useState(8)
   const [number,setNumber]=useState(false)
   const [char,setChar]=useState(false)
   const [password,setPassword]=useState('')
   const input=useRef(null);
   const copyHandle=()=>{
    if(input.current){
      copy(input.current.value);
      alert("copied to clipboard")
    }
   }

   /*
   or we can directly use 
   const copyHandle=useCallback(()=>{
       window.navigator.clipboard.writeText(password)
   },[password])
   */
   const passwordGenerator=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(number) str+='0123456789'

    if(char) str+='~!@#$%^&*()_[];<>?/'
    
    for(let i=1;i<=length;i++){
      const ind=Math.floor(Math.random() * str.length +1)
      pass+=str.charAt(ind)
    }
      setPassword(pass)
   },[length,number,char])
        
   useEffect(()=>{
     passwordGenerator();
   },[length,number,char])




  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800'>
      <h1 className="text-white text-center">Password generator</h1>
     <div className="flex shadow rounded-lg overflow-hidden mb-4 my-3">
      <input
      type="text"
      ref={input}
      value={password}
      className=" w-full py-1 px-3 "
      placeholder="password"
      readOnly
      />
      <button className="bg-blue-500 hover:bg-blue-700 px-3 text-white" onClick={copyHandle}>Copy</button>
     </div>
       <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
          type="range"
          min={6}
          max={50}
          value={length}
          className="cusrsor-pointer"
          onChange={(e)=>{setLength(e.target.value)}}
          />
        </div>
        <label>Length : {length}</label>
        <div className="flex items-center gap-x-1">
        <input
        type="checkbox"
        defaultValue={char}
        onChange={()=>{
        setChar((char)=>!char)
        }}
        />
        <h1>Char</h1>
        </div>
        <div className="flex items-center gap-x-1">
        <input
        type="checkbox"
        defaultValue={number}
        onChange={()=>{
          setNumber((number)=>!number)
        }}
        />
        <h1>Symbol</h1>
        </div>
       </div>
    </div>
    </>
  )
}

export default App
