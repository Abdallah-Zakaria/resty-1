import React from 'react';
import axios from 'axios';
import './app.scss';
import Header from './components/header';
import Footer from './components/footer';
import Form from './components/form';
import Results from './components/results';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      requestParams: {},
      result:[]
    };
  }

  callApi = (requestParams) => {
    let reqBody=requestParams.reqBody
    let method=requestParams.method
    let url=requestParams.url
    if(method=='post'||method=='put'){
      axios[method](url,reqBody).then(result=>{
        this.setState({
          result:result.data,
          requestParams:requestParams
        })
      })
    }else{
      axios[method](url).then(result=>{
        this.setState({
          result:result.data,
          requestParams:requestParams
        })
        console.log(result);
      })
    }
     
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <div>Request Method: {this.state.requestParams.method}</div>
        <div>URL: {this.state.requestParams.url}</div>
        <Form handleApiCall={this.callApi} />
        <Results data={this.state.result} />
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;