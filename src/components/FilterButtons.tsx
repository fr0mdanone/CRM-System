import { useDispatch, useSelector } from "react-redux";
import { Segmented, SegmentedProps } from "antd";
import { RootState } from "../store";
import { setFilter } from "../store/todos/todos-slice";
import { TodoFilter } from "../types/todos";

const FilterButtons: React.FC = () => {
	const dispatch = useDispatch();
	const todoInfo = useSelector((state: RootState) => state.todos.info);
	const filter = useSelector((state: RootState) => state.todos.currentFilter);

	const setFilterHandler = (value: TodoFilter) => {
		dispatch(setFilter(value));
	};

	const filterOptions: SegmentedProps<TodoFilter>["options"] = [
		{
			label: `Все (${todoInfo?.all})`,
			value: "all",
		},
		{
			label: `В работе (${todoInfo?.inWork})`,
			value: "inWork",
		},
		{
			label: `Завершено (${todoInfo?.completed})`,
			value: "completed",
		},
	];

	return (
		<Segmented<TodoFilter>
			options={filterOptions}
			value={filter}
			onChange={setFilterHandler}
		/>
	);
};

export default FilterButtons;
