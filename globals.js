// глобальные переменные относящиеся к web_functionality
const add = document.querySelector('#add');
const algorithm = document.querySelector('#algorithm');
const build = document.querySelector('#build');
const debug_mode = document.querySelector('#debug-mode');
const debug_pic = document.querySelector('#debug-pic');
const fast_pic = document.querySelector("#fast");
const flag_pic = document.querySelector('#flag-pic');
const found = document.querySelector('#found');
const found_words = document.querySelector('#found-words-list');
const language = document.querySelector('#language');
const legend = document.querySelector('#legend');
const next_pic = document.querySelector('#next');
const norm_pic = document.querySelector("#norm");
const pattern_form = document.querySelector('#pattern-form');
const pattern_input = document.querySelector('#pattern-input');
const pattern_list = document.querySelector('#pattern-list');
const prev_pic = document.querySelector('#prev');
const project = document.querySelector('#project');
const send = document.querySelector('#send');
const slow_pic = document.querySelector("#slow");
const speed = document.querySelector('#speed');
const text_form = document.querySelector('#text-form')
const text_input = document.querySelector('#text-input');
const text_to_check = document.querySelector('#text');
const to_find = document.querySelector('#to-find');

// глобальные переменные относящиеся к visual_graph и algorithm
let alpha = 26;
const auto_links = new Array(0);
let building_cnt = 0;
let cur_letter = 0;
let cy;
let debug = 0;
const dictionary = ["he", "she", "his", "hers"];
let interval = 1000;
const letters = new Array(0);
let my_proccess_id;
let process_cnt = 0;
let trie;
const type_of_links = new Array(0);


