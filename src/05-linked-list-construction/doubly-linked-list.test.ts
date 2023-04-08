import { DoublyLinkedList, Node } from './doubly-linked-list';

function createFromList<T>(list: T[]): DoublyLinkedList<T> {
  const linkedList: DoublyLinkedList<T> = new DoublyLinkedList<T>();
  list.forEach((element: T, index: number) => {
    const node: Node<T> = new Node(element);
    if (index === 0) {
      linkedList.setHead(node);
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
      linkedList.forEach(console.log);
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

  // TODO: testing
});
