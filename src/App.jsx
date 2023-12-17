import { useCallback, useEffect, useState } from 'react'
import './App.css'
import {Button, Card} from 'antd'
import axios from 'axios'
import TitleContainer from './components/TitleContainer';
import { Avatar} from 'antd';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [data, setData] = useState({});
  const [userNames, setUserNames] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [selectedProfileId, setSelectedProfileId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://602e7c2c4410730017c50b9d.mockapi.io/users");
        const userProfiles = response.data.map((item) => {
          const userProfile = item.profile;
          const { firstName, lastName, email, username } = userProfile;
          const { Bio } = item;
          const {jobTitle} = item;
          const {avatar} = item;
          return { firstName, lastName, Bio, jobTitle, email, username, avatar};
        });

        setUserNames((prevUserNames) => [...prevUserNames, ...userProfiles]);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData()
  }, [])

  const handleprofileClick = useCallback((profile) => {
    setSelectedProfile(profile);
    console.log(profile)
    setSelectedProfileId(profile.id)
  }, [])
  return (
    <div className='container'>
      <div className='user-list'>
        <h3 className='user-list-head'>User Lists</h3>
        {userNames.map((profile, index) => (
          <div className='user-container' onClick={() => handleprofileClick(profile)}  key={index}>
            <TitleContainer title={profile.firstName + ' ' + profile.lastName} avatar={profile.avatar}/>  
          </div>
        ))}
      </div>
      <div className='user-profile'>
          <h3 className='user-list-head'>User Details</h3>

          {selectedProfile && (
            <Card style={{margin: "10px", maxWidth: "100%", display: "flex", justifyContent: "center"}} className='card-title'>
              <Card.Meta
                  avatar={<Avatar
                  src={userNames.find((user) => user.id === selectedProfileId)? selectedProfile.avatar : 'https://static.vecteezy.com/system/resources/thumbnails/014/550/299/small/download-icon-website-buffer-loader-a-spinning-circle-to-download-information-on-the-website-png.png'}
                  onError={() => toast.error("Error rendering the image")} 
                  onLoad = {() => setImageError(false)}
                  alt='loading...'
                  style={{width: "200px", height: "200px"}}/>}
              />
                <p>@{selectedProfile.username}</p>
                <h2 style={{padding: "10px", border: "1px solid grey", borderRadius: "20px"}}>Bio: {selectedProfile.Bio}</h2>
                <h4>First Name: {selectedProfile.firstName}</h4>
                <h4>Last Name: {selectedProfile.lastName}</h4>
                <h4>Email: {selectedProfile.email}</h4>
            </Card>
          )}
      </div>
      <Toaster />
    </div>
  )
}

export default App
