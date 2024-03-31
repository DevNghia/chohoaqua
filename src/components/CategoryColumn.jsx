import { useRef } from "react";

export default function CategoryCard(props) {
  return (
    <div
      style={{ backgroundColor: "white" , "border-bottom":  "2px dotted #e5e5e5", paddingTop:10 }}
      className="product-category-toggle-1 flex items-center"
      data-url="/danh-muc-san-pham"
    >
      <em className="ri-align-left" />
      <strong>&nbsp;&nbsp;{props.title}</strong>
      <em className="ri-arrow-drop-down-fill" />
    </div>
  );
}
