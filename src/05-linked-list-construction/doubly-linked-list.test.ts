import { DoublyLinkedList, Node } from './doubly-linked-list';

function createFromList<T>(list: T[]): DoublyLinkedList<T> {
  const linkedList: DoublyLinkedList<T> = new DoublyLinkedList<T>();
  list.forEach((element: T, index: number) => {
    const node: Node<T> = new Node(element);
    if (index === 0) {
      linkedList.setHead(node);
      if (list.length === 1) {
        linkedList.setTail(node);
      }
    } else {
      linkedList.insertAfter(linkedList.tail, node);
    }
  });
  return linkedList;
}

describe('doubly linked list', () => {
  describe.each([
    {
      linkedList: createFromList(['A', 'B', 'C', 'D', 'E']),
      position: 1,
      expectedNodeValue: 'A'
    },
    {
      linkedList: createFromList(['A', 'B', 'C', 'D', 'E']),
      position: 2,
      expectedNodeValue: 'B'
    },
    {
      linkedList: createFromList(['A', 'B', 'C', 'D', 'E']),
      position: 5,
      expectedNodeValue: 'E'
    }
  ])('getNode($position)', ({ linkedList, position, expectedNodeValue }) => {
    test('gets node at position correctly', () => {
      const node: Node<string> = linkedList.getNode(position);
      expect(node.value).toBe(expectedNodeValue);
    });
  });

  test('sets head correctly', () => {
    const linkedList: DoublyLinkedList<string> = createFromList(['A', 'B', 'C', 'D', 'E']);
    const oldHead: Node<string> = linkedList.head;
    const nodeC: Node<string> = linkedList.getNode(3);
    const nodeCOldPrev: Node<string> = nodeC.previous;
    const nodeCOldNext: Node<string> = nodeC.next;
    linkedList.setHead(nodeC);
    expect(linkedList.head).toBe(nodeC);
    expect(nodeC.previous).toBe(null);
    expect(nodeC.next).toBe(oldHead);
    expect(oldHead.previous).toBe(nodeC);
    expect(nodeCOldPrev.next).toBe(nodeCOldNext);
    expect(nodeCOldNext.previous).toBe(nodeCOldPrev);
  });

  test('sets tail correctly', () => {
    const linkedList: DoublyLinkedList<string> = createFromList(['A', 'B', 'C', 'D', 'E']);
    const oldTail: Node<string> = linkedList.tail;
    const nodeC: Node<string> = linkedList.getNode(3);
    const nodeD: Node<string> = linkedList.getNode(4);
    linkedList.setTail(nodeC);
    expect(linkedList.tail).toBe(nodeC);
    expect(nodeC.previous).toBe(oldTail);
    expect(nodeC.next).toBe(null);
    expect(oldTail.previous).toBe(nodeD);
    expect(oldTail.next).toBe(nodeC);
  });

  test('sets head using node not in list correctly', () => {
    const linkedList: DoublyLinkedList<string> = createFromList(['A', 'B', 'C', 'D', 'E']);
    const oldHead: Node<string> = linkedList.head;
    const nodeB: Node<string> = linkedList.getNode(2);
    const newHead: Node<string> = new Node('Z');
    linkedList.setHead(newHead);
    expect(linkedList.head).toBe(newHead);
    expect(linkedList.head.previous).toBe(null);
    expect(linkedList.head.next).toBe(oldHead);
    expect(oldHead.next).toBe(nodeB);
  });

  test('sets tail using node not in list correctly', () => {
    const linkedList: DoublyLinkedList<string> = createFromList(['A', 'B', 'C', 'D', 'E']);
    const oldTail: Node<string> = linkedList.tail;
    const nodeD: Node<string> = linkedList.getNode(4);
    const newTail: Node<string> = new Node('Z');
    linkedList.setTail(newTail);
    expect(linkedList.tail).toBe(newTail);
    expect(linkedList.tail.previous).toBe(oldTail);
    expect(linkedList.tail.next).toBe(null);
    expect(oldTail.next).toBe(newTail);
  });

  test('removes head correctly', () => {
    const linkedList: DoublyLinkedList<string> = createFromList(['A', 'B', 'C', 'D', 'E']);
    const oldHead: Node<string> = linkedList.head;
    const nodeB: Node<string> = linkedList.getNode(2);
    linkedList.remove(linkedList.head);
    expect(oldHead.previous).toBe(null);
    expect(oldHead.next).toBe(null);
    expect(linkedList.head).toBe(nodeB);
    expect(linkedList.head.previous).toBe(null);
  });

  test('removes tail correctly', () => {
    const linkedList: DoublyLinkedList<string> = createFromList(['A', 'B', 'C', 'D', 'E']);
    const oldTail: Node<string> = linkedList.tail;
    const nodeD: Node<string> = linkedList.getNode(4);
    linkedList.remove(linkedList.tail);
    expect(oldTail.previous).toBe(null);
    expect(oldTail.next).toBe(null);
    expect(linkedList.tail).toBe(nodeD);
    expect(linkedList.tail.next).toBe(null);
  });

  test('removes node correctly', () => {
    const linkedList: DoublyLinkedList<string> = createFromList(['A', 'B', 'C', 'D', 'E']);
    const nodeC: Node<string> = linkedList.getNode(3);
    const nodeB: Node<string> = linkedList.getNode(2);
    const nodeD: Node<string> = linkedList.getNode(4);
    linkedList.remove(nodeC);
    expect(nodeC.previous).toBe(null);
    expect(nodeC.next).toBe(null);
    expect(nodeB.next).toBe(nodeD);
    expect(nodeD.previous).toBe(nodeB);
  });

  test('removes node from singleton list correctly', () => {
    const linkedList: DoublyLinkedList<string> = createFromList(['A']);
    linkedList.remove(linkedList.head);
    expect(linkedList.head).toBe(null);
    expect(linkedList.tail).toBe(null);
  });

  test('removes all correctly', () => {
    const linkedList: DoublyLinkedList<string> = createFromList(['A', 'A', 'Z', 'A']);
    const nodeZ: Node<string> = linkedList.getNode(3);
    linkedList.removeAll('A');
    expect(linkedList.head).toBe(nodeZ);
    expect(linkedList.tail).toBe(nodeZ);
  });

  test('inserts after correctly', () => {
    const linkedList: DoublyLinkedList<string> = createFromList(['A', 'B', 'C', 'D', 'E']);
    const newNode: Node<string> = new Node('X');
    const nodeB: Node<string> = linkedList.getNode(2);
    const nodeC: Node<string> = linkedList.getNode(3);
    linkedList.insertAfter(nodeB, newNode);
    expect(newNode.next).toBe(nodeC);
    expect(newNode.previous).toBe(nodeB);
    expect(nodeB.next).toBe(newNode);
    expect(nodeC.previous).toBe(newNode);
  });

  test('inserts before correctly', () => {
    const linkedList: DoublyLinkedList<string> = createFromList(['A', 'B', 'C', 'D', 'E']);
    const newNode: Node<string> = new Node('X');
    const nodeC: Node<string> = linkedList.getNode(3);
    const nodeB: Node<string> = linkedList.getNode(2);
    linkedList.insertBefore(nodeC, newNode);
    expect(newNode.next).toBe(nodeC);
    expect(newNode.previous).toBe(nodeB);
    expect(nodeB.next).toBe(newNode);
    expect(nodeC.previous).toBe(newNode);
  });
});
