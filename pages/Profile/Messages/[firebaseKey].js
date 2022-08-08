// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import { getAllMessages } from '../../../api/messageData';
// import MessageCard from '../../../components/MessageCard';

// // Create Dynamic page where users can view the messages
// export default function ViewMessages() {
//   const [viewMessage, setViewMessage] = useState({});
//   const router = useRouter();
//   const { firebaseKey } = router.query;

//   useEffect(() => {
//     getAllMessages(firebaseKey).then(setViewMessage);
//   }, [firebaseKey]);

//   return (
//     <div className="view-card">
//       <MessageCard key={firebaseKey} messageObj={viewMessage} />
//     </div>
//   );
// }
