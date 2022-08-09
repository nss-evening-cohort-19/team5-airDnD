import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getAllMessages } from '../api/messageData';
import MessagesSection from '../components/Messages';
// import ReservationsSection from '../components/Reservations';
import { useAuth } from '../utils/context/authContext';
// import GetUserProfile from './Profile/[firebaseKey]';

export default function ProfilePage() {
  const [messages, setMessages] = useState([]);
  const { user } = useAuth();
  const getProfileMessages = () => {
    getAllMessages(user.uid).then(setMessages);
  };
  useEffect(() => { getProfileMessages(); }, []);

  return (
    <>
      <nav className="navbar bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" href="/">
            My Listings
          </Link>
          <Link className="navbar-brand" href="/Properties/new">
            List Your Space
          </Link>
        </div>
      </nav>
      {/* <div style={{ width: '50%' }}>
        <GetUserProfile />
      </div> */}
      <div style={{ width: '50%' }}>
        {messages.map((message) => (
          <MessagesSection key={message.firebaseKey} messageObj={message} onUpdate={getProfileMessages} />))}
      </div>
      {/* <div><ReservationsSection /></div> */}
    </>
  );
}
