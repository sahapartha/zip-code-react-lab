import React, { Component } from 'react';
import './App.css';


function City(props) {
  return (
    <div>
      {props.searchResult.map((item, i) => (
        <div key={`${i}`}>
          <div> {item.LocationText} </div>
          <div>
            <ul>
              <li>State: {item.State}</li>
              <li>Loaction: ({item.Long} , {item.Lat})</li>
              <li>Population (estimated): {item.EstimatedPopulation}</li>
              <li>Total Wages: {item.TotalWages}</li>
            </ul>
          </div>
          <br/>
        </div>
        
      ))}
    </div>
  );
}

function ZipSearchField(props) {
  return (
    <div>
        Type a zip code:
        <input type="text" onChange={props.zipCodeChange} value={props.zipValue}/>
        <p>You entered: {props.zipValue}</p>
    </div>
  );
}


class App extends Component {
  state={
    userInputVal: "",
    searchData:[]
  }

  handleZipChange(event){
    //console.log(event.target.value);
      if(event.target.value.length===5){
        fetch('http://ctp-zip-api.herokuapp.com/zip/'+event.target.value)
        .then(res => res.json())
        .then(jsonData =>{
          console.log(jsonData);
          this.setState({
            searchData: jsonData
          })
        })
        .catch(err => this.setState({ result: []}));
      }
      else{
        this.setState({
          searchData:[]
        })
      }
    this.setState({
      userInputVal: event.target.value
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField zipCodeChange={(e)=>this.handleZipChange(e)} zipValue={this.state.userInputVal}/>
        <div>
          <City searchResult={this.state.searchData} />
        </div>
      </div>
    );
  }
}

export default App;
