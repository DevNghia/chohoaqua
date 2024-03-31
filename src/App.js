// import "./App.css";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ComboPage } from "./pages/Combo";
import { categoryActions } from "./actions/categoryActions";
import { constants as c } from "./constants";
import { appActions } from "./actions/appActions";
import { CollaboratorPage } from "./pages/Collaborator/CollaboratorPage";
import { AgencyPage } from "./pages/Agency";
import { userActions } from "./actions/userActions";
import PageLoading from "./components/PageLoading";
import ScrollToTop from "./ScrollToTop";
// import HomePage from "./pages/Home/index.jsx";
import Header from "./components/Header";
import CartPage from "./pages/Cart/CartPage";
import moment from "moment/moment.js";

const HomePage = React.lazy(() => import("./pages/Home/index.jsx"));
const Waller = React.lazy(() => import("./pages/Wallet"));
const Chat = React.lazy(() => import("./components/Chat"));
const Popup = React.lazy(() => import("./components/Popup/Popup"));
const NewsPage = React.lazy(() => import("./pages/News/NewsPage"));
const ErrorPage = React.lazy(() => import("./pages/Error/ErrorPage"));
/////////
const TestScreen = React.lazy(() => import("./pages/TestScreen/TestScreen"));
/////////

const Toapp = React.lazy(() => import("./pages/Toapp"));
const ReviewPage = React.lazy(() => import("./pages/Review/ReviewPage"));
const AddressPage = React.lazy(() => import("./pages/Address/AddressPage"));
const VoucherPage = React.lazy(() => import("./pages/Voucher/VoucherPage"));
const Voucher = React.lazy(() => import("./pages/VoucherPage/Voucher"));
const CalculateProductPage = React.lazy(() =>
  import("./pages/CalculateProduct/CalculateProductPage")
);

const AccountPage = React.lazy(() => import("./pages/Account/AccountPage"));
const ReferralCodePage = React.lazy(() =>
  import("./pages/ReferralCode/ReferralCodePage")
);

const OrderInfoPage = React.lazy(() => import("./pages/OrderInfo/OrderInfo"));
const NewsListPage = React.lazy(() => import("./pages/NewsList/NewsListPage"));
const OrdersListPage = React.lazy(() =>
  import("./pages/OrderList/OrdersListPage")
);
const FavoritePage = React.lazy(() =>
  import("./pages/FavoriteProduct/FavoritePage")
);
const ProductInfoPage = React.lazy(() =>
  import("./pages/ProductInfo/ProductInfoPage")
);

const CategoriesPage = React.lazy(() =>
  import("./pages/CategoriesPage/CategoriesPage")
);
const ProductsListPage = React.lazy(() =>
  import("./pages/ProductsList/ProductsListPage")
);
const PurchasedPage = React.lazy(() =>
  import("./pages/PurchasedProduct/PurchasedPage")
);
const Footer = React.lazy(() => import("./components/Footer"));
function App(props) {
  const dispatch = useDispatch();
  const categoryStatus = useSelector((state) => state.category.status);
  const appTheme = useSelector((state) => state.app.appTheme);
  const infoStore = useSelector((state) => state.app.infoStore);
  const urlSearchParams = new URLSearchParams(window.location.search);
  //collaborator_by_customer_id
  const cowc_id = Object.fromEntries(urlSearchParams.entries()).cowc_id;
  const referralPhone = urlSearchParams.get("rp");
  const expiredTime = urlSearchParams.get("ex");
  const expiredTimeLocal = localStorage.getItem("ex");
  if (cowc_id != null) {
    localStorage.setItem("cowc_id", cowc_id);
  }
  if (referralPhone != null) {
    if (!expiredTimeLocal) {
      localStorage.setItem("ex", expiredTime);
      localStorage.setItem("rp", referralPhone);
    } else {
      try {
        const formattedTime = moment(Number(expiredTimeLocal));

        // Lấy thời điểm hiện tại
        const currentTime = moment();

        // Tính khoảng cách giữa expiredTimeLocal và currentTime
        const daysDifference = formattedTime.diff(currentTime, "days");

        // Kiểm tra xem đã qua 30 ngày chưa
        if (daysDifference > 30) {
          localStorage.setItem("ex", expiredTime);
          localStorage.setItem("rp", referralPhone);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  useEffect(() => {
    dispatch(appActions.getWebTheme());
    if (categoryStatus === c.LOADING) {
      dispatch(categoryActions.getCategories());
    }
    if (appTheme.status === c.NONE) {
      dispatch(appActions.getWebTheme());
    }
    if (infoStore.status === c.NONE) {
      dispatch(appActions.getInfoStore());
    }
    dispatch(userActions.getUserBadges());
  }, []);
  return (
    <BrowserRouter>
      <React.Fragment>
        <Header location={props.location} />
        {categoryStatus === c.SUCCESS ? (
          <React.Suspense fallback={<p></p>}>
            <ScrollToTop />

            <Switch>
              <Route path="/san-pham/:id" component={ProductInfoPage} />
              <Route path="/san-pham" component={ProductsListPage} />
              <Route path="/danh-gia-cua-toi" component={ReviewPage} />
              <Route path="/yeu-thich" component={FavoritePage} />
              <Route path="/san-pham-da-mua" component={PurchasedPage} />
              <Route path="/gio-hang" component={CartPage} />
              <Route path="/tin-tuc/:id" component={NewsPage} />
              <Route path="/tin-tuc" component={NewsListPage} />
              <Route
                path="/dia-chi"
                name="dia-chi"
                component={AddressPage}
                handler={AddressPage}
              />
              <Route path="/tai-khoan" component={AccountPage} />
              <Route path="/ma-gioi-thieu" component={ReferralCodePage} />

              <Route path="/danh-muc" component={CategoriesPage} />
              <Route path="/don-hang/:id" component={OrderInfoPage} />
              <Route path="/don-hang" component={OrdersListPage} />
              <Route path="/ma-giam-gia" component={VoucherPage} />
              <Route path="/khuyen-mai" component={Voucher} />
              <Route path="/bao-gia" component={CalculateProductPage} />

              <Route path="/to-app" component={Toapp} />
              <Route path="/xu-tich-luy" component={Waller} />
              <Route path="/combo-giam-gia" component={ComboPage} />
              <Route path="/cong-tac-vien" component={CollaboratorPage} />
              <Route path="/dai-ly" component={AgencyPage} />
              <Route path="/" exact component={HomePage} />
              <Route path="/testscreen" exact component={TestScreen} />
              <Route path="/*" component={ErrorPage} />
            </Switch>

            <Popup />
            {/* <Chat /> */}
            {/* <Footer /> */}
          </React.Suspense>
        ) : (
          categoryStatus === c.FAILURE && <ErrorPage location="/" />
        )}
      </React.Fragment>
    </BrowserRouter>
  );
}
export default App;
