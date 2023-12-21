import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AddMembers from "./AddMembers";
import GroupMember from "./GroupMember";

const GroupList = () => {
  const [groups, setGroups] = useState([]);
  const [userid, setUserid] = useState(null);
  const [adminId, setAdminId] = useState(null);
  const [isAdmin,setIsAdmin]=useState(false)
  const [showMembers, setShowMembers] = useState(false);
  const [addMembers, setAddMembers] = useState(false);
  console.log(groups[0])
  const showMemberHandler = () => {
    setShowMembers((prev) => !prev);
  };
  const addMemberHandler = () => {
    setAddMembers((prev) => !prev);
  };
  const token = localStorage.getItem("token");

  function parseJwt(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }
  const userId = parseJwt(token).id;
  console.log(userId);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get(`/api/groups/all/${userId}`, {
          headers: { Authorization: token },
        });
        console.log(response.data);
        setAdminId(response.data[0].adminId);
        
        // setIsAdmin(adminId==userId)
        setGroups(response.data);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };

    fetchGroups();
  }, []);
  const admin=(adminId==userId)
  console.log(userId,adminId)
  console.log(admin)

  return (
    <div>
      <h2>Groups</h2>
      <ul>
        {groups &&
          groups.map((group) => (
            <>
              <Link to={`/chats/${group.id}`}>
                <li key={group.id}>{group.name}</li>
              </Link>
             {admin && <h3 onClick={addMemberHandler}>add members</h3>}
              <h3 onClick={showMemberHandler}>show members</h3>
              {showMembers && <GroupMember group={group} userId={userId} />}
              {addMembers && <AddMembers userId={userId} group={group} />}
            </>
          ))}
      </ul>
    </div>
  );
};

export default GroupList;
