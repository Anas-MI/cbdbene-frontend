import { addSlugToProduct } from "./productHelpers";

export const getItemTotal = item => {
  if (item) {
    if (item.saleprice)
      return parseFloat(item.saleprice) * parseFloat(item.qty.value);
    else if (item.regularprice)
      return parseFloat(item.regularprice) * parseFloat(item.qty.value);
  }
  return 0;
};

export const returnSubTotal = items => {
  // amount =
  return items
    .map(el => {
      if (el) {
        if (el.saleprice)
          if (el.subscribed) {
            const totalPrice =
              parseFloat(el.saleprice) * parseFloat(el.qty.value);
            const disc = (totalPrice * el.subscribedDiscountPersent) / 100;
            return parseFloat(totalPrice) - parseFloat(disc);
          } else {
            return parseFloat(el.saleprice) * parseFloat(el.qty.value);
          }
        else if (el.regularprice)
          if (el.subscribed) {
            const totalPrice =
              parseFloat(el.regularprice) * parseFloat(el.qty.value);
            const disc = (totalPrice * el.subscribedDiscountPersent) / 100;
            return parseFloat(totalPrice) - parseFloat(disc);
          } else {
            return parseFloat(el.regularprice) * parseFloat(el.qty.value);
          }
      }

      return 0;
    })
    .reduce((a, b) => a + b, 0);
};
export const returnUnSubscribeTotal = items => {
  return items
    .filter(el => !el.subscribed)
    .map(el => {
      if (el) {
        if (el.saleprice)
          return parseFloat(el.saleprice) * parseFloat(el.qty.value);
        else if (el.regularprice)
          return parseFloat(el.regularprice) * parseFloat(el.qty.value);
      }

      return 0;
    })
    .reduce((a, b) => a + b, 0);
};
export const getTotalWeight = items => {
  return items
    .filter(el => el.weight)
    .map(el => el.weight * parseFloat(el.qty.value))
    .reduce((a, b) => a + b, 0);
};
export const getTotalVolume = items => {
  // return items
  //   .filter(el => el.shipping_height && el.shipping_length && el.shipping_width)
  //   .map(el => el.shipping_height * el.shipping_length * el.shipping_width)
  //   .reduce((a, b) => a + b, 0);
  return items
    .filter(el => el.volume)
    .map(el => el.volume * parseFloat(el.qty.value))
    .reduce((a, b) => a + b, 0);
};
export const getTotalVariation = item => {
  if (!item.attributes) return [];

  return item.attributes.map(el => (el ? el.names : null)).filter(el => el);
};
export const variablePriceSet = productItem => {
  if (productItem) {
    let tempVariable = { ...productItem };
    if (productItem.producttype === "variable") {
      // if (productItem.size && productItem.extract_flavor) {
      const notNullVariation = productItem.variation.filter(el => el !== null);
      productItem.attributes.filter(el => el !== null).map(el => el.names);
      const varCheck = productItem.attributes
        .filter(el => el !== null)
        .map(attr => {
          return {
            key: attr.names,
            value: productItem[attr.names]
              ? productItem[attr.names].value
              : productItem[attr.names]
          };
        });
      let matchedVariable = null;
      if (
        !varCheck.some(vEl => vEl.value === null || vEl.value === undefined)
      ) {
        matchedVariable = notNullVariation.find(varEl => {
          let matchArr = [];
          varCheck.map(vEl => {
            matchArr.push(varEl[vEl.key] === vEl.value);
            return null;
          });

          return !matchArr.includes(false);
        });
        if (matchedVariable) {
          tempVariable = {
            ...productItem,
            regularprice: matchedVariable.regular_price,
            saleprice: matchedVariable.sale_price
          };
        } else {
          tempVariable = {
            ...productItem,
            regularprice: productItem.dregularprice,
            saleprice: productItem.dsaleprice
          };
        }
      }
    } else {
      if (productItem.producttype === "simple" || productItem.combo) {
        tempVariable = {
          ...productItem,
          regularprice: productItem.dregularprice,
          saleprice: productItem.dsaleprice
        };
      }
    }

    return tempVariable;
  }
};
export const changeCartItemVariation = (
  varValue,
  names,
  item,
  indexingNo,
  list
) => {
  if (names === "qty") {
    return {
      approve: false,
      update: {
        oldItem: item,
        newItem: { ...item, [names]: varValue },
        remove: null
      }
    };
  } else {
    const totalVariation = getTotalVariation(item);

    const foundItem = list.find((el, index) => {
      const innerFlag = totalVariation
        .map(varEl => {
          if (el[varEl]) {
            if (varEl === names) {
              return el[varEl].value === varValue.value;
            }
            return el[varEl].value === item[varEl].value;
          } else {
            return null;
          }
        })
        .filter(el => el !== null);

      return (
        el.productid._id === item.productid._id &&
        innerFlag.every(el => el) &&
        index !== indexingNo
      );
    });
    if (foundItem !== undefined && foundItem !== null) {
      const totalQty = parseInt(foundItem.qty.value) + parseInt(item.qty.value);
      const qty = {
        label: totalQty.toString(),
        value: totalQty.toString()
      };

      if (item.subscribed || foundItem.subscribed) {
        return {
          approve: true,
          update: {
            oldItem: foundItem,
            newItem: {
              ...foundItem,
              [names]: varValue,
              qty,
              subscribed: true,
              subscribedDiscountPersent: item.subscribedDiscountPersent,
              subscribedTime: item.subscribedTime
            },
            remove: item
          }
        };
      } else {
        return {
          approve: false,
          update: {
            oldItem: foundItem,
            newItem: {
              ...foundItem,
              [names]: varValue,
              qty
            },
            remove: item
          }
        };
      }
    } else {
      return {
        approve: false,
        update: {
          oldItem: item,
          newItem: {
            ...item,
            [names]: varValue
          },
          remove: null
        }
      };
    }
  }
};
export const verifyProduct = (productItem, items = []) => {
  const totalVariation = getTotalVariation(productItem);

  const foundItem = items.find(el => {
    const innerFlag = totalVariation
      .map(varEl => {
        if (el[varEl]) {
          return el[varEl].value === productItem[varEl].value;
        } else {
          return null;
        }
      })
      .filter(el => el !== null)
      .every(el => el);

    if (!innerFlag) return innerFlag;

    if (el.combo && productItem.combo) return el._id === productItem._id;

    if (el.combo) return el._id === productItem.productid._id;

    if (productItem.combo) return el.productid._id === productItem._id;

    return el.productid._id === productItem.productid._id;
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
      const {
        subscribed,
        subscribedDiscountPersent,
        subscribedTime
      } = productItem;
      return {
        found: foundItem,
        item: {
          ...foundItem,
          qty: qty,
          subscribed,
          subscribedDiscountPersent,
          subscribedTime
        }
      };
    } else if (foundItem.subscribed) {
      const {
        subscribedDiscountPersent,
        subscribedTime,
        ...newItem
      } = tempNewItem;
      return {
        found: foundItem,
        item: {
          ...newItem
        }
      };
    }
    return {
      found: foundItem,
      item: {
        ...foundItem,
        qty: qty,
        subscribed: productItem.subscribed
      }
    };
  }
  return {
    found: null,
    item: {
      ...productItem
    }
  };
};
export const addItem = (state, newItem) => {
  const { found, item } = verifyProduct(newItem, state.items);

  if (found) {
    return modifyProduct(found, item, state);
  }
  const newItems = [...state.items, newItem];

  return {
    ...state,
    items: newItems,
    subTotal: returnSubTotal(newItems) || 0,
    unSubscribeProductAmount: returnUnSubscribeTotal(newItems) || 0,
    totalWeight: getTotalWeight(newItems),
    totalVolume: getTotalVolume(newItems)
  };
};
export const setSlugInCart = cart => {
  return {
    ...cart,
    items: cart.items ? cart.items.map(el => addSlugToProduct(el)) : []
  };
};
export const modifyProduct = (oldItem, newItem, state) => {
  const NewItems = state.items.map(el => {
    if (el._id === newItem._id) {
      if (el === oldItem) {
        return variablePriceSet(newItem);
      }
    }
    return el;
  });
  if (oldItem !== newItem) {
    return {
      ...state,
      items: [...NewItems],
      subTotal: returnSubTotal(NewItems) || 0,
      unSubscribeProductAmount: returnUnSubscribeTotal(NewItems) || 0,
      totalWeight: getTotalWeight(NewItems),
      totalVolume: getTotalVolume(NewItems)
    };
  }
  return state;
};
export const removeItem = (state, item) => {
  const newItems = [...state.items.filter(el => el !== item)];
  return {
    ...state,
    items: newItems,
    subTotal: returnSubTotal(newItems) || 0,
    unSubscribeProductAmount: returnUnSubscribeTotal(newItems) || 0,
    totalWeight: getTotalWeight(newItems),
    totalVolume: getTotalVolume(newItems)
  };
};
