import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useUserContext } from '../Context/UserProvider'
import { erroresFirebase } from '../Utils/erroresFirebase'
import { auth, login } from '../firebase'
import { FormValidate } from '../Utils/FormValidate'
import FormInput from '../Components/FormInput'
import FormError from '../Components/FormError'

const Login = () => {

  const {user} = useUserContext()
  const navigate = useNavigate()
  const {register, handleSubmit, formState:{errors}, setError} = useForm()
  const { required, patternEmail, minLength,validateTrim}=FormValidate()


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



const onSubmit = async(email, password) => {
  try {
    await login(email, password)
  } catch (error) {
    setError("firebase",{
      message:erroresFirebase(error.code)
    })
  }
}



  return (
    <div className='border-2 bg-transparent  w-1/2 m-auto p-4 rounded-lg'> 
      <h2 className='font-bold text-xl text-center border-b-2 mb-8'>Login</h2>
      <form 
        className='grid grid-cols-2 gap-2 mb-4'
        onSubmit={handleSubmit(onSubmit)}
        >
      <FormError error={errors.firebase}/>
          <label >Correo electronico</label>
          <FormInput
            type="email"
            placeholder='email'
            {...register("email", {
              required: required,
              pattern: patternEmail,
            })}>           
          </FormInput>
          <FormError error={errors.email}/> 
          <label >Password</label>
          <FormInput
            type="password"
            placeholder='password'
            {...register("password", 
              {minLength,
              validate: validateTrim,
              required
            })}
          />
            <FormError error={errors.password}/> 
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