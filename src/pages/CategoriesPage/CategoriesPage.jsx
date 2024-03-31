import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Header = React.lazy(() => import("../../components/Header"));
const Footer = React.lazy(() => import("../../components/Footer"));
const CategoryCard = React.lazy(() => import("../../components/CategoryCard"));

const CategoryChildrenStyles = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  background-color: #fff;
  transition: all 0.5s;
  .categoryChild__title {
    display: flex;
    align-items: center;
    column-gap: 5px;
    margin: 0.8em 1em;
    .categoryChild__icon {
      display: flex;
      align-items: center;
      cursor: pointer;
      svg{
        width: 18px;height: 18px;
      }
    }
    h3 {
      color: #424242;
      font-size: 22px;
      font-weight: 400;
      margin-left: 0 !important;
      margin-bottom: 0 !important;
    }
  }
`;

function CategoriesPage() {
  const categories = useSelector((state) => state.category.categories);

  const [categorySelected, setCategorySelected] = useState();
  console.log("categories:: ", categorySelected);
  return (
    <React.Fragment>
      {/* <Header /> */}
      <div
        className="categories-page"
        style={{
          position: "relative",
        }}
      >
        <div></div>
        <h3>Danh mục sản phẩm</h3>
        <div className="row">
          {categories.map((v, i) => (
            <CategoryCard
              image={v.image_url}
              title={v.name}
              id={v.id}
              key={i}
              categoryChildren={v.category_children}
              category={v}
              setCategorySelected={setCategorySelected}
            />
          ))}
        </div>
        <CategoryChildrenStyles
          style={{
            transform: categorySelected ? "translateX(0)" : "translateX(100%)",
            visibility: categorySelected ? "visible" : "hidden",
            display: categorySelected ? "block" : "none",
          }}
        >
          <div className="categoryChild__title">
            <div
              onClick={() => setCategorySelected(null)}
              className="categoryChild__icon"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </div>
            <h3>{categorySelected?.name}</h3>
          </div>
          <div className="row">
            {categorySelected?.category_children?.length > 0 &&
              categorySelected?.category_children.map((category) => (
                <Link
                  key={category.id}
                  className="category-card"
                  to={`/san-pham?danh-muc-con=${category.name}-${category.id}`}
                >
                  <div className="image">
                    <div className="img-container">
                      <img
                        src={
                          category.image_url
                            ? category.image_url
                            : process.env.PUBLIC_URL +
                              `/img/default_product.jpg`
                        }
                        alt={category.name}
                      />
                    </div>
                  </div>
                  <div className="title">
                    <div>{category.name}</div>
                  </div>
                </Link>
              ))}
          </div>
        </CategoryChildrenStyles>
      </div>
      <Footer />
    </React.Fragment>
  );
}
export default CategoriesPage;
