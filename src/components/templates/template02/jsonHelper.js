import _ from "lodash";

const returnInArray = str => {
  if (str) {
    if (typeof str === "string") {
      return [str];
    } else if (str.constructor === Array) {
      return [...str];
    }
  }
  return [undefined];
};

export const layout1secondSectionSorter = obj => {
  const {
    secondtitle1,
    secondtitle2,
    secondtitle3,
    secondtitle4,

    seconddescription1,
    seconddescription2,
    seconddescription3,
    seconddescription4,

    secondimage1,
    secondimage2,
    secondimage3,
    secondimage4,

    secondtitle,
    seconddescription,
    secondimage
  } = obj;

  let title = [
    ...returnInArray(secondtitle1),
    ...returnInArray(secondtitle2),
    ...returnInArray(secondtitle3),
    ...returnInArray(secondtitle4),
    ...returnInArray(secondtitle)
  ];
  let description = [
    ...returnInArray(seconddescription1),
    ...returnInArray(seconddescription2),
    ...returnInArray(seconddescription3),
    ...returnInArray(seconddescription4),
    ...returnInArray(seconddescription)
  ];
  let image = [
    ...returnInArray(secondimage1),
    ...returnInArray(secondimage2),
    ...returnInArray(secondimage3),
    ...returnInArray(secondimage4),
    ...returnInArray(secondimage)
  ];
  const secondSectionContent = _.zipWith(
    title,
    description,
    image,
    (title, description, image) => {
      return {
        title,
        description,
        image
      };
    }
  );
  return secondSectionContent.filter(el => el.title || el.description);
};
export const layout1thirdSectionSorter = obj => {
  // let returnArr = [];
  const {
    thirdtitle1,
    thirdtitle2,

    thirddescription1,
    thirddescription2,

    thirdbtntext1,
    thirdbtntext2,

    thirdbtnlink1,
    thirdbtnlink2,

    thirdtitle,
    thirddescription,
    thirdbtntext,
    thirdbtnlink,

    thirdimage,
    thirdcopyimage_1,
    thirdcopyimage_2
  } = obj;

  let title = [],
    description = [],
    img = [],
    btntext = [],
    btnlink = [];

  title = [
    ...returnInArray(thirdtitle),
    ...returnInArray(thirdtitle1),
    ...returnInArray(thirdtitle2)
  ];

  description = [
    ...returnInArray(thirddescription),
    ...returnInArray(thirddescription1),
    ...returnInArray(thirddescription2)
  ];

  btntext = [
    ...returnInArray(thirdbtntext),
    ...returnInArray(thirdbtntext1),
    ...returnInArray(thirdbtntext2)
  ];

  btnlink = [
    ...returnInArray(thirdbtnlink),
    ...returnInArray(thirdbtnlink1),
    ...returnInArray(thirdbtnlink2)
  ];

  img = [
    ...returnInArray(thirdimage),
    ...returnInArray(thirdcopyimage_1),
    ...returnInArray(thirdcopyimage_2)
  ];

  const thirdSectionContent = _.zipWith(
    title,
    description,
    btntext,
    btnlink,
    img,
    (title, description, btntext, btnlink, img) => {
      return {
        title,
        description,
        btntext,
        btnlink,
        img
      };
    }
  ).filter(el => {
    return Object.values(el).some(nEl => {
      if (nEl) {
        if (nEl !== "") {
          return true;
        }
      }
      return false;
    });
  });

  return thirdSectionContent;
};
// export const layout1thirdSectionSorter = obj => {
//   let returnArr = [];
//   const {
//     thirdtitle1,
//     thirdtitle2,

//     thirddescription1,
//     thirddescription2,

//     thirdbtntext1,
//     thirdbtntext2,

//     thirdbtnlink1,
//     thirdbtnlink2,

//     thirdtitle,
//     thirddescription,
//     thirdbtntext,
//     thirdbtnlink,

//     thirdimage,
//     thirdcopyimage_1,
//     thirdcopyimage_2

//   } = obj;

//   returnArr = [
//     ...returnArr,
//     {
//       title: thirdtitle1,
//       description: thirddescription1,
//       btntext: thirdbtntext1,
//       btnlink: thirdbtnlink1,
//       thirdimage:thirdcopyimage_1
//     },
//     {
//       title: thirdtitle2,
//       description: thirddescription2,
//       btntext: thirdbtntext2,
//       btnlink: thirdbtnlink2,
//       thirdimage:thirdcopyimage_2
//     }
//   ];

//   if (thirdtitle && thirddescription && thirdbtntext && thirdbtnlink && thirdimage) {
//     if (
//       thirdtitle.constructor === String ||
//       thirddescription.constructor === String ||
//       thirdbtntext.constructor === String ||
//       thirdbtnlink.constructor === String ||
//       thirdimage.constructor === String
//     ) {
//       returnArr.push({
//         title: thirdtitle,
//         description: thirddescription,
//         btntext: thirdbtntext,
//         btnlink: thirdbtnlink,
//         thirdimage:thirdimage
//       });
//     }

//     returnArr = [
//       ...returnArr,
//       ...thirdtitle.map((el, index) => {
//         return {
//           title: el,
//           description: thirddescription[index],
//           btntext: thirdbtntext[index],
//           btnlink: thirdbtnlink[index],
//           thirdimage:thirdimage[index]
//         };
//       })
//     ];
//     // }
//   }

//   return returnArr.filter(el => {
//     if (
//       el.title === "" &&
//       el.description === "" &&
//       el.btntext === "" &&
//       el.btnlink === "" &&
//       (el.img === "" || el.img === undefined )
//     ) {
//       return false;
//     }
//     return true;
//   });
// };
export const loyout1fourthSectionSorter = obj => {
  const {
    fourthtitle,
    fourthauthor,
    fourthdescription,
    fourthtwitter,
    fourthinsta,
    fourthfb,
    fourthimage
  } = obj;
  let title = [],
    author = [],
    description = [],
    twitter = [],
    insta = [],
    fb = [],
    image = [];

  if (fourthtitle) {
    if (typeof fourthtitle === "string") {
      title = [fourthtitle];
    } else if (fourthtitle.constructor === Array) {
      title = [...fourthtitle];
    }
  }
  if (fourthauthor) {
    if (typeof fourthauthor === "string") {
      author = [fourthauthor];
    } else if (fourthauthor.constructor === Array) {
      author = [...fourthauthor];
    }
  }
  if (fourthdescription) {
    if (typeof fourthdescription === "string") {
      description = [fourthdescription];
    } else if (fourthdescription.constructor === Array) {
      description = [...fourthdescription];
    }
  }
  if (fourthtwitter) {
    if (typeof fourthtwitter === "string") {
      twitter = [fourthtwitter];
    } else if (fourthtwitter.constructor === Array) {
      twitter = [...fourthtwitter];
    }
  }
  if (fourthinsta) {
    if (typeof fourthinsta === "string") {
      insta = [fourthinsta];
    } else if (fourthinsta.constructor === Array) {
      insta = [...fourthinsta];
    }
  }
  if (fourthfb) {
    if (typeof fourthfb === "string") {
      fb = [fourthfb];
    } else if (fourthfb.constructor === Array) {
      fb = [...fourthfb];
    }
  }
  if (fourthimage) {
    if (typeof fourthimage === "string") {
      image = [fourthimage];
    } else if (fourthimage.constructor === Array) {
      image = [...fourthimage];
    }
  }

  const fourthSectionConent = _.zipWith(
    title,
    author,
    description,
    twitter,
    insta,
    fb,
    image,
    (title, author, description, twitter, insta, fb, image) => {
      return {
        title,
        author,
        description,
        twitter,
        insta,
        fb,
        image
      };
    }
  );

  return fourthSectionConent;
};
