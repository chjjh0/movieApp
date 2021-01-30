import React, { useEffect, useState } from 'react';
import { FaCode } from 'react-icons/fa';
import { API_URL, API_KEY, LANGUAGE_EN, IMAGE_BASE_URL } from '../../Config';
import { Row } from 'antd';
import GridCards from '../Commons/GridCards';
import MainImage from './Sections/MainImage';
import { useCallback } from 'react';

function LandingPage() {
  const [movies, setMovies] = useState([]);
  const [mainMovieImage, setMainMovieImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=${LANGUAGE_EN}&page=${currentPage}`;
    fetchMovies(endpoint);
  }, []);

  const loadMoreItems = useCallback(() => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=${LANGUAGE_EN}&page=${currentPage + 1}`;
    fetchMovies(endpoint);
  }, [currentPage]);

  const fetchMovies = useCallback(
    (endpoint) => {
      fetch(endpoint)
        .then((res) => res.json())
        .then((res) => {
          console.log('res: ', res);

          setMovies(movies.concat(res.results));
          setMainMovieImage(res.results[0]);
          setCurrentPage(res.page);
        });
    },
    [movies, currentPage]
  );

  return (
    <div style={{ width: '100%', margin: '0' }}>
      {mainMovieImage && (
        <MainImage
          title={mainMovieImage.original_title}
          text={mainMovieImage.overview}
          image={`${IMAGE_BASE_URL}w1280${mainMovieImage.backdrop_path}`}
        />
      )}
      <div style={{ width: '85%', margin: '1rem auto' }}>
        <h2>Movies by latest</h2>
        <hr />
        {/* gutter: 좌/우 여백 */}
        <Row gutter={[16, 16]}>
          {movies &&
            movies.map((item, idx) => (
              <React.Fragment key={idx}>
                <GridCards
                  landingPage
                  image={item.poster_path ? `${IMAGE_BASE_URL}w500${item.poster_path}` : null}
                  movieId={item.id}
                  movieName={item.original_title}
                />
              </React.Fragment>
            ))}
        </Row>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button onClick={loadMoreItems}>Load More</button>
      </div>
    </div>
  );
}

export default LandingPage;
