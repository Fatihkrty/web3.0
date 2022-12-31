import Head from "next/head";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import MyGov from "../artifacts/contracts/mygov.sol/MyGov.json";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export default function Home() {
  const [contract, setContract] = useState(null);

  const [account, setAccount] = useState("");

  const [functionList, setFunctionList] = useState({});

  const handleClick = async () => {
    try {
      if (window !== "undefined" && window.ethereum !== "undefined") {
        await window.ethereum.enable();
        let accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts);
      } else {
        alert("Please install metamask !");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  async function getSurvey() {
    if (contract) {
      try {
        const data = await contract.users(
          "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266"
        );
        console.log("Deneme", data);
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        contractAddress,
        MyGov.abi,
        provider
      );
      setContract(contract);
      setFunctionList(contract);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Web 3.0</title>
      </Head>

      <div className="container">
        <nav className="navbar navbar-light bg-light">
          <a className="navbar-brand">Web 3.0</a>
          <button className="btn btn-primary" onClick={handleClick}>
            Connect Metamask
          </button>
        </nav>
        <div>
          <h3>Account Name: {account}</h3>
          <button className="btn btn-success" onClick={getSurvey}>
            List
          </button>
          {Object.entries(functionList).map((list, index) => {
            return (
              <p key={index}>
                {" "}
                Function: {list[0]} - Type: {typeof list[1]}
              </p>
            );
          })}
        </div>
      </div>
    </>
  );
}
