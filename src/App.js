import React, { useState } from "react";
import "./App.css";

const suits = ["♠", "♥", "♦", "♣"];
const values = ["3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A", "2"];

function shuffleDeck() {
  const deck = [];
  for (let suit of suits) {
    for (let value of values) {
      deck.push({ value, suit });
    }
  }
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

function Card({ card }) {
  const isRed = card.suit === "♥" || card.suit === "♦";
  return (
    <span
      style={{
        display: "inline-block",
        margin: "4px",
        padding: "6px 10px",
        border: "1px solid #ccc",
        borderRadius: "6px",
        color: isRed ? "red" : "black",
        backgroundColor: "white",
        fontFamily: "monospace",
      }}
    >
      {card.value} {card.suit}
    </span>
  );
}

function App() {
  const [players, setPlayers] = useState([[], [], [], []]);
  const [turn, setTurn] = useState(0);

  const handleShuffle = () => {
    const deck = shuffleDeck();
    const newPlayers = [[], [], [], []];
    for (let i = 0; i < deck.length; i++) {
      newPlayers[i % 4].push(deck[i]);
    }
    setPlayers(newPlayers);
    setTurn(0); // reset giliran ke Player 1
  };

  const nextTurn = () => {
    setTurn((turn + 1) % 4);
  };

  return (
    <div className="App" style={{ padding: "20px" }}>
      <h2>Capsa Banting (Prototype)</h2>
      <button onClick={handleShuffle}>Bagi Kartu</button>
      <h3 style={{ marginTop: "10px" }}>Giliran: Player {turn + 1}</h3>
      <button onClick={nextTurn}>Lewat</button>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "20px" }}>
        {players.map((cards, index) => (
          <div key={index}>
            <h4 style={{ color: turn === index ? "blue" : "black" }}>
              Player {index + 1}
            </h4>
            <div>
              {turn === index ? (
                cards.map((card, i) => <Card key={i} card={card} />)
              ) : (
                <p>{cards.length} kartu</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
