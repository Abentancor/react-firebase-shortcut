import React, { useEffect, useState } from 'react'
import { useFirestore } from '../Hooks/useFirestor'

const Home = () => {

  const {data, error, loading, getData, addData, deleteData, updateData} = useFirestore()
  const [text, setText] = useState('')
  const [newOrigin, setNewOrigin] = useState()


  const handleSubmit = async(e) => {
    e.preventDefault();
    if(newOrigin){
      await updateData(newOrigin, text)
      setNewOrigin('')
      setText('')
      return
    }
    await addData(text)
    setText('')
  }

  const handleClickDelete = async nanoid => {
    await deleteData(nanoid)
    console.log('click delete')
  }
    
  const handleClickEdit = (item) => {
    console.log('click edit')
    setText(item.origin)
    setNewOrigin(item.nanoid)
  }


  useEffect(()=>{
    getData()
    console.log('getData')
   },[])

  if(loading.getData) return <p>Loading data...</p>
  if(error) return <p>{error}</p>

  return (
    <>
    <div className='mb-8 text-2xl font-bold'>Home</div>


    <form onSubmit={handleSubmit}    className=' mb-4'>
      
      <input 
        className='bg-transparent px-4 py-1 m-auto mb-4'
        placeholder='https:www.suURL.com'
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
       />
       {
        newOrigin ? (
          <button  className=' border-2  mb-4 rounded-xl hover:scale-105 w-full   ease-in py-1 px-3 duration-500'  type='submit'>Editar URL</button>
        ):(
          <button  className=' border-2  mb-4 rounded-xl hover:scale-105 w-full   ease-in py-1 px-3 duration-500'  type='submit'>Agregar URL</button>
        )
       }
    </form>
      {
        data.map(item =>(
          <div className='grid grid-cols-2 gap-3 mb-2' key={item.nanoid}>
            <p className='col-span-2'>{item.nanoid}</p>
            <p className='col-span-2'>{item.origin}</p>
            <p className='col-span-2 mb-2'>{item.uid}</p>
            <button  className=' border-2  mb-4 rounded-xl hover:scale-105 w-full   ease-in py-1 px-3 duration-500' onClick={()=>handleClickEdit(item)} >Editar URL</button>
            <button  className=' border-2  mb-4 rounded-xl hover:scale-105 w-full   ease-in py-1 px-3 duration-500' onClick={()=>handleClickDelete(item.nanoid)} >Eliminar URL</button>
          </div>
        ))
      }
      </>
  )
}

export default Home