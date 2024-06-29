const { expect } = require("chai");

const toWei = (num) => ethers.utils.parseEther(num.toString());
const fromWei = (num) => ethers.utils.formatEther(num);

describe("MarketplaceNFTs", function () {
  let deployer;
  let Marketplace;
  let marketplace;
  let NFT;
  let nft;
  let address1;
  let address2;
  let address;
  let feePercent = 4;
  let URI = "sample URI";

  beforeEach(async function () {
    Marketplace = await ethers.getContractFactory("Marketplace");
    NFT = await ethers.getContractFactory("NFT");
    [deployer, address1, address2, ...address] = await ethers.getSigners();

    marketplace = await Marketplace.deploy(feePercent);
    nft = await NFT.deploy();
  });

  describe("Deployment", function () {
    it("Should track the name and symbol of the NFT collection", async function () {
      const nftName = "DApp NFT";
      const nftSymbol = "DAPP";

      expect(await nft.name()).to.equal(nftName);
      expect(await nft.symbol()).to.equal(nftSymbol);
    });

    it("Should track the fee account and fee percent of the Marketplace", async function () {
      expect(await marketplace.feeAccount()).to.equal(deployer.address);
      expect(await marketplace.feePercent()).to.equal(feePercent);
    });
  });

  describe("NFTs Minting", function () {
    it("Should track each minted NFT", async function () {
      await nft.connect(address1).mint(URI);
      expect(await nft.tokenCount()).to.equal(1);
      expect(await nft.balanceOf(address1.address)).to.equal(1);
      expect(await nft.tokenURI(1)).to.equal(URI);

      await nft.connect(address2).mint(URI);
      expect(await nft.tokenCount()).to.equal(2);
      expect(await nft.balanceOf(address2.address)).to.equal(1);
      expect(await nft.tokenURI(2)).to.equal(URI);
    });
  });

  describe("Adding items to the Marketplace", function () {
    let price = 1;
    let result;

    beforeEach(async function () {
      await nft.connect(address1).mint(URI);
      await nft.connect(address1).setApprovalForAll(marketplace.address, true); //permissions for the marketplace to be admin
    });

    it("Should track the newly created items", async function () {
      await expect(
        marketplace.connect(address1).makeItem(nft.address, 1, toWei(price))
      )
        .to.emit(marketplace, "Offered")
        .withArgs(1, nft.address, 1, toWei(price), address1.address);

      expect(await nft.ownerOf(1)).to.equal(marketplace.address);
      expect(await marketplace.itemCount()).to.equal(1);
      const item = await marketplace.items(1);
      expect(item.itemId).to.equal(1);
      expect(item.nft).to.equal(nft.address);
      expect(item.tokenId).to.equal(1);
      expect(item.price).to.equal(toWei(price));
      expect(item.sold).to.equal(false);
    });

    it("Adding the item should fail if price is set to zero", async function () {
      await expect(
        marketplace.connect(address1).makeItem(nft.address, 1, 0)
      ).to.be.revertedWith("Price must be greater than zero");
    });
  });

  describe("Purchasing items from the Marketplace", function () {
    let price = 2;
    let fee = (feePercent / 100) * price;
    let totalPriceInWei;

    beforeEach(async function () {
      await nft.connect(address1).mint(URI);
      await nft.connect(address1).setApprovalForAll(marketplace.address, true);
      await marketplace
        .connect(address1)
        .makeItem(nft.address, 1, toWei(price));
    });

    it("Should update everything related to the purchase like item as sold, the transfer to the buyer, etc..", async function () {
      const sellerInitialETHBalance = await address1.getBalance();
      const feeAccountInitialETHBalance = await deployer.getBalance();
      totalPriceInWei = await marketplace.getTotalPrice(1);

      await expect(
        marketplace
          .connect(address2)
          .purchaseItem(1, { value: totalPriceInWei })
      )
        .to.emit(marketplace, "Bought")
        .withArgs(
          1,
          nft.address,
          1,
          toWei(price),
          address1.address,
          address2.address
        );

      const sellerFinalETHBalance = await address1.getBalance();
      const feeAccountFinalETHBalance = await deployer.getBalance();

      expect((await marketplace.items(1)).sold).to.equal(true);
      expect(+fromWei(sellerFinalETHBalance)).to.equal(
        +price + +fromWei(sellerInitialETHBalance)
      );
      expect(+fromWei(feeAccountFinalETHBalance)).to.equal(
        +fee + +fromWei(feeAccountInitialETHBalance)
      );
      expect(await nft.ownerOf(1)).to.equal(address2.address);
    });
  });
});
