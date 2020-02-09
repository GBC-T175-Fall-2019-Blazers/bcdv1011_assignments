pragma solidity >0.4.23 <0.7.0;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract Artist is ERC721, Ownable {

  string public name;



}
pragma solidity ^0.6.0;
contract Artist {

    // Collection of artworks by this Artist
    mapping(uint => ArtWork) artworks;
    address artist;

    constructor() public {
        artist = msg.sender;
    }

    function createArtwork(uint hashIPFS, string memory Name) public returns (ArtWork) {
       ArtWork artContract = new ArtWork(hashIPFS, Name, artist);
       artworks[hashIPFS] = artContract;
       return artContract;
    }

    function checkArtwork(uint hashIPFS) public view returns(bool) {
        if(artworks[hashIPFS] == ArtWork(0x0)) {
            return false;
        }
        return true;
    }
}

contract ArtWork {

    // Detail of artwork
    address artist;
    string  name;
    uint  hashIPFS;
    address owner;

    constructor(uint ipfsHash, string memory artName, address originalOwner) public {
        artist = msg.sender;
        name = artName;
        hashIPFS = ipfsHash;
        owner = originalOwner;
    }

    function setOwner(address newOwner) public {
        if(owner == msg.sender) {
            owner = newOwner;
        }
    }
}
