import { rest } from "./rest";

export const getSiteSettings = () => rest.get("/options/getsitesettings");
