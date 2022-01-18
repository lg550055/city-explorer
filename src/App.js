import React from 'react';
import axios from 'axios';
import './App.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      city: '',
      cityInfo: {},
      mapUrl: ''
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
      console.log(this.state.cityInfo);
      let mapUrl = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITY_KEY}&center=${this.state.cityInfo.lat},${this.state.cityInfo.lon}&zoom=10`
      this.setState({ mapUrl: mapUrl})

    } catch(error) {
      console.log(error.response.status, error.response.data.error);
    }
  }  

  render() {
    return(
      <>
        <h1>Which city would you like to explore?</h1>
        <Form style={{width: '50%', margin: 'auto'}} onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>Enter city</Form.Label>
            <Form.Control type="text" onInput={this.handleCity}></Form.Control>
          </Form.Group>
          <Button variant="success" type="submit">Explore!</Button>
        </Form>
        <Card style={{width: '50%', margin: 'auto'}}>
          <Card.Body>
            <Card.Title>{this.state.cityInfo.display_name}</Card.Title>
            <Card.Text>
              Latitude: {this.state.cityInfo.lat}, Longitude: {this.state.cityInfo.lon}
            </Card.Text>
          </Card.Body>
          <Card.Img variant="bottom" src={this.state.mapUrl} />
        </Card>        
        <p></p>
      </>
    )
  }
}

export default App;
