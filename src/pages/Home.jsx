import React, { useContext, useEffect } from 'react'
import Chat from '../components/Chat'
import Sidebar from '../components/Sidebar'
import { ChatContext } from '../context/ChatContext'

const Home = () => {
  const { dispatch } = useContext(ChatContext)

  useEffect(() => {
    return () => {
      dispatch({type: "RESET_STATE"})
    }
  },[])
  return (
    <div className='home'>
      <div className="container">
        <Sidebar/>
        <Chat/>
      </div>
    </div>
  )
}

export default Home
