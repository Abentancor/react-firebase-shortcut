import React, { useEffect, useState } from 'react'
import { set, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import FormError from '../Components/FormError'
import FormInput from '../Components/FormInput'
import { useUserContext } from '../Context/UserProvider'
import { registerUser } from '../firebase'
import { erroresFirebase } from '../Utils/erroresFirebase'
import { FormValidate } from '../Utils/FormValidate'

const Register = () => {


  const {user} = useUserContext()

  const {register, handleSubmit, formState:{errors}, getValues, setError} = useForm()

  const { required, patternEmail, minLength,validateTrim, validateEquals}=FormValidate()

  const onSubmit = async(email, password) => {
    try {
      await registerUser(email, password)
    } catch (error) {
      setError("firebase",{
        message:erroresFirebase(error.code)
      })
    }
  }

  useEffect(()=>{
    if(user){
        navigate('/dashboard')
    }
}, [user])


  


  return (
    <div className='border-2 bg-transparent  w-1/2 m-auto p-4 rounded-lg'> 
      <h2 className='font-bold text-xl text-center border-b-2 mb-8 '>Register</h2>
      <form 
        className='grid grid-cols-2 gap-2'
        onSubmit={handleSubmit(onSubmit)}
        >
        <FormError error={errors.firebase}/>
          <label className='col-span-2'>Correo electronico</label>
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

          <label className='col-span-2' >Reingrese su Password</label>
          <FormInput
            type="password"
            placeholder='vuelva a escribir su password'
            {...register("repassword", 
              {required,
               validate:validateEquals(validateEquals)
          })}/>
          <FormError error={errors.repassword}/>

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