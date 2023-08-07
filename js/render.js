import {TASK_LIST} from "./main.js";
import { ELEMENT, PRIORIY, STATUS } from "./data.js";

function createElement(tag, className, type = '',  content = '') {
	const element = document.createElement(tag);
	element.className = className;
	element.type = type;
	element.textContent = content;
	return element;
}

function createTask(content) {
	const task = createElement("div", 'task');
	const checkbox = createElement("input", 'task-checkbox', 'checkbox');
	const taskName = createElement("p", 'task-text', '', content);
	const deleteBtn = createElement("button", 'delete-button', 'button');

	task.append(checkbox,taskName,deleteBtn);
	return task;
}

function renderList() {
	ELEMENT.TASK_CONTAINER_HIGH.innerHTML = '';
	ELEMENT.TASK_CONTAINER_LOW.innerHTML = '';
	ELEMENT.TASK_CONTAINER_DONE.innerHTML = '';

	TASK_LIST.forEach(element => {
		const task = createTask(element.name);
		if (element.status === STATUS.DONE){
			ELEMENT.TASK_CONTAINER_DONE.append(task);
			task.firstElementChild.setAttribute("checked", "");
			task.setAttribute("class", "task done");
		} else if (element.priority === PRIORIY.HIGH) {
			ELEMENT.TASK_CONTAINER_HIGH.append(task);
		} else {
			ELEMENT.TASK_CONTAINER_LOW.append(task);
		}
	});
}

export {renderList};