const data = {

    nodes: [
        {
            id: "A",
            x: 1000 + 60 ,
            y: 200 + 60,
            label: "A",
            type: "food",
            
            style: {
                fill: '#2FDD92',
                lineWidth: 1,
                radius: 7,
            },
        },
        {
            id: "B",
            type: 'food',
            x: 1500 + 60,
            y: 200 + 60,
            label: "B",
            style: {
                fill: '#2FDD92',
                lineWidth: 1,
                radius: 7,
            },
        },
        {
            id: "C",
            type: 'food',
            x: 2000 + 60,
            y: 200 + 60,
            label: "C",
            style: {
                fill: '#2FDD92',
                lineWidth: 2,
                radius: 7,
            },
        },
        {
            id: "D",
            type: 'food',
            x: 2500 + 60,
            y: 200 + 60,
            label: "D",
            style: {
                fill: '#2FDD92',
                lineWidth: 2,
                radius: 7,
            },
        }
    ],

    edges: [],
};

document.querySelector('#container').innerHTML = '';

const graph = new G6.Graph({
    container: "container",
    width: 4000,
    height: 4000,
    modes: {
        default: ['drag-node']

    },
    defaultNode: {
        shape: "circle",
        size: [60],
        color: "#34BE82",
        
        style: {
            fill: "#fff",
        },
        labelCfg: {
            style: {
                fill: "#000",
            },
        },
    },
    defaultEdge: {
        style: {
            stroke: "#888",
            lineWidth: 2,
            color: "#fff",
        },
    },
});


graph.data(data);
graph.setMode('default');
graph.render();

