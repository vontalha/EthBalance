const express = require('express');
const bodyParser = require('body-parser');
const ethers = require('ethers');
const ejs = require('ejs');
const { redirect } = require('express/lib/response');
const port = 3000;

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

const INFURA_ID = '' //add Infura Project ID
const provider = new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/' + INFURA_ID);
var address;
var balance;



app.get('/',  (req, res)=>{
    res.render('list', {
        accountBalance: balance
    })
})

app.post('/', async (req, res)=>{
    address = req.body.account;
    balance = await provider.getBalance(address);
    balance = ethers.utils.formatEther(balance)
    res.redirect('/');
})

app.listen(port, ()=>{
    console.log('listening on:' + port);
})

