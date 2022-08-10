import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleUser } from '../../api/userData';
import ProfileSection from '../../components/UserProfile';

export default function GetUserProfile() {
  const [profile, setProfile] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;
  useEffect(() => {
    getSingleUser(firebaseKey).then(setProfile);
  }, [firebaseKey]);
  return (
    <div style={{ width: '50%' }}>
      <ProfileSection key={firebaseKey} userObj={profile} />
    </div>
  );
}
