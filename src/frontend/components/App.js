import "./App.css";
import Navigation from "./Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home.js";
import Create from "./CreateNFT.js";
import ListedItems from "./ListedItems.js";
import Purchases from "./Purchases.js";
import Blog from "./Blog.js";
import MarketplaceAbi from "../contractsData/Marketplace.json";
import MarketplaceAddress from "../contractsData/Marketplace-address.json";
import NFTAbi from "../contractsData/NFT.json";
import NFTAddress from "../contractsData/NFT-address.json";
import { useState } from "react";
import { ethers } from "ethers";
import { Spinner } from "react-bootstrap";

function App() {
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState(null);
  const [nft, setNFT] = useState({});
  const [marketplace, setMarketplace] = useState({});

  const web3Handler = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    console.log(accounts);
    setAccount(accounts[0]);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    window.ethereum.on("chainChanged", (chainId) => {
      //window reloads if the contract was deployed on another chain
      window.location.reload();
    });

    window.ethereum.on("accountsChanged", async function (accounts) {
      setAccount(accounts[0]);
      await web3Handler();
    });

    loadContracts(signer);
  };

  const loadContracts = async (signer) => {
    const marketplace = new ethers.Contract(
      MarketplaceAddress.address,
      MarketplaceAbi.abi,
      signer
    );
    setMarketplace(marketplace);
    const nft = new ethers.Contract(NFTAddress.address, NFTAbi.abi, signer);
    setNFT(nft);
    setLoading(false);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Navigation web3Handler={web3Handler} account={account} />
      </div>
      <div>
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "80vh",
            }}
          >
            <Spinner animation="border" style={{ display: "flex" }} />
            <p className="mx-3 my-0">Waiting for wallet connection...</p>
          </div>
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <Home marketplace={marketplace} nft={nft} /> //route of smart contracts for Home page
              }
            />
            <Route
              path="/create-nft"
              element={
                <Create marketplace={marketplace} nft={nft} /> //route of smart contracts for Create page
              }
            />
            <Route
              path="/listed-items"
              element={
                <ListedItems marketplace={marketplace} nft={nft} account={account} /> //route of smart contracts for ListedItems page
              }
            />
            <Route
              path="/purchases"
              element={
                <Purchases marketplace={marketplace} nft={nft} account={account} /> //route of smart contracts for Purchases page
              }
            />
            <Route
              path="/blog-partnerships"
              element={
                <Blog /> //route for Blog page
              }
            />
          </Routes>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
