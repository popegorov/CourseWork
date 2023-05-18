for (let item of dictionary) {
    const pattern = createPattern(item);
    pattern_list.append(pattern);
}

build.addEventListener('click', buildHandler);
debug_pic.addEventListener('click', debugHandler);
delete_all.addEventListener('click', deleteAllHandler);
flag_pic.addEventListener('click', flagHandler);
interval_form.addEventListener('submit', intervalHandler);
next_pic.addEventListener('click', nextHandler);
pattern_form.addEventListener('submit', patternFormHandler);
text_form.addEventListener('submit', textFormHandler);

update_graph();
