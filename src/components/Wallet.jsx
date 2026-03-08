import { useEffect, useState } from "react";
import {
    addWalletBalance,
    withdrawWalletBalance,
    getWalletBalance,
} from "../services/walletService";
import ModalForm from "./ModalForm";
import { createUser } from "../services/userService";

export default function Wallet(props) {
    let { setUser, setRefreshTransactions } = props;
    const [amount, setAmount] = useState("");
    const [balance, setBalance] = useState(0);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const transactionId = "txn_" + Date.now();
    const [action, setAction] = useState("");

    const fetchBalance = async () => {
        try {
            const res = await getWalletBalance();
            setBalance(res?.data?.data?.balance);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchBalance();
    }, [amount]);

    const checkToken = () => {
        const token = localStorage.getItem("wallet-token");
        if (!token) {
            setShowModal(true);
            return false;
        }
        return true;
    };

    const handleAddBalance = async () => {
        if (!amount) return alert("Enter amount");
        if (!checkToken()) return;

        try {
            setLoading(true);
            setAction('add');
            await addWalletBalance({ balance: Number(amount), transactionId });
            alert("Balance added successfully");
            setAmount("");
            fetchBalance();
            setRefreshTransactions(prev => !prev);
            setAction("");
        } catch (err) {
            alert(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleWithdraw = async () => {
        if (!amount) return alert("Enter amount");
        if (!checkToken()) return;

        try {
            setLoading(true);
            setAction('withdraw')
            await withdrawWalletBalance({ amount: Number(amount), transactionId });
            alert("Withdrawal successful");
            setAmount("");
            fetchBalance();
            setRefreshTransactions(prev => !prev);
            setAction("");
        } catch (err) {
            alert(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleUserSubmit = async (data) => {
        try {
            const payload = { name: data.name, email: data.email };
            const res = await createUser(payload);
            const user = res?.data?.data;
            localStorage.setItem("wallet-token", res?.data?.data?.token);
            localStorage.setItem("wallet-user", JSON.stringify(res?.data?.data));
            setUser(user);
            alert("User authenticated successfully");
            setShowModal(false);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div style={{ width: "300px", textAlign: "center", margin: "auto" }}>
            <h2>Wallet Balance</h2>
            <h1>₹ {balance}</h1>

            <input
                type="number"
                min="1"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                style={{ padding: "8px", width: "100%", marginBottom: "15px" }}
            />

            <div style={{ display: "flex", gap: "10px" }}>
                <button
                    onClick={handleAddBalance}
                    disabled={loading}
                    style={{ flex: 1, padding: "10px", background: "green", color: "#fff", cursor: 'pointer' }}
                >
                    {loading && action === 'add' ? 'Processing...' : 'Add Balance'}
                </button>

                <button
                    onClick={handleWithdraw}
                    disabled={loading}
                    style={{ flex: 1, padding: "10px", background: "red", color: "#fff", cursor: 'pointer' }}
                >
                    {loading && action === 'withdraw' ? 'Processing...' : 'Withdraw'}
                </button>
            </div>

            {showModal && (
                <ModalForm
                    title="User Authentication"
                    fields={[
                        {
                            name: "name",
                            type: "text",
                            placeholder: "Enter your name",
                        },
                        {
                            name: "email",
                            type: "email",
                            placeholder: "Enter your email",
                        },
                    ]}
                    onSubmit={handleUserSubmit}
                    onClose={() => setShowModal(false)}
                />
            )}
        </div>
    );
}