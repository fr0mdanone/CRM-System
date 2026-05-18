import TodoItem from "./TodoItem";

import { Flex } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const TodosList: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todos.data);
  return (
    <Flex vertical gap="small">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </Flex>
  );
};

export default TodosList;
