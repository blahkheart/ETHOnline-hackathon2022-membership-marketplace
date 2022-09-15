// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.4 <0.9.0;

import "./interface/IPublicLockV10.sol";
/**
 * @title MembersHub
 * @dev Broadcast memberships via tags
 * @author Danni Thomx
 */
contract MembersHub {
    string[] public tags;

    event NewTag(string indexed tag, address indexed creator);
    event BroadcastMembership(address indexed membershipAddress, address creator, string[] indexed relatedTags);
      
    struct Membership {
        address membershipAddress;
        address creator;
        string[] relatedTags;
    }
    
    mapping(address => Membership) public membershipsData;
    mapping(address => bool) allBroadcasts;
    // IPublicLock public publicLock;


    // /**
    //  * @dev check if tag already exists 
    //  * @param string to check
    //  */
    function doesTagExist( string memory _stringToSearch) public view returns(bool){
       string[] memory arr = tags;
       for(uint256 i =0; i < arr.length; i++){
           if(keccak256(abi.encodePacked(arr[i])) == keccak256(abi.encodePacked(_stringToSearch))){
               return true;
           }
       }
        return false;
    }

    // /**
    //  * @dev add new tag 
    //  * @param string to add
    //  */

    function addTag(string memory _newTag) public returns(string[] memory tag) {
        require(keccak256(abi.encodePacked(_newTag)) != keccak256(abi.encodePacked("")), "Invalid tag");
        require(doesTagExist(_newTag) == false, "tag exists" );
        tags.push(_newTag);
        emit NewTag(_newTag, msg.sender);
        return tags;
    }

    // /**
    //  * @dev get all tags 
    //  */
    function getTags() public view returns (string[] memory){
        return tags;
    }

    // @dev set membershipData
    function _setMembershipData(address _membershipAddr, string[] memory _relatedTags) private {
        membershipsData[_membershipAddr] = Membership(_membershipAddr, msg.sender, _relatedTags);
    }

    function _isLockManager (IPublicLock _publicLock) private view returns(bool) {
        IPublicLock pubLock = _publicLock;
        bool isManager = pubLock.isLockManager(msg.sender);
        return isManager;
    }

    // /**
    //  * @dev broadcast membership 
    //  * @param membership lock address
    //  * @param list of related tags
    //  */
    function broadcastMembership(IPublicLock _publicLock, string[] calldata _relatedTags)external {
        string[] memory _tags; 
        address _membershipAddress = address(_publicLock);
        // check that related tags is not empty
        require(_relatedTags.length >= 1, "Empty tags");
        // check that caller is a lock manager
        require(_isLockManager(_publicLock), "Not Manager");
        // check that membership is not already broadcasted
        require(allBroadcasts[_membershipAddress] == false, "Membership exist");
        // check that related tags are in the tags array
        for(uint i = 0; i < _relatedTags.length; i++) {
            require(doesTagExist(_relatedTags[i]) == true, "Invalid Tag");
            _tags[i] = _relatedTags[i];
        }
        //update membershipsData with provided data
        _setMembershipData(_membershipAddress, _tags);
        // add membership to allBroadcasts
        allBroadcasts[_membershipAddress] = true;
        
        // emit BroadcastMembership event
        emit BroadcastMembership(_membershipAddress, msg.sender, _tags);
    }

    function getBroadcastData(address _membershipAddr)external view returns (Membership memory) {
        Membership memory membership = membershipsData[_membershipAddr];
        return membership;
    }
 
}