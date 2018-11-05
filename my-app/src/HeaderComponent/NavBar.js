import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Web3 from 'web3'
import contract from '../Contract/Contract';

class NavBar extends Component {
  constructor() {
    super()
    this.state = {
      numberOfPositions: 0,
      positions: []
    };

    //Initializes the Web3 connection instance.
    if(typeof window.web3 != 'undefined'){
      console.log("Using web3 detected from external source like Metamask");
      window.web3 = new Web3(window.web3.currentProvider);
    }
    
    else {
      window.web3 = new Web3(new 
      Web3.providers.HttpProvider("http://localhost:8545"));
    }

    //Sets the account, for it to be recognized by Metamask 
    window.web3.eth.defaultAccount = window.web3.eth.accounts[0]

    //Sets the contract connection for the instance.
    const MyContract = window.web3.eth.contract(contract.ABI);
    this.state.ContractInstance = MyContract.at(contract.address);
  } 

  //On component launch, fetches all data for the poll details.
  componentDidMount(){
    this.getPositions();
    this.forceUpdate();
  }

  getPositions() {
    this.state.ContractInstance.getNumberOfPositions({gas: 300000}, (err, result) => {
      this.setState({numberOfPositions: result.c[0]}, ()=> {
        this.setState({positions: []},()=> {
          for(let i=0; i<this.state.numberOfPositions; i++ ) {
            let posName;
            this.state.ContractInstance.getPositions(i, {gas: 300000}, (err, result) => {
              posName = result;
              let currentPosition = this.state.positions
                currentPosition.push({
                  name:posName
                })
              this.setState({positions:currentPosition});
            });
          }
        });
      });
    });
  }

  render() {
    let positionItems;
    if(this.state.positions) {
      positionItems = this.state.positions.map(position => {
        const newTo = { 
          pathname: '/positioncomponent/'+position.name, 
          param1: position.name 
        };
        return (
          <div>
            <li><Link to={newTo} >{position.name}</Link></li>
            <li class="divider" tabindex="-1"></li>
          </div>
        );
      });
    }

    return (
      <nav class="navColor">
        <ul id = "dropdown" class = "dropdown-content">
          {positionItems}
        </ul>
        <ul id = "dropdown2" class = "dropdown-content">
          <li><Link to="/createcandidate" >Add Candidate</Link></li>
          <li class="divider" tabindex="-1"></li>
          <li><Link to="/addposition" >New Position</Link></li>
          <li class="divider" tabindex="-1"></li>
          <li><Link to="/setstatus" >Edit Election Status</Link></li>
        </ul>

        <a href="#" class="brand-logo"> <img class="logo" src="logo.png"></img></a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li><Link to="/homepage" >Home <i class="material-icons right">home</i></Link></li>
          <li><a class = "dropdown-button" href = "#" data-activates = "dropdown">Vote<i class="material-icons right">fingerprint</i></a></li>
          <li><a>About Us <i class="material-icons right">people_outline</i></a></li>
          <li><a>Contact Us <i class="material-icons right">call</i></a></li>
          <li><a class = "dropdown-button" href = "#" data-activates = "dropdown2">Admin<i class="material-icons right">accessibility</i></a></li>
        </ul>
    </nav>
    )
  }
}
export default NavBar;