import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getAllMessages } from '../api/messageData';
import MessagesSection from '../components/Messages';
import ProfileSection from '../components/UserProfile';
import { getReservations } from '../api/reservationData';
import ReservationsSection from '../components/Reservations';
import { useAuth } from '../utils/context/authContext';

export default function ProfilePage() {
  const [messages, setMessages] = useState([]);
  const [reservations, setReservations] = useState([]);
  const { user } = useAuth();
  const getProfileMessages = () => {
    getAllMessages(user.uid).then(setMessages);
  };
  const getAllReservations = () => {
    getReservations(user.uid).then(setReservations);
  };
  useEffect(() => {
    getProfileMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    getAllReservations();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
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
      <div style={{ width: '50%' }}>
        <ProfileSection displayName={user.displayName} photoURL={user.photoURL} email={user.email} lastLogin={user.lastLogin} phoneNum={user.phoneNum} />
      </div>
      <div style={{ width: '40%' }}>
        {messages.map((message) => (
          <MessagesSection key={message.firebaseKey} messageObj={message} onUpdate={getProfileMessages} />
        ))}
      </div>
      {/* <div style={{ width: '40%' }}>
        {messages.map((message) => (
          <Messages key={message.firebaseKey} messageObj={message} onUpdate={getProfileMessages} />
        ))}
      </div> */}
      {reservations.map((reservation) => (
        <ReservationsSection key={reservation.firebaseKey} reservationObj={reservation} onUpdate={getAllReservations} />
      ))}
    </>
  );
}
