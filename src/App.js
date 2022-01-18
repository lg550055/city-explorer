import React from 'react';
import axios from 'axios';
import './App.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      city: '',
      cityInfo: {}
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
      this.setState({
        cityInfo: cityResults.data[0]
      });
    } catch(error) {
      console.log(error.response.status, error.response.data.error);
    }
  }  

  render() {
    return(
      <>
        <h1>Proof of life!</h1>
        <Form style={{width: '50%', margin: 'auto'}} onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>Enter city</Form.Label>
            <Form.Control type="text" onInput={this.handleCity}></Form.Control>
          </Form.Group>
          <Button variant="success" type="submit">Explore!</Button>
        </Form>
        <p>Lat: {this.state.cityInfo.lat}, Lon: {this.state.cityInfo.lon}</p>
      </>
    )
  }
}

export default App;
