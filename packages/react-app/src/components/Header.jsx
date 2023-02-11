import React, { useEffect } from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { Faucet, Account } from "./";
import BG from "../img/BG.png";
import sporkLogo from "../img/spork.png";

/**
 * @notice displays a page header
 * Site header
 */
export default function Header({
  address,
  mainnetProvider,
  USE_BURNER_WALLET,
  loadWeb3Modal,
  localProvider,
  userSigner,
  logoutOfWeb3Modal,
  injectedProvider,
  blockExplorer,
  price,
  web3Modal,
}) {
  return (
    <div className="d-flex align-items-center justify-content-between rounded-top-4 bg-primary px-4 py-2">
      <div className=" items-center">
        <div>
          <Link to="/">
            <a className="spork-logo">
              <img alt="SporkDAO logo" className="cursor-pointer" src={sporkLogo} width={65} height={60} />
            </a>
          </Link>
        </div>
      </div>
      <div className=" h-fit">
        <Account
          useBurner={USE_BURNER_WALLET}
          address={address}
          localProvider={localProvider}
          userSigner={userSigner}
          mainnetProvider={mainnetProvider}
          price={price}
          web3Modal={web3Modal}
          loadWeb3Modal={loadWeb3Modal}
          logoutOfWeb3Modal={logoutOfWeb3Modal}
          blockExplorer={blockExplorer}
          injectedProvider={injectedProvider}
        ></Account>
        {/* <Button>Connect Wallet</Button> */}
      </div>
    </div>
  );
}
