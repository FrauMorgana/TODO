import { STORAGE } from "./data.js";
import { TASK_LIST } from "./main.js";

function storageAction(action){
	let taskList = [];
	switch(action){
		case STORAGE.SAVE:
			taskList = JSON.stringify([...TASK_LIST]);
			localStorage.setItem('list', taskList);
			break;
		case STORAGE.GET:
			if (!localStorage.list){
				return [];
			}
			taskList = JSON.parse(localStorage.getItem('list'));
			return taskList;
	}
}

export {storageAction};