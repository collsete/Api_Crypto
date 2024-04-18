const express = require('express');
const v1CryptoRouter = require ("./v1/routes/cryptoRoutes.js");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/v1/", v1CryptoRouter);

app.listen(PORT, ()=>{
    console.log(`Server listening on port${PORT}`)
});
