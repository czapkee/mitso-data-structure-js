const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
module.exports = class BinarySearchTree {
    constructor() {
        this.rootNode = null;
    }
    root() {
        return this.rootNode
    }
    add(data) {
        const newNode = new Node(data);

        if (this.rootNode === null) {
            this.rootNode = newNode;
            return;
        }

        let current = this.rootNode;
        while (true) {
            if (data < current.data) {
                if (current.left === null) {
                    current.left = newNode;
                    return;
                }
                current = current.left;
            } else if (data > current.data) {
                if (current.right === null) {
                    current.right = newNode;
                    return;
                }
                current = current.right;
            } else {
                return;
            }
        }
    }

    has(data) {
        let current = this.rootNode;

        while (current !== null) {
            if (data === current.data) {
                return true;
            } else if (data < current.data) {
                current = current.left;
            } else {
                current = current.right;
            }
        }

        return false;
    }

    find(data) {
        let current = this.rootNode;

        while (current !== null) {
            if (data === current.data) {
                return current;
            } else if (data < current.data) {
                current = current.left;
            } else {
                current = current.right;
            }
        }

        return null;
    }

    remove(data) {
        if (this.rootNode === null) return;

        let parent = null;
        let current = this.rootNode;
        let isLeftChild = false;

        while (current !== null && current.data !== data) {
            parent = current;
            if (data < current.data) {
                current = current.left;
                isLeftChild = true;
            } else {
                current = current.right;
                isLeftChild = false;
            }
        }

        if (current === null) return;

        if (current.left === null && current.right === null) {
            if (current === this.rootNode) {
                this.rootNode = null;
            } else if (isLeftChild) {
                parent.left = null;
            } else {
                parent.right = null;
            }
        }

        else if (current.right === null) {
            if (current === this.rootNode) {
                this.rootNode = current.left;
            } else if (isLeftChild) {
                parent.left = current.left;
            } else {
                parent.right = current.left;
            }
        } else if (current.left === null) {
            if (current === this.rootNode) {
                this.rootNode = current.right;
            } else if (isLeftChild) {
                parent.left = current.right;
            } else {
                parent.right = current.right;
            }
        }

        else {
            let successorParent = current;
            let successor = current.right;

            while (successor.left !== null) {
                successorParent = successor;
                successor = successor.left;
            }


            current.data = successor.data;


            if (successorParent === current) {
                successorParent.right = successor.right;
            } else {
                successorParent.left = successor.right;
            }
        }
    }

    min() {
        if (this.rootNode === null) {
            return null;
        }

        let current = this.rootNode;
        while (current.left !== null) {
            current = current.left;
        }
        return current.data;
    }

    max() {
        if (this.rootNode === null) {
            return null;
        }

        let current = this.rootNode;
        while (current.right !== null) {
            current = current.right;
        }
        return current.data;
    }

};



