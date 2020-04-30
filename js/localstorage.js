let todoList = [];

function addNewTodoToSystem(value, key, state) {
	let newTodo = {
		key: key,
		value: value,
		doneState: state
	};
	let todo = [];
	todo.unshift(newTodo);
	localStorageTodoList(todo[0].key, todo[0]);
}

function getTodoFromSystem() {
	for (let i = 0; i < localStorage.length; i++) {
		let values = [];
		let key = localStorage.key(i);

		// This check that the data's key got from the localStorage have to be a number if not won not be loaded
		if (parseInt(key) * 0 === 0) {
			try {
				values.push(localStorage.getItem(key));

				if (values === null) {
					values = [];
				} else {
					values = JSON.parse(values);
					todoList.push(values);
				}
			} catch (e) {
				console.warn('Some unsupported data was not loaded');
			}
		}
	}
	return todoList;
}

let localStorageTodoList = (key, value) => {
	localStorage.setItem(key, JSON.stringify(value));
};

function saveNewTodo(value, key, state) {
	addNewTodoToSystem(value, key, state);
}
function LoadTodoStored() {
	let todoStored = getTodoFromSystem();
	todoStored.forEach((index) => {
		drawTodo(index.value, index.key, index.doneState);
	});
}

function drawTodo(value, key, state) {
	let data = {
		inputText: value,
		inputKey: key,
		doneState: state
	};

	let newTodo = document.createElement('li');
	let input = document.createElement('input');
	let remove = document.createElement('button');
	let edit = document.createElement('button');
	let done = document.createElement('button');
	let box = document.createElement('div');

	newTodo.className = 'item';
	// newTodo.setAttribute('draggable', 'true');

	input.type = 'text';
	input.className = 'item-text';
	input.setAttribute('disabled', '');
	input.value = data.inputText;

	remove.className = 'del-item';
	remove.innerText = 'REMOVE';

	edit.className = 'edit-item';
	edit.innerText = 'EDIT';

	box.className = 'box-item';

	done.className = 'done-item';
	done.innerText = 'DONE';

	remove.addEventListener('click', () => {
		deleteValueFromSystem(data.inputKey);
		newTodo.remove();
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
		addNewTodoToSystem(input.value, data.inputKey, data.doneState);
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

	// this check if the todo is done when is loaded
	if (data.doneState) {
		box.style.background = 'wheat';
		box.innerText = '✔️';
		input.style.textDecoration = 'line-through red';
	}

	newTodo.appendChild(box);
	newTodo.appendChild(input);
	newTodo.appendChild(edit);
	newTodo.appendChild(done);
	newTodo.appendChild(remove);

	// this check that the element have a value
	if (!value <= 0) {
		TODO_LIST.appendChild(newTodo);
	}

	//  Section visibility
	NEW_TODO_SECTION.style.visibility = 'hidden';
	TODO_LIST_CONTAINER.style.visibility = 'visible';

	// Clear all input
	el = '';
}

function deleteValueFromSystem(key) {
	localStorage.removeItem(key);
}
