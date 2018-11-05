import React, { Component } from 'react';
import {Row, Input, Icon, Button} from 'react-materialize'
import moment from 'moment';
import Web3 from 'web3'
import contract from '../../Contract/Contract';

class SetStatus extends Component {
  constructor() {
    super()
    this.state = {
      startDate: moment()
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

  /* 
   * @details: Gets the current date.
   */
  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  handleSubmitStatus(e) {
    this.state.ContractInstance.setElectionStatus(
      String(this.refs.position.value), Boolean(this.refs.status.value), {gas: 300000}, (err, result) => {}
    );
    e.preventDefault();
  }

  render() {
    return (
      <div class="body">
        <h1>Set Election Status</h1>
        <p>Set the status of each position in the Election. You can also set the date when the Election is open.</p>
        <br></br>
        <div class="forms">
          <form onSubmit={this.handleSubmitStatus.bind(this)}>
            <Input s={6} ref="position" type='select' label="Position" icon='person' defaultValue='Please Select'>
              <option value='President 2018'>President</option>
              <option value='Vice President 2018'>Vice President</option>
              <option value='Senator 2018'>Senator</option>
            </Input>
            <br></br>
            <Input s={6} ref="status" type='select' label="Election Status" icon='toggle_off' defaultValue='Please Select'>
              <option value='true'>Open</option>
              <option value='false'>Close</option>
            </Input>
            <br></br>
            <Input name='on' icon='date_range' label="Start Date" defaultValue={this.state.startDate.format("DDMMYYYY")} disabled />
            <br></br>
            <Input name='on' icon='date_range' label="End Date" type='date' placeholder="Please select end date." onChange={function(e, value) {}} />
            <br></br>
            <Button className='right deep-orange' waves='orange' type="submit" >Submit<Icon right>send</Icon></Button>
          </form>          
        </div>
      </div>
    )
  }
}

export default SetStatus;