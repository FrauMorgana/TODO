import { TaskObject, ELEMENT, STATUS, STORAGE } from "./data.js";
import { renderList } from "./render.js";
import { storageAction } from "./storage.js";

const TASK_LIST = [...storageAction(STORAGE.GET)];

document.addEventListener('DOMContentLoaded', onloadHandler);
ELEMENT.FORM_HIGH.addEventListener('submit', formHandler);
ELEMENT.FORM_LOW.addEventListener('submit', formHandler);
ELEMENT.TASK_CONTAINER_HIGH.addEventListener('click', taskHandler);
ELEMENT.TASK_CONTAINER_LOW.addEventListener('click', taskHandler);
ELEMENT.TASK_CONTAINER_DONE.addEventListener('click', taskHandler);

function onloadHandler() {
	if (localStorage) {
		renderList();
	}
}

function formHandler(event){
	event.preventDefault();
	addToList(ELEMENT.INPUT_VALUE(event.target), STATUS.IN_PROGRESS, ELEMENT.FIND_PRIORITY(event.target));
	storageAction(STORAGE.SAVE);
	renderList();
	clearInput(event.target);
}

function taskHandler(event){
	if (event.target.closest('.delete-button')) {
		deleteFromList(event.target);
		storageAction(STORAGE.SAVE);
		renderList();
	} 
	else if (event.target.closest('.task-checkbox')){
		changeStatus(event.target);
		storageAction(STORAGE.SAVE);
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