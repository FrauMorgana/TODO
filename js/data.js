
const ELEMENT = {
	FORM_HIGH: document.querySelector('.task-input.high'),
	FORM_LOW: document.querySelector('.task-input.low'),
	INPUT_HIGH: document.querySelector('.input-high'),
	INPUT_LOW: document.querySelector('.input-low'),
	TASK_CONTAINER_HIGH: document.querySelector('.tasks-container.high'),
	TASK_CONTAINER_LOW: document.querySelector('.tasks-container.low'),
	TASK_CONTAINER_DONE: document.querySelector('.tasks-container.done'),


	INPUT_VALUE:(target) => {
		let value;
		if (target === ELEMENT.FORM_HIGH) {
			value = ELEMENT.INPUT_HIGH.value;
		} else {
			value = ELEMENT.INPUT_LOW.value;
		}
		return value;
	},

	FIND_PRIORITY:(target) => {
		let priority;
		if (target === ELEMENT.FORM_HIGH) {
			priority = PRIORIY.HIGH;
		} else {
			priority = PRIORIY.LOW;
		}
		return priority;
	}
}

const STATUS = {
	IN_PROGRESS: 'in progress',
	DONE: 'done',
}

const PRIORIY = {
	HIGH: 'high',
	LOW: 'low',
}

const STORAGE = {
	SAVE: 'save',
	GET: 'get',
}

function TaskObject(name, status, priority) {
	this.name = name;
	this.status = status;
	this.priority = priority;
}


export {TaskObject, ELEMENT, STATUS, PRIORIY, STORAGE}