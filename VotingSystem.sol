pragma solidity ^0.4.25;

import "https://github.com/xinbenlv/eip-1202-draft/contracts/simple-version/SimpleERC1202.sol";

contract VotingSystem is ERC1202 {
    // This is the data structure of the candidate.
    struct Candidate {
        string name;
        uint numberOfVotes;
    } 
    
    mapping (uint => Candidate) private candidates; // storage for different candidates in the poll.
    mapping (address => uint) private ballot; // storage for the users who already voted.
    uint numberOfCandidates;
    uint totalVotes;
    uint winnerOption;
    bool electionStatus;
    
    constructor () public {
        numberOfCandidates=0;
        totalVotes=0;
        winnerOption=0;
    }
    
    function addCandidate(string _candidate) external {
        numberOfCandidates+=1;
        candidates[numberOfCandidates]=Candidate(_candidate, 0);
    }
    
    function vote(uint option) external returns (bool success) {
        //require(ballot[msg.sender]==0); // no re-vote
        require(electionStatus==true); // status should be open
        ballot[msg.sender]=option;
        candidates[option].numberOfVotes+=1;
        totalVotes+=1;
        setWinningOption(option);
        emit OnVote(msg.sender, option);
        return true;
    }

    function setStatus(bool isOpen) external returns (bool success) {
        electionStatus=isOpen;
        emit OnStatusChange(isOpen);
        return true;
    }
    
    function getStatus() external view returns (bool isOpen) {
        return electionStatus;
    }
    
    function ballotOf(address addr) external view returns (uint option) {
        return ballot[addr];
    }
    
    function weightedVoteCountsOf(uint option) external view returns (uint count) {
        return candidates[option].numberOfVotes;
    }
    
    function getCandidateName(uint option) external view returns (string name) {
        return candidates[option].name;
    }
    
    function getTotalVotes() external view returns (uint count) {
        return totalVotes;
    }
    
    function setWinningOption(uint _option) private {
        if(candidates[_option].numberOfVotes > candidates[winnerOption].numberOfVotes) {
                winnerOption=_option;
        }
    }
    
    function winningOption() external view returns (uint option) {
        return winnerOption;
    }

    function getNumberOfCandidates() external view returns (uint option) {
        return numberOfCandidates;
    }
    
    event OnVote(address indexed _from, uint _value);
    event OnStatusChange(bool newIsOpen);
    function issueDescription() external view returns (string desc) {}
    function availableOptions() external view returns (uint[] options) {}
    function optionDescription(uint option) external view returns (string desc) {}
    function weightOf(address addr) external view returns (uint weight) {}
}

contract Main {
    struct Election {
        string description;
        VotingSystem election;
    }
    
    mapping (string => Election) private categories;
    mapping (address => bool) private admins;
    string[] positions;
    uint numberOfPositions;
    address CREATOR;

    constructor () public {
        CREATOR = msg.sender;
        admins[msg.sender]=true;
        numberOfPositions=0;
    }

    function addAdmin(address _address) public {
        require(CREATOR==msg.sender);
        admins[_address]=true;
    }

    function addPosition(string _position, string _description) public {
        require(admins[msg.sender]==true);
        positions.push(_position);
        categories[_position]=Election(_description, new VotingSystem());
        numberOfPositions+=1;
    }
    
    function getPositionDescription(string _position) external view returns (string) {
        require(admins[msg.sender]==true);
        return categories[_position].description;
    }
    
    function getPositions(uint index) external view returns (string) {
        require(admins[msg.sender]==true);
        return positions[index];
    }
    
    function getNumberOfPositions() external view returns (uint) {
        require(admins[msg.sender]==true);
        return numberOfPositions;
    }
    
    function addCandidateToPosition(string _position, string _candidate) public {
        require(admins[msg.sender]==true);
        categories[_position].election.addCandidate(_candidate);
    }
    
    function voteCandidateOnPosition(string _position, uint _candidate) external {
        categories[_position].election.vote(_candidate);
    }
    
    function setElectionStatus(string _position, bool _status) external {
        categories[_position].election.setStatus(_status);
    }
    
    function getElectionStatus(string _position) external view returns (bool _isOpen) {
        return categories[_position].election.getStatus();
    }
    
    function getBallotOf(string _position, address _option) external view returns (uint option) {
        return categories[_position].election.ballotOf(_option);
    }
    
    function getWeightedVoteCountsOf(string _position, uint _option) external view returns (uint option) {
        return categories[_position].election.weightedVoteCountsOf(_option);
    }
    
    function getNameOfCandidate(string _position, uint _option) external view returns (string option) {
        return categories[_position].election.getCandidateName(_option);
    }

    function getTotalVotesOfPosition(string _position) external view returns (uint) {
        return categories[_position].election.getTotalVotes();
    }

    function getWinningOptions(string _position) external view returns (uint) {
        return categories[_position].election.winningOption();
    }

    function getNumberOfCandidatesOfPosition(string _position) external view returns (uint) {
        return categories[_position].election.getNumberOfCandidates();
    }
}