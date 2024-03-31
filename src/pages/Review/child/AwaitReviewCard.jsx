import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { constants as c } from "../../../constants";
import { appActions } from "../../../actions/appActions";
export default function AwaitReviewCard(props) {
  let { id, name, images, stars, content,order_code } = props;
  images = images && images.length > 0 ? images : [{ image_url: c.DEFAULT_PRODUCT_IMG }]
  const dispatch = useDispatch();
  const appTheme = useSelector(state => state.app.appTheme);

  function openRattingForm(product) {
    dispatch(
      appActions.changePopup(c.RATTING_POPUP, "", {
        id: id,
        name: name,
        orderCode: order_code,
      })
    );
  }
  return (
    <React.Fragment>
      <div className='review-card'>
        <div className="row">
          <div className="image">
            <div className="img-container">
              <img src={images[0].image_url} alt="" style={{ background: "url(/img/default_product.jpg)", backgroundSize: "contain" }} />
            </div>
          </div>
          <div className="info" style={{width:"100%"}}>
            <div className="name">
              {name}
            </div>
          
            <div>
              <a href={`/san-pham/${id}`}>Thông tin sản phẩm</a>
            </div>

            <button
                style={{
                  padding: "6px 8px",
                  borderRadius: "0.25em",
                  color: "white",
                  marginTop: "0.5em",
                  background: appTheme.color_main_1 ,
                }}
                onClick={openRattingForm}
              >
                Đánh giá ngay
              </button>
          </div>
        
        </div>
        
      </div>
    </React.Fragment>
  )
}