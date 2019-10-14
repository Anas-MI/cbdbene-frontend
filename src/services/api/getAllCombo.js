import { rest } from "./rest";

export const getAllComboApi = () => rest.get("/products/api/combos/all");
