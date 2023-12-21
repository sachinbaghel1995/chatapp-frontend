import React, { useEffect, useState } from "react";
import axios from "axios";
const AddMembers = ({  group }) => {
    const [user,setUser]=useState([])
  const token = localStorage.getItem("token");
//   console.log(userId, group);
  const groupId = group.id;
  console.log(groupId)
  console.log(user)

  const getUsers=async ()=>{
    const response=await axios.get('/api/users/getallusers')
    console.log(response.data.users)
    setUser(response.data.users)
  }
  useEffect(()=>{
    getUsers()
  },[])
  const addMemberToGroup = async (groupId, userId) => {
    try {
      const response = await axios.post(
        `/api/groups/${groupId}/addUser/${userId}`,
        {},
        { headers: { Authorization: token } }
      );

      if (response.status === 200) {
        console.log("User added to group successfully");
      }
    } catch (error) {
      console.error("Error adding user to group:", error);
    }
  };

  return <div>
    <ul>
{user && user.map((item)=>{
    return (
        <div>
    <li key={item.id}>{item.name}</li>
    <button onClick={()=>{addMemberToGroup(groupId,item.id)}}>add</button>
    </div>
    )
})}
    </ul>
  </div>;
};

export default AddMembers;
