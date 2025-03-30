import { useState } from "react"


const LoginPage = ()=>{
    const [username, setUsername] = useState()
    const [password, setPassword]= useState()
    const LoginNow = async ()=>{
        const response = await fetch('/api/auth/login', {
            method: "POST", 
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                password: password,
                username: username,
            })
          })
          const data = await response.json();
          console.log(data)

    }
    return (
      <div>
        <input
          type="text"
          name="username"
          id="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          name="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={LoginNow}>Submit</button>
      </div>
    );
}
export default LoginPage