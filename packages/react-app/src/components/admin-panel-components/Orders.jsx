import React, { useState, useEffect } from "react";
import { Address, OrderId } from "..";
import { Table, Tooltip, Button, Spin } from "antd";
import { RedoOutlined } from "@ant-design/icons";
import { gql, useQuery } from "@apollo/client";
import { EXAMPLE_GRAPHQL } from "../../helpers/graphQueryData";

const Orders = ({ mainnetProvider }) => {
  const EXAMPLE_GQL = gql(EXAMPLE_GRAPHQL);
  const { loading, data, refetch } = useQuery(EXAMPLE_GQL, { pollInterval: 2500 });

  useEffect(() => {
    const test = async () => {
      console.log("testVendor.jsx::", data);
    };
    test();
  }, [data]);

  let formatting_options = {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  };
  const formatNumberToCurrency = number => {
    const dollarStr = new Intl.NumberFormat("en-US", formatting_options);
    return dollarStr.format(number);
  };

  const purposeColumns = [
    {
      title: "Order Id",
      // dataIndex: "id",
      key: "id",
      render: record => <OrderId value={record.id} ensProvider={mainnetProvider} fontSize={16} />,
    },
    {
      title: "User Id",
      key: "id",
      render: record => <Address value={record.creator.address} ensProvider={mainnetProvider} fontSize={16} />,
    },
    {
      title: "Vendor Id",
      key: "id",
      render: record => <Address value={record.vendor.address} ensProvider={mainnetProvider} fontSize={16} />,
    },
    {
      title: "Amount",
      key: "id",
      render: record => <span>{formatNumberToCurrency(record.amount)}</span>,
    },
    {
      title: "Time",
      key: "createdAt",
      dataIndex: "createdAt",
      render: d =>
        new Date(d * 1000).toLocaleString("en-us", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
    },
    // {
    //   title: "Done",
    //   key: "id",
    //   render: record => <span>{record.completed ? "True" : "False"}</span>,
    // },
  ];

  const handleRefresh = () => {
    refetch();
    console.log("refetching...");
  };

  return (
    <div className="d-flex flex-column my-2">
      <div className="rounded-3 py-3 px-2 bg-primary ">
        <div className="d-flex justify-content-between px-4">
          <h1 className="text-left text-black">New Orders</h1>
          <div className="align-items-center d-flex">
            <Tooltip title="Refresh">
              <Button onClick={handleRefresh} size="large" ghost shape="circle" icon={<RedoOutlined />} />
            </Tooltip>
          </div>
        </div>
        <div className="table-responsive-lg ">
          {!loading && data ? (
            <Table className="table" dataSource={data.orders} columns={purposeColumns} rowKey="id" />
          ) : (
            <div className="text-center">
              <Spin />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
