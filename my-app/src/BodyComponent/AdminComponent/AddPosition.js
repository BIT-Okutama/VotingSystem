import React, { Component } from 'react';
import {Input, Icon, Button} from 'react-materialize'
import Web3 from 'web3'
import contract from '../../Contract/Contract';

class AddPosition extends Component {
  constructor() {
    super()
    this.state = {
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

  handleSubmitPosition(e) {
    this.state.ContractInstance.addPosition(
      String(this.refs.position.value), String(this.refs.description.value), {gas: 300000}, (err,result) => 
      {console.log(result);})
      e.preventDefault();
  }

  render() {
    return (
      <div class="body">
        <h1>Create Position</h1>
        <p>Create a new position for the Election. After creating, please add candidates for this position.</p>
        <br></br>
        <div class="forms">
          <form onSubmit={this.handleSubmitPosition.bind(this)}>
            <Input ref="position" placeholder="Please write the position name here." icon='translate' label="Position Name" />
            <br></br>
            <Input ref="description" placeholder="Please write the description here." icon='comment' type='textarea' label="Description" />
            <br></br>
            <Button type="submit" className='right deep-orange' waves='orange'>Submit<Icon right>send</Icon></Button>
          </form>
        </div>
      </div>
    )
  }
}

export default AddPosition; 