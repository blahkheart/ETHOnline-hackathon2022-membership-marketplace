import React, { useEffect, useState } from "react";
import { Spin } from "antd";
// import { getTotalAmount } from "../../helpers";

const VendorData = ({ orderData }) => {
  const [totalAmount, setTotalAmount] = useState();

  useEffect(() => {
    const getTotalAmount = _callback => {
      try {
        let _totalAmount = 0;
        const _orders = orderData.vendor.orders;
        for (let i = 0; i < _orders.length; i++) {
          let _amount = parseInt(_orders[i].amount);
          _totalAmount += _amount;
          _callback(_totalAmount);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getTotalAmount(setTotalAmount);
  }, [orderData]);

  return (
    <div className="w-full p-4 flex flex-col rounded-2xl bg-primary text-white rounded-4 min-h-full">
      <div className="w-full ">
        <div>
          {orderData && orderData.vendor ? (
            <div>
              <p>Vendor Address: {orderData.vendor.address}</p>
              {/* <p>BuidlBuxx Balance: BUIDL 100</p> */}
              <p>
                Total Earnings: BUIDL <span>{totalAmount}</span>
              </p>
              <p>
                Total Orders: <span>{orderData.vendor.ordersCount}</span>
              </p>
            </div>
          ) : (
            <div className="d-flex justify-content-center">
              <Spin />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorData;
