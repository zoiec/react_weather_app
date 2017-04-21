import React, { Component } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import { Navbar, NavItem, Nav, Grid, Row, Col } from "react-bootstrap";
import "bootswatch/spacelab/bootstrap.css";

const PLACES = [
  { name: "Palo Alto", zip: "94303" },
  { name: "San Jose", zip: "94088" },
  { name: "Santa Cruz", zip: "95062" },
  { name: "Honolulu", zip: "96803" },
  { name: "Edmonton", zip: "Edmonton,AB" },
  { name: "Vancouver", zip: "Vamcouver,BC"}
];

const UNITS = [
  { name: "Celcius", unit: "metric", measure: "meter/sec" },
  { name: "Ferenheit", unit: "imperial", measure: "miles/hr" }
];

class WeatherDisplay extends Component {
  constructor() {
    super();
    this.state = {
      weatherData: null,
      measure: null
    };
  }
  componentDidMount() {
    const zip = this.props.zip;
    const unit = this.props.unit;
    const measure = this.props.measure;
    const URL = "http://api.openweathermap.org/data/2.5/weather?q=" +
      zip +
      "&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=" + unit;
    fetch(URL).then(res => res.json()).then(json => {
      this.setState({ weatherData: json });
      this.setState({ measure })
    });
  }
  render() {
    const weatherData = this.state.weatherData;
    const measure = this.state.measure;
    if (!weatherData) return <div>Loading</div>;
    const weather = weatherData.weather[0];
    const iconUrl = "http://openweathermap.org/img/w/" + weather.icon + ".png";
    return (
      <div>
        <h1>
          {weather.main} in {weatherData.name}
          <img src={iconUrl} alt={weatherData.description} />
        </h1>
        <p>Current: {weatherData.main.temp}°</p>
        <p>High: {weatherData.main.temp_max}°</p>
        <p>Low: {weatherData.main.temp_min}°</p>
        <p>Wind Speed: {weatherData.wind.speed} {measure}</p>
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      activePlace: 4,
      activeMeasureUnit: 0,
      view: 0
    }
  }
  render() {
    const activePlace = this.state.activePlace;
    const activeMeasureUnit = this.state.activeMeasureUnit;
    const view = [activePlace, activeMeasureUnit]
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              React Simple Weather App
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
        <Grid>
          <Row>
            <Col md={4} sm={4}>
              <h3>Select a city</h3>
              <Nav
                bsStyle="pills"
                stacked
                activeKey={activePlace}
                onSelect={index => {
                  this.setState({ activePlace: index });
                }}
              >
                {PLACES.map((place, index) => (
                  <NavItem key={index} eventKey={index}>{place.name}</NavItem>
                ))}
              </Nav>

              <h3>Unit of measure</h3>
              <Nav
                bsStyle="pills"
                stacked
                activeKey={activeMeasureUnit}
                onSelect={index => {
                  this.setState({ activeMeasureUnit: index });
                }}
              >
                {UNITS.map((unit, index) => (
                  <NavItem key={index} eventKey={index}>{unit.name}</NavItem>
                ))}
              </Nav>
            </Col>

            <Col md={8} sm={8}>
              <WeatherDisplay key={view} unit={UNITS[activeMeasureUnit].unit} zip={PLACES[activePlace].zip} measure={UNITS[activeMeasureUnit].measure} />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
