import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';


const PlayPause = ({ isPlaying, activeSong, song, handlePause, handlePlay }) => {
  const activeKey = activeSong?.key || activeSong?.id;
  const songKey = song?.key || song?.id;

  const isCurrentActive = isPlaying && activeKey && songKey && activeKey === songKey;

  return (
    isCurrentActive ? (
      <FaPauseCircle
        size={35}
        className="text-gray-300"
        onClick={handlePause}
      />
    ) : (
      <FaPlayCircle
        size={35}
        className="text-gray-300"
        onClick={handlePlay}
      />
    )
  );
};

export default PlayPause;
