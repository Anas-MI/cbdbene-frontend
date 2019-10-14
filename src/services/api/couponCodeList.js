import { rest } from "./rest";
export const couponCodeList = () => rest.get("/stripe/coupon/list");
