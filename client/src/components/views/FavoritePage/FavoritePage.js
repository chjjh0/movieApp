import { Popover } from 'antd';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IMAGE_BASE_URL } from '../../Config';
import './favorite.css';

export default function FavoritePage() {
  const [favorites, setFavorites] = useState(null);

  const fetchUtil = (variables) => {
    Axios.post('/api/favorite/getFavoritedMovie', variables).then((res) => {
      if (res.data.success) {
        setFavorites(res.data.favorites);
      } else {
        alert('영화 정보를 가져오는데 실패 했습니다.');
      }
    });
  };

  const onClickDelete = ({ movieId, userFrom }) => {
    console.log(movieId, userFrom);

    const variables = {
      movieId,
      userFrom,
    };

    Axios.post('/api/favorite/removeFromFavorite', variables).then((res) => {
      if (res.data.success) {
        fetchUtil({ userFrom });
      } else {
        alert('리스트에서 지우는데 실패했습니다.');
      }
    });
  };

  useEffect(() => {
    fetchUtil({ userFrom: localStorage.getItem('userId') });
  }, []);

  const content = (item) => (
    <div>{item.moviePost ? <img src={`${IMAGE_BASE_URL}w500${item.moviePost}`} /> : 'no image'}</div>
  );

  const renderCards = () =>
    favorites.map((item, idx) => (
      <tr key={idx}>
        <Popover content={content(item)} title={`${item.movieTitle}`}>
          <td>{item.movieTitle}</td>
        </Popover>
        <td>{item.movieRuntime} mins</td>
        <td>
          <button onClick={() => onClickDelete(item)}>Remove</button>
        </td>
      </tr>
    ));

  return (
    <div style={{ width: '85%', margin: '3rem auto' }}>
      <h2>Favorite Movies</h2>
      <hr />

      <table>
        <thead>
          <tr>
            <th>Movie Title</th>
            <th>Movie RunTime</th>
            <th>Remove from favorites</th>
          </tr>
        </thead>

        <tbody>{favorites && renderCards()}</tbody>
      </table>
    </div>
  );
}
