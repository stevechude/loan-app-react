import { Route, Routes } from "react-router-dom";
import "./index.css";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import LoanMgt from "./pages/LoanMgt";
import Transactions from "./pages/Transactions";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/loan-mgt" element={<LoanMgt />} />
          <Route path="/transactions" element={<Transactions />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
