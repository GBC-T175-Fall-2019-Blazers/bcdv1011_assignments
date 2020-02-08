import React from "react";
import Web3 from "web3";
import { STOCK_ORACLE_ABI, STOCK_ORACLE_ADDRESS } from "./quotecontract";
import "./App.css";
import "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import axios from 'axios';


// FM15CT1NBDLTAC08

// Web3 provider
const web3 = new Web3("http://localhost:8545");

function App() {
  const [data, setStock] = React.useState("");

  //contract name
  const stockQuote = new web3.eth.Contract(
    STOCK_ORACLE_ABI,
    STOCK_ORACLE_ADDRESS
  );

  const [price, setPrice] = React.useState(0);
  const [volume, setVolume] = React.useState(0);
  const [symbol, setSymbol] = React.useState("");
  const [searchSymbol, setSearchSymbol] = React.useState("");


  const setData = async () => {

    // Fetch data
    const ORACLE_URL = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + symbol + "&apikey=DRIWM88O7D2JEH5U";
    fetch(ORACLE_URL)
      .then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          return response.json();
        } else {
          throw Error(response.statusText);
        }
      })
      .then((responseJson) => {
        callContractSetStock(responseJson);
      })
      .catch((error) => {
        console.error('Error:', error);
      });


  };

  const callContractSetStock = async (responseJson) => {

    // process  response data from Oracle
    console.log(responseJson);
    const stockData = responseJson["Global Quote"];
    console.log('stock-data-symbol: ' + stockData['01. symbol']);
    console.log('stock-data-price: ' + stockData['05. price'])
    console.log('stock-data-volume: ' + stockData['06. volume'])

    setPrice(stockData['05. price']);
    setVolume(stockData['06. volume']);

    const symbolInHex = web3.utils.stringToHex(symbol);
    console.log('stock-data-symbol-hex: ' + symbolInHex);

    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];

    console.log("Transaction-Account 0: ", accounts[0]);
    const result = await stockQuote.methods
      .setStock(symbolInHex, price, volume)
      .send({ from: account });
      console.log('Transaction-Result: ' + result);
  }

  const getData = async () => {

   var retval = await stockQuote.methods
    .getStockPrice(web3.utils.fromAscii(searchSymbol))
    .call();
    console.log(retval);

  };

  return (
    <div className="box m-auto">
      <div className="App-Content">
        <Form>
          <FormControl fullWidth>
            <div>
              <TextField
                label="Symbol"
                fullWidth
                onChange={e => setSymbol(e.target.value)}
              />
            </div>
            <Box m={1} />
            <div>
              <TextField
                type="Number"
                label="Price"
                fullWidth
                onChange={e => setPrice(e.target.value)}
              />
            </div>
            <Box m={1} />
            <div>
              <TextField
                type="Number"
                label="Volume"
                fullWidth
                onChange={e => setVolume(e.target.value)}
              />
            </div>
            <Box m={3} />
            <Button onClick={setData} variant="contained" color="primary">
              Submit
            </Button>
            <Box m={3} />
            <div className="form-group">
              <TextField label="Symbol Search" fullWidth
              onChange={e => setSearchSymbol(e.target.value)}

              />
              <Box m={3} />
              <Button onClick={getData} variant="contained" color="primary">
                Search
              </Button>
            </div>
          </FormControl>
        </Form>
      </div>
    </div>
  );
}

export default App;
