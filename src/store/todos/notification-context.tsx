import { createContext, ReactNode } from "react";
import { NotificationType } from "../../types/ui";
import { notification } from "antd";

type NotficationContext = {
	openTodoNotification: (type: NotificationType, errorMessage: string) => void;
};

export const TodoNotificationContext = createContext<NotficationContext>({
	openTodoNotification: () => {},
});

interface Props {
	children: ReactNode;
}

const NotficationContextProvider: React.FC<Props> = ({ children }) => {
	const [api, contextHolder] = notification.useNotification();

	function openTodoNotification(type: NotificationType, errorMessage: string) {
		api[type]({
			title: "An error occurred",
			description: errorMessage,
			duration: 5,
		});
	}

	const errorCtx = {
		openTodoNotification,
	};

	return (
		<TodoNotificationContext.Provider value={errorCtx}>
			{contextHolder}
			{children}
		</TodoNotificationContext.Provider>
	);
};

export default NotficationContextProvider;
