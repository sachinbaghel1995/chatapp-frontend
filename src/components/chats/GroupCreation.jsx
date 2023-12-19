import React, { useState } from 'react';
import axios from 'axios';

const GroupCreation = () => {
  const [groupName, setGroupName] = useState('');
  const token = localStorage.getItem('token');

  const createGroup = async () => {
    try {
      const response = await axios.post(
        '/api/groups/creategroup',
        { name: groupName },
        { headers: { Authorization: token } }
      );

      if (response.status === 201) {
        // Group created successfully, perform necessary actions
        console.log('Group created!');
        // Optionally, you might want to update the group list after creation
      }
    } catch (error) {
      console.error('Error creating group:', error);
    }
  };

  return (
    <div>
      <h2>Create a Group</h2>
      <input
        type="text"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        placeholder="Enter group name"
      />
      <button onClick={createGroup}>Create</button>
    </div>
  );
};

export default GroupCreation;
