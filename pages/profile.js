import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getReservations } from '../api/reservationData';
// import { useState } from 'react';
// import { getMessages } from '../api/messageData';
// import MessagesSection from '../components/Messages';
import ReservationsSection from '../components/Reservations';
// import ProfileSection from '../components/UserProfile';
import { useAuth } from '../utils/context/authContext';

export default function ProfilePage() {
  // const [messages, setMessages] = useState([]);
  // const [userProfile, setUserProgfile] = useState([]);
  const [reservations, setReservations] = useState([]);
  const { user } = useAuth();
  const getAllReservations = () => {
    getReservations(user.uid).then(setReservations);
  };
  useEffect(() => {
    getAllReservations();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  // const getProfileMessages = () => {
  //   getMessages(user.uid).then(setMessages);
  // };
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
        <ProfileSection />
      </div>
      <div style={{ width: '50%' }}>
        <MessagesSection />
      </div>
      <div><ReservationsSection /></div> */}
      {reservations.map((reservation) => (
        <ReservationsSection key={reservation.firebaseKey} reservationObj={reservation} onUpdate={getAllReservations} />
      ))}
    </>
  );
}
