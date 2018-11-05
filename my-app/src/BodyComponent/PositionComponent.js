import React, { Component } from 'react';
import ElectionComponent from './ElectionComponent';
import Web3 from 'web3'
import contract from './../Contract/Contract';

class PositionComponent extends Component {
  constructor() {
    super()
    this.state = {
      position: "",
      candidates: [],
      numberOfCandidates: 0,
      totalVotes: 0,
      description: ""
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
    this.updateState();
    this.getDescription();
    this.getTotalVotes();

    let value;
    value=""+this.props.location.param1;
    this.setState({position: value});
  }
  componentWillReceiveProps(props) {
    let value;
    value=""+this.props.location.param1;
    if(value !== this.state.position) {
      this.setState({position: value});
      this.updateState();
      this.getDescription();
      this.getTotalVotes();
    }
  }

  //Does the updating process by fetching data from 
    //the smart contract through the Web3 instance. 
  updateState() {
    let value;
    value=""+this.props.location.param1;

    this.state.ContractInstance.getNumberOfCandidatesOfPosition(value, {gas: 300000}, (err, result) => {
      this.setState({numberOfCandidates: result.c[0]}, ()=> {
        this.setState({candidates: []},()=> {
          for(let i=1; i<=this.state.numberOfCandidates ; i++ ) {
            let candName;
            this.state.ContractInstance.getNameOfCandidate(value, i, {gas: 300000}, (err, result) => {
              candName = result;
              this.state.ContractInstance.getWeightedVoteCountsOf(value, i, {gas: 300000},(err, result) => {
                let currentCandidates = this.state.candidates
                  currentCandidates.push({
                    id: i,
                    candidateName: candName,
                    numberOfVotes: result.c[0]
                  })   
                this.setState({candidates:currentCandidates});
              })
            }); 
          }    
        });
      });
    });
  }

  getDescription() {
    let value;
    value=""+this.props.location.param1;

    this.state.ContractInstance.getPositionDescription(value, {gas: 300000}, (err, result) => {
      this.setState({description: result})
    });
  }

  getTotalVotes() {
    let value;
    value=""+this.props.location.param1;

    this.state.ContractInstance.getTotalVotesOfPosition(value, {gas: 300000}, (err, result) => {
      this.setState({totalVotes: result.c[0]})
    });
  }

  //Handles the vote insertion in the smart contract using the Web3 instance.
  onVoteCandidate(id) {
    this.state.ContractInstance.voteCandidateOnPosition(this.props.location.param1, id, {gas:300000},(err,result) => {console.log(result);})
  }
  
  render() {
    //Listens to the changes of candidate items.
    let candidateItems;
    if(this.state.candidates){
        candidateItems = this.state.candidates.map(candidate => {
            let percent=Math.round((candidate.numberOfVotes/this.state.totalVotes)*100);
            return (
                <ElectionComponent onVoteCandidate={this.onVoteCandidate.bind(this)} percent = {percent} key={candidate.id} candidate = {candidate}/>
            );
        });
    }
  
    return (
      <div class="body">
        <div>
          <h1>{this.props.location.param1}</h1>
          <p>{this.state.description}</p>
          {candidateItems}
        </div>
      </div>
    )
  }
}

export default PositionComponent;