import React from 'react';
import axios from 'axios';
import './App.css';
import { Form, Button, Card, Alert, ListGroup} from 'react-bootstrap';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      city: '',
      cityInfo: {},
      mapUrl: '',
      forecast: [],
      movies: [],
      errorStatus: '',
      errorData: '',
      showAlert: false,
      showCity: false,
    }
  }

  handleCity = e => this.setState({ city: e.target.value });

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ showCity: true });
    this.getCityInfo().then(() => this.getWeather());
    this.getMovies();
  }

  getCityInfo = async () => {
    try {
      let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_CITY_KEY}&q=${this.state.city}&format=json`;
      let cityResults = await axios.get(url);
      this.setState({ cityInfo: cityResults.data[0] });
      
      let mapUrl = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITY_KEY}&center=${this.state.cityInfo.lat},${this.state.cityInfo.lon}&zoom=11`
      this.setState({ mapUrl: mapUrl })

    } catch(error) {
      this.setState({
        errorStatus: error.response.status,
        errorData: error.response.data.error,
        showAlert: true
      })
    }
  }  

  getWeather = async () => {
    let url = `${process.env.REACT_APP_SERVER_URL}/weather?lat=${this.state.cityInfo.lat}&lon=${this.state.cityInfo.lon}`;
    let weatherForecast = await axios.get(url);
    this.setState({forecast: weatherForecast.data})
  }

  getMovies = async () => {
    let url = `${process.env.REACT_APP_SERVER_URL}/movies?city=${this.state.city}`;
    let movieData = await axios.get(url);
    this.setState({movies: movieData.data})
  }

  render() {
    let forecastList = this.state.forecast.map((e, i) => (
      <ListGroup.Item key={i}>
        {e.date} {e.description} {e.low}-{e.high}C
      </ListGroup.Item>
    ))

    let movieList = this.state.movies.map((e, i) => (
      <ListGroup.Item key={i+9}>
        {e.title} - {e.date} popularity: {e.popularity}
      </ListGroup.Item>
    ))

    return(
      <>
        <h1>Which city would you like to explore?</h1>
        <Alert show={this.state.showAlert}>{this.state.errorStatus}, {this.state.errorData}</Alert>
        <Form style={{width: '300px', margin: 'auto'}} onSubmit={this.handleSubmit}>
          <Form.Group style={{margin: '2vh'}}>
            <Form.Label>Enter a city name</Form.Label>
            <Form.Control type="text" onInput={this.handleCity}></Form.Control>
          </Form.Group>
          <Button variant="light" type="submit">Explore!</Button>
        </Form>
        {
          this.state.showCity &&
          <Card style={{width: '50vh', margin: '4vh auto'}}>
            <Card.Body>
              <Card.Title>{this.state.cityInfo.display_name}</Card.Title>
              <Card.Text>
                Latitude: {this.state.cityInfo.lat}, Longitude: {this.state.cityInfo.lon}
              </Card.Text>
            </Card.Body>
            <Card.Img variant="bottom" src={this.state.mapUrl} />
          </Card>
        }
        {
          this.state.forecast &&
          <ListGroup style={{width: '50vh', margin: 'auto'}}>
            {forecastList}
          </ListGroup>
        }
        {
          this.state.movies &&
          <ListGroup style={{width: '50vh', margin: 'auto'}}>
            {movieList}
          </ListGroup>
        }
      </>
    )
  }
}

export default App;
