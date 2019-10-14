import { rest } from "./rest";

export const getSettingsApi = () => rest.get("/options/getsitesettings");
