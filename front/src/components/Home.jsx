import React from 'react'
import { useMultifetch } from '../hooks/useMultiFetch';
import { getMovies } from '../services/getMovies';
import { getSeries } from '../services/getSeries';
import { getMovieAdapter } from '../adapters/getMovieAdapter';
import { getSeriesAdapter } from '../adapters/getSeriesAdapter';
import { TMDB_PATHS } from '../remote/TMDB_API';
import { List } from './List/List';
import { AppSwiper } from './app_swiper/app_swiper';
import { AppSwiperSlide } from './app_swiper/components/app_swiper_slide';

const Home = () => {
    const { list, isLoading, error } = useMultifetch([
        {
            name: 'Peliculas Populares',
            request: getMovies,
            adapter: getMovieAdapter,
            endpoint: TMDB_PATHS.movies.popular
        },
        {
            name: 'Series Populares',
            request: getSeries,
            adapter: getSeriesAdapter,
            endpoint: TMDB_PATHS.series.popular
        },
        {
            name: 'Peliculas de Terror',
            request: getMovies,
            adapter: getMovieAdapter,
            endpoint: TMDB_PATHS.movies.discover,
            endpoint_params: {
                params: {
                    with_genres: TMDB_PATHS.genres.terror
                }
            }
        },
        {
            name: 'Animes',
            request: getSeries,
            adapter: getSeriesAdapter,
            endpoint: TMDB_PATHS.series.discover,
            endpoint_params: {
                params: {
                    with_origin_country: TMDB_PATHS.region.japon
                }
            }
        }
    ]);
    return (
        <>
                {error ?? (<h1>{error}</h1>)}
                {isLoading ? 
                (<h1>Cargando....</h1>) :
                (<>
                    <List 
                        list={list}
                        renderList={(carousel, index) => (
                            <AppSwiper key={`${carousel.name}_${index}`} carouselName={carousel.name} >
                                <AppSwiperSlide carouselResults={carousel.results}></AppSwiperSlide>
                            </AppSwiper>
                        )}
                    />
                </>)}
        </>
    );
};

export default Home;
