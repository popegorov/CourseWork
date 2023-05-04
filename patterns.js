function DeleteButton () {
    const cur_pattern = this.closest('li').innerText.slice(0, -6);
    for (let i = 0; i < dictionary.length; i++) {
        if (dictionary[i] === cur_pattern) {
            dictionary.splice(i, 1)
        }
    }
    this.closest('li').remove();
    update_graph();
}

function formHandler(event) {
    event.preventDefault();

    const delete_button = document.createElement('button');
    delete_button.setAttribute('role', 'button');
    delete_button.innerText = 'Delete';
    delete_button.style['margin-left'] = '15px';

    const text = input_text.value;
    const pattern = document.createElement('li');
    dictionary.push(text);
    pattern.innerText = text;
    delete_button.addEventListener('click', DeleteButton);
    pattern.append(delete_button); 

    pattern_list.append(pattern);
    console.log(dictionary)

    input_text.value = '';
    update_graph();
    input_text.focus();
}


function DeleteAll() {
    pattern_list.innerHTML = '';
    dictionary.length = 0;
    update_graph()
}

const input_text = document.querySelector('#todo-input');
const all = document.querySelector('#deleteall');

for (let item of dictionary) {
    const delete_button = document.createElement('button');
    delete_button.setAttribute('role', 'button');
    delete_button.innerText = 'Delete';
    delete_button.style['margin-left'] = '15px';

    const pattern = document.createElement('li');
    pattern.innerText = item;
    delete_button.addEventListener('click', DeleteButton)
    pattern.append(delete_button); 

    pattern_list.append(pattern);
}

form.addEventListener('submit', formHandler);

all.addEventListener('click', DeleteAll);
