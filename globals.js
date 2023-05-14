// глобальные переменные относящиеся к web_functionality
const build = document.querySelector('#build');
const debug_pic = document.querySelector('#debug-pic');
const delete_all = document.querySelector('#delete-all');
const interval_form = document.querySelector('#interval-form');
let interval_input = document.querySelector('#interval-input'); 
let next_pic = document.querySelector('#next'); // не константы, так как меняем значение в зависимости от debug
const pattern_form = document.querySelector('#pattern-form');
const pattern_input = document.querySelector('#pattern-input');
const pattern_list = document.querySelector('#pattern-list');
const text_form = document.querySelector('#text-form')
const text_input = document.querySelector('#text-input');
const text_to_check = document.querySelector('#text');

// глобальные переменные относящиеся к visual_graph и algorythm
let alpha = 26;
const auto_links = new Array(0);
let building_cnt = 0;
let cy;
let debug = 1;
const dictionary = ["he", "she", "his", "hers"];
let interval = 1000;
let my_proccess_id;
let process_cnt = 0;
const type_of_links = new Array(0);


