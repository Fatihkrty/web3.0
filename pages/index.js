import Head from "next/head";
import { useState, useEffect } from "react";
import { useWallet } from "../hooks/useWallet";

export default function Home() {
  const { account, balance, contract, connectWallet } = useWallet();

  const [users, setUsers] = useState([]);

  const [userId, setUserId] = useState("");

  const [noOfSurveys, setNoOfSurveys] = useState(null);

  const handleNoOfSurveys = () => {
    contract.getNoOfSurveys().then((resp) => setNoOfSurveys(resp));
  };

  const getUser = async (e) => {
    e.preventDefault();
    if (!userId) {
      alert("Please input userId");
      return;
    }
    contract
      .users(userId)
      .then((resp) => setUsers(resp))
      .catch((error) => alert(error));
  };

  const handleChangeInput = (e) => {
    setUserId(e.target.value);
  };

  return (
    <>
      <Head>
        <title>Web 3.0</title>
      </Head>

      <div className="container">
        <nav className="navbar navbar-light bg-light">
          <a className="navbar-brand">Web 3.0</a>
          <button className="btn btn-primary" onClick={connectWallet}>
            Connect Metamask
          </button>
        </nav>

        <div>
          <div>
            <h6>Account Name: {account}</h6>
            <h6>Account Name: {balance}</h6>

            <hr />
          </div>

          <div>
            {users.length > 0 && (
              <div>
                <p>{`Used faucet: ${users.UsedFaucet}`}</p>
                <p>{`My Gov Tokens: ${users.myGovTokens._hex}`}</p>
                <p>{`My Gov Tokens Locked Until: ${users.myGovTokensLockedUntil._hex}`}</p>
              </div>
            )}
            <form className="form">
              <div className="d-flex">
                <input
                  className="form-control"
                  onChange={handleChangeInput}
                  placeholder="User Id"
                />

                <button className="btn btn-info ms-2" onClick={getUser}>
                  {"GetUser"}
                </button>
              </div>
            </form>
            <hr />
          </div>

          <div>
            {noOfSurveys && (
              <div>
                <p>{`Hex: ${noOfSurveys._hex}`}</p>
                <p>{`Is Big Number: ${noOfSurveys._isBigNumber}`}</p>
              </div>
            )}

            <button className="btn btn-info" onClick={handleNoOfSurveys}>
              Get No Of Surveys
            </button>
            <hr />
          </div>
        </div>
      </div>
    </>
  );
}
