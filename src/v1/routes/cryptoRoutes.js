const express = require('express');
const router = express.Router();
const cryptoController = require("../../controllers/cryptoController");

router
    .get("/markets", cryptoController.getAllCryptoElements)
    .get("/names", cryptoController.getAllCryptoNames)   // todos los nombres de los mercados
    .get("/spread", cryptoController.getMarketSpread)   // el spread es la diferencia entre el precio de compra y el precio de venta
    .get("/:cryptoid", cryptoController.getCryptoElementById) 
    .post("/:cryptoid", cryptoController.createNewCryptoElement)
    .patch("/:cryptoid", cryptoController.updateCryptoElement)
    .delete("/:cryptoid", cryptoController.deleteCryptoElement)
    .post("/setalertSpread", cryptoController.setAlertSpread) // establece el spread de "alerta"
    .get("/alertSpread", cryptoController.checkAlertSpread); // comprueba si el spread de mercado es mayor que el spread de "alerta"

module.exports = router;