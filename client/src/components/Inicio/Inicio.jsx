import "./Inicio.css";
import { Link } from "react-router-dom";

const Inicio = () => {
  return (
    <>
      <video
        src="https://vod-progressive.akamaized.net/exp=1674308839~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F4606%2F15%2F398031815%2F1695446114.mp4~hmac=2279a151285dc735a1de0a6aacc3e878f88a9f944faa025cf3996a47dc57693e/vimeo-prod-skyfire-std-us/01/4606/15/398031815/1695446114.mp4"
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
