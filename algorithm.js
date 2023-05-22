function ord(char) {
    if (alpha === 26) {
        return char.charCodeAt(0) - 'a'.charCodeAt(0); // функция переводящая букву латиницы в её порядковый номер
    } else if (char !== 'ё') {
        return char.charCodeAt(0) - 'а'.charCodeAt(0); // функция переводящая букву кириллицы в её порядковый номер
    } else {
        return alpha - 1; // присваиваем букве ё номер 32, так как её номер выбивается из общего правила
    }
    
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
        this.suffix_words = new Array(0);
        this.word = '';
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
                this.last_node().word = v.word + word[i];
                v.next[ord(word[i])] = this.last_node();
                this.burr_edges.push(v.index);
                this.burr_edges.push(this.last_node().index);
            }
            v = v.next[ord(word[i])]
        }
        v.is_teminal = true;
    }

    get_suffix_link(node, depth) {
        if (node.suffix_link === undefined) {
            if (node === this.root || node.parent === this.root) {
                node.suffix_link = this.root;
                comment_to_links.push(10 * depth + 5);
            } else {
                node.suffix_link = this.get_go_link(this.get_suffix_link(node.parent, depth + 1), node.parent_char, depth + 1);
                comment_to_links.push(10 * depth + 6);
            }
        } else {
            comment_to_links.push(10 * depth + 7);
        }

        auto_links.push(node.index, node.suffix_link.index);
        type_of_links.push("suffix");
        return node.suffix_link;
    }

    get_go_link(node, char, depth) {
        if (node.go_links[ord(char)] === undefined) {
            if (node.next[ord(char)] !== undefined) {
                node.go_links[ord(char)] = node.next[ord(char)]
                comment_to_links.push(10 * depth + 1);
            } else if (node === this.root) {
                node.go_links[ord(char)] = this.root;
                comment_to_links.push(10 * depth + 2);
            } else {
                node.go_links[ord(char)] = this.get_go_link(this.get_suffix_link(node, depth + 1), char, depth + 1);
                comment_to_links.push(10 * depth + 3);
            }
        } else {
            comment_to_links.push(10 * depth + 4);
        }

        auto_links.push(node.index, node.go_links[ord(char)].index);
        type_of_links.push("go");
        return node.go_links[ord(char)];
    }

    check_for_terminals(node) {
        if (node.suffix_link === undefined) {
            const suf_node = this.get_suffix_link(node, 0);
            this.check_for_terminals(suf_node);

            for (let word of suf_node.suffix_words) {
                node.suffix_words.push(word);
            }
            if (node.is_teminal) {
                node.suffix_words.push(node.index);
            }
        }
    }
}

