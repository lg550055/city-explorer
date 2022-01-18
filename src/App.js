import React from 'react';
import axios from 'axios';
import './App.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      city: '',
      cityInfo: {},
      mapUrl: '',
      errorStatus: '',
      errorData: '',
      showAlert: false
    }
  }

  handleCity = e => {
    this.setState({ city: e.target.value });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.getCity();
  }

  getCity = async () => {
    try {
      let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_CITY_KEY}&q=${this.state.city}&format=json`;
      let cityResults = await axios.get(url);
      this.setState({ cityInfo: cityResults.data[0] });
      
      let mapUrl = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITY_KEY}&center=${this.state.cityInfo.lat},${this.state.cityInfo.lon}&zoom=9`
      this.setState({ mapUrl: mapUrl})

    } catch(error) {
      this.setState({
        errorStatus: error.response.status,
        errorData: error.response.data.error,
        showAlert: true
      })
    }
  }  

  render() {
    return(
      <>
        <h1>Which city would you like to explore?</h1>
        <Alert show={this.state.showAlert}>{this.state.errorStatus}, {this.state.errorData}</Alert>
        <Form style={{width: '300px', margin: 'auto'}} onSubmit={this.handleSubmit}>
          <Form.Group style={{margin: '2vh'}}>
            <Form.Label>Enter a city name</Form.Label>
            <Form.Control type="text" onInput={this.handleCity}></Form.Control>
          </Form.Group>
          <Button variant="dark" type="submit">Explore!</Button>
        </Form>
        <Card style={{width: '50%', margin: '5vh auto'}}>
          <Card.Body>
            <Card.Title>{this.state.cityInfo.display_name}</Card.Title>
            <Card.Text>
              Latitude: {this.state.cityInfo.lat}, Longitude: {this.state.cityInfo.lon}
            </Card.Text>
          </Card.Body>
          <Card.Img variant="bottom" src={this.state.mapUrl} />
        </Card>        
      </>
    )
  }
}

export default App;
