export const FormValidate = () =>{
    return {
        required:{
            value:true,
            message: "Cambio Obligatorio"
        },
        patternEmail: {
            value:
              /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/,
            message: "Formato de email incorrecto",
          },
          minLength:{
            value: 6,
            message:"Minimo 6 carácteres"
          },
          validateTrim:{
              trim: v=>{ 
                if(!v.trim()) 
                { "Espacio en Blanco, Escribe algo!"}
            return true},
          },
          validateEquals(getValues){
            return {equals: v => v === getValues("password") || 
                "las contraseñas no coinciden",}
          }

    }
}