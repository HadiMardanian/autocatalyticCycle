const getFoods = (() => data.nodes.filter(node => node.type === 'food')),
    getFood = ((id) => data.nodes.find(node => node.id === id));
makeProduct = ((f1, f2, c) => {

    const state = (() => {
        if (f1.x === f2.x) return 'vertical';
        if (f1.y == f2.y) return 'horizontal';
    })(),
        halfDistx = Math.floor(Math.abs((f2.x - f1.x)) / 2),
        halfDisty = Math.floor(Math.abs((f2.y - f1.y)) / 2),
        offsetHorizontalX = f1.x,
        offsetHorizontalY = (f1.y - halfDistx * 2) > 60 || (f1.y - halfDistx * 2) > f1.y ? f1.y - halfDistx : f1.y + halfDistx * 2,

        offsetVerticalX = (f1.x - halfDisty) > 60 || (f1.x - halfDisty) > f1.x ? f1.x - halfDisty : f1.x + halfDisty,
        offsetVerticalY = f1.y ,
        x = (state === 'horizontal' ? offsetHorizontalX : offsetVerticalX),
        y = (state === 'horizontal' ? offsetHorizontalY : offsetVerticalY),
        id = f1.id + f2.id,
        product = {
            id,
            label: id,
            x,
            y,
            type: 'product',
            style: {
                fill: '#ddd'
            }
        },
        edge1 = {
            source: f1.id,
            target: product.id,
            
            style: {
                endArrow: {
                    path: G6.Arrow.vee(0.3, 0.3, 10),
                    d: 10,
                    fill: '#34BE82',
                    stroke: '#34BE82',
                    opacity: 0.5,
                    lineWidth: 10
                }
            }
        },
        edge2 = {
            source: f2.id,
            target: product.id,
            style: {
                endArrow: {
                    path: G6.Arrow.vee(0.3, 0.3, 10),
                    d: 10,
                    fill: '#34BE82',
                    stroke: '#34BE82',
                    opacity: 0.5,
                    lineWidth: 10
                }
            }
        },
        edge3 = {
            source: c.id,
            target: product.id,
            style: {

                
                stroke: '#F2F013',
                opacity: 0.5,
                lineWidth: 3,
            },
            type: 'cubic-' + state,

        };
    console.log(state, offsetVerticalX, offsetVerticalY, y);

    graph.addItem('node', product);
    graph.addItem('edge', edge1);
    graph.addItem('edge', edge2);
    graph.addItem('edge', edge3);
    data.nodes.push(product);
    data.edges.push(edge1);
    data.edges.push(edge2);
}),
    findRandomCatalic = (() => {
        const length = data.nodes.length;
        return data.nodes[Math.floor(Math.random() * length)];
    });


makeProduct(getFood('A'), getFood('B'), getFood('C'))
makeProduct(getFood('B'), getFood('A'), getFood('C'))
makeProduct(getFood('B'), getFood('C'), getFood('A'))
makeProduct(getFood('AB'), getFood('A'), getFood('A'))
makeProduct(getFood('BA'), getFood('C'), getFood('A'))
makeProduct(getFood('BA'), getFood('AB'), getFood('ABA'))
console.log(getFood('A').x, getFood('A').y)
console.log(getFood('B').x, getFood('B').y)
// makeProduct(getFood('AB'), getFood('A'))
// makeProduct(getFood('AB'), getFood('B'))
// makeProduct(getFood('ABA'), getFood('AB'))
// console.log(getFood('AB').x, getFood('AB').y)



