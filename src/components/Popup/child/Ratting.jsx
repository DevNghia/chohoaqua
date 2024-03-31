import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { constants as c } from "../../../constants";
import { productActions } from "../../../actions/productActions";
import { appActions } from "../../../actions/appActions";
import { uploadImage, uploadVideo } from "../../../helper";
export default function RattingPopup(props) {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [previewImages, setPreviewImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewVideo, setPreviewVideo] = useState("");
  const [selectedVideo, setSelectedVideo] = useState("");
  const [currentRatting, setCurrentRatting] = useState(0);
  const [selectedReviews, setSelectedReviews] = useState([]);

  const rattingInfo = useSelector((state) => state.app.rattingPopup);
  const myInput = useRef(null);
  const myInputVideo = useRef(null);
  const msg = [
    "Vui lòng đánh giá",
    "Rất không hài lòng",
    "Không hài lòng",
    "Bình thường",
    "Hài lòng",
    "Rất hài lòng",
  ];
  const msgReview = [
    "Chất lượng sản phẩm tuyệt vời",
    "Đóng gói sản phẩm rất đẹp",
    "Shop phục vụ tốt",
    "Rất hài lòng",
    "Rất đáng tiền",
    "Thời gian giao hàng nhanh",
  ];

  const handleSelectReview = (msg) => {
    if (!content.includes(msg)) {
      setSelectedReviews([...selectedReviews, msg]);
      if (content === "") {
        setContent(msg);
      } else {
        setContent(`${content}. ${msg}`);
      }
    }
  };

  const handleInputChange = (e) => {
    setContent(e.target.value);
  };

  const handleClickRemove = (msg) => {
    const updatedReviews = selectedReviews.filter((review) => review !== msg);
    setSelectedReviews(updatedReviews);
    setContent(
      content.replace(`${msg}. `, "").replace(`. ${msg}`, "").replace(msg, "")
    );
  };

  async function handleSubmit() {
    let images = [];
    let video_url = "";
    for (let i = 0; i < selectedFiles.length; i++) {
      let formData = new FormData();
      formData.append("image", selectedFiles[i]);
      let url = await uploadImage(formData);
      images.push(url);
    }
    if (selectedVideo) {
      let formData = new FormData();
      formData.append("video", selectedVideo);
      video_url = await uploadVideo(formData);
    }
    if (currentRatting < 1) {
      dispatch(
        appActions.changePopup(
          c.AUTOHIDE_POPUP,
          "Vui lòng chọn mức độ hài lòng"
        )
      );
      return;
    }
    dispatch(
      productActions.reviewProduct(rattingInfo.id, {
        order_code: rattingInfo.orderCode,
        stars: currentRatting,
        content,
        images: JSON.stringify(images),
        video_url: video_url,
      })
    );
  }
  function handleUpload() {
    myInput.current.click();
  }
  useEffect(() => {
    if (!selectedFiles.length) return;
    let imageUrl = [];
    imageUrl = selectedFiles.map((v) => URL.createObjectURL(v));
    setPreviewImages(imageUrl);
    console.log(imageUrl);
    return () => URL.revokeObjectURL(imageUrl);
  }, [selectedFiles]);

  useEffect(() => {
    if (!selectedVideo) return;
    let videoUrl = [];
    videoUrl = URL.createObjectURL(selectedVideo);
    setPreviewVideo(videoUrl);
    return () => URL.revokeObjectURL(videoUrl);
  }, [selectedVideo]);
  function handleFileSelect(e) {
    if (!e.target.files) return;
    const fileList = Array.prototype.slice.call(e.target.files);
    setSelectedFiles(fileList);
  }
  function handleFileSelectVideo(e) {
    const file = e.target.files[0];

    if (!e.target.files) return;
    setSelectedVideo(file);
  }

  const iconClose = () => {
    return (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="8" cy="8" r="8" fill="#ee4d2d" />
        <path
          stroke="white"
          d="M11.1441 10.4809C11.2322 10.5689 11.2817 10.6884 11.2817 10.8129C11.2817 10.9374 11.2322 11.0569 11.1441 11.1449C11.0561 11.233 10.9366 11.2825 10.8121 11.2825C10.6876 11.2825 10.5681 11.233 10.4801 11.1449L7.99998 8.66407L5.51912 11.1441C5.43106 11.2322 5.31163 11.2817 5.18709 11.2817C5.06256 11.2817 4.94312 11.2322 4.85506 11.1441C4.767 11.0561 4.71753 10.9367 4.71753 10.8121C4.71753 10.6876 4.767 10.5681 4.85506 10.4801L7.33592 8.00001L4.85584 5.51915C4.76778 5.43109 4.71831 5.31165 4.71831 5.18712C4.71831 5.06258 4.76778 4.94315 4.85584 4.85509C4.9439 4.76703 5.06334 4.71755 5.18787 4.71755C5.31241 4.71755 5.43184 4.76703 5.5199 4.85509L7.99998 7.33595L10.4808 4.85469C10.5689 4.76663 10.6883 4.71716 10.8129 4.71716C10.9374 4.71716 11.0568 4.76663 11.1449 4.85469C11.233 4.94276 11.2824 5.06219 11.2824 5.18673C11.2824 5.31126 11.233 5.4307 11.1449 5.51876L8.66405 8.00001L11.1441 10.4809Z"
          fill="#697A8D"
        />
      </svg>
    );
  };
  return (
    <div className="modal center">
      <div className="ratting-popup">
        <span>{rattingInfo.name}</span>
        <h4>{msg[currentRatting]}</h4>
        <div className="stars">
          {[1, 2, 3, 4, 5].map((v, i) => (
            <i
              key={i}
              className={v <= currentRatting ? "fas fa-star" : "far fa-star"}
              onClick={() => setCurrentRatting(v)}
            ></i>
          ))}
        </div>
        <textarea
          rows="8"
          placeholder="Đánh giá của bạn"
          value={content}
          onChange={handleInputChange}
        ></textarea>

        <div className="list-review-ex">
          {msgReview.map((item, index) => {
            return (
              <div
                key={item}
                onClick={() => handleSelectReview(item)}
                className={`item-review ${
                  content.includes(item) ? "active" : ""
                }`}
              >
                {item}
                {content.includes(item) ? (
                  <div
                    className="icon-close"
                    onClick={() => handleClickRemove(item)}
                  >
                    {iconClose()}
                  </div>
                ) : (
                  ""
                )}
              </div>
            );
          })}
        </div>
        <input
          multiple={true}
          type="file"
          accept="image/jpeg, image/jpg, image/png"
          ref={myInput}
          style={{ display: "none" }}
          onChange={handleFileSelect}
        />
        <input
          type="file"
          accept="video/*"
          ref={myInputVideo}
          style={{ display: "none" }}
          onChange={handleFileSelectVideo}
        />
        <div className="preview-images">
          {" "}
          {previewVideo && (
            <div style={{ position: "relative" }}>
              <div className="img-container">
                <video
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <source src={previewVideo} />
                </video>
                <div
                  className="video_icon"
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    padding: "1px 3px",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                  }}
                >
                  <svg width="23" height="18" viewBox="0 0 23 18" fill="white">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M5 4C4.44772 4 4 4.44772 4 5V13C4 13.5523 4.44772 14 5 14H13C13.5523 14 14 13.5523 14 13V5C14 4.44772 13.5523 4 13 4H5ZM11.5 9C11.5 10.3807 10.3807 11.5 9 11.5C7.61929 11.5 6.5 10.3807 6.5 9C6.5 7.61929 7.61929 6.5 9 6.5C10.3807 6.5 11.5 7.61929 11.5 9ZM9 10.6667C9.92047 10.6667 10.6667 9.92047 10.6667 9C10.6667 8.07952 9.92047 7.33333 9 7.33333C8.07953 7.33333 7.33333 8.07952 7.33333 9C7.33333 9.92047 8.07953 10.6667 9 10.6667ZM18.1667 4.83333L14.8333 7.33306V10.6667L18.1667 13.1667V4.83333Z"
                      fill="white"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          )}
          {previewImages.map(
            (v, i) =>
              i <= 7 && (
                <div key={i} style={{ position: "relative" }}>
                  <div className="img-container" key={i}>
                    <img src={v} alt="" />
                  </div>
                  {i === 7 && previewImages.length > 8 && (
                    <div className="show-number">
                      {`+${previewImages.length - 7}`}
                    </div>
                  )}
                </div>
              )
          )}
        </div>
        <div
          className="row"
          style={{
            columnGap: "15px",
            justifyContent: "space-between",
          }}
        >
          <button className="submit-btn" onClick={handleSubmit}>
            Gửi đánh giá
          </button>
          {previewImages.length == 0 && (
            <button className="image-btn" onClick={handleUpload}>
              Thêm ảnh
            </button>
          )}
          {previewVideo === "" && (
            <button
              className="image-btn"
              onClick={() => myInputVideo.current.click()}
            >
              Thêm video
            </button>
          )}
        </div>
        <button className="close-btn" onClick={props.handleClose}>
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
  );
}
