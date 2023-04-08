export class Node<T> {
  constructor(public value: T, public next: Node<T> = null, public previous: Node<T> = null) {}
}

export class DoublyLinkedList<T> {
  private _head: Node<T> = null;
  private _tail: Node<T> = null;

  public get head(): Node<T> {
    return this._head;
  }

  public get tail(): Node<T> {
    return this._tail;
  }

  /**
   * Sets the list's head to the given node.
   * O(1) time | O(1) space
   * @param node a node which may or may not be in the list.
   */
  public setHead(node: Node<T>): void {
    if (!this._head) {
      this._head = node;
      this._tail = node;
    } else {
      this.insertBefore(this._head, node);
    }
  }

  /**
   * Sets the list's tail to the given node.
   * O(1) time | O(1) space
   * @param node a node which may or may not be in the list.
   */
  public setTail(node: Node<T>): void {
    if (!this._tail) {
      this.setHead(node);
    } else {
      this.insertAfter(this._tail, node);
    }
  }

  /**
   * Inserts a node after a given node in the list, updating all adjacent links.
   * O(1) time | O(1) space
   * @param node the node in the list to insert directly after
   * @param nodeToInsert a node which may or may not be in the list
   * @returns
   */
  public insertAfter(node: Node<T>, nodeToInsert: Node<T>): void {
    if (node && nodeToInsert) {
      // if the list is a singleton equal to nodeToInsert, then do nothing
      if (nodeToInsert === this._head && nodeToInsert === this._tail) {
        return;
      }

      // detach the node to insert (if it's not even in the list, then this is just a no-op)
      this.remove(nodeToInsert);

      nodeToInsert.previous = node;
      nodeToInsert.next = node.next;

      // update links on the node we're inserting after, and that node's former next node
      if (!node.next) {
        // no next means it was the tail
        this._tail = nodeToInsert;
      } else {
        node.next.previous = nodeToInsert;
      }
      node.next = nodeToInsert;
    }
  }

  /**
   * Inserts a node before a given node in the list, updating all adjacent links.
   * O(1) time | O(1) space
   * @param node the node in the list to insert directly before
   * @param nodeToInsert a node which may or may not be in the list
   * @returns
   */
  public insertBefore(node: Node<T>, nodeToInsert: Node<T>): void {
    if (node && nodeToInsert) {
      // if the list is a singleton equal to nodeToInsert, then do nothing
      if (nodeToInsert === this._head && nodeToInsert === this._tail) {
        return;
      }

      // detach the node to insert (if it's not even in the list, then this is just a no-op)
      this.remove(nodeToInsert);

      nodeToInsert.previous = node.previous;
      nodeToInsert.next = node;

      // update links on the node we're inserting before, and that node's former previous node
      if (!node.previous) {
        // no previous means it was the head
        this._head = nodeToInsert;
      } else {
        node.previous.next = nodeToInsert;
      }
      node.previous = nodeToInsert;
    }
  }

  /**
   * Inserts the given node at a desired position.
   * The position is a 1-based index (e.g. the head has position 1).
   * O(p) time for position p | O(1) space
   * @param position
   * @param nodeToInsert
   */
  public insertAtPosition(position: number, nodeToInsert: Node<T>): void {
    if (position === 1) {
      this.setHead(nodeToInsert);
    } else {
      // traverse to position
      let node: Node<T> = this._head;
      let currentPosition: number = 1;
      while (node && currentPosition !== position) {
        node = node.next;
        currentPosition++;
      }
      if (node) {
        this.insertBefore(node, nodeToInsert);
      } else {
        // else position is at or beyond tail, so insert at end
        this.setTail(nodeToInsert);
      }
    }
  }

  /**
   * Removes all nodes with the given value.
   * O(n) time | O(1) space
   * @param value
   */
  public removeAll(value: T): void {
    let node: Node<T> = this._head;
    while (node) {
      const nextNode: Node<T> = node.next;
      if (node.value === value) {
        this.remove(node);
      }
      node = nextNode;
    }
  }

  /**
   * Removes the given node from the list, updating the adjacent bindings.
   * O(1) time | O(1) space
   * @param node
   */
  public remove(node: Node<T>): void {
    if (node) {
      if (node === this._head) {
        this._head = this._head.next;
      }
      if (node === this._tail) {
        this._tail = this._tail.previous;
      }
      this.unbindNode(node);
    }
  }

  /**
   * Traverses the linked list to see if it contains the given value.
   * O(n) time | O(1) space
   * @param value
   * @returns
   */
  public includes(value: T): boolean {
    let node = this._head;
    while (node && node.value !== value) {
      node = node.next;
    }
    const foundValue: boolean = !!node;
    return foundValue;
  }

  /**
   * Gets the node at a given position.
   * O(p) time for position p | O(1) space
   * @param position a 1-indexed position in the list (e.g. the head has position 1)
   * @returns
   */
  public getNode(position: number): Node<T> {
    // traverse to position
    let node: Node<T> = null;
    if (position >= 1) {
      node = this._head;
      let currentPosition: number = 1;
      while (node && currentPosition !== position) {
        node = node.next;
        currentPosition++;
      }
    }
    return node;
  }

  /**
   * Executes the callback for each node in the list
   * @param callback
   */
  public forEach(callback: (node: Node<T>) => void): void {
    let node = this._head;
    while (node) {
      callback(node);
      node = node.next;
    }
  }

  private unbindNode(node: Node<T>): void {
    if (node) {
      // update links on adjacent nodes
      const previousNode: Node<T> = node.previous;
      const nextNode: Node<T> = node.next;
      if (previousNode) {
        previousNode.next = nextNode;
      }
      if (nextNode) {
        nextNode.previous = previousNode;
      }
      // now unlink this node
      node.next = null;
      node.previous = null;
    }
  }
}
