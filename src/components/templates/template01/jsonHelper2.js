export const layout2secondSectionSorter = obj => {
  var returnArr = [];

  if (obj.secondtitle) {
    obj.secondtitle.map((key, index) => {
      const lists = [];
      obj.seconddiseases[index].map((lis, i) => {
        lists.push(lis);
        return null;
      });
      var data = {
        title: key,
        id: index + 1,
        description: obj.secondsubtitle[index],
        list: lists
      };
      returnArr.push(data);
      return null;
    });
  }
  return returnArr;
};
export const layout2thirdSectionSorter = obj => {
  let returnArr = [];
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
    thirdbtnlink
  } = obj;

  returnArr = [
    ...returnArr,
    {
      title: thirdtitle1,
      description: thirddescription1,
      btntext: thirdbtntext1,
      btnlink: thirdbtnlink1
    },
    {
      title: thirdtitle2,
      description: thirddescription2,
      btntext: thirdbtntext2,
      btnlink: thirdbtnlink2
    }
  ];

  if (thirdtitle && thirddescription && thirdbtntext && thirdbtnlink) {
    if (
      thirdtitle.constructor === String ||
      thirddescription.constructor === String ||
      thirdbtntext.constructor === String ||
      thirdbtnlink.constructor === String
    ) {
      returnArr.push({
        title: thirdtitle,
        description: thirddescription,
        btntext: thirdbtntext,
        btnlink: thirdbtnlink
      });
    }
    // if(secondtitle.length > seconddescription.length){
    returnArr = [
      ...returnArr,
      ...thirdtitle.map((el, index) => {
        return {
          title: el,
          description: thirddescription[index],
          btntext: thirdbtntext[index],
          btnlink: thirdbtnlink[index]
        };
      })
    ];
    // }
  }

  return returnArr.filter(el => {
    if (
      el.title === "" &&
      el.description === "" &&
      el.btntext === "" &&
      el.btnlink === ""
    ) {
      return false;
    }
    return true;
  });
};
