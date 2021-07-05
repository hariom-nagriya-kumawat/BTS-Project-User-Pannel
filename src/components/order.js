import React, { Component } from "react";
import { Multiselect } from "multiselect-react-dropdown";
import { Link } from "react-router-dom";
import { Collapse } from "react-bootstrap";
class OrderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: [],
      CollapseName: "All",
      options: [],
      ItemsMargeData: [],
      showCart: false,
      isCategory: true,
      openOption: false,
      openOptionId: "",
      activeFoodType: "",
      open: false,
      openId: "",
      showOptionCollapse: false,
      addCartData: {},
    };
  }
  componentDidUpdate = ({
    FillterTypeData,
    OptionData,
    ItemsData,
    CartData,
  }) => {
    let filterType = [];

    if (
      FillterTypeData &&
      FillterTypeData.data &&
      FillterTypeData.data !== this.props.FillterTypeData.data
    ) {
      const { FillterTypeData } = this.props;
      if (
        FillterTypeData &&
        FillterTypeData.data &&
        FillterTypeData.data.length
      ) {
        for (let i = 0; i < FillterTypeData.data.length; i++) {
          let id = FillterTypeData.data[i]._id;
          let fiterTypeName = FillterTypeData.data[i].name;
          let options = [];
          if (
            FillterTypeData.data[i] &&
            FillterTypeData.data[i].filter_data &&
            FillterTypeData.data[i].filter_data.length
          ) {
            for (
              let j = 0;
              j < FillterTypeData.data[i].filter_data.length;
              j++
            ) {
              options.push({
                name: FillterTypeData.data[i].filter_data[j].name,
                id: FillterTypeData.data[i].filter_data[j]._id,
              });
            }
          }
          filterType.push({ id, fiterTypeName, options });
        }
      }
      this.setState({ filters: filterType });
    }
    if (
      OptionData &&
      OptionData.data &&
      OptionData.data !== this.props.OptionData.data
    ) {
      let options = [];
      if (this.props.OptionData.data.length) {
        this.props.OptionData.data.map((itm) => {
          options.push({
            name: itm.name ? itm.name : "",
            id: itm._id ? itm._id : "",
          });
          return true;
        });
      }
      this.setState({ options });
    }

    if (
      ItemsData &&
      ItemsData.data &&
      ItemsData.data !== this.props.ItemsData.data
    ) {
      const result = this.props.ItemsData.data.reduce((acc, d) => {
        const found = acc.findIndex((a) => a.category_id === d.category_id);
        if (found < 0) {
          acc.push({ category_id: d.category_id, ItemData: [{ ...d }] });
        } else {
          // acc.push({...acc[found],ItemData:[...acc[found].ItemData,d]})
          acc[found] = { ...acc[found], ItemData: [...acc[found].ItemData, d] };
        }
        return acc;
      }, []);

      this.setState({ ItemsMargeData: result });
    }
    if (
      CartData &&
      CartData.updateReq &&
      CartData.updateReq !== this.props.CartData.updateReq
    ) {
      this.setState({
        addCartData: {},
        showOptionCollapse: false,
        open: false,
        openId: "",
        openOption: false,
        openOptionId: "",
        showCart:
          this.props.CartData &&
          this.props.CartData.data &&
          this.props.CartData.data.length
            ? true
            : false,
      });
    }
  };

  getItems = (Id, name) => {
    this.props.getItem({ [name]: Id });
  };
  onSelect = (selectedList, selectedItem) => {
    this.setState({ CollapseName: "" });
    this.props.getItem({ item_type: selectedItem.id });
    this.setState({ CollapseName: selectedItem.name });
  };
  getName = (categoryID) => {
    const { CategorieReducerData } = this.props;
    let categoryName = "";
    if (
      CategorieReducerData &&
      CategorieReducerData.data &&
      CategorieReducerData.data.length
    ) {
      let data = "";
      data = CategorieReducerData.data.filter((i) => i._id === categoryID)[0];
      categoryName = data.name ? data.name : "";
    }
    return categoryName;
  };

  getItemName = (itemID) => {
    const { ItemsData } = this.props;
    let itemName = "";
    if (ItemsData && ItemsData.data && ItemsData.data.length) {
      let data = "";
      data = ItemsData.data.filter((i) => i._id === itemID)[0];
      itemName = data.name ? data.name : "";
    }
    return itemName;
  };

  addCartData(item1, price) {
    let addCartData = { item_id: item1._id, quantity: 1, price: price };
    if (item1.options && item1.options.length) {
      item1.options.map((itm, indd) => {
        addCartData[itm.name] = [];
        return true;
      });
    }
    // item1.options && item1.options && item1.options.length ? item1.options.map((itm, indd) => {
    //   addCartData[itm.name] = [];
    //   return true
    // }) : null
    this.setState({
      openOption: true,
      openOptionId: item1._id,
      addCartData: addCartData,
    });
  }

  addCart = (Id, price) => {
    let token = localStorage.getItem("token");
    if (token) {
      this.props.saveCartData({ item_id: Id, quantity: 1, price: price });
    } else {
      this.props.addCartWithOutLogin({
        item_id: Id,
        quantity: 1,
        price: price,
      });
    }
  };
  addOption(name, Id) {
    const { addCartData } = this.state;
    let data = addCartData;
    data[name] = [...data[name], Id];
    this.setState({ addCartData: data });
  }
  itemRemoveCart(Id, name) {
    this.props.removeCartData({ [name]: Id });
  }
  itemUpdateCart(Id) {
    const { addCartData } = this.state;
    let data = addCartData;
    this.props.updateCartData({ cart_id: Id });
  }
  onCategoryClick() {
    const { isCategory } = this.state;
    if (!isCategory) this.props.getItem();
    this.setState({ isCategory: true });
  }
  getItemPrice = (options) => {
    let price = 0;
    for (let i = 0; i < options.length; i++) {
      for (let j = 0; j < options[i].attributes.length; j++) {
        if (i === 0 && j === 0) price = options[i].attributes[j].price;
        else {
          if (price !== 0 && options[i].attributes[j].price !== 0) {
            if (options[i].attributes[j].price < price)
              price = options[i].attributes[j].price;
          } else if (options[i].attributes[j].price !== 0)
            price = options[i].attributes[j].price;
        }
      }
    }
    return price;
  };

  getTotalPrice = () => {
    const { CartData } = this.props;
    const { data } = CartData;
    var total = 0;
    total =
      data.length &&
      data.reduce(function (acc, curr) {
        return (acc = acc + curr.price ? curr.price : 0);
      }, 0);
    return total;
  };
  onQuantityChange = (e, Id, name, item) => {
    const { target } = e;
    const { value } = target;
    let price = item.price / item.quantity;
    this.props.updateCartData({
      [name]: Id,
      quantity: value,
      price: value * price,
    });
  };
  onGoProceedToCheckout = () => {
    let viewCartData = localStorage.getItem("viewCartData");
    let result = JSON.parse(viewCartData);
    localStorage.setItem("viewCheckoutData", JSON.stringify(result));
    localStorage.removeItem("viewCartData");
    this.props.history.push("/checkout");
  };
  render() {
    const {
      FoodTypeData,
      FillterTypeData,
      CategorieReducerData,
      ItemsData,
      CartData,
    } = this.props;
    const {
      filters,
      CollapseName,
      options,
      ItemsMargeData,
      showCart,
      isCategory,
      openOption,
      activeFoodType,
      openOptionId,
      open,
      openId,
      addCartData,
    } = this.state;
    const { data } = CartData;
    console.log("data", data);
    return (
      <>
        <div className="inner-topbanner">
          <h3>
            We Are Here To Provide<br></br>
            The Best Services
          </h3>
        </div>
        <div className="food-categoriesouter">
          <div className="container">
            <ul className="food-categorie">
              <>
                {FoodTypeData && FoodTypeData.data && FoodTypeData.data.length
                  ? FoodTypeData.data.map((item, index) => {
                      return (
                        <li
                          className={
                            activeFoodType === item._id
                              ? "categorie-li active"
                              : "categorie-li"
                          }
                          onClick={(e) => {
                            this.getItems(item._id, "food_type_ids");
                            this.setState({
                              CollapseName: item.name,
                              isCategory: false,
                              activeFoodType: item._id,
                            });
                          }}
                        >
                          {/* <img src="../images/icon/food-icon-1.png"></img> */}
                          <span>
                            {" "}
                            {item.avatar_url ? (
                              <img src={item.avatar_url} />
                            ) : null}
                          </span>
                          <span>{item.name}</span>
                        </li>
                      );
                    })
                  : null}
              </>
              <li className="categorie-filter">
                <i className="fas fa-bars"></i>
              </li>
              <li className="search-filter">
                <form>
                  <div className="form-col">
                    <input
                      type="text"
                      placeholder="What are you craving?"
                    ></input>
                    <button>
                      <i className="fas fa-search"></i>
                    </button>
                  </div>
                </form>
              </li>
            </ul>
          </div>
        </div>

        <section className="menu-section">
          <div className="container">
            <div className="menu-list-col">
              <div
                className="nav nav-pills menu-list-nav menu-list-nav-sm"
                role="tablist"
              >
                {CategorieReducerData &&
                CategorieReducerData.data &&
                CategorieReducerData.data.length
                  ? CategorieReducerData.data.map((itm, indx) => {
                      return (
                        <a
                          className="nav-link rounded-pill"
                          id="v-pills-one-tab"
                          data-toggle="pill"
                          href="#v-pills-one"
                          role="tab"
                          aria-controls="v-pills-one"
                          aria-selected="true"
                          onClick={(e) => this.onCategoryClick()}
                        >
                          <img src="../images/icon/categorie-icon.png"></img>
                          {itm.name && itm.name}
                        </a>
                      );
                    })
                  : null}

                <select>
                  <option>More</option>
                  <option>More 1</option>
                  <option>More 2</option>
                  <option>More 3</option>
                </select>

                <div
                  className="categorie-basket"
                  onClick={(e) => {
                    this.setState({ showCart: !showCart });
                  }}
                >
                  <span className="icofont-cart-alt cart"></span> Basket -{" "}
                  {data && data.length ? data.length : 0}
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="menu-list-wrap">
              <div
                className={
                  showCart === true && data && data.length
                    ? "row menu-inner menu-cart-active"
                    : "row menu-inner"
                }
              >
                <div className="categorie-product">
                  <div className="tab-content">
                    {!isCategory ? (
                      <div className="menu-accro-body">
                        <div className="card-columns">
                          {ItemsData && ItemsData.data.length
                            ? ItemsData.data.map((item1, indx1) => {
                                let price = this.getItemPrice(item1.options);
                                return (
                                  <div className="card" key={indx1}>
                                    <div className="menu-card">
                                      <div className="menu-card-img">
                                        <img src="../images/pro1.jpg" alt="" />
                                      </div>
                                      <div className="menu-card-body">
                                        <div className="body-head">
                                          <h4 className="menu-card-title">
                                            {item1.name}
                                          </h4>
                                          <span className="menu-card-price">
                                            {" "}
                                            £{" "}
                                            {price > 0
                                              ? price
                                              : item1.online_price
                                              ? item1.online_price
                                              : 0}
                                          </span>
                                        </div>
                                        <div className="menu-card-des">
                                          <p>
                                            <input
                                              type="checkbox"
                                              class="read-more-input"
                                              id="read-more"
                                            />
                                            {/* {item1.description?item1.description:""} */}
                                            Chicken pieces marinated over night
                                            in light spices{" "}
                                            <span className="read-more-target">
                                              and then barbequed in a clay oven
                                              (comes with salad)
                                            </span>
                                            <label
                                              for="read-more"
                                              class="read-more-trigger"
                                            ></label>
                                          </p>
                                        </div>

                                        <div className="add-slide">
                                          <div className="slide-img">
                                            <img
                                              src="../images/pro1.jpg"
                                              alt=""
                                            />
                                            <img
                                              src="../images/pro1.jpg"
                                              alt=""
                                            />
                                            <img
                                              src="../images/pro1.jpg"
                                              alt=""
                                            />
                                          </div>
                                          {addCartData.item_id &&
                                          addCartData.item_id === item1._id ? (
                                            <span
                                              className="menu-card-btn bg1"
                                              data-toggle="modal"
                                              data-target="#table"
                                              onClick={() =>
                                                this.addCart(
                                                  item1._id,
                                                  price > 0
                                                    ? price
                                                    : item1.online_price
                                                    ? item1.online_price
                                                    : 0
                                                )
                                              }
                                            >
                                              <i
                                                className="icofont-cart-alt"
                                                data-toggle="modal"
                                                data-target="#table"
                                              ></i>
                                              Save
                                            </span>
                                          ) : (
                                            <span
                                              className="menu-card-btn"
                                              data-toggle="modal"
                                              data-target="#table"
                                              onClick={() =>
                                                this.addCartData(
                                                  item1,
                                                  price > 0
                                                    ? price
                                                    : item1.online_price
                                                    ? item1.online_price
                                                    : 0
                                                )
                                              }
                                            >
                                              <i
                                                className="icofont-cart-alt"
                                                data-toggle="modal"
                                                data-target="#table"
                                              ></i>
                                              Add
                                            </span>
                                          )}
                                        </div>
                                      </div>

                                      <div
                                        id="accordion"
                                        className={
                                          openOption === true &&
                                          openOptionId === item1._id
                                            ? "custom-table-outer active"
                                            : "custom-table-outer"
                                        }
                                      >
                                        {item1.options && item1.options.length
                                          ? item1.options.map((itm, indd) => {
                                              return (
                                                <div class="card">
                                                  <div
                                                    class="card-header"
                                                    onClick={() =>
                                                      this.setState({
                                                        open: !open,
                                                        openId: itm._id,
                                                      })
                                                    }
                                                  >
                                                    <div class="card-link" open>
                                                      {itm.name}
                                                    </div>
                                                  </div>
                                                  <Collapse
                                                    in={
                                                      open && openId === itm._id
                                                    }
                                                    id="tableCollaps"
                                                    class="option"
                                                    data-parent="#accordion"
                                                  >
                                                    <div class="card-body">
                                                      <ul className="option_ul">
                                                        {itm.attributes &&
                                                        itm.attributes.length
                                                          ? itm.attributes.map(
                                                              (itm1, ind1) => {
                                                                return (
                                                                  <li className="option_li w-100 px-3">
                                                                    <p className="option_p w-50">
                                                                      {itm1.name &&
                                                                        itm1.name}
                                                                    </p>
                                                                    <span className="option_p w-25">
                                                                      ${" "}
                                                                      {itm1.price &&
                                                                        itm1.price}
                                                                    </span>
                                                                    <button
                                                                      className="option_button w-25"
                                                                      disabled={
                                                                        (addCartData &&
                                                                          addCartData[
                                                                            itm
                                                                              .name
                                                                          ] &&
                                                                          addCartData[
                                                                            itm
                                                                              .name
                                                                          ].includes(
                                                                            itm1._id
                                                                          )) ||
                                                                        (addCartData &&
                                                                        addCartData[
                                                                          itm
                                                                            .name
                                                                        ] &&
                                                                        addCartData[
                                                                          itm
                                                                            .name
                                                                        ]
                                                                          .length >=
                                                                          itm.max_qty
                                                                          ? true
                                                                          : false) ||
                                                                        (addCartData &&
                                                                        addCartData[
                                                                          itm
                                                                            .name
                                                                        ] &&
                                                                        addCartData[
                                                                          itm
                                                                            .name
                                                                        ]
                                                                          .length >=
                                                                          1 &&
                                                                        !itm.is_multi_selected
                                                                          ? true
                                                                          : false)
                                                                      }
                                                                      onClick={() =>
                                                                        this.addOption(
                                                                          itm.name,
                                                                          itm1._id
                                                                        )
                                                                      }
                                                                    >
                                                                      + Add
                                                                    </button>
                                                                  </li>
                                                                );
                                                              }
                                                            )
                                                          : null}
                                                      </ul>{" "}
                                                    </div>
                                                  </Collapse>
                                                </div>
                                              );
                                            })
                                          : null}
                                      </div>
                                    </div>
                                  </div>
                                );
                              })
                            : null}
                        </div>
                      </div>
                    ) : ItemsMargeData && ItemsMargeData.length ? (
                      ItemsMargeData.map((itm, indx) => {
                        return (
                          <div
                            className="tab-pane fade show active"
                            id="v-pills-one"
                            role="tabpanel"
                            aria-labelledby="v-pills-one-tab"
                          >
                            <div className="menu-accordion" id={itm._id}>
                              <div className="menu-accro-card">
                                <div
                                  className="menu-accro-header"
                                  id="headingOne"
                                >
                                  <h5 className="mb-0">
                                    <button
                                      className="btn menu-item-link"
                                      data-toggle="collapse"
                                      data-target="#collapseOne"
                                      aria-expanded="true"
                                      aria-controls="collapseOne"
                                    >
                                      {itm.category_id &&
                                        this.getName(itm.category_id)}
                                    </button>
                                  </h5>
                                </div>
                                <div
                                  id="collapseOne"
                                  className="collapse show"
                                  aria-labelledby="headingOne"
                                  data-parent="#accordion1"
                                >
                                  <div className="menu-accro-body">
                                    <div className="card-columns">
                                      {itm.ItemData && itm.ItemData
                                        ? itm.ItemData.map((item1, indx1) => {
                                            let price = this.getItemPrice(
                                              item1.options
                                            );
                                            return (
                                              <div className="card" key={indx1}>
                                                <div className="menu-card">
                                                  <div className="menu-card-img">
                                                    <img
                                                      src="../images/pro1.jpg"
                                                      alt=""
                                                    />
                                                  </div>
                                                  <div className="menu-card-body">
                                                    <div className="body-head">
                                                      <h4 className="menu-card-title">
                                                        {item1.name}
                                                      </h4>
                                                      <span className="menu-card-price">
                                                        {" "}
                                                        £{" "}
                                                        {price > 0
                                                          ? price
                                                          : item1.online_price
                                                          ? item1.online_price
                                                          : 0}
                                                        {/* {item1.online_price ? item1.online_price : 0} */}
                                                      </span>
                                                    </div>
                                                    <div className="menu-card-des">
                                                      <p>
                                                        <input
                                                          type="checkbox"
                                                          class="read-more-input"
                                                          id="read-more"
                                                        />
                                                        {/* {item1.description?item1.description:""} */}
                                                        Chicken pieces marinated
                                                        over night in light
                                                        spices{" "}
                                                        <span className="read-more-target">
                                                          and then barbequed in
                                                          a clay oven (comes
                                                          with salad)
                                                        </span>
                                                        <label
                                                          for="read-more"
                                                          class="read-more-trigger"
                                                        ></label>
                                                      </p>
                                                    </div>

                                                    <div className="add-slide">
                                                      <div className="slide-img">
                                                        <img
                                                          src="../images/pro1.jpg"
                                                          alt=""
                                                        />
                                                        <img
                                                          src="../images/pro1.jpg"
                                                          alt=""
                                                        />
                                                        <img
                                                          src="../images/pro1.jpg"
                                                          alt=""
                                                        />
                                                      </div>
                                                      {addCartData.item_id &&
                                                      addCartData.item_id ===
                                                        item1._id ? (
                                                        <span
                                                          className="menu-card-btn bg1"
                                                          data-toggle="modal"
                                                          data-target="#table"
                                                          onClick={() =>
                                                            this.addCart(
                                                              item1._id,
                                                              price > 0
                                                                ? price
                                                                : item1.online_price
                                                                ? item1.online_price
                                                                : 0
                                                            )
                                                          }
                                                        >
                                                          <i
                                                            className="icofont-cart-alt"
                                                            data-toggle="modal"
                                                            data-target="#table"
                                                          ></i>{" "}
                                                          Save
                                                        </span>
                                                      ) : (
                                                        <span
                                                          className="menu-card-btn"
                                                          data-toggle="modal"
                                                          data-target="#table"
                                                          onClick={() =>
                                                            this.addCartData(
                                                              item1,
                                                              price > 0
                                                                ? price
                                                                : item1.online_price
                                                                ? item1.online_price
                                                                : 0
                                                            )
                                                          }
                                                        >
                                                          <i
                                                            className="icofont-cart-alt"
                                                            data-toggle="modal"
                                                            data-target="#table"
                                                          ></i>{" "}
                                                          Add
                                                        </span>
                                                      )}
                                                    </div>
                                                  </div>

                                                  <div
                                                    id="accordion"
                                                    className={
                                                      openOption === true &&
                                                      openOptionId === item1._id
                                                        ? "custom-table-outer active"
                                                        : "custom-table-outer"
                                                    }
                                                  >
                                                    {item1.options &&
                                                    item1.options.length
                                                      ? item1.options.map(
                                                          (itm, indd) => {
                                                            return (
                                                              <div class="card">
                                                                <div
                                                                  class="card-header"
                                                                  onClick={() =>
                                                                    this.setState(
                                                                      {
                                                                        open: !open,
                                                                        openId:
                                                                          itm._id,
                                                                      }
                                                                    )
                                                                  }
                                                                >
                                                                  <div class="card-link">
                                                                    {itm.name}
                                                                  </div>
                                                                </div>
                                                                <Collapse
                                                                  in={
                                                                    open &&
                                                                    openId ===
                                                                      itm._id
                                                                  }
                                                                  id="tableCollaps"
                                                                  class="option"
                                                                  data-parent="#accordion"
                                                                >
                                                                  <div class="card-body">
                                                                    <ul className="option_ul">
                                                                      {itm.attributes &&
                                                                      itm
                                                                        .attributes
                                                                        .length
                                                                        ? itm.attributes.map(
                                                                            (
                                                                              itm1,
                                                                              ind1
                                                                            ) => {
                                                                              return (
                                                                                <li className="option_li w-100 px-3">
                                                                                  <p className="option_p w-50">
                                                                                    {itm1.name &&
                                                                                      itm1.name}
                                                                                  </p>
                                                                                  <span className="option_p w-25">
                                                                                    ${" "}
                                                                                    {itm1.price &&
                                                                                      itm1.price}
                                                                                  </span>
                                                                                  <button
                                                                                    className="option_button w-25"
                                                                                    disabled={
                                                                                      (addCartData &&
                                                                                        addCartData[
                                                                                          itm
                                                                                            .name
                                                                                        ] &&
                                                                                        addCartData[
                                                                                          itm
                                                                                            .name
                                                                                        ].includes(
                                                                                          itm1._id
                                                                                        )) ||
                                                                                      (addCartData &&
                                                                                      addCartData[
                                                                                        itm
                                                                                          .name
                                                                                      ] &&
                                                                                      addCartData[
                                                                                        itm
                                                                                          .name
                                                                                      ]
                                                                                        .length >=
                                                                                        itm.max_qty
                                                                                        ? true
                                                                                        : false) ||
                                                                                      (addCartData &&
                                                                                      addCartData[
                                                                                        itm
                                                                                          .name
                                                                                      ] &&
                                                                                      addCartData[
                                                                                        itm
                                                                                          .name
                                                                                      ]
                                                                                        .length >=
                                                                                        1 &&
                                                                                      !itm.is_multi_selected
                                                                                        ? true
                                                                                        : false)
                                                                                    }
                                                                                    onClick={() =>
                                                                                      this.addOption(
                                                                                        itm.name,
                                                                                        itm1._id
                                                                                      )
                                                                                    }
                                                                                  >
                                                                                    +
                                                                                    Add
                                                                                  </button>
                                                                                </li>
                                                                              );
                                                                            }
                                                                          )
                                                                        : null}
                                                                    </ul>{" "}
                                                                  </div>
                                                                </Collapse>
                                                              </div>
                                                            );
                                                          }
                                                        )
                                                      : null}
                                                  </div>

                                                  {/* <div
                                                    className="nav nav-pills d-flex flex-row"
                                                    id="v-pills-tab" role="tablist"
                                                  >
                                                    {
                                                      item1.options && item1.options.length ? item1.options.map((itm, indd) => {
                                                        return (


                                                          <a className="nav-link rounded-pill" id={`v-pills-${itm._id}-${item1._id}-tab`} data-toggle="pill" href={`#v-pills-${itm._id}-${item1._id}`} role="tab" aria-controls={`v-pills-${itm._id}-${item1._id}`} aria-selected="true"
                                                          >
                                                            {itm.name}
                                                          </a>
                                                        )
                                                      }) : null}


                                                  </div>
                                                  <div className="tab-content px-5" id="v-pills-tabContent">
                                                    {
                                                      item1.options && item1.options.length ? item1.options.map((itm, indd) => {
                                                        return (
                                                          <div
                                                            className="tab-pane fade show"
                                                            id={`v-pills-${itm._id}-${item1._id}`} role="tabpanel" aria-labelledby={`v-pills-${itm._id}-${item1._id}-tab`}
                                                          >
                                                            <table>
                                                              {itm.attributes && itm.attributes.length ? itm.attributes.map((it) => {
                                                                return (
                                                                  <tr>
                                                                    <td>{it.name}</td>
                                                                    <td>{it.price}</td>
                                                                    <td></td>
                                                                  </tr>
                                                                )
                                                              }) : null}
                                                            </table>
                                                          </div>
                                                        )
                                                      }) : null}
                                                  </div> */}
                                                  {/* </div> */}
                                                  {/* </Collapse> */}

                                                  {/* <div>
                                            {
                                              item1.options && item1.options.length ? item1.options.map((itm, indd) => {
                                                return (
                                                  <span>
                                                    {itm.name}
                                                    <div>
                                                      {
                                                        itm.attributes && itm.attributes.length ? itm.attributes.map((i => {
                                                          return (

                                                            <span>{i.name}</span>

                                                          )
                                                        }))
                                                          : null}
                                                    </div>
                                                  </span>


                                                )
                                              })
                                                : null}
                                          </div> */}
                                                </div>
                                              </div>
                                            );
                                          })
                                        : null}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : null}
                  </div>
                </div>
                {data && data.length ? (
                  <div className="categorie-cart">
                    <div className="menu-item-cart">
                      <div className="menu-cart-head">
                        <span>View Cart : {data && data.length} Items</span>
                        <span> £ {this.getTotalPrice()} </span>
                      </div>
                      <table className="menu-cart-body">
                        <tbody>
                          {data && data.length
                            ? data.map((i, ind) => {
                                return (
                                  <tr key={ind}>
                                    <td className="item-name">
                                      {i.item_id && this.getItemName(i.item_id)}
                                    </td>
                                    <td className="item-qty">
                                      <div className="menu-cart-qty">
                                        <input
                                          type="number"
                                          // className="input-qty"
                                          // step="1"
                                          // min="1"
                                          // max="100"
                                          name="quantity"
                                          value={i.quantity}
                                          onChange={(e) =>
                                            this.onQuantityChange(
                                              e,
                                              i._id ? i._id : i.item_id,
                                              i._id ? "cart_id" : "item_id",
                                              i
                                            )
                                          }
                                          // title="Qty"
                                        />
                                        {/* <span className="q_inc"> </span>
                                      <span className="q_dec"> </span> */}
                                      </div>
                                    </td>
                                    <td className="item-price text-right">
                                      £ {i.price}
                                    </td>
                                    <td className="text-center">
                                      <div
                                        className="cart-remove"
                                        onClick={() =>
                                          this.itemRemoveCart(
                                            i._id ? i._id : i.item_id,
                                            i._id ? "cart_id" : "item_id"
                                          )
                                        }
                                      >
                                        <i className="icofont-ui-delete"></i>
                                      </div>
                                    </td>
                                  </tr>
                                );
                              })
                            : null}
                        </tbody>
                      </table>
                      <div className="menu-cart-footer">
                        <span
                          onClick={() => this.onGoProceedToCheckout()}
                          className="text-white"
                        >
                          {" "}
                          Proceed To Checkout{" "}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default OrderComponent;
