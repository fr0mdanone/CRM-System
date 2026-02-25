import { TodoFilter, TodoInfo } from "../types/todos";
import { Segmented } from "antd";

interface FilterButtonsProps {
	onSetFilter: (filter: TodoFilter) => void;
	todoInfo: TodoInfo;
	filter: TodoFilter;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({
	onSetFilter,
	todoInfo,
	filter,
}) => {
	function isFilter(value: string): value is TodoFilter {
		return value === "all" || value === "inWork" || value === "completed";
	}

	function onUpdatingFilter(filter: string) {
		if (!isFilter(filter)) return;
		onSetFilter(filter);
	}

	const filterOptions = [
		{
			label: `Все (${todoInfo.all})`,
			value: "all",
		},
		{
			label: `В работе (${todoInfo.inWork})`,
			value: "inWork",
		},
		{
			label: `Завершено (${todoInfo.completed})`,
			value: "completed",
		},
	];

	return (
		<Segmented<string>
			options={filterOptions}
			value={filter}
			onChange={onUpdatingFilter}
		/>
	);
};

export default FilterButtons;
