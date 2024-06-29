import React from "react";
import WorldOfWomen from "./WorldOfWomen.png";
import SquiggleDao from "./Squiggle.png";
import BoredApeYachtClub from "./BoredApeYachtClub.png";
import Woodies from "./Woodies.png";

const Blog = () => {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", margin: "0", padding: "0" }}>
      <BlogPost
        title="World of Women"
        image={WorldOfWomen}
        description='From 4 friends sharing the same vision and coming together to launch WoW, to now a team of 9 united in our mission to 
        create a beautiful, diverse, empowering collection and thriving community. We love welcoming people into the NFT space and creating 
        a supportive environment for everyone – from new community members and collectors to emerging artists and NFT enthusiasts. 
        We believe that together, the WoW community can have a positive impact on the NFT space and the world. We are excited to be on 
        this journey with you all!'
        donationAddress="0x6d27f52186f3c86a508635A78af71Ad83aC45261"
      />
      <BlogPost
        title="Squiggle DAO"
        image={SquiggleDao}
        description='SquiggleDAO is elevating the Chromie Squiggle to its rightful place in culture as a beloved and seminal art project. 
        We build community, awareness, and ownership around Squiggles because we are committed to cultivating a vibrant future for generative, 
        on-chain art.'
        donationAddress="0x7Dd5b4F30707E430Ea572918500D79E8325A8bdA"
      />
      <BlogPost
        title="Bored Ape Yacht Club"
        image={BoredApeYachtClub}
        description='The BAYC clubhouse is home to Bored Ape Yatch Club and Mutant Ape Yatch Club apes (and occasionally some friends 
        and visitors). When you become an ape, you become part of an exclusive club. The Bored Ape Yacht Club donated another $208k 
        to Orangutan Outreach!'
        donationAddress="0x206a67F61fBD50B3F1F06FD8C05b9096907c0fe6"
      />
      <BlogPost
        title="Woodies"
        image={Woodies}
        description='Woodies is a decentralized web3 entertainment brand with a collection of 9,739 NFTs on the Ethereum blockchain. 
        Offering decentralized IP ownership, it conveys family-friendly, story-driven artwork and themes supporting nature and conservation.'
        donationAddress="0x8f7C21f7f6325944f5140Af9A2ecB23Aa864d142"
      />
    </div>
  );
};

const BlogPost = ({ title, image, description, donationAddress }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        margin: "20px",
        padding: "20px",
        backgroundColor: "#f2f2f2",
        borderRadius: "10px",
      }}
    >
      <img
        src={image}
        alt={title}
        style={{
          width: "200px",
          height: "200px",
          objectFit: "contain",
          borderRadius: "10px",
          marginRight: "20px",
          flexShrink: 0,
        }}
      />
      <div style={{ flex: 1 }}>
        <h2 style={{ marginTop: "0" }}>{title}</h2>
        <p style={{ marginBottom: "10px" }}>{description}</p>
        <p style={{ fontWeight: "bold" }}>
          Make your own donations to this verified address: {donationAddress}
        </p>
      </div>
    </div>
  );
};

export default Blog;
