import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useUserContext } from '../Context/UserProvider'
import { logOut } from '../firebase'

const Navbar = () => {

    const {user, setUser} = useUserContext()

    console.log(user)

  return (
    <div className='  text-white p-2  tracking-widest flex justify-around px-6  items-end'>
        <div className='font-bold text-xl uppercase'>
            <h1 className=" hover:scale-110 ease-in duration-500 p-1">
                <Link  to='/'>Titulo</Link>
            </h1>
        </div>
        <div className='flex gap-6'>
            {
                user ? 
                 <>
                    <NavLink to='/dashboard' className="hover:scale-125  ease-in p-1 duration-500">
                        Dashboard
                    </NavLink>
                    <button onClick={()=>setUser(logOut)}  className="hover:scale-125 ease-in p-1 duration-500">Cerrar sesion</button>
                </>
            :
                <>
                    <NavLink to='/login' className="hover:scale-125 ease-in p-1 duration-500">
                        Login
                    </NavLink>
                    <NavLink to='/register' className="hover:scale-125 ease-in p-1 duration-500">
                        Register
                    </NavLink>
                </>
            }
        </div>
    </div>
  )
}

export default Navbar