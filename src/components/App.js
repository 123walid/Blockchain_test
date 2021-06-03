import React, { Component } from 'react';
import logo from '../logo.png';
import './App.css';
import Transport from '../abis/Transport.json'
import Web3 from 'web3';
import Navbar from './Navbar'
import Main from './Main'
class App extends Component {
  
  async componentWillMount(){
    await this.loadWeb3()
    await this.LoadBlockchainData()

  }
  async loadWeb3(){
    if(window.ethereum){
      window.web3= new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3){
      window.web3 = new Web3(window.web3.currentProvider)

    }else{
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }
  async LoadBlockchainData(){
    const web3 = window.web3;
    //load account
    const accounts = await web3.eth.getAccounts();
    this.setState({account: accounts[0]})
    //Network ID
    const networkId = await web3.eth.net.getId()
    const networkData = Transport.networks[networkId]
    if(networkData){
     const transport = web3.eth.Contract(Transport.abi, networkData.address)
     this.setState({transport}) 
     await transport.methods.set_count(0).call()
      const count = await transport.methods.get_count().call()
      console.log("count1 : "+count)
      const a=parseInt(count)
      this.setState({count})
      console.log("count2 : "+a)
      //load list
      for(var i=1; i<=count ;i++){
        
        const transporteur = await transport.methods.transporteurs(i).call()
        this.setState({ list:[...this.state.list,transporteur]

        })
      }
      this.setState({
        list: this.state.list.sort((a,b)=>b.score -a.score)
      })
      this.setState({loading: false})
    }else{
      window.alert('Transport contract noy deployed to detected network.')

    }
    

  }
  ajoutTransport(cin,nom,prenom,tel,vn,sc){
    this.setState({loading: true})
    this.state.transport.methods.ajout_transporteur(cin,nom,prenom,tel,vn,sc).send({from:  this.state.account})
    .once('receipt',(receipt)=>{
      this.setState({loading: false})

    })
  }
  constructor(props){
    super(props)
    this.state={
      account:'',
      transport: null,
      count: 0,
      list:[],
      loading: true
    }
    this.ajoutTransport=this.ajoutTransport.bind(this)
  }
  render() {
    return (
      <div>
        
        <div>
          <Navbar account={this.state.account}/>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <title>Sign Up Form by Colorlib</title>
        {/* Font Icon */}
        <link rel="stylesheet" href="fonts/material-icon/css/material-design-iconic-font.min.css" />
        {/* Main css */}
        <link rel="stylesheet" href="css/style.css" />
        <div className="main">
          {/* Sign up form */}
          
          {/* Affichage */}
          {this.state.loading
          ?<div id="loader"className="text-center mt-5"><p>Loading.....</p></div>
          
          :<Main 
          list={this.state.list}
          ajoutTransport={this.ajoutTransport}/>
          
          }
        </div>
      </div>
      </div>
    );
  }
}

export default App;
