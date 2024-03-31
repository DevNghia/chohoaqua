import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { handleImgErr } from "../../../helper";
import BannerVertical from "../../../components/BannerVertical";
import { constants as c } from "../../../constants";
import "./CategoryColumn2.css"
export default function CategoryColumn(props) {
  const { homeInfo } = props;
  const {bannerAds} = props

  const categories = useSelector(state => state.news.categories);
  const appTheme = useSelector((state) => state.app.appTheme);
  return (
    <div className="category_post_2">
      <aside className="blog-aside aside-item sidebar-category categories-column-1">
      <div className="aside-title text-center text-xl-left" style={{ backgroundColor: appTheme.color_main_1 }}>

        <h2 className="title-head" >
          <span>Danh mục</span>
        </h2>
      </div>
      <div className="aside-content">
        <div className="nav-category  navbar-toggleable-md">
          <ul className="nav navbar-pills">
            {categories.list.length > 0
              ? categories.list.map((v, i) => (
                <li className="nav-item">
                  <i
                    className="fa fa-arrow-circle-right"
                    aria-hidden="true"
                  />
                  <Link
                    title={v.title}
                    className="nav-link"
                    to={
                      v.title ?
                        `/tin-tuc?danh-muc=${v.slug}-${v.id}`
                        :
                        `/tin-tuc?danh-muc=${v.id}`
                    }
                  >
                    {v.title}
                  </Link>
                </li>
              ))
              : null}
          </ul>
        </div>
      </div>
      {bannerAds.status === c.SUCCESS
        ? bannerAds.type_7.length > 0 && (
          <BannerVertical banners={bannerAds.type_7} />
        )
        : null}
    </aside>
    </div>
  )
}