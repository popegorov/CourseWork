function update_graph() {
    process_cnt++; // увеличиваем счетчик процессов, чтобы отслеживать новые и завершать старые
    building_cnt = 0; 
    auto_links.length = 0; 
    type_of_links.length = 0; // подгатавливаем глобальные переменные для обновления графа
    let trie = new Trie(alpha);

    for (let elem of dictionary) {
        trie.add_word(elem);
    }

    let text = text_to_check.innerText;

    let v = trie.root;
    for (let i = 0; i < text.length; i++) {
        v = trie.get_go_link(v, text[i]);
        if (v.is_teminal) {
            console.log(text.slice(i - 5, i + 1));
        }
    }

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
                'line-color': 'red',
                'background-color': 'aqua',
            })
          .selector('node:selected')
            .css({
              'background-color': 'yellow',
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

function buildNextLink() {
  if (building_cnt) {
    let prev_source = auto_links[2 * building_cnt - 2];
    let prev_target = auto_links[2 * building_cnt - 1];
    cy.$(`#e${prev_source}${prev_target}`).unselect();
  } // убираем выделение у предыдущей ссылки

  if (building_cnt < type_of_links.length && process_cnt === my_proccess_id) { // вторая проверка для остановки старого процееса при наличии нового
    let type = type_of_links[building_cnt];
    let source = auto_links[2 * building_cnt];
    let target = auto_links[2 * building_cnt + 1];

    if (!cy.$(`#e${source}${target}`).isEdge()) {
      cy.add({ group: `edges`, data: { id: `e${source}${target}`, source: `${source}`, target: `${target}`}});
      cy.$(`#e${source}${target}`).addClass(`${type}`);
    }
    cy.$(`#e${source}${target}`).select(); // выбираем текущую ссылку
    building_cnt++;

    if (!debug) {
      setTimeout(buildNextLink, interval); // в режиме debug_off выставляем временной интервал
    }
  }
}

function build_links() {
  my_proccess_id = process_cnt; // устанавливаем значение текущего процесса
  buildNextLink();
}
