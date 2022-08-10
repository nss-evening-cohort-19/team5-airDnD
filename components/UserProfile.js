import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
// import Dragon from '../public/images/dragon.png';

export default function ProfileSection({
  displayName, email, phoneNum,
}) {
  return (
    <Card className="text-center">
      <Card.Header />
      <Card.Body>
        {/* <Card.Img src={photoURL} alt={displayName} width="300px" height="300px" /> */}
        <Card.Title>{displayName}</Card.Title>
        <Card.Text>{email}</Card.Text>
        <Card.Text>{phoneNum}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">{Date().toLocaleString()}</Card.Footer>
    </Card>
  );
}

ProfileSection.propTypes = {
  email: PropTypes.string,
  displayName: PropTypes.string,
  phoneNum: PropTypes.string,
  // photoURL: PropTypes.string,
};

ProfileSection.defaultProps = {
  displayName: null,
  // photoURL: 'https://i.pinimg.com/564x/fc/7e/ce/fc7ece8e8ee1f5db97577a4622f33975.jpg',
  email: null,
  phoneNum: null,
};
