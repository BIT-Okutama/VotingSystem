import React, { Component } from 'react';
import {Input, Icon, Button} from 'react-materialize'
import Web3 from 'web3'
import contract from '../../Contract/Contract';

class CreateCandidate extends Component {
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

  handleSubmitCandidate(e) {
    e.preventDefault();
    this.state.ContractInstance.addCandidateToPosition(
      String(this.refs.position.value), String(this.refs.name.value), {gas: 300000}, (err, result) => {}
    ) 
  }

  render() {
    let positionItems;
    if(this.state.positions) {
      positionItems = this.state.positions.map(position => {
        return (
          <option value={position.name}>{position.name}</option>
        );
      });
    }

    return (
      <div class="body">
        <h1>Add Candidate</h1>
        <p>Add a new candidate under a position. Please select the appropriate position and enter the correct name.</p>
        <br></br>
        <div class="forms">
          <form onSubmit={this.handleSubmitCandidate.bind(this)}>
            <Input s={6} ref="position" type='select' label="Position" icon='person' defaultValue='Please Select'>
              {positionItems}
            </Input>
            <br></br>
            <Input ref="name" placeholder="Please write the name here." icon='translate' label="Name" />
            <br></br>
            <Button type="submit" className='right deep-orange' waves='orange'>Submit<Icon right>send</Icon></Button>
          </form>
        </div>
      </div>
    )
  }
}

export default CreateCandidate;