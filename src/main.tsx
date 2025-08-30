import { createRoot } from "react-dom/client";
import "./index.scss";
import TodoApp from "./pages/TodoApp";

createRoot(document.getElementById("root")!).render(<TodoApp />);
