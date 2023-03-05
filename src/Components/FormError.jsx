import React from 'react'

const FormError = ({error}) => {
  return (
    <>
    {error && <p className='text-xs mb-1 rounded-xl py-1 px-3  text-center col-span-2'>{error.message} </p>}
    </>
  )
}

export default FormError 