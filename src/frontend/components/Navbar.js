import { Link } from "react-router-dom";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import nft from "./nft.png";

const Navigation = ({ web3Handler, account }) => {
  return (
    <Navbar expand="lg" bg="primary" variant="dark">
      <Container>
        <Navbar.Brand>
          <img src={nft} width={40} height={40} className="" alt="" />
          &nbsp; Marketplace NFTs
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar navbar-dark bg-primary" />
        <Navbar.Collapse aria-controls="navbar navbar-dark bg-primary" />
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/home">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/create-nft">
            Create NFT
          </Nav.Link>
          <Nav.Link as={Link} to="/listed-items">
            Items
          </Nav.Link>
          <Nav.Link as={Link} to="/purchases">
            Purchases
          </Nav.Link>
          <Nav.Link as={Link} to="/blog-partnerships">
            Our Partnerships
          </Nav.Link>
        </Nav>

        <Nav>
          {account ? (
            <Nav.Link
              href={`https://etherscan.io/address/${account}`}
              target="_blank"
              rel="noopener noreferrer"
              className="button nav-button btn-sm mx-4"
            >
              <Button variant="outline-light">{account}</Button>
            </Nav.Link>
          ) : (
            <Button onClick={web3Handler} variant="outline-light">
              Connect Wallet
            </Button>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Navigation;
