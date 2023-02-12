import React, { useEffect, useState } from "react";
import { Balance, SearchInput, VendorData, Orders } from "../components";
import { gql, useQuery } from "@apollo/client";

function Home({ mainnetProvider }) {
  const [orders, setOrders] = useState();
  const [initLoading, setInitLoading] = useState(true);
  const [searchEntry, setSearchEntry] = useState();

  const QUERY_VENDOR_BY_ADDRESS = gql`
    query vendor($id: ID!) {
      vendor(id: $id) {
        address
        orders {
          amount
          createdAt
          creator {
            address
          }
          transactionHash
        }
        ordersCount
      }
    }
  `;

  const { data, isloading, error, refetch } = useQuery(QUERY_VENDOR_BY_ADDRESS, {
    pollInterval: 2500,
    variables: {
      id: searchEntry,
    },
  });

  useEffect(() => {
    if (isloading) {
      setInitLoading(true);
    } else if (data) {
      setOrders(data);
      console.log("testOrdersData", data);
      setInitLoading(false);
    } else {
      console.log("error getting data from the graph", error);
    }
  }, [data, isloading, error, searchEntry]);

  const handleInput = e => {
    let entry = e.target.value;
    console.log("testEntry", entry);
    setSearchEntry(entry);
    refetch({ id: searchEntry });
  };

  return (
    <div className="home">
      <Balance />
      <SearchInput onChange={handleInput} />
      <VendorData orderData={data} mainnetProvider={mainnetProvider} searchEntry={searchEntry} />
      <Orders mainnetProvider={mainnetProvider} />
    </div>
  );
}

export default Home;
