import React, { Component } from 'react';
import {Icon} from 'react-materialize';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";

class ElectionComponent extends Component {
  handleVote(id){
    this.props.onVoteCandidate(id);
  }

  render() {
    return (
      <div>
        <tr>
          <th width="5%"><button class="btn-floating btn waves-effect waves-light red left" onClick={this.handleVote.bind(this, this.props.candidate.id)}>Vote</button></th>
          <th> <Progress percent={this.props.percent} theme={{active: {color: '#ff5722'}}} /> </th>  
          <th width="7%"> {this.props.candidate.numberOfVotes} </th>
          <th width="7%"> {this.props.candidate.candidateName} </th>
        </tr>
      </div>        
    );
  }
}

export default ElectionComponent;
