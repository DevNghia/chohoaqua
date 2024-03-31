import { useSelector } from "react-redux";

export default function PageLoading(props) {
  const { style } = props;

  return (
    <div>
      {/* <img
        style={style ? style : {width : "auto" , height : "auto"}}
        src={"/img/lazyimage.gif"}
        alt="...Loading"
      /> */}
    </div>
  );
}
