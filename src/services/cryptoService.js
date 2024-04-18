const markets = require('../database/Crypto');

let alertSpread = null; // Variable para almacenar el spread de "alerta"

const getAllCryptoElements = () => {
    const allCrypto = markets.getAllCryptoElements();
    return allCrypto;
};

const getAllCryptoNames= () => {
    const allCryptoNames = markets.getAllCryptoNames();
    return allCryptoNames;
};

const getMarketSpread = () => {
    const marketSpread = markets.getMarketSpread();
    return marketSpread;
};

const getCryptoElementById = () => {
    return;
};
const createNewCryptoElement = () => {
    return;
};
const updateCryptoElement = () => {
    return;
};
const deleteCryptoElement = () => {
    return;
};

// Función para establecer el spread de "alerta"
const setAlertSpread = (spread) => {
    alertSpread = spread;
};

// Función para comprobar el spread de "alerta"
const checkAlertSpread = () => {
    const marketSpread = getMarketSpread();
    if (marketSpread > alertSpread) {
        return 'El spread de mercado es mayor que el spread de "alerta"';
    } else {
        return 'El spread de mercado es menor o igual que el spread de "alerta"';
    }
};

module.exports = {
    getAllCryptoElements,
    getCryptoElementById,
    createNewCryptoElement,
    updateCryptoElement,
    deleteCryptoElement,
    getAllCryptoNames,
    getMarketSpread,
    setAlertSpread,
    checkAlertSpread
};