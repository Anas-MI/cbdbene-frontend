import { rest } from "./rest";

export const getAllCategory = () => rest.get("/products/api/categories/all");
