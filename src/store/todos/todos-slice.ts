import { createSlice } from "@reduxjs/toolkit";
import { MetaResponse, Todo, TodoFilter, TodoInfo } from "../../types/todos";

interface TodoState extends MetaResponse<Todo, TodoInfo> {
	currentFilter: TodoFilter;
	isAdding: boolean;
	isUpdating: boolean;
	isFetching: boolean;
	isDeleting: boolean;
}

const initialState: TodoState = {
	data: [],
	info: {
		all: 0,
		completed: 0,
		inWork: 0,
	},
	meta: {
		totalAmount: 0,
	},
	currentFilter: "all",
	isAdding: false,
	isUpdating: false,
	isFetching: false,
	isDeleting: false,
};

export const todosSlice = createSlice({
	name: "todos",
	initialState,
	reducers: {
		setFilter: (state, action) => {
			state.currentFilter = action.payload;
		},
		setTodos: (state, action) => {
			state.data = action.payload.data;
			state.info = action.payload.info;
			state.meta = action.payload.meta;
		},
		todoAdded: (state, action) => {
			state.data.push(action.payload);
			if (state.info) {
				state.info.all += 1;
				state.info.inWork += 1;
			}
			state.meta.totalAmount += 1;
		},
		todoUpdated: (state, action) => {
			const updatedTodo = action.payload;
			const existingTodo = state.data.find(
				(todo) => todo.id === updatedTodo.id,
			);
			if (!existingTodo) return;
			if (existingTodo.isDone !== updatedTodo.isDone && state.info) {
				if (updatedTodo.isDone) {
					state.info.completed++;
					state.info.inWork--;
				} else {
					state.info.completed--;
					state.info.inWork++;
				}
			}
			existingTodo.isDone = updatedTodo.isDone;
			existingTodo.title = updatedTodo.title;
		},
		todoDeleted: (state, action) => {
			const id = action.payload;
			const existingTodo = state.data.find((todo) => todo.id === id);
			if (!existingTodo) return;
			const wasDone = existingTodo.isDone;
			state.data = state.data.filter((todo) => todo.id !== id);
			if (state.info) {
				state.info.all--;
				wasDone ? state.info.completed-- : state.info.inWork--;
			}
		},
		setIsAdding: (state, action) => {
			state.isAdding = action.payload;
		},
		setIsUpdating: (state, action) => {
			state.isUpdating = action.payload;
		},
		setIsFetching: (state, action) => {
			state.isFetching = action.payload;
		},
		setIsDeleting: (state, action) => {
			state.isDeleting = action.payload;
		},
	},
});

export const {
	setFilter,
	setTodos,
	todoAdded,
	todoUpdated,
	todoDeleted,
	setIsAdding,
	setIsFetching,
	setIsUpdating,
	setIsDeleting,
} = todosSlice.actions;

export default todosSlice.reducer;
