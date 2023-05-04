function ord(char) {
    return char.charCodeAt(0) - 'a'.charCodeAt(0);
}

class Node {
    constructor(alpha, parent, parent_char) {
        this.next = new Array(alpha);
        this.is_teminal = false;
        this.parent = parent;
        this.parent_char = parent_char;
        this.suffix_link = undefined;
        this.go_links = new Array(alpha);
        this.index = 0;
    }
}

class Trie {
    constructor(alpha) {
        this.alpha = alpha;
        this.nodes = new Array(new Node(alpha, undefined, undefined));
        this.burr_edges = new Array(0);
        this.root = this.nodes[0];
    }

    size() {
        return this.nodes.length;
    }

    last_node() {
        return this.nodes[this.size() - 1];
    }

    add_word(word) {
        let v = this.root;
        for (let i = 0; i < word.length; i++) {
            if (v.next[ord(word[i])] === undefined) {
                this.nodes.push(new Node(this.alpha, v, word[i]));
                this.last_node().index = this.size() - 1;
                v.next[ord(word[i])] = this.last_node();
                this.burr_edges.push(v.index);
                this.burr_edges.push(this.last_node().index);
            }
            v = v.next[ord(word[i])]
        }
        v.is_teminal = true;
    }

    find_in_burr(word) {
        let v = this.root;
        for (let i = 0; i < word.length; i++) {
            if (v.next[ord(word[i])] === undefined) {
                return false;
            }
            v = v.next[ord(word[i])]
        }
        return v.is_teminal;
    }

    get_suffix_link(node) {
        if (node.suffix_link === undefined) {
            if (node === this.root || node.parent === this.root) {
                node.suffix_link = this.root;
            } else {
                node.suffix_link = this.get_go_link(this.get_suffix_link(node.parent), node.parent_char)
            }
        }

        return node.suffix_link;
    }

    get_go_link(node, char) {
        if (node.go_links[ord(char)] === undefined) {
            if (node.next[ord(char)] !== undefined) {
                node.go_links[ord(char)] = node.next[ord(char)]
            } else if (node === this.root) {
                node.go_links[ord(char)] = this.root;
            } else {
                node.go_links[ord(char)] = this.get_go_link(this.get_suffix_link(node), char);
            }
        }

        return node.go_links[ord(char)];
    }
}

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
              'color': 'black'
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
          .selector(':selected')
            .css({
              'background-color': 'black',
              'line-color': 'yellow',
              'target-arrow-color': 'black',
              'source-arrow-color': 'black',
              'text-outline-color': 'black'
            }),
      
        layout: {
          name: 'grid',
          rows: 2
        }
      
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
    
    let layout = cy.elements().layout({
        name: 'breadthfirst',
        fit: true,
        directed: true
    });
      
    layout.run();

}

const pattern_list = document.querySelector('#pattern-list');
const form = document.querySelector('#todo-form');
const dictionary = ["he", "she", "his", "hers"];
const alpha = 26;
let trie = new Trie(alpha);

for (let elem of dictionary) {
    trie.add_word(elem);
}
// console.log(trie.size());

// for (let elem of dictionary) {
//     console.log(trie.find_in_burr(elem));
// }

// console.log(trie.find_in_burr("tim"));
// console.log("------------");

// let text = "rhinohearshervoice";

// let v = trie.root;
// for (let i = 0; i < text.length; i++) {
//     v = trie.get_go_link(v, text[i]);
//     if (v.is_teminal) {
//         console.log(text.slice(i - 5, i + 1));
//     }
// }

update_graph();


