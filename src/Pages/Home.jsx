import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import FormError from '../Components/FormError'
import FormInput from '../Components/FormInput'
import { useFirestore } from '../Hooks/useFirestor'
import { erroresFirebase } from '../Utils/erroresFirebase'
import { FormValidate } from '../Utils/FormValidate'


const Home = () => {
  
  const {register, handleSubmit, formState:{errors}, setError, resetField, setValue} = useForm()
  const { required,patternURL, minLength, validateTrim}=FormValidate()
  const {data, error, loading, getData, addData, deleteData, updateData} = useFirestore()
  const [newOrigin, setNewOrigin] = useState()

  const [copy, setCopy] = useState({})
 
  const onSubmit = async ({ url }) => {
    try {
      if (newOrigin) {
        await updateData(newOrigin, url);
      } else {
        await addData(url);
      }
      setNewOrigin("");
    } catch (error) {
      const { code, message } = erroresFirebase(error.code);
      setError(code, { message });
    }finally{
      resetField("url");
    }
  };


  const handleClickDelete = async nanoid => {
    await deleteData(nanoid)
    console.log('click delete')
  }
    
  const handleClickEdit = (item) => {
    console.log('click edit')

    setValue(item.origin)
    setNewOrigin(item.nanoid)
  }

  const handleClickCopy = async(nanoid)=>{
    await navigator.clipboard.writeText(window.location.href + nanoid)
    console.log('copiado')
    setCopy(prev => ({[nanoid]: true}))
  }

  useEffect(()=>{
    getData()
    console.log('getData')
   },[])

  if(loading.getData) return <p>Loading data...</p>
  if(error) return <p>{error}</p>

  const pathURL = window.location.href

  return (
    <>
    <div className='mb-8 text-2xl font-bold'>Home</div>


    <form onSubmit={handleSubmit(onSubmit)} className='grid mb-4'>
    <label className='mb-4 text-2xl w-full text-center col-span-2'>url</label>
    <FormInput
          label="Ingresa URL"
          placeholder="https://tuWebPorEjemplo.com"
          {...register("url", {
            required,
            pattern: patternURL,
          })}
          error={errors.url}
        >
          <FormError error={errors.url} />
        </FormInput>
        <FormError error={errors.url}/> 

       {
        newOrigin ? (
          <button  className='col-span-2 border-2  mb-4 rounded-xl hover:scale-105 w-full   ease-in py-1 px-3 duration-500'  type='submit'>Editar URL</button>
        ):(
          <button  className='col-span-2 border-2  mb-4 rounded-xl hover:scale-105 w-full   ease-in py-1 px-3 duration-500'  type='submit'>Agregar URL</button>
        )
       }
    </form>
      {
        data.map(item =>(
          <div className='grid grid-cols-3 gap-3 mb-8' key={item.nanoid}>
            <p className='col-span-3 text-2xl font-bold'>{pathURL}{item.nanoid}</p>
            <p className='col-span-3'>{item.origin}</p>
            <button  className=' border-2  mb-4 rounded-xl hover:scale-105 w-full hover:backdrop-brightness-75   ease-in py-1 px-3 duration-500' onClick={()=>handleClickDelete(item.nanoid)} >Eliminar URL</button>
            <button  className=' border-2  mb-4 rounded-xl hover:scale-105 w-full hover:backdrop-brightness-75  ease-in py-1 px-3 duration-500' onClick={()=>handleClickEdit(item)} >Editar URL</button>
            <button  className=' border-2  mb-4 rounded-xl hover:scale-105 w-full hover:backdrop-brightness-75   ease-in py-1 px-3 duration-500' onClick={()=>handleClickCopy(item.nanoid)} >{copy[item.nanoid] ? "Copiado" : "Copiar URL"}</button> 
          </div>
        ))
      }
      </>
  )
}

export default Home