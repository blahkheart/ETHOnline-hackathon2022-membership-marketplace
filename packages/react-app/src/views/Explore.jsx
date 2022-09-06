// import { useContractReader } from "eth-hooks";
// import { QuestionCircleOutlined } from "@ant-design/icons";
// import { Link } from "react-router-dom";
// import { ethImg, mhLogo, searchImg } from "../img";
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Image, Button } from "antd";
import { CenterContent, ContentRow, ContentCol } from "../components";

function Home({ address, loadWeb3Modal, yourLocalBalance }) {
  //   const [loading, setLoading] = useState([]);

  return (
    <div>
      <CenterContent right={100} left={100}>
        <ContentRow>
          <ContentCol>
            <div className="mh-dashboard-content">
              <h1 style={{ fontSize: 50, fontWeight: 700, margin: "82px 0px 85px" }}>
                The Members <span style={{ color: "#FFB44F" }}>Hub</span>
              </h1>
              <p style={{ fontSize: 21, fontWeight: 400, margin: "0 0px 25px 0" }}>All aboard the member ship 🚢</p>
              <p style={{ marginBottom: 85, padding: "20px 50px 20px 50px", fontWeight: 300, fontSize: 16 }}>
                As we explore the ever expansive brave new world of web3, new and exciting communities spawn up almost
                on a daily basis, some of which may align with our values and interests but there's one problem.
              </p>
            </div>
          </ContentCol>
        </ContentRow>
      </CenterContent>
    </div>
  );
}

export default Home;
