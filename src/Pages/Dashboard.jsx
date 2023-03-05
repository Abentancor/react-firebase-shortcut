import React, { useState } from 'react'
import { useUserContext } from '../Context/UserProvider'

const Dashboard = () => {


    const {user} = useUserContext()

    return (
        <div>
          <h3>Hola</h3>
          <p>{user.email}</p>
        </div>
      )
}

export default Dashboard