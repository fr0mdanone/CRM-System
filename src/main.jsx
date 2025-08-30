import { createRoot } from "react-dom/client";
import "./index.scss";
import TodoApp from "./pages/TodoApp.jsx";

createRoot(document.getElementById("root")).render(<TodoApp />);
