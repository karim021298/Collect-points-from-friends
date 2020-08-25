pragma solidity ^0.5.16;

contract points {
    /*There is no total supply for points(tokens) like in ERC20 standard as a startup will
     put no limit to gratitude points that it may take. Therefore ERC20 was not used.

     **NOTE: There is a limit of 3 points for each friend to use on gratitude points, but no limit for number of users.
     To illustrate any accont can spend up to 3 points on any gratitude attribute and this point will be recorded on blockchain
     but if this account then tries to spend more than 3 points and button pressed will not be recorded
    */
    uint public creativity; //creativity points
    uint public hardworker; //hardworker attribute points
    uint public intelligent; //intelligence points

    struct friend{
        uint rem_points;
        bool exist;
    }

    mapping(address => friend) public friends;

    constructor() public {
        creativity = 0;
        hardworker = 0;
        intelligent = 0;
    }

    function get_creativity () public view returns(uint) { //getter
        return creativity;
    }

    function check_friend (address _a) private view returns(bool) { //Check if the msg.sender already exists as a friend
        return friends[_a].exist;
    }

    function create_friend (address _a) private {// create a new friend
        friends[_a].rem_points = 3;
        friends[_a].exist = true;
    }

    function balance_of (address _a) public view returns(bool) { //Checks if balance is more than 0
        return friends[_a].rem_points > 0;
    }


    //To vote for creativity
    function vote_creativity () public {
        if(!check_friend(msg.sender)){
            create_friend(msg.sender);
        }
        if(friends[msg.sender].rem_points>0){
            creativity++;
            friends[msg.sender].rem_points--;
        }
    }
    //To vote for hardworker
    function vote_hardworker () public {
        if(!check_friend(msg.sender)){
            create_friend(msg.sender);
        }
        if(friends[msg.sender].rem_points>0){
            hardworker++;
            friends[msg.sender].rem_points--;
        }
    }
    //To vote for intelligent
    function vote_intelligent () public {
        if(!check_friend(msg.sender)){
            create_friend(msg.sender);
        }
        if(friends[msg.sender].rem_points>0){
            intelligent++;
            friends[msg.sender].rem_points--;
        }
    }


}
