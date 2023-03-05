import React, { forwardRef } from 'react'

const FormInput = forwardRef(({type, placeholder, onBlur, onChange, name}, ref) => {
  return (
    <>
        <input 
            className='bg-transparent px-4 py-1 w-11/12 m-auto col-span-2'
            type={type}
            placeholder={placeholder}
            ref={ref}
            onBlur={onBlur}
            onChange={onChange}
            name={name}
          />
    </>
  )
})

export default FormInput