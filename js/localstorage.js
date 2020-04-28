let todoList = [];

function addNewTodo(value, key, state) {
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
		values.push(localStorage.getItem(key));

		if (values === null) {
			values = [];
		} else {
			values = JSON.parse(values);

			if (typeof values.key === 'number') {
				todoList.push(values);
			} else {
				console.log('this key is not allow');
			}
		}
	}
	return todoList;
}

let localStorageTodoList = (key, value) => {
	localStorage.setItem(key, JSON.stringify(value));
};

function saveNewTodo(value, key, state) {
	addNewTodo(value, key, state);
}

function drawTodoStored() {
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
	let b1 = document.createElement('input');
	let del = document.createElement('button');
	let edit = document.createElement('button');
	let done = document.createElement('button');
	let box = document.createElement('div');

	newTodo.className = 'item';
	// newTodo.setAttribute('draggable', 'true');

	b1.type = 'text';
	b1.className = 'item-text';
	b1.setAttribute('disabled', '');
	b1.value = data.inputText;

	del.className = 'del-item';
	del.innerText = 'REMOVE';

	edit.className = 'edit-item';
	edit.innerText = 'EDIT';

	box.className = 'box-item';

	done.className = 'done-item';
	done.innerText = 'DONE';

	del.onclick = () => {
		deleteValueFromSystem(data.inputKey);
		newTodo.remove();
	};

	edit.onclick = () => {
		b1.removeAttribute('disabled');
		b1.setAttribute('autofocus', 'enable');
		done.style.display = 'initial';
		edit.style.display = 'none';
	};

	done.onclick = () => {
		b1.setAttribute('disabled', '');
		done.style.display = 'none';
		edit.style.display = 'initial';
		addNewTodo(b1.value, data.inputKey, data.doneState);
	};

	box.onclick = () => {
		if (data.doneState === false && box.style.background === 'white') {
			box.style.background = 'wheat';
			box.innerText = '✔️';
			b1.style.textDecoration = 'line-through red';
			doneState = true;
			addNewTodo(b1.value, data.inputKey, doneState);
		} else {
			box.innerText = '';
			b1.style.textDecoration = 'none';
			box.style.background = 'white';
			doneState = false;
			addNewTodo(b1.value, data.inputKey, doneState);
		}
	};

	// this check if the todo is done when is loaded
	if (data.doneState) {
		box.style.background = 'wheat';
		box.innerText = '✔️';
		b1.style.textDecoration = 'line-through red';
	}

	newTodo.appendChild(box);
	newTodo.appendChild(b1);
	newTodo.appendChild(edit);
	newTodo.appendChild(done);
	newTodo.appendChild(del);

	// this check that the element have a value
	if (!value <= 0) {
		list.appendChild(newTodo);
	}

	//  Section visibility
	addTodoSection.style.visibility = 'hidden';
	sectionList.style.visibility = 'visible';

	// Clear all input
	el = '';
}

function deleteValueFromSystem(key) {
	localStorage.removeItem(key);
}
