import Head from "next/head";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import MyGov from "../artifacts/contracts/mygov.sol/MyGov.json";

const contractAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

export default function Home() {
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

  async function getAllFunctionList() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        contractAddress,
        MyGov.abi,
        provider
      );

      setFunctionList(contract);

      // Fonksiyon isimlerine göre alt tarafta contract.FONKSIYON_ISMI şeklinde datalar çekilebilir
      // ve yeni datalar set edilebilir

      try {
        const data = await contract.getNoOfSurveys();
        console.log("data: ", data);
      } catch (err) {
        console.log("Error: ", err);
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
          <button className="btn btn-success" onClick={getAllFunctionList}>
            List
          </button>
          {Object.entries(functionList).map((list, index) => {
            console.log(list, index);
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
