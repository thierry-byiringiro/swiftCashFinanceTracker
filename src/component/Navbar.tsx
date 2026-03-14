import { NavLink } from "react-router-dom";
export default function Navbar() {
  return (
    <>
      <div className="w-40 h-full flex flex-col  pt-10 space-y-3 items-center bg-[#FFF7ED] text-black font-semibold  rounded-bl-md rounded-tl-md">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `${isActive ? "underline text-green-600" : ""} hover:underline`
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="transactions"
          end
          className={({ isActive }) =>
            `${isActive ? "underline text-green-600" : ""} hover:underline`
          }
        >
          Ledger
        </NavLink>
      </div>
    </>
  );
}
