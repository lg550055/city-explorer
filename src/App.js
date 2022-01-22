import React from 'react';
import axios from 'axios';
import './App.css';
import Weather from './Weather';
import Movies from './Movies'
import City from './City'
import { Form, Col, Button, Alert, Row} from 'react-bootstrap';

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
    return(
      <>
        <h1>Which city would you like to explore?</h1>
        <Alert show={this.state.showAlert}>{this.state.errorStatus}, {this.state.errorData}</Alert>
        <Form style={{width: '360px', margin: '2vh auto'}} onSubmit={this.handleSubmit}>
          <Row>
            <Col xs={7}>
              <Form.Control type="text" onInput={this.handleCity} placeholder='Enter city name' style={{display: 'inline'}}></Form.Control>
            </Col>
            <Col>
              <Button variant="light" type="submit">Explore!</Button>
            </Col>
          </Row>
        </Form>
        {
          this.state.showCity &&
          <section>
            <City cityInfo={this.state.cityInfo} mapUrl={this.state.mapUrl} />
            <Weather forecast={this.state.forecast} />
            <Movies city={this.state.city} movies={this.state.movies} />
          </section>
        }
      </>
    )
  }
}

export default App;
