// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import MessageForm from '../../../../components/forms/MessageForm';

// // Create Dynamic page where users can edit their Message

// export default function EditMessage() {
//   const [editMessage, setMessage] = useState({});
//   const router = useRouter();
//   const { firebaseKey } = router.query;

//   useEffect(() => {
//     getSingleMessage(firebaseKey).then(setMessage);
//   }, [firebaseKey]);

//   return (
//     <div className="create-form" style={{ height: '45rem', padding: '10%' }}>
//       <MessageForm obj={editMessage} />
//     </div>
//   );
// }
