const ArtistContract = artifacts.require("Artist");

contract("Artist", accounts => {
  let artist;
  const name = "Artist-One"
  const beneficiary = accounts[1];
  const owner = accounts[0];

  beforeEach (async () => {
    artist = await ArtistContract.new(
      name,
      beneficiary,
      owner
    )
  });

  describe("initialization", () => {

    it("gets the  name", async () => {
      const actual = await artist.name();
      assert.equal(actual, name, "names should match");
    });

  });

});
