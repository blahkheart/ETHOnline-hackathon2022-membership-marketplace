import React, { useEffect, useState } from "react";
import { Balance, SearchInput, VendorData, Orders } from "../components";
import { useHistory } from "react-router-dom";
import { subgraphURI, EXAMPLE_GRAPHQL } from "../helpers/graphQueryData";
import { gql, useQuery } from "@apollo/client";

function Home({ mainnetProvider }) {
  const [orders, setOrders] = useState();
  const [initLoading, setInitLoading] = useState(true);
  const [searchEntry, setSearchEntry] = useState();

  // const SEARCH_BY_ADDRESS = gql`
  //   query ($where: Order_filter) {
  //     orders(first: 20, where: $where) {
  //       amount
  //       createdAt
  //       vendor {
  //         address
  //         ordersCount
  //       }
  //     }
  //   }
  // `;

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
      // where: { vendor_contains: searchEntry, createdAt_gte: "1676003600", createdAt_lt: "1676160000" },
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

  // useEffect(() => {
  //   const test = async () => {
  //     console.log("test Home orders", orders);
  //   };
  //   test();
  // }, [orders, searchEntry]);

  const handleInput = e => {
    let entry = e.target.value;
    console.log("testEntry", entry);
    setSearchEntry(entry);
    refetch({ id: searchEntry });
    // refetch({ vendor_contains: searchEntry });
  };

  return (
    <div className="home">
      <Balance />
      <SearchInput onChange={handleInput} />
      <VendorData orderData={data} />
      <Orders mainnetProvider={mainnetProvider} />
    </div>
  );
}

export default Home;
