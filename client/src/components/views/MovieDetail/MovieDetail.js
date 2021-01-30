import { Row } from 'antd';
import React, { useCallback, useState } from 'react';
import { useEffect } from 'react';
import { API_KEY, API_URL, IMAGE_BASE_URL } from '../../Config';
import GridCards from '../Commons/GridCards';
import MainImage from '../LandingPage/Sections/MainImage';
import Favorite from './Sections/Favorite';
import MovieInfo from './Sections/MovieInfo';

export default function MovieDetail({ match }) {
  console.log('match: ', match);
  const movieId = match.params.movieId;
  const [movie, setMovie] = useState(null);
  const [casts, setCasts] = useState(null);
  const [actorToggle, setActorToggle] = useState(false);

  useEffect(() => {
    const endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;
    const endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;

    fetchUtil(endpointInfo, setMovie);
    fetchUtil(endpointCrew, setCasts);
  }, []);

  const toggleActorView = useCallback(() => setActorToggle(!actorToggle), [actorToggle]);

  const fetchUtil = useCallback(
    (endpoint, setStateFunc) => {
      fetch(endpoint)
        .then((res) => res.json())
        .then((res) => {
          console.log('res: ', res);
          setStateFunc(res);
        });
    },
    [movie]
  );

  return (
    <div>
      {/* Header */}

      {movie && (
        <MainImage
          title={movie.original_title}
          text={movie.overview}
          image={`${IMAGE_BASE_URL}w1280${movie.backdrop_path}`}
        />
      )}

      {/* Body */}
      <div style={{ width: '85%', margin: '1rem auto' }}>
        {movie && (
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Favorite movieInfo={movie} userFrom={localStorage.getItem('userId')} movieId={movieId} />
          </div>
        )}

        {/* Movie Info */}
        {movie && <MovieInfo movie={movie} />}

        <br />
        {/* Actors Grid */}

        <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
          <button onClick={toggleActorView}>Toggle Actor view</button>
        </div>

        {actorToggle && (
          <Row gutter={[16, 16]}>
            {casts &&
              casts.cast.map((item, idx) => (
                <React.Fragment key={idx}>
                  <GridCards
                    image={item.profile_path ? `${IMAGE_BASE_URL}w500${item.profile_path}` : null}
                    characterName={item.name}
                  />
                </React.Fragment>
              ))}
          </Row>
        )}
      </div>
    </div>
  );
}
