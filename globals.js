// глобальные переменные относящиеся к web_functionality
const build = document.querySelector('#build');
const debug_pic = document.querySelector('#debug-pic');
const fast_pic = document.querySelector("#fast");
const flag_pic = document.querySelector('#flag-pic');
const found_words = document.querySelector('#found-words-list');
const next_pic = document.querySelector('#next'); // не константы, так как меняем значение в зависимости от debug
const norm_pic = document.querySelector("#norm");
const pattern_form = document.querySelector('#pattern-form');
const pattern_input = document.querySelector('#pattern-input');
const pattern_list = document.querySelector('#pattern-list');
const prev_pic = document.querySelector('#prev');
const slow_pic = document.querySelector("#slow");
const text_form = document.querySelector('#text-form')
const text_input = document.querySelector('#text-input');
const text_to_check = document.querySelector('#text');

// глобальные переменные относящиеся к visual_graph и algorythm
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


