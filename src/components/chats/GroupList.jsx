import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AddMembers from "./AddMembers";

const GroupList = () => {
  const [groups, setGroups] = useState([]);
  const [showMembers, setShowMembers] = useState(false);
  const showMemberHandler = () => {
    setShowMembers((prev) => !prev);
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

        setGroups(response.data);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };

    fetchGroups();
  }, []);

  return (
    <div>
      <h2>Groups</h2>
      <ul>
        {groups &&
          groups.map((group) => (
            <>
              <li key={group.id}>{group.name}</li>
              <h3 onClick={showMemberHandler}>add members</h3>
             {showMembers && <AddMembers userId={userId} group={group} />}
              {/* <button onClick={()=>{ addMemberToGroup(groupId, userId)}}>add member</button> */}
            </>
          ))}
      </ul>
      
    </div>
  );
};

export default GroupList;
