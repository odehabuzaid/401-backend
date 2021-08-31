const express = require('express');

const cors = require('cors');

require('dotenv').config();

const app = express();

app.use(cors());

app.use(express.json());
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/finalexam', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const PORT = process.env.PORT || 8001;

const { Controllers } = require('./controllers/User.Controllers.js');

app.get('/', (request, response) => {
  response.send('Hello am Here');
});
app.get('/getapiData', Controllers.getDataFromApi);
app.get('/favData', Controllers.getFavData);
app.post('/createFav', Controllers.createNewFavOnColl);
app.put('/updateFav/:id', Controllers.UpdateItemFromNewFav);
app.delete('/deleteFav/:id', Controllers.deleteItemFromFav);


app.listen(PORT, () => console.log(`Up & Running on Port ${PORT}`));
