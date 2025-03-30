"use client"

import { useEffect } from "react"


const UsersPage = ()=>{
     const createNewUser = async () => {
       try {
         const response = await fetch("/api/users", {
           method: "POST",
           headers: {
             "content-type": "application/json",
           },
           body: JSON.stringify({
             username: "johendoe",
             email: "johne@example.com",
             firstName: "John",
             lastName: "Doe",
             password: 'password',
             dateOfBirth: "2000-01-01T00:00:00.000Z",
           }),
         });
       } catch (err) {
         console.log("There was an error creating user ", err);
       }
     };
    
useEffect(()=>{
   console.log('Mounted')
})
    return (
        <div>
Users Page
        <button onClick={createNewUser} >Create Test</button>
        </div>
    )
}
export default UsersPage