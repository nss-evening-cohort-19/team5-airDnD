import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Dragon from '../public/images/dragon.png';

export default function ProfileSection({
  displayName, email, phoneNum, photoURL,
}) {
  return (
    <Card className="text-center" style={{ width: '25rem', height: '40rem' }}>
      <Card.Header />
      <Card.Body>
        <Card.Img src={photoURL} alt={displayName} style={{ borderRadius: '70%', width: '70%' }} />
        <Card.Body style={{ marginTop: '7rem' }}>
          <Card.Title>{displayName}</Card.Title>
          <Card.Text>{email}</Card.Text>
          <Card.Text>{phoneNum}</Card.Text>
        </Card.Body>
      </Card.Body>
      <Card.Footer className="text-muted">Last Login: {Date().toLocaleString()}</Card.Footer>
    </Card>
  );
}

ProfileSection.propTypes = {
  email: PropTypes.string,
  displayName: PropTypes.string,
  phoneNum: PropTypes.string,
  photoURL: PropTypes.string,
};

ProfileSection.defaultProps = {
  displayName: null,
  photoURL: Dragon,
  email: null,
  phoneNum: null,
};
