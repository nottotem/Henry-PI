import "./Inicio.css";
import { Link } from "react-router-dom";

const Inicio = () => {
  return (
    <>
      <video
        src="https://vod-progressive.akamaized.net/exp=1675092107~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F4606%2F15%2F398031815%2F1695446087.mp4~hmac=16a12ff45d005c3446ab8d06a1ce7f7884a203153e19e3c2e62eedb0300aade3/vimeo-prod-skyfire-std-us/01/4606/15/398031815/1695446087.mp4"
        autoplay="true"
        muted="true"
        loop="true"
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
