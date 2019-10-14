import { rest } from "./rest";

export const getFooterMenu = () => rest.get("/footermenus/getall");
