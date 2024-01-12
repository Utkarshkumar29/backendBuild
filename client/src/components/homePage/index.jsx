import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit,faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { RegisterContainer, RegisterWrapper } from "../../styles/register";
import { ActionIcons, UserDetail, UserImage, UserInfo, UserName } from "../../styles/homePage";

const HomePage = () => {
    const { user } = useContext(UserContext)
    const [deleted,setDeleted]=useState(false)

    const handleDelete=async()=>{
        try {
            const response=await axios.delete(`/deleteUser/${user.id}`)
            console.log(response.data)
            setDeleted(true)
        } catch (error) {
            console.log("Error deleting the user",error)
        }
    }

    useEffect(()=>{
        console.log(user)
    },[])

    if (!user) {
        return <div>Loading...</div>
    }

    if(deleted){
        return <Navigate to="/"/>
    }

    return (
        <RegisterContainer>
            <RegisterWrapper>
            <UserInfo>
                <UserName>{user.name}</UserName>
                <UserImage src={`http://localhost:4000/${user.userImage[0]}`} alt="error"/>
                <UserDetail>Phone: {user.phone}</UserDetail>
                <UserDetail>Email: {user.email}</UserDetail>
                <UserDetail>User Id: {user.id}</UserDetail>
                <UserDetail>Role: {user.role}</UserDetail>
                <ActionIcons>
                    <Link to={`/updateUser/${user.id}`}>
                        <FontAwesomeIcon icon={faEdit} />
                    </Link>
                    <FontAwesomeIcon icon={faTrash} onClick={handleDelete} style={{color:"red"}}/>
                </ActionIcons>
            </UserInfo>
            </RegisterWrapper>
        </RegisterContainer>
    )
}

export default HomePage
