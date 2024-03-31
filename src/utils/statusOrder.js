export const order_status_code = [
  {
    title: "Chờ xử lý",
    field_by: "order_status_code",
    field_by_value: "WAITING_FOR_PROGRESSING",
  },
  {
    title: "Đang chuẩn bị hàng",
    field_by: "order_status_code",
    field_by_value: "PACKING",
  },
  {
    title: "Hết hàng",
    field_by: "order_status_code",
    field_by_value: "OUT_OF_STOCK",
  },
  {
    title: "Đang giao hàng",
    field_by: "order_status_code",
    field_by_value: "SHIPPING",
  },
  {
    title: "Đã nhận hàng",
    field_by: "order_status_code",
    field_by_value: "RECEIVED_PRODUCT",
  },

  {
    title: "Đã hoàn thành",
    field_by: "order_status_code",
    field_by_value: "COMPLETED",
  },
  {
    title: "Shop hủy",
    field_by: "order_status_code",
    field_by_value: "USER_CANCELLED",
  },
  {
    title: "Khách đã hủy",
    field_by: "order_status_code",
    field_by_value: "CUSTOMER_CANCELLED",
  },

  {
    title: "Lỗi giao hàng",
    field_by: "order_status_code",
    field_by_value: "DELIVERY_ERROR",
  },

  {
    title: "Chờ trả hàng",
    field_by: "order_status_code",
    field_by_value: "CUSTOMER_RETURNING",
  },
  {
    title: "Đã trả hàng",
    field_by: "order_status_code",
    field_by_value: "CUSTOMER_HAS_RETURNS",
  },
];

export const order_payment_code = [
  {
    title: "Chưa thanh toán",
    field_by: "order_status_code",
    field_by_value: "UNPAID",
  },
  {
    title: "Đã thanh toán một phần",
    field_by: "order_status_code",
    field_by_value: "PARTIALLY_PAID",
  },
  {
    title: "Đã thanh toán",
    field_by: "order_status_code",
    field_by_value: "PAID",
  },
  {
    title: "Đã hoàn tiền",
    field_by: "order_status_code",
    field_by_value: "REFUNDS",
  },
];

export const order_agency_confirm_code = [
  {
    title: "Đang chuẩn bị hàng",
    field_by: "order_status_code",
    field_by_value: "PACKING",
  },

  {
    title: "Shop hủy",
    field_by: "order_status_code",
    field_by_value: "USER_CANCELLED",
  },
  {
    title: "Khách đã hủy",
    field_by: "order_status_code",
    field_by_value: "CUSTOMER_CANCELLED",
  },

  {
    title: "Đã hoàn thành",
    field_by: "order_status_code",
    field_by_value: "COMPLETED",
  },
];
