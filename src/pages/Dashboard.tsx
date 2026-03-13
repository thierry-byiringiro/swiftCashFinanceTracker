import { useMemo } from "react";
import type { Transactions } from "../assets/types";
import { NavLink } from "react-router-dom";
export default function Dashboard() {
  const transaction = JSON.parse(localStorage.getItem("transaction") || "[]");

  const totalIncome = useMemo(() => {
    return transaction
      .filter((el: Transactions) => el.type === "income")
      .reduce((x: number, y: Transactions) => x + y.amount, 0);
  }, [transaction]);

  const totalExpense = useMemo(() => {
    return transaction
      .filter((el: Transactions) => el.type === "expense")
      .reduce((x: number, y: Transactions) => x + y.amount, 0);
  }, [transaction]);

  const total = useMemo(() => {
    return transaction.reduce((x: number, y: Transactions) => x + y.amount, 0);
  }, [transaction]);
  const balance = totalIncome - totalExpense;
  return (
    <div className="p-2">
      <div className="mb-8 flex justify-between">
        <h1 className="text-2xl font-bold  text-gray-800">Dashboard</h1>
        <NavLink
          to="transactions/add"
          className="w-40 h-10 flex items-center justify-center bg-gray-800 text-white rounded-md p-2 hover:bg-gray-900 transition"
        >
          Add Transaction
        </NavLink>
      </div>
      <div className="flex gap-6">
        <div className="flex flex-col justify-center bg-black text-red-500 rounded-lg shadow-lg p-6 w-52">
          <p className="text-sm uppercase tracking-wide text-gray-300">
            Total Income
          </p>
          <p className="text-2xl font-bold mt-2">${totalIncome}</p>
        </div>

        <div className="flex flex-col justify-center bg-black text-red-500 rounded-lg shadow-lg p-6 w-52">
          <p className="text-sm uppercase tracking-wide text-gray-300">
            Total Expense
          </p>
          <p className="text-2xl font-bold mt-2">${totalExpense}</p>
        </div>

        <div className="flex flex-col justify-center bg-black text-red-500 rounded-lg shadow-lg p-6 w-52">
          <p className="text-sm uppercase tracking-wide text-gray-300">
            Total Amount
          </p>
          <p className="text-2xl font-bold mt-2">${total}</p>
        </div>
      </div>
    </div>
  );
}
