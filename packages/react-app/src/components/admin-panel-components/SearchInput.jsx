import React, { useEffect, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Input, Space, Spin } from "antd";
import { gql, useQuery } from "@apollo/client";
import { subgraphURI, EXAMPLE_GRAPHQL } from "../../helpers/graphQueryData";

const prefix = (
  <SearchOutlined
    style={{
      fontSize: 16,
      color: "#000",
    }}
  />
);

const SearchInput = props => {
  const EXAMPLE_GQL = gql(EXAMPLE_GRAPHQL);

  const { loading, data } = useQuery(EXAMPLE_GQL, { pollInterval: 2500 });

  return !loading ? (
    <Space
      direction="vertical"
      style={{
        width: "100%",
        padding: "8px 0",
      }}
    >
      <Input
        size="large"
        className="rounded-pill"
        prefix={prefix}
        onChange={value => {
          props.onChange(value);
        }}
        placeholder="  Search vendor Id..."
      />
    </Space>
  ) : (
    <div style={{ textAlign: "center" }}>
      <Spin />
    </div>
  );
};
export default SearchInput;
