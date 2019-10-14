import React from "react";

import { ShopItem } from "./";

const ItemList = props =>
  props.products.map((el, key) => <ShopItem key={key} product={el} />);

export default ItemList;
