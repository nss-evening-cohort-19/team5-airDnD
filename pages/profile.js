import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { getAllMessages } from '../api/messageData';
import MessagesSection from '../components/Messages';
import ProfileSection from '../components/UserProfile';
import { getReservations } from '../api/reservationData';
import ReservationsSection from '../components/Reservations';
import { useAuth } from '../utils/context/authContext';
// import MessageCard from '../components/MessageCard';

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
      <div
        style={{
          clear: 'both',
          marginRight: '10px',
          marginBottom: '10px',
          marginTop: '3rem',
          float: 'left',
        }}
      >
        <ProfileSection displayName={user.displayName} photoURL={user.photoURL} email={user.email} lastLogin={user.lastLogin} phoneNum={user.phoneNum} />
      </div>

      <div>
        <h3
          style={{
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'space-evenly',
            marginBottom: '0px',
          }}
        >
          Messages{' '}
          <Button href="/Profile/Messages/newMsg" className="text-center" variant="secondary" size="lg">
            Send Message
          </Button>
        </h3>
        <div
          style={{
            marginRight: '0px',
            marginBottom: '1.5rem',
            width: '60%',
            height: '40rem',
            overflowY: 'auto',
            overflowX: 'hidden',
            border: '1px solid rgb(224, 224, 224)',
            borderRadius: '7px',
          }}
        >
          {messages.map((message) => (
            <MessagesSection key={message.firebaseKey} messageObj={message} onUpdate={getProfileMessages} />
          ))}
        </div>
      </div>
      <div
        className="wood-background"
        style={{
          clear: 'both',
          marginRight: '0px',
        }}
      >
        {reservations.map((reservation) => (
          <ReservationsSection key={reservation.firebaseKey} reservationObj={reservation} onUpdate={getAllReservations} />
        ))}
      </div>
      {reservations.map((reservation) => (
        <ReservationsSection key={reservation.firebaseKey} reservationObj={reservation} onUpdate={getAllReservations} />
      ))}
    </>
  );
}
