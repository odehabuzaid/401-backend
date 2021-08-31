const axios = require('axios');

const UserModel = require('../model/UserModel');

const Controllers = {};

Controllers.getDataFromApi = function (req, res) {
  const email = req.query.email;

  const requestConfig = {
    method: 'get',
    url: process.env.CRYPTO_API_URL,
  };
  axios(requestConfig)
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      req.send(response.err);
    });

  UserModel.findOne({ email: email }, (err, user) => {
    if (err) {
      res.send(err);
    } else {
      if (!user) {
        let newUser = new UserModel({
          email: email,
          fav: [
            {
              title: 'Ethereum',
              description:
                'Ethereum is a decentralized, open-source blockchain with smart contract functionality. Ether is the native cryptocurrency of the platform. After Bitcoin, it is the largest cryptocurrency by market capitalization. Ethereum was invented in 2013 by programmer Vitalik Buterin.',
              toUSD: '3,288.49',
              image:
                'https://media.wired.com/photos/598a36a7f15ef46f2c68ebab/master/pass/iStock-696221484.jpg',
            },
          ],
        });
        newUser.save();
        console.log(newUser);
      }
    }
  });
};

Controllers.getFavData = function (req, res) {
  const email = req.query.email;
  UserModel.findOne({ email: email }, (err, user) => {
    if (err) {
      res.send(err);
    } else {
      if (user) {
        console.log(user);
        res.send(user);
      }
    }
  });
};

Controllers.createNewFavOnColl = function (req, res) {
  const { email, title, description, toUSD, image_url } = req.query;

  UserModel.findOne({ email: email }, (err, user) => {
    if (err) {
      res.send(err);
    } else {
      let theFav = user.fav.filter((item) => item.title === title);
      if (theFav.length > 0) {
        res.send('allready in Favorites');
      } else {
        let newFav = {
          title: title,
          description: description,
          toUSD: toUSD,
          image: image_url,
        };
        user.fav.push(newFav);
        user.save();
        res.send('added Successfully');
      }
    }
  });
};

Controllers.UpdateItemFromNewFav = function (req, res) {
  const { title, description, toUSD, image, index } = req.query;

  UserModel.findById({ _id: req.params.id }, (err, user) => {
    if (err) {
      res.send(err);
    } else {
      user.fav[index].title = title;
      user.fav[index].description = description;
      user.fav[index].toUSD = toUSD;
      user.fav[index].image = image;
      user.save();
      res.send('updated Successfully');
    }
  });
};

Controllers.deleteItemFromFav = function (req, res) {
  const { index } = req.query.index;
  UserModel.findByid({ _id: req.params.id }, (err, user) => {
    if (err) {
      res.send(err);
    } else {
      user.fav.splice(index, 1);
      user.save();
      res.send('deleted Successfully');
    }
  });
};

module.exports = { Controllers };
