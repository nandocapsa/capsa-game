import React, { useState } from "react";
import "./App.css";

const suits = ["♠", "♥", "♣", "♦"];
const values = ["3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A", "2"];

const suitColors = {
  "♠": "black",
  "♣": "black",
  "♥": "red",
  "♦": "red",
};

const generateDeck = () => {
  const deck = [];
  for (let suit of suits) {
    for (let value of values) {
      deck.push({ suit, value });
    }
  }
  return deck;
};

const Card = ({ card }) => (
  <div
    style={{
      color: suitColors[card.suit],
      border: "1px solid #ccc",
      borderRadius: "8px",
      padding: "8px",
      width: "40px",
      height: "60px",
      backgroundColor: "white",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontWeight: "bold",
      fontSize: "16px",
      boxShadow: "2px 2px 4px rgba(0,0,0,0.2)",
    }}
  >
    {card.value}
    {card.suit}
  </div>
);

const PlayerHand = ({ cards, playerName }) => (
  <div style={{ marginBottom: "16px" }}>
    <h2 style={{ fontSize: "18px", fontWeight: "bold" }}>{playerName}</h2>
    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
      {cards.map((card, i) => (
        <Card key={i} card={card} />
      ))}
    </div>
  </div>
);

function App() {
  const [players, setPlayers] = useState([
    { name: "Player 1", hand: [] },
    { name: "Player 2", hand: [] },
    { name: "Player 3", hand: [] },
    { name: "Player 4", hand: [] },
  ]);

  const dealCards = () => {
    const shuffled = generateDeck().sort(() => Math.random() - 0.5);
    const newPlayers = players.map((player, index) => ({
      ...player,
      hand: shuffled.slice(index * 13, (index + 1) * 13),
    }));
    setPlayers(newPlayers);
  };

  return (
    <div style={{ padding: "16px" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>
        Capsa Banting (Prototype)
      </h1>
      <button
        onClick={dealCards}
        style={{
          backgroundColor: "#3b82f6",
          color: "white",
          padding: "8px 16px",
          borderRadius: "6px",
          border: "none",
          marginBottom: "24px",
          cursor: "pointer",
        }}
      >
        Bagi Kartu
      </button>

      {players.map((player, i) => (
        <PlayerHand key={i} cards={player.hand} playerName={player.name} />
      ))}
    </div>
  );
}

export default App;
