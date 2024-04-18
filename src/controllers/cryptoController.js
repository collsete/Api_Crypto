const cryptoService = require('../services/cryptoService');

// Controlador para obtener todos los elementos
const getAllCryptoElements = (req, res) => {
    const allCrypto = cryptoService.getAllCryptoElements();
    res.send({status: 'OK', data: allCrypto});
};

const getAllCryptoNames = (req, res) => {
    const cryptoName = cryptoService.getAllCryptoNames ();
    res.send({status: 'OK', data: cryptoName});
};

const getMarketSpread = (req, res) => {
    const marketSpread = cryptoService.getMarketSpread();
    res.send({status: 'OK', data: marketSpread});
};

// Controlador para obtener un elemento por su ID
const getCryptoElementById = (req, res) => {
    const crypto = cryptoService.getCryptoElementById(req.params.cryptoId);
    res.send({status: 'OK', data: crypto});
};

// Controlador para crear un nuevo elemento
const createNewCryptoElement = (req, res) => {
    const createdCrypto = cryptoService.createNewCryptoElement(req.body);
    res.send({status: 'OK', data: createdCrypto});
};

// Controlador para actualizar un elemento existente
const updateCryptoElement = (req, res) => {
    const updatedCrypto = cryptoService.updateCryptoElement(req.params.cryptoId, req.body);
    res.send({status: 'OK', data: updatedCrypto});
};

// Controlador para eliminar un elemento
const deleteCryptoElement = (req, res) => {
    const deletedCrypto = cryptoService.deleteCryptoElement(req.params.cryptoId);
    res.send({status: 'OK', data: deletedCrypto});
};

// Controlador para establecer el spread de "alerta"
const setAlertSpread = (req, res) => {
    cryptoService.setAlertSpread(req.body.spread);
    res.send({status: 'OK', message: 'Spread de alerta establecido correctamente'});
};

// Controlador para comprobar el spread de "alerta"
const checkAlertSpread = (req, res) => {
    const message = cryptoService.checkAlertSpread();
    res.send({status: 'OK', message: message});
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