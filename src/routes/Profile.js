import { authService } from "fbase";
import { getAuth, signOut, updateProfile } from "firebase/auth";
// import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Profie = ({ refreshUser, userObj }) => {
  const navigate = useNavigate();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const auth = getAuth();
  const onLogOutClick = async () => {
    await signOut(auth);
    navigate("/");
  };

  // const getMyNweets = async () => {
  //   const q = query(collection(db, "nweets"), where("creatorId", "==", userObj.uid), orderBy("createdAt", "desc"));
  //   const querySnapshot = await getDocs(q);
  //   querySnapshot.forEach((doc) => {
  //     console.log(doc.id, " => ", doc.data());
  //   });
  // };

  // useEffect(() => {
  //   getMyNweets();
  // }, []);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(authService.currentUser, { displayName: newDisplayName });
      refreshUser();
    }
  };

  return (
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input onChange={onChange} type="text" placeholder="Display name" value={newDisplayName} autoFocus className="formInput" />
        <input
          type="submit"
          value="Update Profile"
          className="formBtn"
          style={{
            marginTop: 10,
          }}
        />
      </form>
      <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        Log Out
      </span>
    </div>
  );
};
export default Profie;
