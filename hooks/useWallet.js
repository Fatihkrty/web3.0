import { createContext, useContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import MyGov from "../artifacts/contracts/mygov.sol/MyGov.json";

const WalletContext = createContext({});

export const useWallet = () => useContext(WalletContext);

export default function WalletProvider({ children, contractAddress }) {
  const [contract, setContract] = useState(null);

  const [account, setAccount] = useState(null);

  const [balance, setBalance] = useState(null);

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        contractAddress,
        MyGov.abi,
        provider
      );
      setContract(contract);

      try {
        let accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);

        let getBalance = await window.ethereum.request({
          method: "eth_getBalance",
          params: [accounts[0]],
        });
        setBalance(parseInt(getBalance, 16));
      } catch (error) {
        alert(error.message);
      }
    } else {
      alert("Please install metamask !");
    }
  };

  useEffect(() => {
    if (
      typeof window.ethereum !== "undefined" &&
      window.ethereum.selectedAddress
    ) {
      connectWallet();
    }
  }, []);

  return (
    <WalletContext.Provider
      value={{
        account,
        balance,
        contract,
        connectWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}
