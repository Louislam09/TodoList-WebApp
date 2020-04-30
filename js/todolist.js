const TODO_LIST = document.querySelector('.todo-list');
const SHOW_NEW_TODO_SECTION = document.querySelector('.show-new-todo-section-button');
const NEW_TODO_SECTION = document.querySelector('.section-new-todo');
const INPUT_TEXT = document.querySelector('.todo-input-text');
const ADD_NEW_TODO_BUTTON = document.querySelector('.todo-add-button');
const TODO_LIST_CONTAINER = document.querySelector('.todo-list-container');
const CLOSE_NEW_TODO_SECTION_BUTTON = document.querySelector('.section-new-todo-close-button');

window.addEventListener('load', LoadTodoStored);
window.addEventListener('keydown', (e) => {
	if (e.which === 13) AddNewTodo();
});

ADD_NEW_TODO_BUTTON.addEventListener('click', AddNewTodo);
SHOW_NEW_TODO_SECTION.addEventListener('click', swapOpenCloseNewSection);
CLOSE_NEW_TODO_SECTION_BUTTON.addEventListener('click', swapOpenCloseNewSection);

function AddNewTodo() {
	const RANDOM_KEY = Math.floor(Math.random() * 1000 * (Math.random() * 1000));
	let doneState = false;

	let data = {
		inputText: INPUT_TEXT.value,
		inputKey: RANDOM_KEY,
		doneState: doneState
	};

	let newTodo = document.createElement('li');
	let input = document.createElement('input');
	let remove = document.createElement('button');
	let edit = document.createElement('button');
	let done = document.createElement('button');
	let box = document.createElement('div');

	newTodo.className = 'item';

	input.type = 'text';
	input.className = 'item-text';
	input.setAttribute('disabled', '');
	input.value = data.inputText;

	remove.className = 'del-item';
	remove.innerText = 'REMOVE';

	done.className = 'done-item';
	done.innerText = 'DONE';

	box.className = 'box-item';

	edit.className = 'edit-item';
	edit.innerText = 'EDIT';

	remove.addEventListener('click', () => {
		newTodo.remove();
		deleteValueFromSystem(data.inputKey);
	});

	edit.addEventListener('click', () => {
		input.removeAttribute('disabled');
		input.setAttribute('autofocus', 'enable');
		done.style.display = 'initial';
		edit.style.display = 'none';
	});

	done.addEventListener('click', () => {
		input.setAttribute('disabled', '');
		done.style.display = 'none';
		edit.style.display = 'initial';
		addNewTodoToSystem(input.value, data.inputKey, doneState);
	});

	box.addEventListener('click', () => {
		if (data.doneState === false && box.style.background === 'white') {
			box.style.background = 'wheat';
			box.innerText = '✔️';
			input.style.textDecoration = 'line-through red';
			doneState = true;
			addNewTodoToSystem(input.value, data.inputKey, doneState);
		} else {
			box.innerText = '';
			input.style.textDecoration = 'none';
			box.style.background = 'white';
			doneState = false;
			addNewTodoToSystem(input.value, data.inputKey, doneState);
		}
	});

	newTodo.appendChild(box);
	newTodo.appendChild(input);
	newTodo.appendChild(edit);
	newTodo.appendChild(done);
	newTodo.appendChild(remove);

	if (!INPUT_TEXT.value <= 0) TODO_LIST.appendChild(newTodo);
	if (!INPUT_TEXT.value <= 0) saveNewTodo(data.inputText, data.inputKey, data.doneState);

	swapOpenCloseNewSection();
}

function swapOpenCloseNewSection() {
	if (NEW_TODO_SECTION.style.visibility === 'hidden' && TODO_LIST_CONTAINER.style.visibility === 'visible') {
		NEW_TODO_SECTION.style.visibility = 'visible';
		TODO_LIST_CONTAINER.style.visibility = 'hidden';
	} else {
		NEW_TODO_SECTION.style.visibility = 'hidden';
		TODO_LIST_CONTAINER.style.visibility = 'visible';
		INPUT_TEXT.value = '';
	}
}
