import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import FilterAttribute from "../../../components/Filter/FilterAttribute";
import FilterPrice from "../../../components/Filter/FilterPrice";

const CategoryColumn10Styles = styled.section`
  width: 260px;
  flex-shrink: 0;
  .category-column__mainContent {
    /* position: sticky;
    top: 0; */
    overflow: hidden;
  }
  .category-column__content {
    background-color: white;
    box-shadow: 0 2px 6px 1px rgba(0, 0, 0, 0.01);
    .category-column__title {
      padding: 14px 20px;
      text-transform: uppercase;
      border-bottom: 1px solid #f7f8f9;
    }
  }
  .category-column__main {
    color: #221f20;
    line-height: 20px;
    a {
      font-size: 16px;
      &:hover {
        color: #221f20;
      }
    }
    .category-column__allCategory {
      a {
        padding: 14px 20px;
        display: block;
      }
      border-bottom: 1px solid #f7f8f9;
    }
    .category-column__item {
      border-bottom: 1px solid #f7f8f9;
      position: relative;
      a {
        display: flex;
        column-gap: 10px;
        justify-content: space-between;
        align-items: center;
        padding: 14px 20px;
        background-color: white;
        .category-column__item__name,
        .category-column__item__childName {
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
      }
      .category-column__item__icon {
        position: absolute;
        cursor: pointer;
        top: 10px;
        right: 10px;
        z-index: 10;
        color: rgba(34, 31, 32, 0.6);
        svg {
          width: 20px;
          height: 20px;
        }
      }
      .category-column__item__child {
        max-height: auto;
        overflow: hidden;
        transition: all 0.4s ease-out;
        ul {
          li {
            padding-left: 15px;
          }
        }
      }
    }
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const CategoryH3Styles = styled.h3`
  font-size: 1.2rem;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    width: 20%;
    height: 2px;
    top: 105%;
    left: 0;
    background-color: ${(props) => props.colorTheme};
  }
`;

const CategoryColumn10 = () => {
  const categories = useSelector((state) => state.category.categories);
  const appTheme = useSelector((state) => state.app.appTheme);

  const [selectedCategoriesId, setSelectedCategoriesId] = useState([]);
  const handleShowCategoryChild = (idCategory) => {
    let newSelectedCategoriesId = [];
    if (selectedCategoriesId.includes(idCategory)) {
      newSelectedCategoriesId = selectedCategoriesId.filter(
        (id) => id !== idCategory
      );
    } else {
      newSelectedCategoriesId = [...selectedCategoriesId, idCategory];
    }
    setSelectedCategoriesId(newSelectedCategoriesId);
  };

  return (
    <CategoryColumn10Styles className="category-column">
      <div className="category-column__mainContent">
        <div className="category-column__content">
          <div className="category-column__title">
            <CategoryH3Styles colorTheme={`${appTheme.color_main_1}`}>
              Danh mục
            </CategoryH3Styles>
          </div>
          <div className="category-column__main">
            <div className="category-column__allCategory">
              <Link to="/san-pham">
                <div>Tất cả sản phẩm</div>
              </Link>
            </div>
            {categories.length > 0 &&
              categories.map((category) => (
                <div className="category-column__item" key={category.id}>
                  <Link
                    to={`/san-pham?danh-muc=${category.slug}-${category.id}`}
                  >
                    <div
                      className="category-column__item__name"
                      title={category.name}
                    >
                      {category.name}
                    </div>
                  </Link>
                  {category.category_children.length > 0 && (
                    <>
                      {selectedCategoriesId.includes(category.id) ? (
                        <span
                          className="category-column__item__icon"
                          onClick={() => handleShowCategoryChild(category.id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M18 12H6"
                            />
                          </svg>
                        </span>
                      ) : (
                        <span
                          className="category-column__item__icon"
                          onClick={() => handleShowCategoryChild(category.id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 6v12m6-6H6"
                            />
                          </svg>
                        </span>
                      )}
                    </>
                  )}
                  <div
                    className="category-column__item__child"
                    style={{
                      maxHeight: selectedCategoriesId.includes(category.id)
                        ? `calc(40px*${category?.category_children?.length})`
                        : "0",
                      overflow: selectedCategoriesId.includes(category.id)
                        ? "visible"
                        : "hidden",
                    }}
                  >
                    <ul>
                      {category.category_children.length > 0 &&
                        category.category_children.map((categoryChild) => (
                          <li key={categoryChild.id}>
                            <Link
                              to={`/san-pham?danh-muc-con=${categoryChild.slug}-${categoryChild.id}`}
                            >
                              {/* <div className="category-column__item_childImg">
                                  <img
                                    src={categoryChild.image_url}
                                    alt={categoryChild.name}
                                  />
                                </div> */}
                              <div
                                className="category-column__item__childName"
                                title={categoryChild.name}
                              >
                                {categoryChild.name}
                              </div>
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <FilterPrice></FilterPrice>
        <FilterAttribute></FilterAttribute>
      </div>
    </CategoryColumn10Styles>
  );
};

export default CategoryColumn10;
