export function toPage(typeAction, valueAction) {
  if (typeAction === "PRODUCT") {
    window.location.href = `/san-pham/${valueAction}`;
  }
  if (typeAction === "CATEGORY_PRODUCT") {
    window.location.href = `/san-pham?danh-muc${valueAction}`;
  }
  if (typeAction === "POST") {
    window.location.href = `/tin-tuc/${valueAction}`;
  }
  if (typeAction === "CATEGORY_POST") {
    window.location.href = `/tin-tuc?danh-muc=${valueAction}`;
  }
  if (typeAction === "LINK") {
    window.location.href = `${valueAction}`;
  }
}

export function hexToRgbHeader(hex) {
  // Lấy ba thành phần màu từ mã HEX
  var bigint = parseInt(hex.slice(1), 16);
  var r = (bigint >> 16) & 255;
  var g = (bigint >> 8) & 255;
  var b = bigint & 255;

  var g2 = 255
  var b2 = 0

  if(g <= 205) {
    g2 = g + 50
  }
  
  if(b >= 30 ) {
    b2 = b - 30
  }

  // Trả về một chuỗi RGB
  return {
    first: "rgb(" + r + ", " + g + ", " + b + ")",
    second: "rgb(" + r + ", " + g2 + ", " + b2 + ")",
  }
}
