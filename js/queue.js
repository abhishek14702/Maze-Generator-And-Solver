;(function() {
  // Check if the mazeSolver namespace is already defined, if not, initialize it as an empty object
  if (typeof mazeSolver === "undefined") {
    window.mazeSolver = {};
  }

  // Define a Node constructor function
  var Node = mazeSolver.Node = function (data, next) {
    this.data = data;
    this.nextNode = next;
  }

  // Define a static method to check if two nodes have equal data
  Node.areEqual = function (n1, n2) {
    if (!n1 || !n2) { return false; }
    // Compare the data of the nodes using mazeSolver.areEqual function
    if (mazeSolver.areEqual(n1.data, n2.data)) {
      return true;
    } else {
      return false;
    }
  }

  // Define a Queue constructor function
  Queue = mazeSolver.Queue = function (initialData) {
    var node = new Node(initialData)
    this.head = node;
    this.tail = node;
    this.length = 1;
  }

  // Define the dequeue method for the Queue prototype
  Queue.prototype.dequeue = function () {
    if (!this.head) { return false }

    var node = this.head;

    if (Node.areEqual(this.head, this.tail)) {
      // In the case of initial value being dequeued immediately, set the tail to null
      this.tail = null;
    }

    this.head = node.nextNode;
    this.length--;
    return node.data;
  }

  // Define the enqueue method for the Queue prototype
  Queue.prototype.enqueue = function (data) {
    var newNode = new Node(data)

    if (this.tail) {
      this.tail.nextNode = newNode;
    } else {
      this.head = newNode;
    }

    this.tail = newNode;
    this.length++;
    return newNode.data;
  }
}());
