import "./Inicio.css";
import { Link } from "react-router-dom";

const Inicio = () => {
  return (
    <>
      <video
        src="https://vod-progressive.akamaized.net/exp=1675204761~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F4606%2F15%2F398031815%2F1695446114.mp4~hmac=00424cb56938cafd4f33aed7e91d998e0e33ed6b027ec1e27b86bef8741abac3/vimeo-prod-skyfire-std-us/01/4606/15/398031815/1695446114.mp4"
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
