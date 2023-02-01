import "./Inicio.css";
import { Link } from "react-router-dom";
import videolanding from "../../media/videolanding.mp4";

const Inicio = () => {
  return (
    <>
      <video
        src={videolanding}
        autoplay={true}
        muted={true}
        loop={true}
      ></video>
      <div className="divButton">
        {/* <h1>Landing</h1> */}
        <Link to="/videogames">
          <button className="enterButton">
            <span>LET'S PLAY!</span>
          </button>
        </Link>
      </div>
    </>
  );
};

export default Inicio;
