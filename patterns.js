function deleteAll() {
    pattern_list.innerHTML = '';
    dictionary.length = 0;
    update_graph();
}

function deleteButton () {
    const cur_pattern = this.closest('li').innerText.slice(0, -6);
    for (let i = 0; i < dictionary.length; i++) {
        if (dictionary[i] === cur_pattern) {
            dictionary.splice(i, 1)
        }
    }
    this.closest('li').remove();
    update_graph();
}

function createPattern(text) {
    const delete_button = document.createElement('button');
    delete_button.setAttribute('role', 'button');
    delete_button.innerText = 'Delete';
    delete_button.style['margin-left'] = '15px';

    const pattern = document.createElement('li');
    pattern.innerText = text;
    delete_button.addEventListener('click', deleteButton);
    pattern.append(delete_button);

    return pattern;
}

function patternFormHandler(event) {
    event.preventDefault();

    const pattern = createPattern(pattern_input.value);
    dictionary.push(pattern_input.value);

    pattern_list.append(pattern);

    pattern_input.value = '';
    update_graph();
    input_text.focus();
}

function textFormHandler(event) {
    event.preventDefault();
    console.log(text_form.value);
    text_to_check.innerText = text_input.value;
    text_input.value = '';
}


for (let item of dictionary) {
    const pattern = createPattern(item);
    pattern_list.append(pattern);
}

delete_all.addEventListener('click', deleteAll);
pattern_form.addEventListener('submit', patternFormHandler);
text_form.addEventListener('submit', textFormHandler);
