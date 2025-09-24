import { useParams } from "react-router-dom";
 
const SongDetails = () => {
    const { songid } = useParams();
    
    console.log(songid);
};
export default SongDetails;
