import React, { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { EXAMPLE_GRAPHQL } from "../../helpers/graphQueryData";
import { Spin } from "antd";

function Balance() {
  const [orders, setOrders] = useState();
  const [totalAmount, setTotalAmount] = useState();
  const EXAMPLE_GQL = gql(EXAMPLE_GRAPHQL);
  const { loading, data } = useQuery(EXAMPLE_GQL, { pollInterval: 2500 });

  // useEffect(() => {
  //   const test = async () => {
  //     console.log("testBalance.jsx::", data.orders);
  //   };
  //   test();
  // }, [data]);

  // useEffect(() => {
  //   if (data) {
  //     const info = data.orders;
  //     setOrders(info);
  //   }
  // }, [data]);
  // console.log("testBalance",orders)
  useEffect(() => {
    const getTotalAmount = _callback => {
      try {
        let _totalAmount = 0;
        const _orders = data.orders;
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
  }, [data]);

  return (
    <div className="d-flex align-items-center rounded-bottom-4 bg-primary px-4 py-2">
      {!loading && data && data.orderCounters ? (
        <>
          <div className="d-flex flex-column align-items-start text-left pe-5 me-md-5">
            <h5 className="fs-6">Total Orders</h5>
            <text className="text-white fs-1 fw-bold">{data.orderCounters[0].ordersCount}</text>
          </div>
          <div className="d-flex flex-column align-items-start text-left ms-md-5">
            <h5 className="fs-6">Total Earned</h5>
            <text className="text-white fs-1 fw-bold">${totalAmount}</text>
          </div>
        </>
      ) : (
        <div className="text-center">
          <Spin></Spin>
        </div>
      )}
    </div>
  );
}

export default Balance;
