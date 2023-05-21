for (let item of dictionary) {
    const pattern = createPattern(item);
    pattern_list.append(pattern);
}

build.addEventListener('click', buildHandler);
debug_pic.addEventListener('click', debugHandler);
fast_pic.addEventListener('click', fastHandler);
flag_pic.addEventListener('click', flagHandler);
next_pic.addEventListener('click', nextHandler);
norm_pic.addEventListener('click', normHandler);
pattern_form.addEventListener('submit', patternFormHandler);
prev_pic.addEventListener('click', prevHandler);
slow_pic.addEventListener('click', slowHandler);
text_form.addEventListener('submit', textFormHandler);

update_graph();
