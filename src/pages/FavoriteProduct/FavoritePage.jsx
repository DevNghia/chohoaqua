import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageLoading from "../../components/PageLoading";
import { constants as c } from "../../constants";
import { productActions as a } from "../../actions/productActions";


const Paginate = React.lazy(() => import('../../components/Paginate'));
const Header = React.lazy(() => import('../../components/Header'));
const ProductCard = React.lazy(() => import('../../components/ProductCard'));
const Footer = React.lazy(() => import('../../components/Footer'));

function FavoritePage(props) {
  const pageInfo = useSelector(state => state.product.favorite);
  const dispatch = useDispatch();
  useEffect(() => {
    document.title = "Sản phẩm yêu thích"
    if (pageInfo.status === c.LOADING) {
      dispatch(a.getFavoriteProducts());
    }
  });
  return (
    pageInfo.status === c.SUCCESS
      ?
      <React.Fragment>
        {/* <Header /> */}
        <div className="purchased-product-page container">
          <div className="mobile-tool mobile">
            <span>
              Có {pageInfo.total} sản phẩm yêu thích
            </span>
          </div>
          <div className="products-list">
            <span>
              Có {pageInfo.total} sản phẩm yêu thích
            </span>
            <div className="row">
              {
                pageInfo.data.map((v, i) =>
                  <ProductCard
                    key={i}
                    product={v}
                  />
                )
              }
            </div>
            <Paginate
              currentPage={pageInfo.currentPage}
              totalPage={pageInfo.last_page}
            />
          </div>
        </div>
        <Footer />
      </React.Fragment>
      : null
  )
}
export default FavoritePage