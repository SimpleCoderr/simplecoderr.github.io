import React, { useContext, useState } from 'react'
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';

const Search = () => {
  const [username, setUsername] = useState("")
  const [user, setUser] = useState(null)
  const [editSearch, setEditSearch] = useState(false)
  const [err, setErr] = useState(false)

  const { currentUser } = useContext(AuthContext)

  const handleSearch = async () => {
    const q = query(collection(db, "users"),
      where("displayName", "==", username))


    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data())
      });

    }
    catch (err) {
      console.log('set error')
      setErr(true)
    }

  }

  const handleKey = e => {
    setUser(null);
    handleSearch();
  }

  const handleChange = e => {
    setEditSearch(!!e.target.value)
    console.log(editSearch)
    setUsername(e.target.value)
  }

  const handleSelect = async () => {
    const combineId = currentUser.uid > user.uid ? currentUser.uid + user.uid :
      user.uid + currentUser.uid
    try {
      const res = await getDoc(doc(db, "chats", combineId))
      if (!res.exists()) {

        await setDoc(doc(db, "chats", combineId), { messages: [] })

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combineId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL
          },
          [combineId + ".date"]: serverTimestamp()
        })

        await updateDoc(doc(db, "userChats", user.uid), {
          [combineId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL
          },
          [combineId + ".date"]: serverTimestamp()
        })
      }
    }
    catch (err) {
    }
    setUser(null);
    setUsername("")
  }
  return (
    <div className='search'>
      <div className="searchTitle sidebarTitle">Search</div>
      <div className='searchForm'>
        <input type="text"
          placeholder='Find a user'
          onKeyUp={handleKey}
          onChange={handleChange}
          value={username}
        />
      </div >
      {user
        ? <div className="userChat" onClick={handleSelect}>
          <img src={user.photoURL} alt="" />
          <div className='userChatInfo'>
            <span>{user.displayName}</span>
          </div>
        </div>
        : editSearch && <span className='userNotFound'>User not found</span>
      }
    </div>
  )
}

export default Search
