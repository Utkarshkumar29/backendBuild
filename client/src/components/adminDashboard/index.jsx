import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, RegisterContainer, RegisterWrapper } from "../../styles/register";
import { UserCard } from "../../styles/adminDashboard";
import { UserImage } from "../../styles/homePage";

const AdminDasboard=()=>{
    const [allUsers,setAllUsers]=useState([])

    const fetchAllUser=async()=>{
        try {
            const response=await axios.get('/allUsers')
            console.log(response.data)
            setAllUsers(response.data)
        } catch (error) {
            console.log("Error getting the User",error)
        }
    }

    const handleDelete=async(id)=>{
        try {
            const response=await axios.delete(`/deleteUser/${id}`)
            console.log(response.data)
        } catch (error) {
            console.log("Error deleting the user",error)
        }
    }

    useEffect(()=>{
        fetchAllUser()
    },[])

    return(
        <RegisterContainer>
            <RegisterWrapper>
                <h1>Admin dashboard</h1>
                <UserCard>
                    {allUsers.map((item,index)=>{
                        return(
                            <div key={index}>
                                <UserImage src={`http://localhost:4000/${item.userImage[0]}`} alt="error"/>
                                <p>{item.name}</p>
                                <p>{item.email}</p>
                                <p>{item.role}</p>
                                <Link to={`/updateUser/${item._id}`}>
                                    <FontAwesomeIcon icon={faEdit} />
                                </Link>
                                <FontAwesomeIcon icon={faTrash} onClick={()=>handleDelete(item._id)} style={{color:"red"}}/>
                            </div>
                        )
                    })}
                </UserCard>
                <Button>
                    <Link to='/admin' style={{textDecoration:"none",color:"white"}}>
                        ADD New Admin <FontAwesomeIcon icon={faPlus}/>
                    </Link>
                </Button>
            </RegisterWrapper>
        </RegisterContainer>
    )
}

export default AdminDasboard