import { TaskObject, ELEMENT, STATUS } from "./data.js";
import { renderList } from "./render.js";

const TASK_LIST = [];

ELEMENT.FORM_HIGH.addEventListener('submit', formHandler);
ELEMENT.FORM_LOW.addEventListener('submit', formHandler);
ELEMENT.TASK_CONTAINER_HIGH.addEventListener('click', taskHandler);
ELEMENT.TASK_CONTAINER_LOW.addEventListener('click', taskHandler);
ELEMENT.TASK_CONTAINER_DONE.addEventListener('click', taskHandler)

function formHandler(event){
	event.preventDefault();
	addToList(ELEMENT.INPUT_VALUE(event.target), STATUS.IN_PROGRESS, ELEMENT.FIND_PRIORITY(event.target));
	renderList();
	clearInput(event.target);
}

function taskHandler(event){
	if (event.target.closest('.delete-button')) {
		deleteFromList(event.target);
		renderList();
	} 
	else if (event.target.closest('.task-checkbox')){
		changeStatus(event.target);
		renderList();
	} 
	else return null;
}


function addToList(name, status, priority){
	const taskObj = new TaskObject(name, status, priority);
	TASK_LIST.push(taskObj);
}

function deleteFromList(target){
	const taskName = target.previousElementSibling.textContent;
	const taskIndex = TASK_LIST.findIndex(item => item.name === taskName);
	TASK_LIST.splice(taskIndex, 1);
	if (TASK_LIST.find(item => item.name === taskName)) {
		deleteFromList(target);
	}
}

function changeStatus(target){
	const taskName = target.nextElementSibling.textContent;
	const taskIndex = TASK_LIST.findIndex(item => item.name === taskName);
	if (TASK_LIST[taskIndex].status === STATUS.IN_PROGRESS) {
		TASK_LIST[taskIndex].status = STATUS.DONE;
	} else {
		TASK_LIST[taskIndex].status = STATUS.IN_PROGRESS;
	}
}

function clearInput(target) {
	if (target === ELEMENT.FORM_HIGH) {
		ELEMENT.INPUT_HIGH.value = '';
	} else {
		ELEMENT.INPUT_LOW.value = '';
	}
}

export {TASK_LIST};