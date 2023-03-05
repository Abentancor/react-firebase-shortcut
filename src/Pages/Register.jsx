import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useUserContext } from '../Context/UserProvider'
import { register } from '../firebase'

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const {user} = useUserContext()

  useEffect(()=>{
    if(user){
        navigate('/dashboard')
    }
}, [user])
  
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await register({ email, password });
      console.log("Successfully registered user!");
    } catch (error) {
      console.log("Error registering user:", error);
    }
  };
  return (
    <div className='border-2 bg-transparent  w-1/2 m-auto p-4 rounded-lg'> 
      <h2 className='font-bold text-xl text-center border-b-2 mb-8 '>Register</h2>
      <form 
        className='grid grid-cols-2 gap-2'
        onSubmit={onSubmit}
        >
          <label >Correo electronico</label>
          <input 
            className='bg-transparent px-4 py-1 w-11/12 m-auto col-span-2'
            type="email"
            placeholder='email'
            value={email}
            onChange={e=>setEmail(e.target.value)}
          />
          <label >Password</label>
          <input 
            className='bg-transparent px-4 py-1 w-11/12 m-auto col-span-2 mb-4'
            type="password"
            placeholder='password'
            value={password}
            onChange={e=>setPassword(e.target.value)}
          />
          <button className=' border-2  mb-4 rounded-xl hover:scale-105 w-full col-span-2  ease-in py-1 px-3 duration-500' type="submit">Register</button>
      </form>
          <button className=' mb-4 border-2  rounded-xl hover:scale-105  w-full  ease-in py-1 px-3 duration-500'>Acceder con Google</button>
          <div className="text-end">
            <Link className='text-xs mb-4 rounded-xl hover:scale-105 ease-in py-1 px-3 duration-500' to='/login'>Ya tienes usuario</Link>
          </div>
    </div>
  )
}

export default Register