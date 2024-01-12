import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { jwtDecode } from "jwt-decode";
import { Button, Input, LinkText, RegisterContainer, RegisterForm, RegisterWrapper } from "../../styles/register";

const Login=()=>{
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [redirect, setRedirect] = useState(false)
    const {setToken}=useContext(UserContext)

    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
            const data={email,password}
            const response=await axios.post('/login',data)
            if(response.data==="User not found")
            {
                alert('User not found')
            }
            else if(response.data==="pass not ok"){
                alert('Wrong password!')
            }
            else
            {
                setToken(response.data)
                const newtoken=response.data
                const decodedToken = jwtDecode(newtoken)
                setRedirect({role:decodedToken.role})
            }
        } catch (error) {
            console.log("Error sending the data for login",error)
        }
    }

    if(redirect){
        return redirect.role === "Admin" ? <Navigate to='/adminDashboard' /> : <Navigate to='/home' />
    }

    return(
        <RegisterContainer>
            <RegisterWrapper>
                <RegisterForm onSubmit={handleSubmit}>
                    <h1>Login Here</h1>
                    <Input placeholder="ABC@email.com" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <Input placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/> 
                    <Button>Login</Button>
                    <LinkText>
                        Don't have an account yet? 
                        <Link to="/"> Register Here</Link>
                    </LinkText>
                </RegisterForm>
            </RegisterWrapper>
        </RegisterContainer>
    )
}

export default Login
