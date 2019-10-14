import { rest } from "./rest";

export const getAllProductApi = () => rest.get("/products/api/all");
