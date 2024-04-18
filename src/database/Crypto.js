const Bottleneck = require('bottleneck');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const api_url = 'https://www.buda.com/api/v2/markets';

let markets = {}; // Initialize markets as an empty object
let marketIds = []; // Initialize marketIds as an empty array
let marketSpread = []; // Initialize marketSpread as an empty array
// Create a new limiter that allows 1 request per second
const limiter = new Bottleneck({
  minTime: 1000 // 1 second
});

const calculateSpread = (asks, bids) => {
    if (!asks || !bids || asks.length === 0 || bids.length === 0) {
        return null;
    }
    const lowestAsk = parseFloat(asks[0][0]);
    const highestBid = parseFloat(bids[0][0]);
    return lowestAsk - highestBid;
};

const fetchOrderBookAndCalculateSpread = async (marketId) => {
    try {
        const response = await limiter.schedule(() => axios.get(`${api_url}/${marketId}/order_book`));
        const orderBook = response.data.order_book;
        return calculateSpread(orderBook.asks, orderBook.bids);
    } catch (error) {
        console.error(error);
    }
};

const fetchData = async () => {
    let idAlert = getIdAlert();
    let spreadAlert = getSpreadAlert();
    try {
        const response = await axios.get(api_url);
        markets = response.data; // Assign the response data to markets
        // Update marketIds with the ids from the new data
        if (markets && markets.markets) {
            marketIds = markets.markets.map(market => market.id); // Obtencion de todos los ids de los mercados
            marketSpread = await Promise.all(marketIds.map(id => fetchOrderBookAndCalculateSpread(id)));
        }
    } catch (error) {
        // Handle the error in case the request fails
        console.error(error);
    }
};

const getIdAlert = () => {
    try {
        const data = fs.readFileSync(path.join(__dirname, 'IdAlert.txt'), 'utf8');
        return data;
    } catch (error) {
        console.error(error);
    }
};

const getSpreadAlert = () => {
    try {
        const data = fs.readFileSync(path.join(__dirname, 'SpreadAlert.txt'), 'utf8');
        return parseFloat(data);
    } catch (error) {
        console.error(error);
    }
};



// Execute fetchData every 5 seconds (5000 milliseconds)

setInterval(fetchData, 5000);


const getAllCryptoElements = () => {
    return markets;
}; 

const getAllCryptoNames = () => {
    return marketIds;
};

const getMarketSpread = () => {
    return marketSpread;
};


module.exports = {
    getAllCryptoElements,
    getAllCryptoNames,
    getMarketSpread,
};