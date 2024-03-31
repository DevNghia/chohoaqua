import { allowCalculate } from "../components/Header/dataset";

export const getListMenu = (appTheme) => {
  if (appTheme != null && appTheme.is_use_custom_menu == true) {
    var menuList = JSON.parse(appTheme.json_custom_menu);

    var newList = [];
    if (Array.isArray(menuList)) {
      menuList.forEach(function (value, index) {
        if (value.name != null) {
          newList.push({
            index: index,
            name: value.name,
            link_to: value.link_to,
            image: value.image,
          });
        }
      });
    }
    return newList;
  } else {
    var listMenu = [
      {
        name: "Trang chủ",
        link_to: "/",
        image: "/img/icon_home.png",
      },
      {
        name: "Sản phẩm",
        link_to: "/san-pham",
        image: "/img/icon_product.png",
      },
      {
        name: "Tin tức",
        link_to: "/tin-tuc",
        image: "/img/icon_news.png",
      },
      {
        name: "Voucher",
        link_to: "/ma-giam-gia",
        image: "/img/icon_voucher.png",
      },
      {
        name: "Combo tặng thưởng",
        link_to: "/combo-giam-gia",
        image: "/img/icon_combo.png",
      },
    ];
    // if (allowCalculate()) {
    //   listMenu.push({
    //     name: "Báo giá",
    //     link_to: "/bao-gia",
    //     image: "/img/icon_money.png",
    //   });
    // }

    return listMenu;
  }
};
