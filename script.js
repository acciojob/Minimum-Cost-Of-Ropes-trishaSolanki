document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();
    calculateMinCost();
});

function calculateMinCost() {
    let input = document.getElementById('rope-lengths').value;
    let ropeLengths = input.split(',').map(Number);
    let result = minCostToConnectRopes(ropeLengths);
    document.getElementById('result').innerText = result;
}

function minCostToConnectRopes(ropes) {
    if (ropes.length === 0) return 0;

    // Create a min-heap using a priority queue
    let minHeap = new MinPriorityQueue();
    for (let rope of ropes) {
        minHeap.enqueue(rope);
    }

    let totalCost = 0;

    while (minHeap.size() > 1) {
        // Extract the two smallest ropes
        let first = minHeap.dequeue().element;
        let second = minHeap.dequeue().element;

        // Calculate the cost of connecting them
        let cost = first + second;
        totalCost += cost;

        // Add the connected rope back into the min-heap
        minHeap.enqueue(cost);
    }

    return totalCost;
}

// Priority queue implementation (Min-Heap)
class MinPriorityQueue {
    constructor() {
        this.heap = [];
    }

    enqueue(element) {
        this.heap.push(element);
        this.bubbleUp();
    }

    dequeue() {
        if (this.size() === 1) {
            return { element: this.heap.pop() };
        }
        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown();
        return { element: min };
    }

    size() {
        return this.heap.length;
    }

    bubbleUp() {
        let index = this.heap.length - 1;
        while (index > 0) {
            let parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[index] >= this.heap[parentIndex]) break;
            [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
            index = parentIndex;
        }
    }

    bubbleDown() {
        let index = 0;
        while (index < this.heap.length) {
            let leftChildIndex = 2 * index + 1;
            let rightChildIndex = 2 * index + 2;
            let smallest = index;

            if (leftChildIndex < this.heap.length && this.heap[leftChildIndex] < this.heap[smallest]) {
                smallest = leftChildIndex;
            }
            if (rightChildIndex < this.heap.length && this.heap[rightChildIndex] < this.heap[smallest]) {
                smallest = rightChildIndex;
            }
            if (smallest === index) break;
            [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
            index = smallest;
        }
    }
}
