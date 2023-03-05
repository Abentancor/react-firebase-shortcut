import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUserContext } from '../Context/UserProvider'
import { auth, login } from '../firebase'

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const {user} = useUserContext( )
  const navigate = useNavigate()

  const loginGoogle = async()=>{
    try {
        const provider = new GoogleAuthProvider()
        const {user} = await signInWithPopup(auth, provider)
        console.log(user)
    } catch (error) {
        console.log(error)
    }
}

  useEffect(()=>{
    if(user){
        navigate('/dashboard')
    }
}, [user])


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login({email, password})
      console.log('usuario logueado')
    } catch (error) {
      console.log('log',error)
    }

  }


  return (
    <div className='border-2 bg-transparent  w-1/2 m-auto p-4 rounded-lg'> 
      <h2 className='font-bold text-xl text-center border-b-2 mb-8'>Login</h2>
      <form 
        className='grid grid-cols-2 gap-2 mb-4'
        onSubmit={handleSubmit}
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
          <button className=' border-2  col-span-2 rounded-xl hover:scale-105   ease-in py-1 px-3 duration-500' type='submit'>Acceder</button>
      </form>
          <button onClick={loginGoogle} className='mb-4 border-2 rounded-xl hover:scale-105  w-full  ease-in py-1 px-3 duration-500'>Acceder con Google</button>
          <div className="text-end">
            <Link className='text-xs mb-4 rounded-xl hover:scale-105 ease-in py-1 px-3 duration-500' to='/register'>Crea tu Cuenta</Link>
          </div>
    </div>
  )
}

export default Login