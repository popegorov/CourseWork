function decode_comment(comment) {
  if (alpha === 33) {
    if (comment % 10 === 1) {
      return `Переходим по ребру бора, так как есть переход по букве ${text_to_check.innerText.toLowerCase()[cur_letter - 1]}`;
    } else if (comment % 10 === 2) {
      return `Переходим в корень, так как нет перехода по букве ${text_to_check.innerText.toLowerCase()[cur_letter - 1]}`;
    } else if (comment % 10 === 3) {
      return `Строим автоматную ссылку как переход по букве ${text_to_check.innerText.toLowerCase()[cur_letter - 1]} из суффиксной ссылки предка`
    } else if (comment % 10 === 4) {
      return `Переходим по уже построенной ранее автоматной ссылке по букве ${text_to_check.innerText.toLowerCase()[cur_letter - 1]}`;
    } else if (comment % 10 === 5) {
      return `Строим суффиксную ссылку в корень, так как сами являемся корнем или ближайший предок корень`;
    } else if (comment % 10 === 6) {
      return `Строим суффиксную ссылку как переход по букве ${text_to_check.innerText.toLowerCase()[cur_letter - 1]} из суффиксной ссылки предка`;
    } else if (comment === 7) {
      return `Переходим по уже построенной суффиксной ссылке`;
    } else if (comment % 10 === 7) {
      return `Смотрим на суффиксную ссылку предка`;
    }
  } else {
    if (comment % 10 === 1) {
      return `We pass along the edge of the bore because there is a transition along the letter ${text_to_check.innerText.toLowerCase()[cur_letter - 1]}`;
    } else if (comment % 10 === 2) {
      return `We go to the root because there is no transition by letter ${text_to_check.innerText.toLowerCase()[cur_letter - 1]}`;
    } else if (comment % 10 === 3) {
      return `We build a go link as a transition by letter ${text_to_check.innerText.toLowerCase()[cur_letter - 1]} from suffix link of parent`
    } else if (comment % 10 === 4) {
      return `We pass along the go link already built earlier`;
    } else if (comment % 10 === 5) {
      return `We build a suffix link to the root because we ourselves are the root or our parent is the root`;
    } else if (comment % 10 === 6) {
      return `We build a suffix link as a transition by letter ${text_to_check.innerText.toLowerCase()[cur_letter - 1]} from suffix link of parent`;
    } else if (comment === 7) {
      return `We pass along the suffix link already built earlier`;
    } else if (comment % 10 === 7) {
      return `Look at the suffix link of our parent`;
    }
  }
}

function update_graph() {
    text_to_check.innerText = text_to_check.innerText.toLowerCase();
    found_words.innerHTML = '';
    cur_position.innerHTML = '';
    process_cnt++; // увеличиваем счетчик процессов, чтобы отслеживать новые и завершать старые
    building_cnt = 0; 
    auto_links.length = 0;
    comment_to_links.length = 0;
    type_of_links.length = 0; // подгатавливаем глобальные переменные для обновления графа
    letters.length = 0;
    trie = new Trie(alpha);

    for (let elem of dictionary) {
        trie.add_word(elem);
    }

    let text = text_to_check.innerText;

    let v = trie.root;
    for (let i = 0; i < text.length; i++) {
        letters.push(type_of_links.length);
        v = trie.get_go_link(v, text[i], 0);
        trie.check_for_terminals(v);
    }

    console.log(comment_to_links, type_of_links);
    builded = new Array(type_of_links.length);
    found_cnt = new Array(type_of_links.length);

    cy = cytoscape({

        container: document.getElementById('cy'),
      
        style: cytoscape.stylesheet()
        .selector('node')
            .css({
              'content': 'data(label)',
              'text-valign': 'center',
              'color': 'white',
              'text-outline-width': 2,
              'text-outline-color': 'black',
              'background-color': 'red',
              shape: 'hexagon'
            })
          .selector('.terminal')
            .css({
                'background-color': 'aqua',
            })
          .selector('.found')
            .css({
              'background-color': 'yellow',
            })
          .selector('node:selected')
            .css({
              'background-color': 'pink',
            })
        .selector('edge')
            .css({
              'width': 1,
              'line-color': 'gray',
              'font-size': '25px',
              'color': 'black',
              'target-arrow-shape': 'triangle',
              'target-arrow-color': 'gray',
              'curve-style': 'bezier'
            })
          .selector('.suffix')
            .css({
                'target-arrow-color': 'green',
                'line-color': 'green',
            })
          .selector('.go')
            .css({
                'target-arrow-color': 'blue',
                'line-color': 'blue',
            })
          .selector('edge:selected')
            .css({
              'width': 3,
            }),
        userZoomingEnabled: false,
        userPanningEnabled: false,
    });
          
    let nodes_and_edges = new Array(0);
    if (trie.size() !== 1) {
        for (let i = 0; i < trie.size(); i++) {
            if (i == 0) {
              nodes_and_edges.push({ group: 'nodes', data : { id: `${i}`, label: "root" } });
            } else {
              nodes_and_edges.push({ group: 'nodes', data : { id: `${i}`, label: trie.nodes[i].parent_char } });
            }
        }

        nodes_and_edges.push({ group: 'edges', data: { id: 'e00', source: '0', target: '0' } })

        for (let i = 0; i < trie.burr_edges.length / 2; i++) {
          const source = trie.burr_edges[2 * i];
          const target = trie.burr_edges[2 * i + 1];
          nodes_and_edges.push({ group: 'edges', data: { id: `e${source}${target}`, source: `${source}`, target: `${target}` } });
        }
        
        cy.add(nodes_and_edges);
    
        for (let i = 0; i < trie.size(); i++) {
            if (trie.nodes[i].is_teminal) {
                cy.$(`#${i}`).addClass('terminal');
            }
        }
    } // создаём бор из паттернов
    
    let layout = cy.elements().layout({
        name: 'breadthfirst',
        fit: true,
        roots: '#0',
        directed: true
    });
      
    layout.run(); // перечерчиваем в удобном виде
}

function newWordFound(id) {
  found_cnt[building_cnt] = 1;
  const found_word = document.createElement('li');
  found_word.innerText = trie.nodes[id].word;
  found_words.append(found_word);   
  
  cy.$(`#${id}`).addClass('found');
}

function buildPrevLink() {
  if (!building_cnt) {
    return;
  }

  if (building_cnt != type_of_links.length) {
    let prev_source = auto_links[2 * building_cnt - 2];
    let prev_target = auto_links[2 * building_cnt - 1];
    if (found_cnt[building_cnt - 1] !== undefined) {
      found_words.lastChild.remove();
      cy.$(`#${prev_target}`).removeClass('found');
    }
    if (builded[building_cnt - 1] !== undefined) {
      cy.$(`#e${prev_source}${prev_target}`).remove();
    } else {
      cy.$(`#e${prev_source}${prev_target}`).unselect();     // убираем выделение у предыдущей ссылки
    }
    cy.$(`#${prev_target}`).unselect();
  }

  if (building_cnt < type_of_links.length && process_cnt === my_proccess_id) { // вторая проверка для остановки старого процееса при наличии нового
    building_cnt -= 2;
    let type = type_of_links[building_cnt];
    let source = auto_links[2 * building_cnt];
    let target = auto_links[2 * building_cnt + 1];

    cy.$(`#e${source}${target}`).select(); // выбираем текущую ссылку
    cy.$(`#${target}`).select();
    building_cnt++;

    if (letters[cur_letter - 1] >= building_cnt && building_cnt) {
      cur_letter -= 2;
      let str = text_to_check.innerText.toLowerCase();
      text_to_check.innerText = str.slice(0, cur_letter) + str.slice(cur_letter, cur_letter + 1).toUpperCase() +
                                str.slice(cur_letter + 1, str.length);
      cur_letter++;
    }

    cur_position.innerText = decode_comment(comment_to_links[building_cnt - 1]);
  }
}

function buildNextLink() {
  if (building_cnt) {
    let prev_source = auto_links[2 * building_cnt - 2];
    let prev_target = auto_links[2 * building_cnt - 1];
    cy.$(`#e${prev_source}${prev_target}`).unselect();
    cy.$(`#${prev_target}`).unselect();
  } // убираем выделение у предыдущей ссылки

  if (building_cnt < type_of_links.length && process_cnt === my_proccess_id) { // вторая проверка для остановки старого процееса при наличии нового
    let type = type_of_links[building_cnt];
    let source = auto_links[2 * building_cnt];
    let target = auto_links[2 * building_cnt + 1];

    if (!cy.$(`#e${source}${target}`).isEdge()) {
      cy.add({ group: `edges`, data: { id: `e${source}${target}`, source: `${source}`, target: `${target}`}});
      cy.$(`#e${source}${target}`).addClass(`${type}`);
      builded[building_cnt] = `#e${source}${target}`;
    } else if (cy.$(`#e${source}${target}`).hasClass("suffix") && type == 'go') {
      cy.$(`#e${source}${target}`).addClass(`${type}`);
    }
    cy.$(`#e${source}${target}`).select(); // выбираем текущую ссылку
    cy.$(`#${target}`).select();
    if (cy.$(`#${target}`).hasClass('terminal') && !cy.$(`#${target}`).hasClass('found')) {
      newWordFound(target);
    }
    building_cnt++;

    if (letters[cur_letter] < building_cnt) {
      let str = text_to_check.innerText.toLowerCase();
      text_to_check.innerText = str.slice(0, cur_letter) + str.slice(cur_letter, cur_letter + 1).toUpperCase() +
                                str.slice(cur_letter + 1, str.length);
      cur_letter++;
    }

    cur_position.innerText = decode_comment(comment_to_links[building_cnt - 1]);

    if (!debug) {
      setTimeout(buildNextLink, interval); // в режиме debug_off выставляем временной интервал
    }
  } else if (process_cnt === my_proccess_id) {
    text_to_check.innerText = text_to_check.innerText.toLowerCase();
  }
}

function build_links() {
  my_proccess_id = process_cnt; // устанавливаем значение текущего процесса
  cur_letter = 0;
  buildNextLink();
}
