import { Link } from "react-router-dom";
import { useRef } from "react";
import { handleImgErr } from "../../../helper";
export default function BlogCard(props) {
  const date = props.date ? props.date.split(" ")[0] : "";
  const myLink = useRef(null);
  function handleClick() {
    myLink.current.click();
  }
  return (
    <div className="blog-card" onClick={handleClick}>
      <div style={{ display: "none" }}>
        <Link
          ref={myLink}
          to={
            props.title
              ? `/tin-tuc/${props.slug}-${props.id}`
              : `/tin-tuc/${props.id}`
          }
        />
      </div>
      <div className="image">
        <div className="img-container">
          <img src={props.img} alt="" onError={handleImgErr} />
        </div>
      </div>
      <div className="content">
        <div className="blog-title">{props.title}</div>
        <div className="date">
          <span>{date ? date.split("-")[2] : ""}</span>
          <br />
          {date ? `Th${date.split("-")[1]}` : ""}
        </div>
        <div className="line"></div>
        <div
          className="blog-quote"
          dangerouslySetInnerHTML={{ __html: extractContent(props.quote) }}
        ></div>
      </div>
    </div>
  );

  function extractContent(s) {
    var span = document.createElement("span");
    span.innerHTML = s;
    return span.textContent || span.innerText;
  }
}
