function deleteAllHandler() {
    pattern_list.innerHTML = '';
    text_to_check.innerHTML = '';
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

function checkWord(word) {
    for (let sym of word) {
        if (alpha === 26 && (sym.charCodeAt(0) < 'a'.charCodeAt(0) || sym.charCodeAt(0) > 'z'.charCodeAt(0))) {
            return false;
        } else if (alpha === 33 && (sym.charCodeAt(0) < 'а'.charCodeAt(0) || sym.charCodeAt(0) > 'ё'.charCodeAt(0))) {
            return false;
        }
    }
    return true;
}

function patternFormHandler(event) {
    event.preventDefault();

    if (checkWord(pattern_input.value.toLowerCase())) {
        const pattern = createPattern(pattern_input.value.toLowerCase());
        dictionary.push(pattern_input.value.toLowerCase());
        pattern_list.append(pattern);
    }

    pattern_input.value = '';
    update_graph();
    pattern_input.focus();
}

function textFormHandler(event) {
    event.preventDefault();
    update_graph();
    if (checkWord(text_input.value.toLowerCase())) {
        text_to_check.innerText = text_input.value.toLowerCase();
    }
    text_input.value = '';
    text_input.focus();
}

function buildHandler() {
    update_graph();
    build_links();
}

function prevHandler() {
    buildPrevLink();
}

function nextHandler() {
    buildNextLink();
}

function debugHandler() {
    update_graph();
    debug = 1 - debug;
    if (!debug) {
        prev_pic.innerHTML = '';
        next_pic.innerHTML = '';


        this.src = "./images/debug/debug_off.png";
    } else {
        prev_pic.innerHTML = '<img src="./images/debug/prev.png" class="debug" id="prev">';
        next_pic.innerHTML = '<img src="./images/debug/next.png" class="debug" id="next">';

        this.src = "./images/debug/debug_on.png";
    }
}

function slowHandler() {
    slow_pic.innerHTML = '<img src="./images/speed/slow_selected.png" class="speed" id="slow">';
    norm_pic.innerHTML = '<img src="./images/speed/norm.png" class="speed" id="norm">';
    fast_pic.innerHTML = '<img src="./images/speed/fast.png" class="speed" id="fast">';
    interval = 1300;
}

function normHandler() {
    slow_pic.innerHTML = '<img src="./images/speed/slow.png" class="speed" id="slow">';
    norm_pic.innerHTML = '<img src="./images/speed/norm_selected.png" class="speed" id="norm">';
    fast_pic.innerHTML = '<img src="./images/speed/fast.png" class="speed" id="fast">';
    interval = 800;
}

function fastHandler() {
    slow_pic.innerHTML = '<img src="./images/speed/slow.png" class="speed" id="slow">';
    norm_pic.innerHTML = '<img src="./images/speed/norm.png" class="speed" id="norm">';
    fast_pic.innerHTML = '<img src="./images/speed/fast_selected.png" class="speed" id="fast">';
    interval = 300;
}

function flagHandler() {
    update_graph();
    deleteAllHandler();
    alpha = 33 + 26 - alpha;

    if (alpha === 33) {
        this.src = "./images/flags/russia.svg.png";

        algorithm.innerText = "Алгоритм Ахо-Корасик";
        project.innerText = "Мой проект";
        language.innerText = "ЯЗЫК:";
        debug_mode.innerText = "РЕЖИМ ОТЛАДКИ:";
        speed.innerText = "СКОРОСТЬ:";
        to_find.innerText = "Паттерны для поиска";
        found.innerText = "Найденные паттерны";
        pattern_input.placeholder = "Введите новый паттерн";
        add.innerText = "Добавить";
        text_input.placeholder = "Введите текст";
        send.innerText = "Отправить";
        legend.innerHTML = '<h2>ЛЕГЕНДА</h2><div>Красная вершина - обычный узел</div><div>Водяная вершина - терминальный узел</div><div>Жёлтая вершина - найденный терминальный узел</div><div>Серое ребро - ссылка из бора</div><div>Зелёное ребро - суффиксная ссылка</div><div>Синее ребро - автоматная ссылка</div>';
        header_cur.innerText = "Текущая позиция"
        
    } else {
        this.src = "./images/flags/britain.svg.png";

        algorithm.innerText = "Aho-Corasick Algorithm";
        project.innerText = "My project";
        language.innerText = "LANGUAGE:";
        debug_mode.innerText = "DEBUG MODE:";
        speed.innerText = "SPEED:";
        to_find.innerText = "Patterns to find";
        found.innerText = "Found patterns";
        pattern_input.placeholder = "Enter new pattern";
        add.innerText = "Add";
        text_input.placeholder = "Enter text";
        send.innerText = "Send";
        legend.innerHTML = '<h2>LEGEND</h2><div>Red vertex - common node</div><div>Aqua vertex - terminal node</div><div>Yellow vertex - found terminal node</div><div>Gray edge - burr link</div><div>Green edge - suffix link</div><div>Blue edge - go link</div>';
        header_cur.innerText = "Current position"
    }
}