function update_graph() {
    let trie = new Trie(alpha);

    for (let elem of dictionary) {
        trie.add_word(elem);
    }

    let cy = cytoscape({

        container: document.getElementById('cy'),
      
        style: cytoscape.stylesheet()
        .selector('edge')
            .css({
              'width': 1,
              'line-color': 'gray',
              'label': 'data(label)',
              'font-size': '25px',
              'color': 'black',
              'target-arrow-shape': 'triangle',
              'curve-style': 'bezier'
            })
          .selector('node')
            .css({
              'content': 'data(id)',
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
          .selector(':selected')
            .css({
              'background-color': 'black',
              'line-color': 'yellow',
              'target-arrow-color': 'black',
              'source-arrow-color': 'black',
              'text-outline-color': 'black'
            }),
        userZoomingEnabled: false,
    });
          
    let nodes_and_edges = new Array(0);
    if (trie.size() !== 1) {
        for (let i = 0; i < trie.size(); i++) {
            nodes_and_edges.push({ group: 'nodes', data : {id: `${i}`} });
        }
    }

    
    for (let i = 0; i < trie.burr_edges.length / 2; i++) {
        const source = trie.burr_edges[2 * i];
        const target = trie.burr_edges[2 * i + 1];
        const label = trie.nodes[target].parent_char;
        nodes_and_edges.push({ group: 'edges', data: {id: `e${i}`, source: `${source}`, target: `${target}`, label: `${label}`} });
    }
    
    console.log(nodes_and_edges);
    cy.add(nodes_and_edges);
    cy.on('click', 'node', function(evt){
    var node = evt.target; 
    console.log(node.position());
    })

    for (let i = 0; i < trie.size(); i++) {
        if (trie.nodes[i].is_teminal) {
            cy.$(`#${i}`).addClass('terminal');
        }
    }
    
    let layout = cy.elements().layout({
        name: 'breadthfirst',
        fit: true,
        roots: '#0',
        directed: true
    });
      
    layout.run();

}

update_graph();


