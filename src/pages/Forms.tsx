import { Form, redirect } from "react-router-dom";
import type { Transactions } from "../assets/types.ts";
export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const transactions: Transactions = {
    id: crypto.randomUUID(),
    description: formData.get("description") as string,
    amount: Number(formData.get("amount")),
    type: formData.get("type") as "income" | "expense",
    category: formData.get("category") as any,
    date: formData.get("date") as string,
  };
  const currentTransactions = JSON.parse(
    localStorage.getItem("transaction") || "[]",
  );
  currentTransactions.push(transactions);
  localStorage.setItem("transaction", JSON.stringify(currentTransactions));
  return redirect("/transactions");
}

export default function TransactionForm() {
  return (
    <Form
      method="post"
      className="bg-white h-130 p-6 rounded-lg shadow-md w-full max-w-md space-y-2 text-black mx-auto mt-10"
    >
      <h2 className="text-2xl font-semibold text-gray-800 text-center">
        Add Transaction
      </h2>

      <div className="flex flex-col">
        <label htmlFor="description" className="mb-1 font-medium text-gray-700">
          Description
        </label>
        <input
          type="text"
          name="description"
          id="description"
          placeholder="Enter description"
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="amount" className="mb-1 font-medium text-gray-700">
          Amount
        </label>
        <input
          type="number"
          name="amount"
          id="amount"
          placeholder="0.00"
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      <div className="flex flex-col">
        <span className="mb-1 font-medium text-gray-700">Type</span>
        <div className="flex gap-4">
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="type"
              value="income"
              className="accent-green-500"
              defaultChecked
            />
            Income
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="type"
              value="expense"
              className="accent-red-500"
            />
            Expense
          </label>
        </div>
      </div>

      <div className="flex flex-col">
        <label htmlFor="category" className="mb-1 font-medium text-gray-700">
          Category
        </label>
        <select
          name="category"
          id="category"
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        >
          <option value="">Select category</option>
          <option value="Salary">Salary</option>
          <option value="Food">Food</option>
          <option value="Rent">Rent</option>
          <option value="Leisure">Leisure</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label htmlFor="date" className="mb-1 font-medium text-gray-700">
          Date
        </label>
        <input
          type="date"
          name="date"
          id="date"
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
      >
        Add Transaction
      </button>
    </Form>
  );
}
