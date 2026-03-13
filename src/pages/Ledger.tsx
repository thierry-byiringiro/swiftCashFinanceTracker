import { NavLink, Outlet, useSearchParams } from "react-router-dom";
import type { Transactions } from "../assets/types";
export default function Ledger() {
  const [searchParams, setSearchParams] = useSearchParams();
  let typeFilter = searchParams.get("type");
  const currentTransactions = JSON.parse(
    localStorage.getItem("transaction") || "[]",
  );

  const handleFilter = (type: string, value: string | null) => {
    setSearchParams((prevValue) => {
      if (value === null) {
        prevValue.delete("type");
      } else {
        prevValue.set(type, value);
      }
      return prevValue;
    });
  };
  const displayTransactions = typeFilter
    ? currentTransactions.filter((el: Transactions) => el.type === typeFilter)
    : currentTransactions;

  const transaction = displayTransactions.map((el: Transactions) => (
    <tr key={el.id} className="border-b hover:bg-gray-50 transition-colors">
      <td className="px-4 py-3 font-medium text-gray-700">{el.description}</td>

      <td
        className={`px-4 py-3 font-semibold ${
          el.type === "income" ? "text-green-600" : "text-red-500"
        }`}
      >
        ${el.amount}
      </td>

      <td className="px-4 py-3">
        <span
          className={`px-2 py-1 text-xs rounded-full font-medium ${
            el.type === "income"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {el.type}
        </span>
      </td>

      <td className="px-4 py-3 text-gray-600">{el.category}</td>

      <td className="px-4 py-3 text-gray-500">{el.date}</td>

      <td className="px-4 py-3">
        <NavLink
          to={`add/${el.id}`}
          onClick={() => el.id}
          className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition"
        >
          Delete
        </NavLink>
      </td>
    </tr>
  ));
  return (
    <>
      <div className="mt-5 flex flex-col space-y-5 w-180 mx-4">
        <div className="flex flex-row justify-between items-center">
          Welcome Hope, Below are your transactions
          <NavLink
            to="add"
            className="w-40 h-10 flex items-center justify-center bg-gray-800 text-white rounded-md p-2 hover:bg-gray-900 transition"
          >
            Add Transaction
          </NavLink>
        </div>
        {transaction.length > 0 && (
          <div className="w-full flex space-x-2   font-semibold">
            <button
              className={`${typeFilter === "income" ? "text-amber-200 underline" : "text-white"} cursor-pointer p-1 flex items-center rounded-md`}
              onClick={() => handleFilter("type", "income")}
            >
              Income
            </button>
            <button
              className={`${typeFilter === "expense" ? "text-amber-200 underline" : "text-white"} cursor-pointer p-1 flex items-center rounded-md`}
              onClick={() => handleFilter("type", "expense")}
            >
              Expense
            </button>
            <button
              className={`cursor-pointer p-1 flex items-center rounded-md`}
              onClick={() => handleFilter("type", null)}
            >
              Clear
            </button>
          </div>
        )}
        {transaction.length > 0 && (
          <div className="overflow-hidden border border-gray-200 rounded-lg shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3">Description</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>

              <tbody className="bg-white">{transaction}</tbody>
            </table>
          </div>
        )}
      </div>

      <Outlet />
    </>
  );
}
