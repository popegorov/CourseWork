for (let item of dictionary) {
    const pattern = createPattern(item);
    pattern_list.append(pattern);
}

text_to_check.innerText = "ushers";
delete_all.addEventListener('click', deleteAllHandler);
pattern_form.addEventListener('submit', patternFormHandler);
text_form.addEventListener('submit', textFormHandler);
interval_form.addEventListener('submit', intervalHandler);
build.addEventListener('click', buildHandler);
debug_pic.addEventListener('click', debugHandler);
next_pic.addEventListener('click', nextHandler);

update_graph();