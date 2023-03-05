
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from "../firebase"


const LoginGoogle = () => {

    const loginGoogle = async()=>{
        try {
            const provider = new GoogleAuthProvider()
            const {user} = await signInWithPopup(auth, provider)
            console.log(user)
        } catch (error) {
            
        }
    }


  return (
    <>
     <button onClick={()=>setUser(logOut)}  className="hover:scale-125 ease-in p-1 duration-500"></button>

    </>
  )
}

export default LoginGoogle