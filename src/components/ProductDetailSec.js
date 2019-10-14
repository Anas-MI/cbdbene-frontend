import React, { Component } from "react";
import { connect } from "react-redux";
import BasicFunction from "../services/extra/basicFunction";
import SelectMulti from "react-select";
import classNames from "classnames";
import waterfall from "async-waterfall";
import { selectStyle, filePath } from "./Constants";
import {subscribeLoginMessage} from "../constantMessage";
// import FadeTransition from "./FadeTransition";
import { 
  addToCart, 
  modifyItem, 
  setWishList,
  toggleCartBar
} from "../actions";
import { variablePriceSet } from "../services/extra/cartHealpers";
// import { addToCartMessage } from "../constantMessage";
import { qtyOptions, susTimeOptions } from "./Constants";
import { deleteWishList, addToWishListApi } from "../services/api";
import {
  RatingsIcon,
  ImageZoom,
  ProductAttributeList,
  ProductAttributeTgl
  // CartModal
} from "./product";
import {
  findByMatchingProperties,
  removeDuplicateObjAr,
  isProductInWishList
} from "../services/extra";
import Icon from "react-icons-kit";
import { heart } from "react-icons-kit/fa";
import { combineLoop } from "box-dimension-calculator";
import { UncontrolledTooltip } from 'reactstrap';
const basicFunction = new BasicFunction();
class ProductDetailSec extends Component {
  constructor(props) {
    super(props);
    this.varitionInit = this.varitionInit.bind(this);
    this.renderVariation = this.renderVariation.bind(this);
    this.varientChange = this.varientChange.bind(this);
    this.flavorChange = this.flavorChange.bind(this);
    this.qtyChange = this.qtyChange.bind(this);
    this.setSimpleProductPrice = this.setSimpleProductPrice.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.handleSubscribeChecked = this.handleSubscribeChecked.bind(this);
    this.GetParchantageBetweenTwoValue = this.GetParchantageBetweenTwoValue.bind(
      this
    );
    this.getMinMaxValueWithVariationProduct = this.getMinMaxValueWithVariationProduct.bind(
      this
    );
    this.toggleAdded = this.toggleAdded.bind(this);
    this.state = {
      collapse: false,
      selectedVarient: null,
      selectedVarientErr: null,
      selectedFlavor: null,
      selectedFlavorErr: null,
      blankState: "",
      selectedQty: { label: 1, value: 1 },
      selectedQtyErr: null,
      selectedSusTime: {
        label: "1 Month",
        value: "1"
      },
      subscribeDiscount: 10,
      subscribeChecked: false,
      sale_price: 0,
      regular_price: 0,
      isShake: false,
      isCombo: false,
      FinaldiscountPrice: 0,
      FinalregularPrice: 0,
      FinalsalePrice: 0,
      totalVarition: [],
      currentAddedItem: null,
      isAddedOpen: false,
      visibleInputs: 0,
      user_details:null
    };
  }
  componentDidMount() {
    this.setProduct(this.props);
    document.body.classList.add("has-fixed-btn");
    const items = this.props.cart.items.map(el => ({
      h: el.shipping_height,
      l: el.shipping_length,
      w: el.shipping_width,
      qty: el.qty.value
    }))

    const itemsA = items.map( el => {
      const arr = Array(el.qty).fill(el)
      return arr
    })
    const itemsB = [].concat.apply([], itemsA);
    console.log({
      items__________: combineLoop(itemsB)
    })
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.product._id !== this.props.product._id) {
      this.setProduct(nextProps);
    }
  }
  componentWillUnmount(){
    document.body.classList.remove("has-fixed-btn")
  }
  setProduct(props) {
    const { product } = props;
    if (product.combo === true) {
      this.setState({
        isVariable: false,
        isCombo: true
      });
      this.setSimpleProductPrice(product);
    } else {
      if (product.producttype === "variable") {
        this.setState({
          isVariable: true
        });
        this.varitionInit(product.attributes, product);
      } else {
        this.setState({
          isVariable: false
        });
        this.setSimpleProductPrice(product);
      }
    }
  }

  toggleAdded() {
    this.setState(prevState => ({
      isAddedOpen: !prevState.isAddedOpen
    }));
  }
  varientChange = selectedVarient => {
    this.setState({ selectedVarient, selectedVarientErr: false });
  };

  handleSubscribeChecked() {
    if(this.props.user && this.props.user._id){
      this.setState(prevState => ({
        subscribeChecked: !prevState.subscribeChecked
      }));
    }
    
  }
  flavorChange = selectedFlavor => {
    this.setState({ selectedFlavor, selectedFlavorErr: false });
  };
  qtyChange = selectedQty => {
    this.setState({ selectedQty, selectedQtyErr: false });
    //********************* */
  };
  susTimeChange = selectedSusTime => {
    this.setState({ selectedSusTime });
    //******************** */
  };

  startRatinrCout() {
    for (var i = 0; i >= 5; i++) {}
  }

  getMinMaxValueWithVariationProduct(ar) {
    if (ar.dsaleprice) {
      var dis = this.GetParchantageBetweenTwoValue(
        ar.dregularprice,
        ar.dsaleprice
      );
      const str =
        "<p><b className='priceText'> $" +
        basicFunction.nombarFormat(ar.dsaleprice) +
        "</b> <strike> $" +
        basicFunction.nombarFormat(ar.dregularprice) +
        "</strike> <span className='error-direct'> (" +
        dis +
        " % Off) </span> </p>";

      return str;
    } else {
      //var dis = this.GetParchantageBetweenTwoValue(ar.dregularprice, ar.dsaleprice);
      const str =
        "<p><b className='priceText'> $" +
        basicFunction.nombarFormat(ar.dsaleprice) +
        "</b> <strike> $" +
        basicFunction.nombarFormat(0) +
        "</strike> <span className='error-direct'> (" +
        0 +
        " % Off) </span> </p>";

      return str;
    }
  }

  changeVariationsOld(e, names, singleItem = false) {
    console.log({ names1111: names });
    const {
      product: {
        variation,
        attributes,
        dsaleprice,
        dregularprice,
        visibleAttrList,
        verifiedAttr
      }
    } = this.props;

    let newOptions = [],
      otherOptions = [],
      allOptions = [];
    attributes.map(el => {
      if (el) {
        if (!(el.names === names)) {
          newOptions.push({
            names: el.names,
            values: []
          });
          otherOptions.push(el.names);
        }
        allOptions.push(el.names);
      }
      return null;
    });
    this.setState(
      {
        [names]: e,
        [`${names}Err`]: false,
        myPrice: true
      },
      () => {
        const newValAtt = visibleAttrList
          .map((el, index1) => {
            if (this.state[el.names] && index1 < this.state.visibleInputs)
              return {
                names: el.names,
                values: this.state[el.names].value
              };
            else return null;
          })
          .filter(el => el);
        const newValAtt2 = visibleAttrList
          .map(el => {
            if (this.state[el.names])
              return {
                names: el.names,
                values: this.state[el.names].value
              };
            else return null;
          })
          .filter(el => el);

        const currentIndex = visibleAttrList.findIndex(
          el => el.names === names
        );
        console.log({
          newValAtt2: findByMatchingProperties(verifiedAttr, newValAtt2)
        });

        if (visibleAttrList[currentIndex]) {
          this.setState(
            {
              visibleInputs: currentIndex + 1
            },
            () => {
              console.log({
                visibleInputs: this.state.visibleInputs,
                currentIndex
              });
            }
          );
        }
        const newVal = findByMatchingProperties(verifiedAttr, newValAtt);
        console.log({
          newValAtt,
          newVal
        });

        visibleAttrList.forEach(el => {
          // const flag = visibleAttrList.every(el => this.state[el.name])
          if (visibleAttrList[0].names !== el.names)
            if (
              // el.names !== names &&
              !singleItem
            ) {
              console.log({
                names: el.names
              });
              this.setState(
                {
                  [`${el.names}_options`]: removeDuplicateObjAr(
                    newVal.map(elx => ({
                      label: elx[el.names] && elx[el.names].replace(/-/g, " "),
                      value: elx[el.names]
                    }))
                  )
                },
                () => {
                  console.log({
                    [el.names]: this.state[`${el.names}_options`]
                  });
                }
              );
            }
        });

        variation.map(el => {
          if (el) {
            allOptions.map(newkey => {
              if (newkey) {
                if (!this.state[newkey]) {
                  this.setState({
                    myPrice: true
                  });
                  return null;
                }
                let varCheck = allOptions
                  .map(attr => {
                    if (attr)
                      return {
                        key: attr,
                        value: this.state[attr]
                          ? this.state[attr].value
                          : this.state[attr]
                      };
                    return null;
                  })
                  .filter(el => el);
                if (this.state[newkey]) {
                }

                let matchedVariable = null;
                const notNullVarition = variation.filter(el => el !== null);
                if (
                  !varCheck.some(
                    vEl => vEl.value === null || vEl.value === undefined
                  )
                ) {
                  matchedVariable = notNullVarition.find(varEl => {
                    let matchArr = [];
                    varCheck.map(vEl => {
                      matchArr.push(varEl[vEl.key] === vEl.value);
                      return null;
                    });
                    return !matchArr.includes(false);
                  });

                  if (matchedVariable) {
                    this.setState({
                      myPrice: false,
                      sale_price: matchedVariable.sale_price,
                      regular_price: matchedVariable.regular_price
                    });
                  } else {
                    this.setState({
                      varitionNotAvalible: true,
                      sale_price: dsaleprice,
                      regular_price: dregularprice
                    });
                  }
                }
              }
              return null;
            });
          }
          return null;
        });

        setTimeout(() => {}, 200);
      }
    );
    this.setState({
      blankState: "wait"
    });
  }
  changeVariations(e, names, singleItem = false) {
    const {
      product: {
        variation, //attributes, dsaleprice, dregularprice,
        visibleAttrList,
        verifiedAttr
      }
    } = this.props;

    const currentIndex = visibleAttrList.findIndex(el => el.names === names);
    this.setState(
      {
        [names]: e,
        [`${names}Err`]: false,
        myPrice: true,
        visibleInputs: currentIndex + 1
      },
      () => {
        const newValAtt = visibleAttrList
          .map((el, index) => {
            if (this.state[el.names] && currentIndex >= index)
              return {
                names: el.names,
                values: this.state[el.names].value
              };
            else return null;
          })
          .filter(el => el);

        const newVal = findByMatchingProperties(verifiedAttr, newValAtt);
        console.log({ newVal, verifiedAttr, newValAtt });
        const allAttrList = visibleAttrList.map((el, atIndex) => {
          if (currentIndex < atIndex) {
            console.log({
              atIndex,
              currentIndex,
              el
            });
            this.setState({
              [el.names]: null,
              [`${el.names}_options`]: removeDuplicateObjAr(
                newVal.map(elx => ({
                  label: elx[el.names] && elx[el.names].replace(/-/g, " "),
                  value: elx[el.names]
                }))
              )
            });
          }
          return el.names;
        });
        console.log({
          allAttrList,
          variation
        });
        setTimeout(() => {
          if (allAttrList.every(el => this.state[el])) {
            console.log("all");
            const matched = variation.find(el => {
              const newArr = allAttrList.map(el => ({ [el]: this.state[el] }));
              console.log({
                newArr
              });
              return newArr.every(elx => {
                return Object.keys(elx).every(
                  ely => elx[ely] && elx[ely].value === el[ely]
                );
              });
            });
            if (matched) {
              this.setState({
                sale_price: matched.sale_price,
                regular_price: matched.regular_price
              });
            }
          } else {
            console.log("not all");
            this.setState({
              sale_price: null,
              regular_price: null
            });
          }
        }, 100);
      }
    );
  }
  setSimpleProductPrice(product) {
    if (product) {
      if (product.producttype === "simple") {
        if (product.regularprice) {
          this.setState(
            {
              myPrice: false,
              regular_price: product.regularprice
            },
            () => {}
          );
        }
        if (product.saleprice) {
          this.setState(
            {
              myPrice: false,
              sale_price: product.saleprice
            },
            () => {}
          );
        }
      }
    }
  }
  varitionInit = (variations = [], product) => {
    const totalVarition =
      //  variations
      product.visibleAttrList
        .map(el => {
          if (el) {
            const { names, values } = el;
            this.setState({
              [names]: null
            });
            let options = [];
            if (values) {
              if (values.constructor === String) {
                this.setState({
                  [`${names}_options`]: [
                    {
                      label: values.replace(/_/g, " ").replace(/-/g, " "),
                      value: values
                    }
                  ]
                });
              } else if (values.constructor === Array) {
                options = values.map(element => {
                  return {
                    label: element.replace(/_/g, " ").replace(/-/g, " "),
                    value: element
                  };
                });
                this.setState({
                  [`${names}_options`]: options
                });
              }
            }
            return names;
          }
          return null;
        })
        .filter(el => el);

    this.setState(
      {
        totalVarition: totalVarition
      },
      () => {}
    );
  };
  renderVariation(variations = []) {
    return variations.map((el, index) => {
      if (el) {
        const { names, values } = el;

        let options = [];
        if (values) {
          values.map(element => {
            options.push({
              label: element.replace(/_/g, " ").replace(/-/g, " "),
              value: element
            });
            return null;
          });
        }
        // console.log({
        //   names, el,
        //   state: this.state
        // })
        if (this.state[`${names}_options`].length === 1) {
          if (!this.state[`${names}`]) {
            this.changeVariations(this.state[`${names}_options`][0], names);
          }
        }
        return (
          <div
            key={index}
            className={classNames("pt-3 col-sm-6 selector-wrapper animated ", {
              shake: this.state[`${names}Err`] && this.state.isShake
            })}
          >
            <div>
              <div className="ProductDetails-itemTitle">
                {this.state[`${names}_options`].length > 1
                  ? "Select " + names.replace(/_/g, " ")
                  : names.replace(/_/g, " ")}
              </div>
              {this.state[`${names}_options`].length > 0 ? (
                <SelectMulti
                  id={names}
                  styles={selectStyle}
                  value={this.state[names]}
                  className={classNames({
                    "has-error-r-select": this.state[`${names}Err`]
                  })}
                  isMulti={false}
                  placeholder={"Select " + names.replace(/_/g, " ")}
                  onChange={e => {
                    this.changeVariations(e, names);
                  }}
                  // isDisabled={this.state[`${names}_options`].length === 1}
                  isDisabled={
                    this.state.visibleInputs < index ||
                    this.state[`${names}_options`].length === 1
                  }
                  options={this.state[`${names}_options`]}
                />
              ) : (
                <p>{this.state[names] ? this.state[names].label : ""}</p>
              )}
            </div>
            {this.state[`${names}Err`] ? (
              <p className="error-direct">
                {" "}
                {names.replace(/_/g, " ")} is required{" "}
              </p>
            ) : (
              ""
            )}
          </div>
        );
      }
      return null;
    });
  }
  addToCart() {
    const { product } = this.props;
    let namesList = [];
    waterfall([
      done => {
        if (product.attributes) {
          product.attributes.map(el => {
            if (el) {
              namesList.push(el.names);
              if (!this.state[el.names]) {
                this.setState(
                  {
                    [`${el.names}Err`]: false
                  },
                  () => {
                    this.setState({
                      [`${el.names}Err`]: true,
                      isShake: true
                    });
                    setTimeout(() => {
                      this.setState({
                        isShake: false
                      });
                    }, 500);
                  }
                );
              }
            }
            return null;
          });
          if (!this.state.selectedQty) {
            this.setState({ [`selectedQtyErr`]: false }, () => {
              this.setState({
                [`selectedQtyErr`]: true,
                isShake: true
              });
              setTimeout(() => {
                this.setState({
                  isShake: false
                });
              }, 500);
            });
          }
        }

        return done();
      },
      done => {
        let flag = true;
        let productItem = { ...product };
        const {
          selectedQty,
          varitionNotAvalible,
          sale_price,
          regular_price,
          subscribeChecked,
          selectedSusTime,
          subscribeDiscount
        } = this.state;
        const varFlag =
          namesList.length > 0
            ? namesList.every(el => {
                const value = this.state[el];
                if (this.state[el]) {
                  if (!value.value) {
                    return false;
                  } else {
                    productItem[el] = value;
                    return true;
                  }
                }
                return false;
              })
            : true;
        if (!selectedQty) {
          flag = false;
        } else {
          productItem.qty = selectedQty;
        }
        if (productItem.producttype !== "variable") {
          if (selectedQty) {
            flag = true;
          }
        }
        if (productItem.producttype === "variable") {
          if (!varitionNotAvalible) {
            productItem = {
              ...productItem,
              regularprice: regular_price,
              saleprice: sale_price
            };
          }
        }

        if (subscribeChecked) {
          productItem = {
            ...productItem,
            subscribed: subscribeChecked,
            subscribedTime: selectedSusTime.value,
            subscribedDiscountPersent: subscribeDiscount
          };
        } else {
          productItem = {
            ...productItem,
            subscribed: subscribeChecked
          };
        }

        // var checkUpdateModify = false;
        // var UpdateQty = 0;
        // var oldItem = '';
        setTimeout(() => {
          if (flag && varFlag) {
            /*-------
            const totalVarition = productItem.attributes
              ? productItem.attributes
                  .map(el => {
                    if (el) {
                      const { names } = el;
                      return names;
                    }
                    return null;
                  })
                  .filter(el => el)
              : [];
              
            const foundItem = this.props.cart.items.find(el => {
              const innerFlag = totalVarition
                .map(varEl => {
                  if (el[varEl]) {
                    return el[varEl].value === productItem[varEl].value;
                  } else {
                    return null;
                  }
                })
                .filter(el => el !== null);

              if (el.combo && productItem.combo)
                return el._id === productItem._id && innerFlag.every(el => el);

              if (el.combo)
                return (
                  el._id === productItem.productid._id &&
                  innerFlag.every(el => el)
                );

              if (productItem.combo)
                return (
                  el.productid._id === productItem._id &&
                  innerFlag.every(el => el)
                );

              return (
                el.productid._id === productItem.productid._id &&
                innerFlag.every(el => el)
              );
            });

            if (foundItem !== undefined && foundItem !== null) {
              const totalQty =
                parseInt(foundItem.qty.value) + parseInt(productItem.qty.value);

              const qty = {
                label: totalQty,
                value: totalQty
              };
              const tempNewItem = {
                ...foundItem,
                subscribed: productItem.subscribed
              };
              if (productItem.subscribed) {
                this.props.modifyItem({
                  oldItem: foundItem,
                  newItem: {
                    ...foundItem,
                    qty: qty,
                    subscribed: productItem.subscribed,
                    subscribedDiscountPersent:
                      productItem.subscribedDiscountPersent,
                    subscribedTime: productItem.subscribedTime
                  }
                });
              } else if (foundItem.subscribed) {
                const {
                  subscribedDiscountPersent,
                  subscribedTime,
                  ...newItem
                } = tempNewItem;
                this.props.modifyItem({
                  oldItem: foundItem,
                  newItem: {
                    ...newItem
                  }
                });
              } else {
                this.props.modifyItem({
                  oldItem: foundItem,
                  newItem: {
                    ...foundItem,
                    qty: qty,
                    subscribed: productItem.subscribed
                  }
                });
              }
            } else {
              this.props.addToCart(variablePriceSet(productItem));
            }
             --- */
            this.props.addToCart(
              variablePriceSet(productItem),
              this.props.cart,
              this.props.user.userMetaId
            );
            if(!this.props.cartBarOpen)
              this.props.toggleCartBar()
              
            this.setState(
              {
                isAddedOpen: true,
                currentAddedItem: variablePriceSet(productItem)
              },
              () => {
                setTimeout(() => {
                  this.setState({
                    isAddedOpen: false
                  });
                }, 2000);
              }
            );
          }
        }, 200);
        if (productItem.producttype === "simple" && flag) {
          this.props.addToCart(
            variablePriceSet(productItem),
            this.props.cart,
            this.props.user.userMetaId
          );
          this.setState(
            {
              isAddedOpen: true,
              currentAddedItem: variablePriceSet(productItem)
            },
            () => {
              setTimeout(() => {
                this.setState({
                  isAddedOpen: false
                });
              }, 2000);
            }
          );
        }
      }
    ]);
  }

  returnProductPrice(qty, onlyNew = false) {
    var {
      sale_price,
      regular_price,
      subscribeChecked,
      subscribeDiscount
    } = this.state;
    if (
      this.props.product.producttype === "simple" ||
      this.props.product.combo === true
    ) {
      sale_price = this.props.product.dsaleprice;
      regular_price = this.props.product.dregularprice;
    }
    let value = 0;
    // let qtyVal = 1;
    // if (qty) {
    //   if (qty.value) {
    //     qtyVal = qty.value > 0 ? parseInt(qty.value) : 1;
    //   }
    //   // this.toggleModal;
    // }
    const qtyVal =
      qty && qty.value
        ? parseInt(qty.value) > 0
          ? parseInt(qty.value)
          : 1
        : 1;
    let currency = `$`;
    if (sale_price) {
      value = sale_price;
    } else if (regular_price) {
      value = regular_price;
    }
    if (value) {
      if (subscribeChecked) {
        const discount = subscribeDiscount;

        const cutPrice =
          value - basicFunction.getParchantage(parseFloat(discount), value);
        if (onlyNew) {
          return (
            <span>
              {" " + currency}
              {(cutPrice * qtyVal).toFixed(2)}
            </span>
          );
        }
        return (
          <span>
            {" " + currency}
            <strike>{basicFunction.nombarFormat(value * qtyVal)}</strike>{" "}
            {(cutPrice * qtyVal).toFixed(2)}
          </span>
        );

        // `${currency}${basicFunction.nombarFormat(value * qtyVal)}`
      }
      return ` ${currency}${basicFunction.nombarFormat(value * qtyVal)}`;
    }
    return ``;
  }

  returnBasePriceVaritionProduct(qty) {
    var { sale_price, regular_price } = this.state;
    if (
      this.props.product.producttype === "simple" ||
      this.props.product.combo === true
    ) {
      sale_price = this.props.product.dsaleprice;
      regular_price = this.props.product.dregularprice;
    }
    let value = 0;
    let qtyVal = 1;
    if (qty) {
      if (qty.value) {
        qtyVal = qty.value > 0 ? parseInt(qty.value) : 1;
      }
      // this.toggleModal;
    }
    let currency = `$`;
    if (sale_price) {
      value = sale_price;
    } else if (regular_price) {
      value = regular_price;
    }
    if (value) {
      return ` - ${currency}${basicFunction.nombarFormat(value * qtyVal)}`;
    }
    return ``;
  }
  returnBasePriceVaritionProductWithDiscount(qty) {
    var {
      sale_price,
      regular_price,
      subscribeChecked,
      subscribeDiscount
    } = this.state;
    if (
      this.props.product.producttype === "simple" ||
      this.props.product.combo === true
    ) {
      sale_price = this.props.product.dsaleprice;
      regular_price = this.props.product.dregularprice;
    }
    let value = 0;
    let qtyVal = 1;
    if (qty) {
      if (qty.value) {
        qtyVal = qty.value > 0 ? parseInt(qty.value) : 1;
      }
      // this.toggleModal;
    }
    // let currency = `$`;
    var salePrice = 0;
    var ragularPrice = 0;
    var str = "";
    if (sale_price) {
      value = sale_price;
      salePrice = sale_price * qtyVal;
      ragularPrice = regular_price * qtyVal;
      var dis = this.GetParchantageBetweenTwoValue(ragularPrice, salePrice);
      if (subscribeChecked === true) {
        const discount = subscribeDiscount;
        dis = parseFloat(dis) + parseFloat(discount);
        salePrice =
          salePrice - basicFunction.getParchantage(discount, salePrice);
      }
      str = (
        <p>
          <b className="priceText">$ {basicFunction.nombarFormat(salePrice)}</b>
          <strike>$ {basicFunction.nombarFormat(ragularPrice)}</strike>
          <span className="error-direct"> ({dis} % Off) </span>
        </p>
      );

      //   "<p> $" +
      //   basicFunction.nombarFormat(salePrice) +
      //   "</b> <strike> $" +
      //   basicFunction.nombarFormat(ragularPrice) +
      //   "</strike> USD <span className='error-direct'> (" +
      //   dis +
      //   " % Off) </span> </p>";
    } else if (regular_price) {
      value = regular_price;
      ragularPrice = regular_price * qtyVal;
      if (subscribeChecked === true) {
        const discount = subscribeDiscount;
        dis = parseFloat(dis) + parseFloat(discount);
        ragularPrice =
          ragularPrice - basicFunction.getParchantage(discount, ragularPrice);
      }
      str = (
        <p>
          <b>basicFunction.currancyAddWithNumber(ragularPrice)</b>
        </p>
      );
      // "<p> <b>" +
      // basicFunction.currancyAddWithNumber(ragularPrice) +
      // "</b> </p>";
    }

    if (value) {
      return str;
    }
    return ``;
  }

  returnBasePriceVaritionProduct2(qty) {
    var { sale_price, regular_price } = this.state;
    if (
      this.props.product.producttype === "simple" ||
      this.props.product.combo === true
    ) {
      sale_price = this.props.product.dsaleprice;
      regular_price = this.props.product.dregularprice;
    }
    let value = 0;
    let qtyVal = 1;
    if (qty) {
      if (qty.value) {
        qtyVal = qty.value > 0 ? parseInt(qty.value) : 1;
      }
      // this.toggleModal;
    }
    let currency = `$`;
    if (sale_price) {
      value = sale_price;
    } else if (regular_price) {
      value = regular_price;
    }
    if (value) {
      var returnvalue = basicFunction.nombarFormat(value * qtyVal);
      return `  ${currency}${returnvalue}`;
    }
    return ``;
  }
  GetParchantageBetweenTwoValue(height = 0, lowvalue = 0) {
    const diff = height - lowvalue;
    const getPar = (diff / height) * 100;
    return basicFunction.nombarFormat(getPar);
  }

  hartState = (_id, productmainId, productDetails, productSlug) => {
    const removeIndex = basicFunction.checkProductInWishList(
      this.props.wishList,
      productmainId
    );
    var wishListArray = [...this.props.wishList];
    if (removeIndex || removeIndex === 0) {
      if (this.props.user._id) {
        var id = wishListArray[removeIndex].wishListId;
        deleteWishList({ id })
          .then(res => res.json())
          .then(resJson => {
            if (resJson.success) {
            }
          })
          .catch();
      }
      wishListArray.splice(removeIndex, 1);
      this.props.setWishList(wishListArray);
      this.setState({
        SpinnerToggle: false
      });
    } else {
      if (this.props.user._id) {
        const userid = this.props.user._id;
        addToWishListApi(userid, productmainId, _id, productSlug)
          .then(res => res.json())
          .then(resJson2 => {
            if (resJson2.status) {
              var wishlist = "";
              const wishListRes = resJson2.wishlist;
              if (wishListRes.combo) {
                wishlist = {
                  combo: wishListRes.combo,
                  productid: wishListRes.comboid,
                  productmeta: wishListRes.comboid,
                  userid: userid,
                  wishListId: wishListRes._id,
                  productSlug
                };
              } else {
                wishlist = {
                  combo: wishListRes.combo,
                  productid: wishListRes.productid,
                  productmeta: wishListRes.productmeta,
                  userid: userid,
                  wishListId: wishListRes._id,
                  productSlug
                };
              }

              this.props.setWishList([...wishListArray, wishlist]);
              this.setState({
                SpinnerToggle: false
              });
            }
          })
          .catch(err => {});
      } else {
        const wishListDetails = {
          productmeta: _id,
          productid: productmainId,
          productDetails: productDetails,
          productSlug
        };

        this.props.setWishList([...wishListArray, wishListDetails]);
      }
    }
  };
  render() {
    const {
      state: {
        selectedQty,
        selectedQtyErr,
        subscribeChecked,
        selectedSusTime,
        isVariable
        // currentAddedItem,
        // isAddedOpen
      },
      props: {
        product: {
          combo,
          productid,
          keyingredients,
          allingredients,
          // variation,
          // attributes,
          // verifiedAttr,
          visibleAttrList,
          attributecontent,
          _id: productId,
          featureimage,
          productSlug
        }
        // cart
      }
    } = this;

    const { title, sdescription } = this.props.product;
    let productName = combo === true ? title : productid.producttitle;
    let productDesc = combo === true ? sdescription : productid.sdescription;

    let mainImage = undefined;
    let productImageArr = [];
    if (combo === true) {
      mainImage = featureimage;
      if (mainImage) productImageArr.push({ img: filePath + mainImage });
    } else {
      mainImage = productid.featurefilepath;
      if (mainImage) {
        productImageArr.push({ img: filePath + mainImage });
      }
    }
    return (
      <div className="first_sec">
        <div className="container-fluid">
          <div className="large-container" style={{ paddingBottom: 100 }}>
            <div className="row">
              <div className="col-md-6">
                <ImageZoom Flavor={this.state.Flavor} />
              </div>
              <div className="col-md-6">
                <div className="product-detail-data">
                  <div className="product-detail-inner">
                    <div className="product-summary">
                      <h1
                        style={{
                          fontSize: "29px"
                        }}
                        className="product-title"
                      >
                        {productName}
                        {/* <FadeTransition in={this.props.totalReview > 0}> */}
                        <div>
                          <RatingsIcon
                            totalRating={this.props.totalRating}
                            totalReview={this.props.totalReview}
                            onReviewClick={this.props.onReviewClick}
                          />
                          </div>
                        {/* </FadeTransition> */}
                      </h1>
                      {this.state.selectedQty ? (
                        <div>
                          <h5
                            style={{
                              fontWeight: "500"
                            }}
                            className="mb-3 pt-2"
                          >
                            {this.returnProductPrice(this.state.selectedQty)}
                          </h5>
                        </div>
                      ) : (
                        <div>
                          <h5
                            style={{
                              fontWeight: "500"
                            }}
                            className="mb-3 pt-2"
                          >
                            {this.returnProductPrice(this.state.product)}
                          </h5>
                        </div>
                      )}

                      <p className="product-description">{productDesc}</p>
                    </div>
                    <div className="ProductDetails">
                      <ul className="ProductDetails-list">
                        {attributecontent && attributecontent.length > 0 && (
                          <ProductAttributeList list={[attributecontent[0]]} />
                        )}
                        <ProductAttributeTgl
                          title="ingredients"
                          description={keyingredients}
                          fullDescription={allingredients}
                        />
                        <li className=" ProductDetails-listItem--2">
                          <div className="">
                            <div className="row">
                              <div
                                className={classNames(
                                  "pt-3 col-sm-6 selector-wrapper animated",
                                  {
                                    shake: selectedQtyErr && this.state.isShake
                                  }
                                )}
                              >
                                <div className="ProductDetails-itemTitle">
                                  Select Quantity
                                </div>
                                <SelectMulti
                                  id={"selectVarient"}
                                  styles={selectStyle}
                                  value={selectedQty}
                                  isMulti={false}
                                  input={false}
                                  placeholder={"Select Quantity"}
                                  onChange={this.qtyChange}
                                  options={qtyOptions}
                                />
                                {this.state.selectedQtyErr ? (
                                  <p className="error-direct">
                                    Quantity is required{" "}
                                  </p>
                                ) : (
                                  ""
                                )}
                              </div>
                              {isVariable &&
                                this.renderVariation(visibleAttrList)}
                              <div className="pt-3 col-12">
                                {
                                  this.props.user && this.props.user._id ?
                                 <div className="has-inputs has-checkbox-input" >
                                  <input
                                    type="checkbox"
                                    checked={subscribeChecked}
                                    id="subscribeCheckBox"
                                    onChange={this.handleSubscribeChecked}
                                  />
                                  <label htmlFor="subscribeCheckBox">
                                    <span
                                      className={classNames("CheckIcon", {
                                        checked: subscribeChecked
                                      })}
                                    />
                                    Subscribe &amp; save{" "}
                                    {this.state.subscribeDiscount}%
                                  </label>
                                  
                                </div>
                                
                           
                                
                                :
                                <div>
                                <div className="has-inputs has-checkbox-input" id="UncontrolledTooltipExample">
                                  <input
                                    type="checkbox"
                                    checked={subscribeChecked}
                                    id="subscribeCheckBox"
                                    onChange={this.handleSubscribeChecked}
                                  />
                                  <label htmlFor="subscribeCheckBox">
                                    <span
                                      className={classNames("CheckIcon", {
                                        checked: subscribeChecked
                                      })}
                                    />
                                    Subscribe &amp; save{" "}
                                    {this.state.subscribeDiscount}%
                                  </label>
                                  
                                </div>
                                <UncontrolledTooltip placement="right" target="UncontrolledTooltipExample">
                                {subscribeLoginMessage}
                              </UncontrolledTooltip>
                              </div>
                                }
                                
                              </div>
                              {subscribeChecked && (
                                <div className="pt-3 col-12">
                                  <SelectMulti
                                    id={"selectVarient"}
                                    styles={selectStyle}
                                    value={selectedSusTime}
                                    isMulti={false}
                                    onChange={this.susTimeChange}
                                    options={susTimeOptions}
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        </li>

                        {/* My Work */}

                        <li className="ProductDetails-addtocart ProductDetails-listItem ProductDetails-addtocart-2">
                          <div
                            className={classNames("cart-btn-right d-flex", {
                              // disable: checkItemIncart(this.props.product)
                            })}
                          >
                            <button onClick={this.addToCart} className="btn2">
                              Add To Cart
                              {this.returnProductPrice(
                                this.state.selectedQty,
                                true
                              )}
                            </button>
                            <button onClick={this.addToCart} className="btn2 fixed-bottom-mobile-btn">
                              {
                                this.props.cart.items.some(el => el._id === this.props.products.product._id) ?
                                "Added": `Add To Cart ${this.returnProductPrice(
                                  this.state.selectedQty,
                                  true
                                )}`
                              }
                            </button>
                            <span
                              style={{ minWidth: "1px" }}
                              className="border-saperator"
                            />
                            <button
                              style={{
                                width: "80px",
                                "text-align": "center",
                                padding: 0
                              }}
                              onClick={() => {
                                this.hartState(
                                  productId,
                                  productid ? productid._id : productId,
                                  {
                                    productName,
                                    mainImage
                                  },
                                  productSlug
                                );
                              }}
                              className="btn2"
                            >
                              <Icon
                                className={classNames({
                                  filled: isProductInWishList(
                                    productId,
                                    this.props.wishList
                                  )
                                })}
                                icon={heart}
                              />
                            </button>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* currentAddedItem && !this.props.cartBarOpen &&  (
          <CartModal
            isOpen={isAddedOpen}
            toggle={this.toggleAdded}
            subTotal={cart.subTotal}
            title={addToCartMessage}
            currentItem={currentAddedItem}
          />
        ) */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.cart,
  location: state.location,
  user: state.user,
  wishList: state.wishList,
  products: state.products,
  cartBarOpen: state.cartSideBar.isOpen
});

export default connect(
  mapStateToProps,
  { addToCart, modifyItem, setWishList, toggleCartBar }
)(ProductDetailSec);
