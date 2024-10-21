import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  function getCookie(name) {
    const value = `; `;
    const parts = document.cookie.split(value);
    for (let i = 0; i < parts.length; i++) {
        const part = parts[i].split('=');
        if (part.length === 2 && name === part[0]) {
            return part[1];
        }
    }
    return '';
  }
  useEffect(() => {
    axios.get('http://localhost/api/users',{
      headers: {
        'Authorization':'Bearer '+ getCookie('token')
      },
    })
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error.response.data.error);
      });
  }, []);
  const isAdmin = (user) => {
    return user.roles.some(role => role.id === 2);
  };
  const handleCheckboxChange = (userId, checked) => {
    if (checked) {
      // Gửi request 1 khi checkbox được check
      axios.post(`http://localhost/api/grant/${userId}`,{},{
        headers: {
          'Authorization':'Bearer '+ getCookie('token')
        },
      })
        .then(response => {
          console.log('Admin role granted:', response.data.message);
        })
        .catch(error => {
          console.error('Error granting admin role:', error.response.data.error);
        });
    } else {
      // Gửi request 2 khi checkbox được uncheck
      axios.post(`http://localhost/api/revoke/${userId}`,{},{
        headers: {
          'Authorization':'Bearer '+ getCookie('token')
        },
      })
        .then(response => {
          console.log('Admin role revoked:', response.data.message);
        })
        .catch(error => {
          console.error('Error revoking admin role:', error);
        });
    }
  };
  return (
    <div className="container form-container">
      <h2>Danh sách người dùng</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Mã người dùng</th>
            <th>Tên người dùng</th>
            <th>Họ tên</th>
            <th>Ảnh</th>
            <th>Email</th>
            <th>Quyền Admin</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr>
              <td>{user.id} </td>
              <td>{user.username}</td>
              <td>{user.fullname}</td>
              <td><img src={user.image} height={30} width={30} /></td>
              <td>{user.email}</td>
              <td>
                <label class="switch">
                  <input type="checkbox" defaultChecked={isAdmin(user)} onChange={(e) => handleCheckboxChange(user.id, e.target.checked)}></input>
                  <span class="slider round"></span>
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;