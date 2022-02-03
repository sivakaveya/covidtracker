import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor() {
    super()
    this.state = {
      wcases: 0,
      wdeaths: 0,
      wrecovered: 0,
      wactive: 0,
      tcases: 0,
      tdeaths: 0,
      trecovered: 0,

      country_cases: 0,
      country_deaths: 0,
      country_recovered: 0,
      country_cases_today: 0,
      country_deaths_today: 0,
      country_recovered_today: 0,
      country_active: 0,
      country_name: 'India',
      country_flag: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    fetch("https://disease.sh/v3/covid-19/all")
      .then(response => response.json())
      .then(data =>
        this.setState({
          wcases: data['cases'],
          wdeaths: data['deaths'],
          wrecovered: data['recovered'],
          wactive: data['active'],
          tcases: data['todayCases'],
          tdeaths: data['todayDeaths'],
          trecovered: data['todayRecovered']
        })
      )
    fetch("https://disease.sh/v3/covid-19/countries/India")
      .then(response => response.json())
      .then(data =>
        this.setState({
          country_cases: data['cases'],
          country_deaths: data['deaths'],
          country_recovered: data['recovered'],
          country_cases_today: data['todayCases'],
          country_deaths_today: data['todayDeaths'],
          country_recovered_today: data['todayRecovered'],
          country_flag: data['countryInfo']['flag'],
          country_active: data['active']
        })
      )
  }

  handleChange(event) {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch("https://disease.sh/v3/covid-19/countries/" + this.state.country_name)
      .then(response => response.json())
      .then(data =>
        this.setState({
          country_cases: data['cases'],
          country_deaths: data['deaths'],
          country_recovered: data['recovered'],
          country_cases_today: data['todayCases'],
          country_deaths_today: data['todayDeaths'],
          country_recovered_today: data['todayRecovered'],
          country_flag: data['countryInfo']['flag'],
          country_active: data['active']
        })
      )
  }

  render() {
    return (
      <div>
        <h1 style={{ marginLeft: 150, marginTop: 50 }}>Covid-19 Live Tracking System</h1>
        <div className='card active' style={{ margin: 'auto' }}>
          <h3>Active Cases</h3>
          <h1>{this.state.wactive}</h1>
        </div>
        <div className='row'>
          <div className='card cases'>
            <h3>Cases Worldwide</h3>
            <h1>{this.state.wcases}</h1>
          </div>
          <div className='card deaths'>
            <h3>Deaths Worldwide</h3>
            <h1>{this.state.wdeaths}</h1>
          </div>
          <div className='card recoveries'>
            <h3>Recovered Worldwide</h3>
            <h1>{this.state.wrecovered}</h1>
          </div>
        </div>

        <div className='row'>
          <div className='card cases'>
            <h3>Today Cases Worldwide</h3>
            <h1>{this.state.tcases}</h1>
          </div>
          <div className='card deaths'>
            <h3>Today Deaths Worldwide</h3>
            <h1>{this.state.tdeaths}</h1>
          </div>
          <div className='card recoveries'>
            <h3>Today Recovered Worldwide</h3>
            <h1>{this.state.trecovered}</h1>
          </div>
        </div>


        <br />
        <div style={{ background: 'rgba(0,0,0,0.5)', height: '5vw', paddingTop: '20px', width: '100vw' }}>
          <form onSubmit={this.handleSubmit} style={{ marginLeft: '450px' }}>
            <label>Type any other Country: </label>
            <input
              type="text"
              value={this.state.country_name}
              name="country_name"
              placeholder="Country"
              onChange={this.handleChange}
            />
            <button>Search</button>
          </form>
        </div>
        < br />
        <div className='country'>
          <div>
            <h1>{this.state.country_name}</h1>
            <img src={this.state.country_flag} alt='National Flag' />
          </div>
          <div>

            <div className='row'>
              <div className='card active little'>
                <h3>Total Active Cases</h3>
                <h1>{this.state.country_active}</h1>
              </div>
              <div className='card cases little'>
                <h3>Total Cases</h3>
                <h1>{this.state.country_cases}</h1>
              </div>
            </div>

            <div className='row'>
              <div className='card deaths little'>
                <h3>Total Deaths</h3>
                <h1>{this.state.country_deaths}</h1>
              </div>
              <div className='card recoveries little'>
                <h3>Total Recoveries</h3>
                <h1>{this.state.country_recovered}</h1>
              </div>
            </div>

            <div className='row'>
              <div className='card cases little'>
                <h3>Today Cases</h3>
                <h1>{this.state.country_cases_today}</h1>
              </div>
              <div className='card deaths little'>
                <h3>Today Deaths</h3>
                <h1>{this.state.country_deaths_today}</h1>
              </div>
              <div className='card recoveries little'>
                <h3>Today Recovered</h3>
                <h1>{this.state.country_recovered_today}</h1>
              </div>

            </div>
          </div>
        </div>

      </div>
    )
  }
}
export default App;
