import { ADD_ITEM, REMOVE_ITEM, MODIFY_ITEM } from "../actions/type";

const initialState = {
  cart: {
    items: []
  }
};
const addQty = (first, next) => {
  let newVal = parseInt(first.value) + parseInt(next.value);
  newVal = newVal > 10 ? 10 : newVal;
  return {
    label: `${newVal}`,
    value: `${newVal}`
  };
};
export default (state = initialState, action) => {
  const { cart } = state;
  const { payload } = action;
  switch (action.type) {
    case ADD_ITEM:
      //  console.log({ state }, "sst");
      const { producttype, size, extract_flavor, _id } = action.payload;
      if (producttype === "variable") {
        if (size && extract_flavor) {
          if (
            state.cart.items.some(
              el =>
                el._id === _id &&
                el.size === size &&
                el.extract_flavor === extract_flavor
            )
          ) {
          } else {
            return {
              ...state,
              cart: {
                items: [...cart.items, action.payload]
              }
            };
          }
        } else if (size) {
          if (state.cart.items.some(el => el._id === _id && el.size === size)) {
          } else {
            return {
              ...state,
              cart: {
                items: [...cart.items, action.payload]
              }
            };
          }
        } else if (extract_flavor) {
          if (
            state.cart.items.some(
              el => el._id === _id && el.extract_flavor === extract_flavor
            )
          ) {
          } else {
            return {
              ...state,
              cart: {
                items: [...cart.items, action.payload]
              }
            };
          }
        }
      } else {
        // console.log({ state }, "else");
        if (state.cart.items.some(el => el._id === _id)) {
        } else {
          return {
            ...state,
            cart: {
              items: [...cart.items, action.payload]
            }
          };
        }
      }
      return state;
      break;

    case REMOVE_ITEM:
      // const { cart } = state;

      return {
        ...state,
        cart: {
          items: [...cart.items.filter(el => el !== action.payload)]
        }
      };
      break;

    case MODIFY_ITEM:
      // console.log({ payload });
      if (payload.newItem && payload.oldItem) {
        const { newItem, oldItem } = payload;
        if (oldItem !== newItem) {
          // if(newItem.qty && oldItem.qty){
          //   if(newItem.qty !== oldItem.qty){

          //   }
          // }
          // if(newItem.extract_flavor && newItem.size){
          //   if(newItem.extract_flavor !== oldItem.extract_flavor
          //     && newItem.size !== oldItem.size
          //     ){
          //     let match = false
          //     let newArr = cart.items.map(el=>{
          //       if(el._id === newItem._id){
          //         if(el.extract_flavor === newItem.extract_flavor && el.size === newItem.size){
          //           match = true
          //           return {...newItem, qty: addQty(newItem.qty, el.qty)}
          //         }
          //       }
          //       return el
          //     });
          //     if(match){
          //       newArr = [...newArr, newItem]
          //     }
          //     return {
          //       ...state,
          //       cart: {
          //         items: [...newArr]
          //       }
          //     };
          //   }
          // }else if(newItem.extract_flavor){
          //   if(newItem.extract_flavor !== oldItem.extract_flavor){
          //     let match = false
          //     let newArr = cart.items.map(el=>{
          //       if(el._id === newItem._id){
          //         if(el.extract_flavor === newItem.extract_flavor){
          //           match = true
          //           return {...newItem, qty: addQty(newItem.qty, el.qty)}
          //         }
          //       }
          //       return el
          //     });
          //     if(match){
          //       newArr = [...newArr, newItem]
          //     }
          //     return {
          //       ...state,
          //       cart: {
          //         items: [...newArr]
          //       }
          //     };
          //   }
          // }else if(newItem.size){
          //   if(newItem.size !== oldItem.size){
          //     let match = false
          //     let newArr = cart.items.map(el=>{
          //       if(el._id === newItem._id){
          //         if(el.size === newItem.size){
          //           match = true
          //           return {...newItem, qty: addQty(newItem.qty, el.qty)}
          //         }
          //       }
          //       return el
          //     });
          //     if(match){
          //       newArr = [...newArr, newItem]
          //     }
          //     return {
          //       ...state,
          //       cart: {
          //         items: [...newArr]
          //       }
          //     };
          //   }
          // }

          return {
            ...state,
            cart: {
              items: cart.items.map(el => {
                if (el._id === newItem._id) {
                  return newItem;
                }
                return el;
              })
            }
          };
        }
      }
      return state;
      break;
    default:
      return state;
  }
};
