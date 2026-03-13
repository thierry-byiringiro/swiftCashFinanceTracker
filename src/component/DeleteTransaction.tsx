import type { LoaderFunctionArgs } from "react-router-dom";
import type { Transactions } from "../assets/types";
import { useLoaderData, useNavigate } from "react-router-dom";

export function loader({ params }: LoaderFunctionArgs) {
  return params.id;
}

export default function DeleteTransaction() {
  const data = useLoaderData();
  const navigate = useNavigate();

  const transaction = JSON.parse(localStorage.getItem("transaction") || "[]");
  const selectedTransaction = transaction.find(
    (el: Transactions) => el.id === data,
  );

  const transactions = transaction.filter((el: Transactions) => el.id !== data);

  const handleDelete = () => {
    localStorage.setItem("transaction", JSON.stringify(transactions));
    navigate("/transactions");
  };

  if (!selectedTransaction) {
    return (
      <div className="flex justify-center items-center mt-20">
        <p className="text-gray-500">Transaction not found.</p>
      </div>
    );
}

  return (
    <div className="flex justify-center items-center mt-20 mx-auto">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md border">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Delete Transaction
        </h2>

        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this transaction?
        </p>

        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <p className="font-medium text-gray-800">
            {selectedTransaction.description}
          </p>

          <p className="text-sm text-gray-500">
            {selectedTransaction.category}
          </p>

          <p
            className={`font-semibold ${
              selectedTransaction.type === "income"
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            ${selectedTransaction.amount}
          </p>

          <p className="text-xs text-gray-400">{selectedTransaction.date}</p>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={() => navigate("/transactions")}
            className="px-4 py-2 rounded-md border text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
