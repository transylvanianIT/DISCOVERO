import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { useGetTopChartsQuery } from '../redux/services/shazamCore';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import SongBar from './SongBar';

const TopPlay = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching } = useGetTopChartsQuery();

  const divRef = useRef(null);

  useEffect(() => {
    const isXl = window.matchMedia('(min-width: 1280px)').matches;
    if (isXl) {
      divRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const topPlays = (data || []).slice(0, 5);

  const handlePauseClick = () => {
      dispatch(playPause(false));
    };
  
  const handlePlayClick = (song, i) => {
      dispatch(setActiveSong({ song, data, i }));
      dispatch(playPause(true));
    };

  const getSongImg = (song) => song?.images?.coverart || song?.attributes?.artwork?.url?.replace('{w}', '125').replace('{h}', '125');
  const getArtistId = (song) => song?.artists?.[0]?.adamid || song?.relationships?.artists?.data?.[0]?.id;
  const getArtistName = (song) => song?.subtitle || song?.attributes?.artistName;

  return (
    <div ref={divRef} className="flex-1 xl:ml-6 ml-0 xl:mb-0 mb-6">
        <div className="w-full flex flex-col">
          <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Charts</h2>
          <Link to="/top-charts">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
            </Link>
          </div>
        <div className="mt-4 flex flex-col gap-2">
          {topPlays.map((song, i) => (
            <SongBar
              key={song?.key || song?.id || i}
                song={song}
                i={i}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePauseClick={handlePauseClick}
              handlePlayClick={handlePlayClick}
              />
            ))}
        </div>
        </div>
            
      <div className="w-full flex flex-col mt-8">
            <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Artists</h2>
          <Link to="/top-artists">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>
        <div className="mt-4 flex flex-row gap-4 overflow-x-auto hide-scrollbar">
          {topPlays.map((song, i) => {
            const artistId = getArtistId(song);
            const img = getSongImg(song)?.replace('{w}', '125').replace('{h}', '125');
            const name = getArtistName(song);
            const link = artistId ? `/artists/${artistId}` : `/search/${encodeURIComponent(name || '')}`;
            return (
              <Link key={artistId || name || i} to={link} className="flex-shrink-0">
                <img src={img} alt={name} className="w-24 h-24 rounded-full object-cover" />
              </Link>
            );
          })}
          </div>
        </div>
    </div>
    );
};

export default TopPlay;
