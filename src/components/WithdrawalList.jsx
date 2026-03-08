import { useEffect, useState } from "react";
import { walletTransactions } from "../services/walletService";

export default function WithdrawalList(props) {
  const { refreshTransactions } = props;
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);

        const res = await walletTransactions();
        const apiData = res?.data?.data || [];

        setWithdrawals((prev) => {
          const existingIds = new Set(prev.map((item) => item._id));

          const newRecords = apiData.filter(
            (item) => !existingIds.has(item._id)
          );

          return [...newRecords, ...prev];
        });

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [refreshTransactions]);

  return (
    <div>
      <h2>History</h2>

      <table border="1" width="100%">
        <thead>
          <tr>
            <th>Amount</th>
            <th>Type</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {loading && withdrawals.length === 0 ? (
            <tr>
              <td colSpan="3" style={{ textAlign: "center" }}>
                Please wait...
              </td>
            </tr>
          ) : withdrawals.length === 0 ? (
            <tr>
              <td colSpan="3" style={{ textAlign: "center" }}>
                No records found
              </td>
            </tr>
          ) : (
            withdrawals.map((w) => (
              <tr key={w._id}>
                <td style={{ textAlign: "center" }}>₹ {w.amount}</td>

                <td
                  style={{
                    textAlign: "center",
                    color: w.type === "debit" ? "red" : "green",
                  }}
                >
                  {w.type}
                </td>

                <td style={{ textAlign: "center" }}>
                  {new Date(w.createdAt).toLocaleString()}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}