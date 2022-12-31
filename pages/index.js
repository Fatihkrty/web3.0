import Head from "next/head";
import { useState } from "react";
import Web3 from "web3";

export default function Home() {
  const [account, setAccount] = useState("");

  const handleClick = async () => {
    try {
      if (window !== "undefined" && window.ethereum !== "undefined") {
        await window.ethereum.enable();
        let accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        // new Web3(window.ethereum);
        setAccount(accounts);
      } else {
        alert("Please install metamask !");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <Head>
        <title>Web 3.0</title>
      </Head>

      <div className="container">
        <nav class="navbar navbar-light bg-light">
          <a class="navbar-brand">Web 3.0</a>
          <button className="btn btn-primary" onClick={handleClick}>
            Connect Metamask
          </button>
        </nav>
        <div>
          <h3>Account Name: {account}</h3>
        </div>
      </div>
    </>
  );
}
