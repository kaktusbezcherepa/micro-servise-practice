import React from 'react'
import { useEffect, useState } from 'react'

const UsersListAdminDashboard = () => {
  const [userList, setUserList] = useState([])

  const getUsersList = async() => {
    const response = await fetch('http://localhost:3002/users')
    if(!response.ok) throw new Error("ошибка при загрузке списка пользователей");
    const usersListData = await response.json();

    setUserList(usersListData)

  }

  useEffect(() => {
      getUsersList();
  }, [])

  return (
    <>
        <h1></h1>
    </>
  )
}

export default UsersListAdminDashboard
