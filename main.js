
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
    }
}

class Trie {
    constructor(alpha) {
        this.alpha = alpha;
        this.nodes = new Array(new Node(alpha, undefined, undefined));
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
                v.next[ord(word[i])] = this.last_node();
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

function refill_dictionary() {
    dictionary.length = 0;
    for (let i = 1; i < pattern_list.childNodes.length; i++) {
       dictionary.push(pattern_list.childNodes[i].innerText.slice(0, -6));
    }
    console.log(dictionary);
}

const pattern_list = document.querySelector('#pattern-list');
const dictionary = ["he", "she", "his", "hers"];
const alpha = 26;
let trie = new Trie(alpha);

for (let elem of dictionary) {
    trie.add_word(elem);
}
console.log(trie.size());

for (let elem of dictionary) {
    console.log(trie.find_in_burr(elem));
}

console.log(trie.find_in_burr("tim"));
console.log("------------");

let text = "rhinohearshervoice";

let v = trie.root;
for (let i = 0; i < text.length; i++) {
    v = trie.get_go_link(v, text[i]);
    if (v.is_teminal) {
        console.log(text.slice(i - 5, i + 1));
    }
}

let cy = cytoscape({

    container: document.getElementById('cy'),
  
    style: cytoscape.stylesheet()
    .selector('edge')
        .css({
          'width': 3,
          'line-color': 'black',
          'target-arrow-color': '#369',
          'target-arrow-shape': 'triangle',
          'label': 'data(label)',
          'font-size': '14px',
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
      
  cy.add([
      { group: 'nodes',data: { id: 'n1', name:'n11' }, position: { x: 50, y: 200 } },
      { group: 'nodes',data: { id: 'n2' }, position: { x: 131, y: 226 } },
      { group: 'nodes',data: { id: 'n3' }, position: { x: 128, y: 143 } },
      { group: 'nodes',data: { id: 'n4' }, position: { x: 283, y: 142 } },
      { group: 'nodes',data: { id: 'n5' }, position: { x: 191, y: 62 } },
      { group: 'nodes',data: { id: 'n6' }, position: { x: 66, y: 83 } },
      { group: 'edges',data: { id: 'e0', source: 'n1', target: 'n2', label: 7 } },
      { group: 'edges',data: { id: 'e1', source: 'n2', target: 'n3', label: 10 } },
      { group: 'edges',data: { id: 'e2', source: 'n1', target: 'n6', label: 14 } },
      { group: 'edges',data: { id: 'e3', source: 'n1', target: 'n3', label: 9 } },
      { group: 'edges',data: { id: 'e4', source: 'n2', target: 'n4', label: 15 } },
      { group: 'edges',data: { id: 'e5', source: 'n3', target: 'n4', label: 11 } },
      { group: 'edges',data: { id: 'e6', source: 'n3', target: 'n6', label: 2 } },
      { group: 'edges',data: { id: 'e7', source: 'n6', target: 'n5', label: 9 } },  
      { group: 'edges',data: { id: 'e8', source: 'n5', target: 'n4', label: 6 } },
  ]);
  cy.on('click', 'node', function(evt){
    var node = evt.target; 
    console.log(node.position());
  })
