var ArtistContract = artifacts.require("Artist");

module.exports = function(deployer){
	deployer.deploy(ArtistContract);
}
