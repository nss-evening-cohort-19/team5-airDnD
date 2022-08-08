import Image from 'next/image';
import PropTypes from 'prop-types';

export default function ProfileSection({ userObj }) {
  return (
    <>
      <div className="card" style={{ width: '18rem' }}>
        <Image src="..." className="card-img-top" alt="..." />
        <div className="card-body">
          <h1 className="card-title">{userObj.name}</h1>
          <h5 className="card-text">{userObj.email}</h5>
          <h5 className="card-text">{userObj.phoneNum}</h5>
        </div>
        <div className="card-body">
          <h3>Edit Profile</h3>
          <h3>Deactivate Account</h3>
        </div>
      </div>
    </>
  );
}

ProfileSection.propTypes = {
  userObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    email: PropTypes.string,
    name: PropTypes.string,
    phoneNum: PropTypes.string,
  }).isRequired,
};
