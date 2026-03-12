import _reactLogo from "./assets/react.svg";
import _viteLogo from "/vite.svg";
import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Forms, { action as formAction } from "./pages/Forms";
import Ledger from "./pages/Ledger";
import Layout from "./component/Layout";
import TransactionLayout from "./pages/TransactionLayout";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="transactions" element={<TransactionLayout />}>
          <Route index element={<Ledger />} />
          <Route path="add" element={<Forms />} action={formAction} />
        </Route>
      </Route>,
    ),
  );

  return (
    <>
      <div className="w-200 h-150 flex mt-5 mx-auto bg-[#475868]">
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
