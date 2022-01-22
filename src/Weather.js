import { Card, ListGroup } from 'react-bootstrap';

export default function Weather (props) {
  let forecastList = props.forecast.map((e, i) => (
    <ListGroup.Item key={i}>
      {e.date} . {e.description} . {e.low} / {e.high} C
    </ListGroup.Item>
  ))

  return (
    <Card>
      <Card.Body>
        <Card.Title>7-day Weather Forecast</Card.Title>
      </Card.Body>
      <ListGroup>
        {forecastList}
      </ListGroup>
    </Card>
  );
}
