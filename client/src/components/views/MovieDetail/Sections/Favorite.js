import Axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { Button } from 'antd';

export default function Favorite({ movieInfo, userFrom, movieId }) {
  const movieTitle = movieInfo.title;
  const moviePost = movieInfo.backdrop_path;
  const movieRuntime = movieInfo.runtime;
  let variables = {
    userFrom,
    movieId,
    movieTitle,
    moviePost,
    movieRuntime,
  };

  const [favoriteNumber, setFavoriteNumber] = useState(0);
  const [favorited, setFavorited] = useState(false);

  const onClickFavorite = useCallback(() => {
    // Favorite 삭제
    if (favorited) {
      Axios.post('/api/favorite/removeFromFavorite', variables).then((res) => {
        if (res.data.success) {
          // console.log('aaa', res);
          setFavoriteNumber((prev) => prev - 1);
          setFavorited(!favorited);
        } else {
          alert('Favorite 리스트에서 지우는 걸 실패했습니다.');
        }
      });
    }
    // Favorite 추가
    else {
      Axios.post('/api/favorite/addToFavorite', variables).then((res) => {
        if (res.data.success) {
          // console.log('aaa', res);
          setFavoriteNumber((prev) => prev + 1);
          setFavorited(!favorited);
        } else {
          alert('Favorite 리스트에서 추가하는 걸 실패했습니다.');
        }
      });
    }
  }, [favorited]);

  useEffect(() => {
    console.log('favorite');
    Axios.post('/api/favorite/favoriteNumber', variables).then((res) => {
      if (res.data.success) {
        // console.log('aaa', res);
        setFavoriteNumber(res.data.favoriteNumber);
      } else {
        alert('숫자 정보를 가져오는데 실패했습니다.');
      }
    });

    Axios.post('/api/favorite/favorited', variables).then((res) => {
      if (res.data.success) {
        console.log('aaa', res);
        setFavorited(res.data.favorited);
      } else {
        alert('숫자 정보를 가져오는데 실패했습니다.');
      }
    });
  }, []);

  return (
    <div>
      <Button onClick={onClickFavorite}>
        {favorited ? 'Not Favorite' : 'Add to Favorite'}
        {favoriteNumber}
      </Button>
    </div>
  );
}
