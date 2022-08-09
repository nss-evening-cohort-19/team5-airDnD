import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropertiesForm from '../../../components/forms/PropertiesForm';
import { getSingleProperties } from '../../../api/userPropertyData';

export default function EditProperty() {
  const [editProperty, setEditProperty] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleProperties(firebaseKey).then(setEditProperty);
  }, [firebaseKey]);

  return (<PropertiesForm obj={editProperty} />);
}
