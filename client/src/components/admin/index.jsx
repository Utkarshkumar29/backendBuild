import React, { useContext, useEffect, useState } from "react";
import { Navigate, Link, useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/userContext";

const Admin = () => {
  const [name,setName]=useState("")
  const [email, setEmail] = useState("")
  const [phone,setPhone]=useState("")
  const [userImage,setUserImage]=useState("")
  const [password, setPassword] = useState("")
  const [redirect, setRedirect] = useState(false)
  const {token,setToken}=useContext(UserContext)
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
                    const response=await axios.put('/editUser',{name,userImage,token,id})
                    console.log(response.data)
                    setRedirect(true)
                } catch (error) {
                    console.log("Error updateing the user",error)
                }
            }else{
                const response=await axios.post('/adminUser',data)
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

    if (redirect) {
        return <Navigate to={"/adminDashboard"} />
    }

    return (
        <>
        <h1>Admin</h1>
        <form method="post" onSubmit={handleSubmit}>
            <input value={name} type="text" placeholder="Enter your name" onChange={(e)=>setName(e.target.value)}/>   
            <input value={email} type="email" placeholder="ABC@email.com" onChange={(e)=>setEmail(e.target.value)}/>
            <input value={phone} type="tel" placeholder="Enter your phone number" onChange={(e)=>setPhone(e.target.value)}/>
            <input type="file" accept="image/*" onChange={uploadPhoto}/>
            <input value={password} type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
            <button>Login</button>
            <div>Don't have an account yet?<Link to="/login">Register Here</Link></div>
        </form>
        </>
    )
}

export default Admin
