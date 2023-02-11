import React, { useEffect, useState } from "react";
// import { Table, Tooltip, Button, Spin } from "antd";
import { Table, Spin, DatePicker, Space, Divider } from "antd";
const { RangePicker } = DatePicker;

const VendorData = ({ orderData }) => {
  const [totalAmount, setTotalAmount] = useState();
  const [searchDetails, setSearchDetails] = useState();

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

  const onChange = (value, dateString) => {
    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);
  };
  const purposeColumns = [
    {
      title: "Order Id",
      // dataIndex: "id",
      key: "id",
      // render: record => <OrderId value={record.id} ensProvider={mainnetProvider} fontSize={16} />,
    },
    {
      title: "User Id",
      key: "id",
      // render: record => <Address value={record.creator.address} ensProvider={mainnetProvider} fontSize={16} />,
    },
    {
      title: "Amount",
      key: "id",
      // render: record => <span>{formatNumberToCurrency(record.amount)}</span>,
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
                <RangePicker onChange={onChange} />
              </Space>
            </div>
          ) : (
            <div className="d-flex justify-content-center">
              <Spin />
            </div>
          )}
        </div>
      </div>
      <Divider />
      <div className="d-flex flex-column my-2">
        <div>
          <div>
            <p className="mb-2 fs-5 fw-bold">Vendor stats from Date 1 to Date 2</p>
            <p>
              BuidlBuxx Earned: BUIDL <span>{totalAmount}</span>
            </p>
            <p>
              No of Orders: <span>1</span>
            </p>
          </div>
          <div className="table-responsive-lg ">
            {/* {!loading && data ? ( */}
            <Table className="table" columns={purposeColumns} rowKey="id" />
            {/* ) : ( */}
            <div className="text-center">
              <Spin />
            </div>
            {/* )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorData;
