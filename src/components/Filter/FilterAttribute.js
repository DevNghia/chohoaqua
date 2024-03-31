import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { productActions } from "../../actions/productActions";

const FilterAttributeStyles = styled.div`
  background-color: #ffffff;
  margin-top: 10px;
  .filter__attribute__content {
    display: flex;
    flex-direction: column;
    .filter__attribute__main {
      padding: 10px;
    }
    .filter__attribute__name {
      font-weight: 500;
      margin-bottom: 15px;
    }
    .filter__attribute__line {
      height: 10px;
      background-color: #f7f7f7;
    }
  }
  ul {
    display: flex;
    flex-direction: column;
    row-gap: 8px;
    li {
      display: flex;
      align-items: center;
      column-gap: 10px;
    }
  }
`;

const FilterAttribute = () => {
  const dispatch = useDispatch();
  const listAttributes = useSelector((state) => state.product.listAttributes);
  console.log("listAttributes::: ", listAttributes);
  const history = useHistory();
  const [attributesShow, setAttributesShow] = useState([]);
  const [hasDiscount, setHasDiscount] = useState(() => {
    const hasDiscountParam = new URLSearchParams(window.location.search).get(
      "has_discount"
    );
    return hasDiscountParam == "true" ? true : false;
  });
  const [attributeSearchChildrenIds, setAttributeSearchChildrenIds] = useState(
    () => {
      const handleConvertAttribute = (attributes) => {
        if (attributes) {
          return attributes?.split(",");
        }
        return [];
      };
      const newAttributes = new URLSearchParams(window.location.search).get(
        "attribute_search_children_ids"
      )
        ? handleConvertAttribute(
            new URLSearchParams(window.location.search).get(
              "attribute_search_children_ids"
            )
          )
        : [];
      return newAttributes;
    }
  );

  const onChange = (idAttributeChild) => {
    let newAttributeIds = [];
    if (attributeSearchChildrenIds.includes(idAttributeChild)) {
      newAttributeIds = attributeSearchChildrenIds.filter(
        (attributeId) => attributeId !== idAttributeChild
      );
    } else {
      newAttributeIds = [...attributeSearchChildrenIds, idAttributeChild];
    }
    const searchParams = new URLSearchParams(window.location.search);
    const minPrice = searchParams.get("min_price") ?? "";
    const maxPrice = searchParams.get("max_price") ?? "";

    const searchTextParam = searchParams.get("search") ?? "";
    const descendingParam = searchParams.get("descending") ?? "";
    const soryByParam = searchParams.get("sort_by") ?? "";
    const price = `${
      minPrice && maxPrice
        ? `min_price=${minPrice}&max_price=${maxPrice}`
        : minPrice
        ? `min_price=${minPrice}`
        : maxPrice
        ? `max_price=${maxPrice}`
        : ""
    }`;
    const pathName = `/san-pham?${
      searchTextParam || (descendingParam && soryByParam)
        ? `search=${searchTextParam}&sort_by=${soryByParam}&descending=${descendingParam}`
        : ""
    }${price ? `&${price}` : ""}${
      newAttributeIds.length > 0 &&
      (searchTextParam || (descendingParam && soryByParam))
        ? `&attribute_search_children_ids=${newAttributeIds.join(",")}`
        : newAttributeIds.length > 0
        ? `attribute_search_children_ids=${newAttributeIds.join(",")}`
        : ""
    }${hasDiscount ? `&has_discount=true` : ""}`;
    history.push(pathName);
    setAttributeSearchChildrenIds(newAttributeIds);
  };
  const onChangeDiscount = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const minPrice = searchParams.get("min_price") ?? "";
    const maxPrice = searchParams.get("max_price") ?? "";

    const searchTextParam = searchParams.get("search") ?? "";
    const descendingParam = searchParams.get("descending") ?? "";
    const soryByParam = searchParams.get("sort_by") ?? "";
    const price = `${
      minPrice && maxPrice
        ? `min_price=${minPrice}&max_price=${maxPrice}`
        : minPrice
        ? `min_price=${minPrice}`
        : maxPrice
        ? `max_price=${maxPrice}`
        : ""
    }`;
    const pathName = `/san-pham?${
      searchTextParam || (descendingParam && soryByParam)
        ? `search=${searchTextParam}&sort_by=${soryByParam}&descending=${descendingParam}`
        : ""
    }${price ? `&${price}` : ""}${
      attributeSearchChildrenIds.length > 0 &&
      (searchTextParam || (descendingParam && soryByParam))
        ? `&attribute_search_children_ids=${attributeSearchChildrenIds.join(
            ","
          )}`
        : attributeSearchChildrenIds.length > 0
        ? `attribute_search_children_ids=${attributeSearchChildrenIds.join(
            ","
          )}`
        : ""
    }${`&has_discount=${!hasDiscount}`}`;
    history.push(pathName);
    setHasDiscount((prevDiscount) => !prevDiscount);
  };
  const handleClearAttribute = () => {
    setAttributeSearchChildrenIds([]);
    setHasDiscount(false);
  };

  const handleCollapse = (index) => {
    let newListAttributes = JSON.parse(JSON.stringify(attributesShow));
    if (newListAttributes[index].collapse) {
      newListAttributes[index].data = listAttributes.list[index];
    } else {
      newListAttributes[index].data.product_attribute_search_children =
        listAttributes.list[index]?.product_attribute_search_children?.slice(
          0,
          5
        );
    }
    newListAttributes[index].collapse = !newListAttributes[index].collapse;

    setAttributesShow(newListAttributes);
  };

  useEffect(() => {
    if (listAttributes.list?.length > 0) {
      const newListAttributes = [];
      listAttributes.list.forEach((attribute) => {
        const newAttributeTemp = JSON.parse(JSON.stringify(attribute));
        if (newAttributeTemp.product_attribute_search_children?.length > 5) {
          newAttributeTemp.product_attribute_search_children =
            newAttributeTemp.product_attribute_search_children?.slice(0, 5);
        }
        const newAttribute = {
          collapse:
            attribute.product_attribute_search_children?.length > 5
              ? true
              : null,
          data: newAttributeTemp,
        };

        newListAttributes.push(newAttribute);
      });
      setAttributesShow(newListAttributes);
    }
  }, [listAttributes.list]);

  useEffect(() => {
    if (listAttributes.status === "LOADING") {
      dispatch(productActions.getProductAttributes());
    }
  }, [dispatch]);

  return (
    <FilterAttributeStyles className="filter__attribute">
      <div id="filter_attribute_clear" onClick={handleClearAttribute}></div>
      {attributesShow?.length > 0 && (
        <div>
          <div className="filter__attribute__content">
            <div className="filter__attribute__main">
              <div className="filter__attribute__name">Khuyến mãi</div>
              <ul>
                <li>
                  <input
                    type="checkbox"
                    id={"discount"}
                    name={`discount`}
                    checked={hasDiscount}
                    value={hasDiscount}
                    onChange={onChangeDiscount}
                  />
                  <label htmlFor={`discount`}>Giảm giá</label>
                </li>
              </ul>
            </div>
            <div className="filter__attribute__line"></div>
            {attributesShow?.map((attribute, index) => (
              <div key={index}>
                {attribute.data?.product_attribute_search_children?.length >
                0 ? (
                  <>
                    <div className="filter__attribute__main">
                      <div className="filter__attribute__name">
                        {attribute.data?.name}
                      </div>
                      {attribute.data?.product_attribute_search_children
                        ?.length > 0 && (
                        <ul>
                          {attribute.data?.product_attribute_search_children?.map(
                            (attributeChild) => (
                              <li key={attributeChild.id}>
                                <input
                                  type="checkbox"
                                  id={`${attributeChild.name}${attributeChild.id}`}
                                  name={`${attributeChild.name}${attributeChild.id}`}
                                  checked={attributeSearchChildrenIds.includes(
                                    attributeChild.id?.toString()
                                  )}
                                  value={attributeSearchChildrenIds.includes(
                                    attributeChild.id?.toString()
                                  )}
                                  onChange={() =>
                                    onChange(attributeChild.id?.toString())
                                  }
                                />
                                <label
                                  htmlFor={`${attributeChild.name}${attributeChild.id}`}
                                >
                                  {attributeChild.name}
                                </label>
                              </li>
                            )
                          )}
                        </ul>
                      )}
                      {attribute.collapse ===
                      null ? null : attribute.collapse ? (
                        <div
                          className="menu_collapse"
                          style={{
                            padding: "10px 0 5px",
                          }}
                          onClick={() => handleCollapse(index)}
                        >
                          Xem thêm <i className="fa fa-angle-double-down"></i>
                        </div>
                      ) : (
                        <div
                          className="menu_collapse"
                          style={{
                            padding: "10px 0",
                          }}
                          onClick={() => handleCollapse(index)}
                        >
                          Thu gọn <i className="fa fa-angle-double-up"></i>
                        </div>
                      )}
                    </div>
                    <div className="filter__attribute__line"></div>
                  </>
                ) : (
                  ""
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </FilterAttributeStyles>
  );
};

export default FilterAttribute;
