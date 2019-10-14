import { rest } from "./rest";

export const getMenusApi = () => rest.get("/menus/getall");
