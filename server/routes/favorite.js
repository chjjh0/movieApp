const express = require('express');
const router = express.Router();
const { Favorite } = require('../models/Favorite');

const { auth } = require('../middleware/auth');

//=================================
//             Favorite
//=================================

// Favorite 수 조회
router.post('/favoriteNumber', (req, res) => {
  const { movieId } = req.body;
  // console.log('favoriteNumber', req.body);
  Favorite.find({ movieId: movieId }).exec((err, info) => {
    // console.log('결과', info);
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, favoriteNumber: info.length });
  });
});

// login한 user의 Favorite 여부 조회
router.post('/favorited', (req, res) => {
  const { movieId, userFrom } = req.body;
  Favorite.find({ movieId, userFrom }).exec((err, info) => {
    // console.log('결과', info);
    if (err) return res.status(400).send(err);
    let result = false;
    if (info.length !== 0) {
      result = true;
    }
    res.status(200).json({ success: true, favorited: result });
  });
});

// /favorite 페이지의 favorite list 조회
router.post('/getFavoritedMovie', (req, res) => {
  const { userFrom } = req.body;
  Favorite.find({ userFrom }).exec((err, favorites) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, favorites });
  });
});

// Favorite 추가
router.post('/addToFavorite', (req, res) => {
  // const { movieId, userFrom, movieTitle, moviePost, movieRuntime } = req.body;
  const favorite = new Favorite(req.body);

  favorite.save((err, doc) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true });
  });
});

// Favorite 삭제
router.post('/removeFromFavorite', (req, res) => {
  const { movieId, userFrom } = req.body;
  Favorite.findOneAndDelete({ movieId, userFrom }).exec((err, doc) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, doc });
  });
});

module.exports = router;
