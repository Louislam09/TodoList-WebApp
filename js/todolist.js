let list = document.querySelector('.list');
let addBtn = document.querySelector('.add-button');
let addTodoSection = document.querySelector('.section-new-todo');
let inputText = document.querySelector('.todo');
let submitBtn = document.querySelector('.todo-button');
let sectionList = document.querySelector('.section-list');
let quitBtn = document.querySelector('.quit');

window.addEventListener('load', drawTodoStored);

submitBtn.addEventListener('click', setTodo);
window.addEventListener('keydown', (e) => {
	if (e.which === 13) setTodo();
});

addBtn.addEventListener('click', addFunction);

quitBtn.addEventListener('click', quitFunction);

inputText.addEventListener('keydown', () => console.log(inputText.value));

function setTodo() {
	let randomNumber = Math.floor(Math.random() * 1000 * (Math.random() * 1000));

	let doneState = false;

	let data = {
		inputText: inputText.value,
		inputKey: randomNumber,
		doneState: doneState
	};

	saveNewTodo(data.inputText, data.inputKey, data.doneState);

	let newTodo = document.createElement('li');
	let input = document.createElement('input');
	let del = document.createElement('button');
	let edit = document.createElement('button');
	let done = document.createElement('button');
	let box = document.createElement('div');

	newTodo.className = 'item';

	input.type = 'text';
	input.className = 'item-text';
	input.setAttribute('disabled', '');
	input.value = data.inputText;

	del.className = 'del-item';
	del.innerText = 'REMOVE';

	done.className = 'done-item';
	done.innerText = 'DONE';

	box.className = 'box-item';

	edit.className = 'edit-item';
	edit.innerText = 'EDIT';

	del.onclick = () => {
		newTodo.remove();
		deleteValueFromSystem(data.inputKey);
	};

	edit.onclick = () => {
		input.removeAttribute('disabled');
		input.setAttribute('autofocus', 'enable');
		done.style.display = 'initial';
		edit.style.display = 'none';
		// deleteValueFromSystem(data.inputKey);
	};

	done.onclick = () => {
		input.setAttribute('disabled', '');
		done.style.display = 'none';
		edit.style.display = 'initial';
		addNewTodo(input.value, data.inputKey, doneState);
	};

	box.onclick = () => {
		if (data.doneState === false && box.style.background === 'white') {
			box.style.background = 'wheat';
			box.innerText = '✔️';
			input.style.textDecoration = 'line-through red';
			doneState = true;
			addNewTodo(input.value, data.inputKey, doneState);
		} else {
			box.innerText = '';
			input.style.textDecoration = 'none';
			box.style.background = 'white';
			doneState = false;
			addNewTodo(input.value, data.inputKey, doneState);
		}
	};

	newTodo.appendChild(box);
	newTodo.appendChild(input);
	newTodo.appendChild(edit);
	newTodo.appendChild(done);
	newTodo.appendChild(del);

	if (!inputText.value <= 0) {
		list.appendChild(newTodo);
	}

	//  Section visibility
	addTodoSection.style.visibility = 'hidden';
	sectionList.style.visibility = 'visible';

	// Clear all input
	inputText.value = '';
}

function quitFunction() {
	addTodoSection.style.visibility = 'hidden';
	sectionList.style.visibility = 'visible';

	// Clear all input
	inputText.value = '';
}

function addFunction() {
	addTodoSection.style.visibility = 'visible';
	sectionList.style.visibility = 'hidden';
}
