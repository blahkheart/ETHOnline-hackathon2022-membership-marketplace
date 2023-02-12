import { useState, useEffect } from "react";
/*
  ~ What it does? ~
  Calculates the total amount from an array of orders object with an amount property.
  ~ How can I use ? ~
  const myConst = useTotalAmount(myArray);

  ~ Features ~
  - loops through array
  - parses strings to numbers and sums them up
  - Returns a number: totalAmount
*/

const useTotalAmount = data => {
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const getTotalAmount = () => {
      try {
        let _totalAmount = 0;
        const _orders = data;
        for (let i = 0; i < _orders.length; i++) {
          let _amount = parseInt(_orders[i].amount);
          _totalAmount += _amount;
          setTotalAmount(_totalAmount);
        }
      } catch (e) {
        console.log(e);
      }
    };
    void getTotalAmount();
  }, [data]);
  return totalAmount;
};
export default useTotalAmount;
