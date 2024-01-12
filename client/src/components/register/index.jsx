import React, { useContext, useEffect, useState } from "react";
import { Navigate, Link, useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/userContext";
import { Button, FileInput, Input, LinkText, RegisterContainer, RegisterForm, RegisterWrapper } from "../../styles/register";
import { jwtDecode } from "jwt-decode";

const Register = () => {
  const [name,setName]=useState("")
  const [email, setEmail] = useState("")
  const [phone,setPhone]=useState("")
  const [userImage,setUserImage]=useState("")
  const [password, setPassword] = useState("")
  const [redirect, setRedirect] = useState(false)
  const {token,setToken}=useContext(UserContext)
  const [disable,setDisable]=useState(false)
  const {id}=useParams()

    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
            const data={
            name,
            phone,
            email,
            userImage,
            password
            }
            if(id){
                try {
                    const response=await axios.put('/editUser',{name,phone,email,userImage,password,token,id,disable})
                    console.log(response.data)
                    setRedirect(true)
                    setToken(response.data)
                } catch (error) {
                    console.log("Error updateing the user",error)
                }
            }else{
                const response=await axios.post('/register',data)
                setRedirect(true)
                setToken(response.data)
                console.log(response.data)
            }
        } catch (error) {
            console.log("Error sending the data",error)
        }
    }

    const uploadPhoto = async (e) => {
        const files = e.target.files
        const data = new FormData()
        for (let i = 0; i < files.length; i++) {
            data.append("photos", files[i])
        }
        try {
            const response = await axios.post("/upload", data, {
                headers: { "Content-Type": "multipart/form-data" },
        })
        const { data: filenames } = response
        setUserImage(filenames)
        } catch (error) {
            console.log("Error uploading photo", error)
        }
    }

    const fetchUser=async()=>{
        if(id){
            try {
                const response=await axios.get(`/getuser/${id}`)
                setName(response.data.name)
                setEmail(response.data.email)
                setPhone(response.data.phone)
                setUserImage(response.data.userImage)
            } catch (error) {
                console.log("Error getting the user",error)
            }
        }
    }

    useEffect(()=>{
        fetchUser()
    },[id])

    useEffect(()=>{
        if(token){
            const decodedToken=jwtDecode(token)
            console.log({role:decodedToken.role})
            setDisable(decodedToken.role)
        }
    },[])

    if (redirect) {
        return disable === "Admin" ? <Navigate to='/adminDashboard' /> : <Navigate to='/home' />
    }

    return (
        <RegisterContainer>
            <RegisterWrapper>
                <RegisterForm method="post" onSubmit={handleSubmit}>
                    <h1>Register Form</h1>
                    <Input value={name} type="text" placeholder="Enter your name" onChange={(e)=>setName(e.target.value)}/>   
                    <Input value={email} type="email" placeholder="ABC@email.com" onChange={(e)=>setEmail(e.target.value)} disabled={disable==='User'}/>
                    <Input value={phone} type="tel" placeholder="Enter your phone number" onChange={(e)=>setPhone(e.target.value)} disabled={disable==='User'}/>
                    <FileInput type="file" accept="image/*" onChange={uploadPhoto}/>
                    <Input value={password} type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} disabled={disable==='User'}/>
                    <Button>Register</Button>
                    <LinkText>Already have an account? <Link to="/login">Login Here</Link></LinkText>
                </RegisterForm>
            </RegisterWrapper>
        </RegisterContainer>
    )
}

export default Register
