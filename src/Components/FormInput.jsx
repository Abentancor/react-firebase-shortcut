import React, { forwardRef } from 'react'

const FormInput = forwardRef(({type, placeholder, onBlur, onChange, name, children}, ref) => {
  return (
    <>
        <input 
            className='bg-transparent px-5 py-2 w-full m-auto col-span-2 mb-4 border-2  rounded-xl'
            type={type}
            placeholder={placeholder}
            ref={ref}
            onBlur={onBlur}
            onChange={onChange}
            name={name}
          />
        {children}
    </>
  )
})

export default FormInput