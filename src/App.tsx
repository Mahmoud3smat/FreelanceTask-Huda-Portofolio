import { BrowserRouter } from "react-router-dom";
import { Navbar } from "@/Components/Navbar.tsx";

const AppRoutes = () => (
  <div className="flex min-h-screen flex-col">
    <Navbar />
  </div>
);

const App = () => (
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
);

export default App;
