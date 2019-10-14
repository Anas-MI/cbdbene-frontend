import { SET_CARDS, SET_ERRORS, CLEAR_ERRORS, SET_USER, CLEAR_CARDS } from "./type";
import {
  getSingleUserApi,
  addUpdateUserDetails,
  addCardDetails,
  deleteCardDetails
} from "../services/api";

import { getUserMetaNoCart, updateUserMeta } from "./";
export const setCards = payload => ({
  type: SET_CARDS,
  payload
});
export const clearCards = payload => ({
  type: CLEAR_CARDS,
  payload
});

export const getCards = id => async dispatch => {
  getSingleUserApi(id)
    .then(res => res.json())
    .then(res => {
      console.log(res);

      const cards = returnCards(res);
      dispatch(setCards(cards));
    })
    .catch(err => console.log({ err }));
};

export const addCardAuthorize = data => dispatch => {
  const { user, card, bank, oldCards } = data;
  const { userMetaId, _id, userMetaObj } = user;

  const sendCardDetails = (customData, userId) => {
    console.log({
      customData,
      userId
    });
    addCardDetails(customData)
      .then(res => res.json())
      .then(res => {
        console.log({
          res
        });
        const { status, card , data} = res;
        if (
          status &&
          card &&
          card.paymentProfile &&
          card.messages &&
          card.messages.resultCode === "Ok"
        ) {
          if (userId) {
            //getUserMetaNoCart(userId);
            updateUserMeta(userId);
            // console.log("requested for meta", getUserMetaNoCart, userId);
            // getUserMetaNoCart(userId);
          }

          const {
            customerProfileId,
            customerPaymentProfileId,
            payment
          } = card.paymentProfile;

          const newCard = {
            customerProfileId,
            customerPaymentProfileId,
            ...payment
          };
          const allCardsPre = oldCards ? [...oldCards, newCard] : [newCard]
          const defaultCard = allCardsPre.find(el => el.isDefault === true)
          const allCards = allCardsPre.map((el, index)=> {
            if(index === 0 && !defaultCard)
              return ({
                ...el,
                isDefault: true
              })
            return el
          })
          addUpdateUserDetails({
            userid: _id,
            carddetails: {
              cards: allCards
            }
          })
            .then(res => res.json())
            .then(res => {
              console.log({ res });
              const cards = returnCards(res);
              dispatch(setCards(cards));
              // getUserMetaNoCart(userId);
              dispatch({
                type: CLEAR_ERRORS,
                payload: {}
              });
              getSingleUserApi(userId)
                .then(res => res.json())
                .then(res => {
                  if (res.user && res.user._id) {
                    console.log("user meta found", res);
                    dispatch({
                      type: SET_USER,
                      payload: {
                        ...res.user.userid,
                        userMetaId: res.user._id,
                        userMetaObj: res.user
                      }
                    });
                  }
                });
            })
            .catch(err => {
               dispatch({
                type: SET_ERRORS,
                payload: {
                  cards: ["Some thing wrong"]
                }
              });

              getSingleUserApi(userId)
                .then(res => res.json())
                .then(res => {
                  if (res.user && res.user._id) {
                    console.log("user meta found", res);
                    dispatch({
                      type: SET_USER,
                      payload: {
                        ...res.user.userid,
                        userMetaId: res.user._id,
                        userMetaObj: res.user
                      }
                    });
                  }
                });
              console.log({ err });
            });
          console.log({
            customerProfileId,
            customerPaymentProfileId,
            payment,
            customData
          });
        } else {
          console.log("xxxxxxxxxx",data.messages.message[0]);
          var errorMsg='';
          if(data.messages){
            const erroCode=data.messages.message[0];
            switch (erroCode.code) {
              case 'E00027':
                errorMsg="Invalid Card Details";
                break;
              default:
                  errorMsg="Something went wrong. Try again.";
                break;
            }
            
          }
          console.log("yyyyyyyyyy",errorMsg);
          dispatch({
            type: SET_ERRORS,
            payload: {
              cards: [errorMsg]
            }
          });
        }
      });
  };
  if (userMetaObj && userMetaId) {
    const { customerProfile } = userMetaObj;
    if (customerProfile) {
      if (card) {
        const { cardnumber, cvc, expmonth, expyear } = card;
        const creditcard = {
          cardNumber: cardnumber.split("-").join(""),
          expirationDate: `20${expyear}-${expmonth}`,
          cardCode: cvc
        };
        sendCardDetails({
          creditcard,
          profileid: customerProfile
        });
      } else if (bank) {
        sendCardDetails({
          bank,
          profileid: customerProfile
        });
      }
    } else {
      if (card) {
        const { cardnumber, cvc, expmonth, expyear } = card;
        const creditcard = {
          cardNumber: cardnumber.split("-").join(""),
          expirationDate: `20${expyear}-${expmonth}`,
          cardCode: cvc
        };
        sendCardDetails(
          {
            creditcard,
            email: userMetaId + "@cbdbene.com",
            metaid: userMetaId
          },
          _id
        );
      } else if (bank) {
        sendCardDetails(
          {
            bank,
            email: userMetaId + "@cbdbene.com",
            metaid: userMetaId
          },
          _id
        );
      }
    }
  }
};
const returnCards = res => {
  if (res.user) {
    if (res.user.carddetails) {
      return res.user.carddetails;
    }
  }
  return {};
};
export const addCard = (
  userid,
  card,
  oldDetail = {},
  oldCards = []
) => dispatch => {
  console.log({
    userid,
    card
  });
  const found = oldCards.find(el => el.id === card.id);
  console.log({
    found
  });
  if (found) {
    dispatch(editCard(userid, card, oldDetail, oldCards));
  } else {
    
    const allCardsPre = oldCards ? [...oldCards, card] : [card]
    const defaultCard = allCardsPre.find(el => el.isDefault === true)
    const allCards = allCardsPre.map((el, index)=> {
      if(index === 0 && !defaultCard)
        return ({
          ...el,
          isDefault: true
        })
      return el
    })
    addUpdateUserDetails({
      userid,
      carddetails: {
        ...oldDetail,
        cards: allCards
      }
    })
      .then(res => res.json())
      .then(res => {
        console.log({ res });
        const cards = returnCards(res);
        dispatch(setCards(cards));
      })
      .catch(err => {
        console.log({ err });
      });
  }
};
export const editCard = (
  userid,
  card,
  oldDetail = {},
  oldCards = []
) => dispatch => {
  const newCard = oldCards.map(el => {
    if (el.id === card.id) return card;

    return el;
  });
  addUpdateUserDetails({
    userid,
    carddetails: {
      ...oldDetail,
      cards: newCard
    }
  })
    .then(res => res.json())
    .then(res => {
      console.log({ res });
      const cards = returnCards(res);
      dispatch(setCards(cards));
    })
    .catch(err => {
      console.log({ err });
    });
};
export const deleteCard = (
  userid,
  card,
  oldDetail = {},
  oldCards = []
) => dispatch => {
  const newCard = oldCards.filter(
    el => el.customerPaymentProfileId !== card.customerPaymentProfileId
  );

  deleteCardDetails({
    paymentid: card.customerPaymentProfileId,
    profileid: card.customerProfileId
  })
    .then(res => res.json())
    .then(res => {
      console.log({
        res
      });
      if (
        res &&
        res.data &&
        res.data.messages &&
        res.data.messages.resultCode === "Ok"
      ) {
        
        const defaultCard = newCard.find(el => el.isDefault === true)
        const allCards = newCard.map((el, index)=> {
          if(index === 0 && !defaultCard)
            return ({
              ...el,
              isDefault: true
            })
          return el
        })
        addUpdateUserDetails({
          userid,
          carddetails: {
            ...oldDetail,
            cards: allCards
          }
        })
          .then(res => res.json())
          .then(res => {
            console.log({ res });
            const cards = returnCards(res);
            dispatch(setCards(cards));
          })
          .catch(err => {
            console.log({ err });
          });
      }
    });
};
export const setDefaultCard = (
  userid,
  id,
  oldDetail = {},
  oldCards = []
) => dispatch => {
  const newCard = oldCards.map(el => {
    return {
      ...el,
      isDefault: el.customerPaymentProfileId === id
    };
  });

  addUpdateUserDetails({
    userid,
    carddetails: {
      ...oldDetail,
      cards: newCard
    }
  })
    .then(res => res.json())
    .then(res => {
      console.log({ res });
      const cards = returnCards(res);
      dispatch(setCards(cards));
    })
    .catch(err => {
      console.log({ err });
    });
};
