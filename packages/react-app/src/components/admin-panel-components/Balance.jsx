import React, { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { EXAMPLE_GRAPHQL } from "../../helpers/graphQueryData";
import { Spin } from "antd";
import { useTotalAmount } from "../../hooks";

function Balance() {
  const EXAMPLE_GQL = gql(EXAMPLE_GRAPHQL);
  const { loading, data } = useQuery(EXAMPLE_GQL, { pollInterval: 2500 });
  const totalAmount = useTotalAmount(data && data.orders ? data.orders : []);

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
        <div className="d-flex justify-content-center">
          <Spin></Spin>
        </div>
      )}
    </div>
  );
}

export default Balance;
