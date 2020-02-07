import React, {useState, useEffect} from 'react';

const ipfsClient = require('ipfs-http-client')
// connect to ipfs daemon API server
const ipfs = ipfsClient('http://localhost:5001') // (the default in Node.js)


function IpfsFileWrite () {

  const [fileBuffer, setFileBuffer] = useState();
  const [fileHash, setFileHash] = useState("");

  const uploadFile = event => {
    event.preventDefault();

    const targetFile = event.target.files[0];
    const targetFileName = event.target.files[0].name;

    const reader = new window.FileReader();
    reader.readAsArrayBuffer(targetFile);

    reader.onloadend = () => {
      console.log('onloadend')
      console.log(Buffer(reader.result))
      setFileBuffer(Buffer(reader.result));
      // console.log("buffer", fileBuffer);
    };
  };

  const uploadFormSubmit = async event => {
    event.preventDefault();

    const ipfsVersion = await ipfs.version();
    console.log("IPFS Version=", ipfsVersion);
    console.log("Submitting file to ipfs...");

    var fHash = "";

    for await (const addResult of ipfs.add(fileBuffer)) {
      console.log(addResult);
      fHash = addResult.path;
    }
    console.log("Ipfs result", fHash);
    setFileHash(fHash);

  }

return (
  <div>

  <p>IPFSFileWrite component</p>
  <img
    src={`http://localhost:8080/ipfs/${fileHash}`}
    alt="hjh"
  />
  <p>&nbsp;</p>
  <h2>Select File to Upload</h2>
  <form onSubmit={uploadFormSubmit}>
    <input type="file" onChange={uploadFile} />
    <input type="submit" />
  </form>


  </div>
)

}

export default IpfsFileWrite;
