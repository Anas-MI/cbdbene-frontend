const generateCategorySlug = (countryCode = "US", title) => {
  const slug = title.replace(/\//g, "!");
  return `/${countryCode}/category/${slug}`;
};

const generateShopSlug = (countryCode = "US") => `/${countryCode}/shop`;

const generatePageSlug = (countryCode = "US", title) =>
  `/${countryCode}/pages/${title}`;

const generateExternalSlug = (countryCode = "US", link) => {
  if (link.split("//")[0].includes("http")) {
    return link;
  }
  return `/${countryCode}/${link}`;
};
const generateSlugedMenus = (countryCode = "US", menu = []) => {
  const menus = menu
    .filter(el => el)
    .map(el => {
      switch (el.pagetype) {
        case "shoppage":
          return {
            ...el,
            slug: generateShopSlug(countryCode)
          };
        case "categorypage":
          return {
            ...el,
            slug: generateCategorySlug(countryCode, el.category)
          };
        case "custompage":
          return {
            ...el,
            slug: generatePageSlug(countryCode, el.pagetitle)
          };
        default:
          return {
            ...el,
            slug: generateExternalSlug(countryCode, el.externallink)
          };
      }
    });

  return menus;
};
const getMainMenus = menus =>
  menus
    .filter(el => el)
    .map(el => {
      if (!el.parentid) {
        return {
          ...el
        };
      }
      return null;
    })
    .filter(el => el && el._id)
    .sort((a, b) => a.menuorder - b.menuorder);

const subMenus = (menus, pid) =>
  menus
    .filter(elx => {
      if (!elx) return false;

      if (!elx.parentid) return false;

      if (elx.parentid._id !== pid) return false;

      return true;
    })
    .sort((a, b) => a.menuorder - b.menuorder);

const getfullMenu = (mainMenu, allMenu) =>
  mainMenu
    .filter(el => el)
    .map(el => ({
      ...el,
      subMenu: subMenus(allMenu, el._id)
    }));

const getfullMainMenu = (mainMenu, allMenu) =>
  mainMenu
    .filter(el => el)
    .map((el, index) => {
      if (index !== 0)
        return {
          ...el,
          slug: "#",
          subMenu: subMenus(allMenu, el._id)
        };
      return {
        ...el,
        subMenu: subMenus(allMenu, el._id)
      };
    });

export default (menus, countryCode, isMain) => {
  const slugedMenu = generateSlugedMenus(countryCode, menus);
  const mainMenu = getMainMenus(slugedMenu);
  const fullMenus = isMain
    ? getfullMainMenu(mainMenu, slugedMenu)
    : getfullMenu(mainMenu, slugedMenu);
  return fullMenus;
};
