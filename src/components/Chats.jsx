import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { db } from '../firebase';

const Chats = () => {

  const [chats, setChats] = useState([])
  const [activeChat, setActiveChat] = useState(null)

  const { currentUser } = useContext(AuthContext)
  const { dispatch } = useContext(ChatContext)

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data())
      });
      return () => {
        unsub()
      }
    }
    currentUser.uid && getChats()
  }, [currentUser.uid])

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u })
  }

  const clickonChat = (e) => {
    const userChat = e.target.closest('.userChat')
    if (userChat?.classList.contains('userChat')) {
      if (activeChat) {
        activeChat.style.backgroundColor = ''
      }
      setActiveChat(e.target.closest('.userChat'))
      userChat.style.backgroundColor = '#2f2d52'

    }
  }

  return (
    <div className='chats' onClick={e => clickonChat(e)}>
      <div className="chatsTitle sidebarTitle">Chats</div>
      {Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map(chat =>
        <div className="userChat"
          key={chat[0]}
          onClick={(e) => handleSelect(chat[1].userInfo)}
          >
          <img src={chat[1].userInfo.photoURL} alt="" />
          <div className='userChatInfo'>
            <span>{chat[1].userInfo.displayName}</span>
            <p>{chat[1].lastMessage?.text}</p>
          </div>
        </div>
      )}

    </div>
  )
}

export default Chats
