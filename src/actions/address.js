import { SET_ADDRESS, CLEAR_ADDRESS } from "./type";
import { getSingleUserApi, addUpdateUserDetails } from "../services/api";

export const setAddress = payload => ({
  type: SET_ADDRESS,
  payload
});

export const clearAddress = payload => ({
  type: CLEAR_ADDRESS,
  payload
});

export const getAddress = id => async dispatch => {
  getSingleUserApi(id)
    .then(res => res.json())
    .then(res => {
      console.log(res);
      if (res.user) {
        if (res.user.shippingdetails) {
          dispatch(setAddress(res.user.shippingdetails));
        } else {
          dispatch(setAddress({}));
        }
      } else {
        dispatch(setAddress({}));
      }
    })
    .catch(err => console.log({ err }));
};
const returnAddress = res => {
  if (res.user) {
    if (res.user.shippingdetails) {
      return res.user.shippingdetails;
    }
  }
  return {};
};
export const addAddress = (
  userid,
  address,
  oldDetail = {},
  oldAddress = []
) => dispatch => {
  if (address.constructor === Array) {
    const addressArr = address.filter(el => el);
    const addresses1 = [...oldAddress, ...addressArr].map(elx => {
      return elx
    })
    const hasDefault = addresses1.find(el => el.isDefault === true)
    const addresses2 = addresses1.map((el, index)=> {
      if(index === 0 && !hasDefault){
        return ({
          ...el,
          isDefault: true
        })
      }
      return el
    })
    addUpdateUserDetails({
      userid,
      shippingdetails: {
        ...oldDetail,
        address: addresses2
      }
    })
      .then(res => res.json())
      .then(res => {
        console.log({ res });
        const address = returnAddress(res);
        dispatch(setAddress(address));
      })
      .catch(err => {
        console.log({ err });
      });
  } else {
    const addresses1 = [...oldAddress, address].map(elx => {
      return elx
    })
    const hasDefault = addresses1.find(el => el.isDefault === true)
    const addresses2 = addresses1.map((el, index)=> {
      if(index === 0 && !hasDefault){
        return ({
          ...el,
          isDefault: true
        })
      }
      return el
    })
    addUpdateUserDetails({
      userid,
      shippingdetails: {
        ...oldDetail,
        address: addresses2
      }
    })
      .then(res => res.json())
      .then(res => {
        console.log({ res });
        const address = returnAddress(res);
        dispatch(setAddress(address));
      })
      .catch(err => {
        console.log({ err });
      });
  }
};
export const deleteAddress = (
  userid,
  id,
  oldDetail = {},
  oldAddress = []
) => dispatch => {
  const newAddress1 = oldAddress.filter(el => el.id !== id);
  const defaultAddress = newAddress1.find(el => el.isDefault === true)
  const newAddress = newAddress1.map((el, index) => {
    if(index === 0 && !defaultAddress){
      return ({
        ...el, isDefault: true
      })
    }
    return el
  })
  addUpdateUserDetails({
    userid,
    shippingdetails: {
      ...oldDetail,
      address: newAddress
    }
  })
    .then(res => res.json())
    .then(res => {
      console.log({ res });
      const address = returnAddress(res);
      dispatch(setAddress(address));
    })
    .catch(err => {
      console.log({ err });
    });
};
export const setDefaultAddress = (
  userid,
  id,
  oldDetail = {},
  oldAddress = []
) => dispatch => {
  const newAddress = oldAddress.map(el => {
    return {
      ...el,
      isDefault: el.id === id
    };
  });

  addUpdateUserDetails({
    userid,
    shippingdetails: {
      ...oldDetail,
      address: newAddress
    }
  })
    .then(res => res.json())
    .then(res => {
      console.log({ res });
      const address = returnAddress(res);
      dispatch(setAddress(address));
    })
    .catch(err => {
      console.log({ err });
    });
};
export const editAddress = (
  userid,
  address,
  oldDetail = {},
  oldAddress = []
) => dispatch => {
  const newAddress = oldAddress.map(el => {
    if (el.id === address.id) return address;

    return el;
  });
  addUpdateUserDetails({
    userid,
    shippingdetails: {
      ...oldDetail,
      address: newAddress
    }
  })
    .then(res => res.json())
    .then(res => {
      console.log({ res });
      const address = returnAddress(res);
      dispatch(setAddress(address));
    })
    .catch(err => {
      console.log({ err });
    });
};
