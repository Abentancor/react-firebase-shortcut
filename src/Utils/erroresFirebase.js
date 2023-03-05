export const erroresFirebase = (code) => {

        switch(code){
            case "auth/email-already-in-use":
                return 'Usuario ya registrado'
            case "auth/invalid-email":
                return "formato email no valido"

              default: return "error en el server"
          }
}