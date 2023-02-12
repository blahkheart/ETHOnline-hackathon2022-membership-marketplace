import React, { useState } from "react";
import { Table, Spin, DatePicker, Space, Divider } from "antd";
import { gql, useQuery } from "@apollo/client";
import { OrderId, Address } from "../";
import { formatNumberToCurrency } from "../../helpers/helperFunctions";
import { useTotalAmount } from "../../hooks";

const { RangePicker } = DatePicker;

const VendorData = ({ orderData, searchEntry, mainnetProvider }) => {
  const [searchFilter, setSearchFilter] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [startDateTimestamp, setStartDateTimestamp] = useState();
  const [endDateTimestamp, setEndDateTimestamp] = useState();

  const QUERY_VENDOR_BY_ADDRESS = gql`
    query ($id: ID!, $where: Order_filter) {
      vendor(id: $id) {
        orders(where: $where) {
          amount
          createdAt
          creator {
            address
          }
          vendor {
            ordersCount
          }
          transactionHash
        }
      }
    }
  `;

  const { data, isloading, error, refetch } = useQuery(QUERY_VENDOR_BY_ADDRESS, {
    pollInterval: 2500,
    variables: {
      id: searchEntry,
      where: { createdAt_gte: startDateTimestamp, createdAt_lte: endDateTimestamp },
    },
  });

  const totalAmount = useTotalAmount(orderData && orderData.vendor ? orderData.vendor.orders : []);
  const filteredTotalAmount = useTotalAmount(data && data.vendor ? data.vendor.orders : []);

  const formatToTimestamp = (str, end) => {
    var date1 = Date.parse(str) / 1000;
    var date2 = Date.parse(end) / 1000;
    return [date1, date2];
  };

  const onChange = (value, dateString) => {
    try {
      const [_startDate, _endDate] = dateString;
      const [startDate, endDate] = formatToTimestamp(_startDate, _endDate);
      setStartDate(_startDate);
      setEndDate(_endDate);
      setSearchFilter(true);
      console.log("testSelected Start: ", startDate);
      console.log("testSelected End: ", endDate);
    } catch (e) {
      console.log(e);
    }
  };

  const purposeColumns = [
    {
      title: "Order Id",
      key: "id",
      render: record => <OrderId value={record.transactionHash} ensProvider={mainnetProvider} fontSize={16} />,
    },
    {
      title: "User Id",
      key: "id",
      render: record => <Address value={record.creator.address} ensProvider={mainnetProvider} fontSize={16} />,
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
  ];

  const onOk = value => {
    try {
      const [_startDate, _endDate] = value;
      const [startDate, endDate] = formatToTimestamp(_startDate, _endDate);
      setSearchFilter(true);
      setStartDateTimestamp(startDate);
      setEndDateTimestamp(endDate);
      refetch({ createdAt_gte: startDateTimestamp, createdAt_lte: endDateTimestamp });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="w-full p-4 flex flex-col rounded-2xl bg-primary text-white rounded-4 min-h-full">
      <div className="w-full ">
        <div>
          {orderData && orderData.vendor ? (
            <div>
              <p>
                Vendor Address: <span className="mb-3 fs-6 fw-bold">{orderData.vendor.address}</span>{" "}
              </p>
              {/* <p>BuidlBuxx Balance: BUIDL 100</p> */}
              <p>
                Total Earnings: BUIDL <span>{totalAmount}</span>
              </p>
              <p>
                Total Orders: <span>{orderData.vendor.ordersCount}</span>
              </p>
              <p className="mb-3 fs-6 fw-bold">Filter by Date</p>
              <Space direction="vertical" size={12}>
                <RangePicker showTime onChange={onChange} onOk={onOk} />
              </Space>
            </div>
          ) : (
            <div className="d-flex justify-content-center">
              <Spin />
            </div>
          )}
          <Divider />
          {searchFilter && data && data.vendor.orders.length && !error ? (
            <div className="d-flex flex-column my-2">
              <div>
                <div>
                  <p className="mb-2 fs-5 fw-bold">
                    Vendor stats from {startDate} to {endDate}
                  </p>
                  <p>
                    BuidlBuxx Earned: BUIDL <span>{filteredTotalAmount}</span>
                  </p>
                  <p>
                    No of Orders: <span>{data.vendor.orders.length}</span>
                  </p>
                </div>
                <div className="table-responsive-lg ">
                  <Table className="table" dataSource={data.vendor.orders} columns={purposeColumns} rowKey="id" />
                </div>
              </div>
            </div>
          ) : isloading ? (
            <div className="text-center">
              <Spin />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default VendorData;
