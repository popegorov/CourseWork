function DeleteButton () {
    const cur_pattern = this.closest('li').innerText.slice(0, -6);
    for (let i = 0; i < dictionary_of_patterns.length; i++) {
        if (dictionary_of_patterns[i] === cur_pattern) {
            dictionary_of_patterns.splice(i, 1)
        }
    }
    this.closest('li').remove();
}

function formHandler(event) {
    event.preventDefault();

    const delete_button = document.createElement('button');
    delete_button.setAttribute('role', 'button');
    delete_button.innerText = 'Delete';
    delete_button.style['margin-left'] = '15px';

    const text = input_text.value;
    const pattern = document.createElement('li');
    dictionary_of_patterns.push(text);
    pattern.innerText = text;
    delete_button.addEventListener('click', DeleteButton);
    pattern.append(delete_button); 

    todo_list.append(pattern);
    console.log(dictionary_of_patterns)

    input_text.value = '';
    input_text.focus(); 
}


function DeleteAll() {
    todo_list.innerHTML = '';
    dictionary_of_patterns.length = 0;
}

const input_text = document.querySelector('#todo-input');
const todo_list = document.querySelector('#pattern-list');
const form = document.querySelector('#todo-form');
const all = document.querySelector('#deleteall');

const dictionary_of_patterns = ["he", "she", "his", "hers"];

for (let item of dictionary_of_patterns) {
    const delete_button = document.createElement('button');
    delete_button.setAttribute('role', 'button');
    delete_button.innerText = 'Delete';
    delete_button.style['margin-left'] = '15px';

    const pattern = document.createElement('li');
    pattern.innerText = item;
    delete_button.addEventListener('click', DeleteButton)
    pattern.append(delete_button); 

    todo_list.append(pattern);
}

form.addEventListener('submit', formHandler);

all.addEventListener('click', DeleteAll);
