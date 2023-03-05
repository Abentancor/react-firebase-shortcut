import { useEffect } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useUserContext } from '../Context/UserProvider'


const LayoutPrivate = () => {


  const {user} = useUserContext()

 const navigate = useNavigate()
  useEffect(()=>{
    if(!user){
      navigate('/')
    }
  }, [user])


  return (
    <>
      {
        user ? <Outlet/> : <Navigate to='/'/> 
      }
    </>
  )
}

export default LayoutPrivate