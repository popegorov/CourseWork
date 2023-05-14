function deleteAllHandler() {
    pattern_list.innerHTML = '';
    dictionary.length = 0;
    update_graph();
}

function deleteButtonHandler () {
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
    delete_button.addEventListener('click', deleteButtonHandler);
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
    pattern_input.focus();
}

function textFormHandler(event) {
    event.preventDefault();
    text_to_check.innerText = text_input.value.toLowerCase();
    text_input.value = '';
}

function buildHandler() {
    update_graph();
    build_links();
}

function intervalHandler(event) {
    event.preventDefault();
    update_graph();
    if (Number(interval_input.value) !== NaN) {
        interval = Number(interval_input.value);
    }
    interval_input.value = '';
}

function nextHandler() {
    buildNextLink();
}

function debugHandler() {
    update_graph();
    debug = 1 - debug;
    if (!debug) {
        next_pic.innerHTML = '';

        interval_form.innerHTML = '<input id="interval-input" type="text" placeholder="Интервал в милисек " />\n<button type="submit">Применить</button>';
        interval_input = document.querySelector('#interval-input');
        interval = 1000;

        this.src = "./images/debug_off.jpg";
    } else {
        next_pic.innerHTML = '<img src="./images/next.png" class="debug" id="next-pic">';

        interval_form.innerHTML = '';

        this.src = "./images/debug_on.png";
    }
}
