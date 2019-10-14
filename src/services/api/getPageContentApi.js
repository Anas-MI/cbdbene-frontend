import { rest } from "./rest";

export const getPageContentApi = ({ id }) =>
  rest.get("/pages/pagecontent/?", `id=${id}`);

// /pages/pagecontent/?layout=Home India&country=India&type=home
