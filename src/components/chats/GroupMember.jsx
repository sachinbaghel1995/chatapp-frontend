import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GroupMember = ({ userId, group }) => {
  const [members, setMembers] = useState([]);
  const groupId = group.id;
  console.log(groupId)
  const token = localStorage.getItem('token');

  // Inside the GroupMember component
useEffect(() => {
    const fetchGroupMembers = async () => {
      try {
        const response = await axios.get(`/api/groups/${groupId}/members`, {
          headers: { Authorization: token },
        });
        console.log(response.data); // Log the response here
  
        if (response.data && response.data.members) {
          setMembers(response.data.members);
        }
      } catch (error) {
        console.error('Error fetching group members:', error);
      }
    };
  
    fetchGroupMembers();
  }, [groupId, token]);
  

  return (
    <div>
      {members.length > 0 ? (
        <ul>
          {members.map((member) => (
            <li key={member.id}>{member.name}</li>
          ))}
        </ul>
      ) : (
        <p>No members found</p>
      )}
    </div>
  );
};

export default GroupMember;
