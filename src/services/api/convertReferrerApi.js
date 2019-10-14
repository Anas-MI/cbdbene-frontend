import { rest } from "../api/rest";

export const convertReferrer = body =>
  rest.post("/ambassador-portal/convert", body);

/*

    {
        id: id
        amount: amount
        
    }

  */
