import React from "react";

export default ({ rows }) => (
  <div className="cus-table-two">
    {rows.map((el, inx) => {
      // if(!el.content)
      // return null

      return (
        <div key={inx} className="cus-table-row">
          <div className="cus-table-heading">{el.heading}</div>
          <div className="cus-table-content">{el.content}</div>
        </div>
      );
    })}
  </div>
);

/*

cbdperunitmg -
direction
indication
servings -
servingsize -
storage
totalcbdmg -
use
warning
warranty

-- --
-- --
-- --
-- --

--
----------
--
--------*/
