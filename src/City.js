import { Card } from 'react-bootstrap';

export default function Weather (props) {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{props.cityInfo.display_name}</Card.Title>
        <Card.Text>
          Latitude: {Math.round(props.cityInfo.lat*100)/100}, Longitude: {Math.round(props.cityInfo.lon*100)/100}
        </Card.Text>
      </Card.Body>
      <Card.Img variant="bottom" src={props.mapUrl} />
    </Card>
  );
}
