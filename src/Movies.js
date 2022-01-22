import { Card, ListGroup } from 'react-bootstrap';

export default function Weather (props) {
  let movieList = props.movies.map((e, i) => (
    <ListGroup.Item key={i+9}>
      {e.title} ({e.date.substring(0,4)}) Popularity: {Math.round(e.popularity)}
    </ListGroup.Item>
  ))

  return (
    <Card>
      <Card.Body>
        <Card.Title>Movies related to {props.city}</Card.Title>
      </Card.Body>
      <ListGroup>
        {movieList}
      </ListGroup>
    </Card>
  );
}
