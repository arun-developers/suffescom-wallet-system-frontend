import { useState } from "react";
import "./App.css";
import Wallet from "./components/Wallet";
import WithdrawalList from "./components/WithdrawalList";

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("wallet-user") || "{}"));
  const [refreshTransactions, setRefreshTransactions] = useState(false);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>{user?.name ? `${user?.name}'s Wallet System` : "Wallet System"}</h1>
      </header>

      <div className="wallet-layout">
        <div className="wallet-section">
          <Wallet
            setUser={setUser}
            setRefreshTransactions={setRefreshTransactions}
          />
        </div>

        <div className="history-section">
          <WithdrawalList refreshTransactions={refreshTransactions} />
        </div>
      </div>
    </div>
  );
}

export default App;