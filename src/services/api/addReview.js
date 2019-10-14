import { rest } from "../api/rest";
export const addReview = data => rest.post("/products/add-review", data);
