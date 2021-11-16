const INITIAL_SIZE = data.nodes.length, 
      getFoods = (() => data.nodes.filter((node) => node.type === "food")),
	  getFood = ((id) => data.nodes.find((node) => node.id === id));
makeProduct = ((f1, f2, c) => {
	const state = (() => {
			if (f1.x === f2.x) return "vertical";
			if (f1.y == f2.y) return "horizontal";
		})(),
		halfDistx = Math.floor(Math.abs(f2.x - f1.x) / 2),
		halfDisty = Math.floor(Math.abs(f2.y - f1.y) / 2),
		offsetHorizontalX = f1.x,
		offsetHorizontalY =
			f1.y - halfDistx * 2 > 60 || f1.y - halfDistx * 2 > f1.y
				? f1.y - halfDistx
				: f1.y + halfDistx * 2,
		offsetVerticalX =
			f1.x - halfDisty > 60 || f1.x - halfDisty > f1.x
				? f1.x - halfDisty
				: f1.x + halfDisty,
		offsetVerticalY = f1.y,
		x = state === "horizontal" ? offsetHorizontalX : offsetVerticalX,
		y = state === "horizontal" ? offsetHorizontalY : offsetVerticalY,
		id = f1.id + f2.id,
		product = {
			id,
			label: id,
			x,
			y,
			type: "product",
			style: {
				fill: "#ddd",
			},
		},
		edge1 = {
			source: f1.id,
			target: product.id,

			style: {
				endArrow: {
					path: G6.Arrow.vee(0.3, 0.3, 10),
					d: 10,
					fill: "#34BE82",
					stroke: "#34BE82",
					opacity: 0.5,
					lineWidth: 10,
				},
			},
		},
		edge2 = {
			source: f2.id,
			target: product.id,
			style: {
				endArrow: {
					path: G6.Arrow.vee(0.3, 0.3, 10),
					d: 10,
					fill: "#34BE82",
					stroke: "#34BE82",
					opacity: 0.5,
					lineWidth: 10,
				},
			},
		},
		edge3 = {
			source: c.id,
			target: product.id,
			style: {
				stroke: "#F2F013",
				opacity: 0.5,
				lineWidth: 3,
			},
			type: "cubic-" + state,
		};

	graph.addItem("node", product);
	graph.addItem("edge", edge1);
	graph.addItem("edge", edge2);
	graph.addItem("edge", edge3);
	data.nodes.push(product);
	data.edges.push(edge1);
	data.edges.push(edge2);
}),
	findRandomCatalic = (() => {
		const length = data.nodes.length;
		return data.nodes[Math.floor(Math.random() * length)];
	}),
	relatedNodes = (() => {
		const nodes = data.edges.reduce((acc, { source, target }) => {
			if(!acc[source]) acc[source] = [target];
            else acc[source].push(target);
            return acc;
		}, {});
        
        return nodes;
	}),
	build = (() => {
        const rawNodes = [...new Set(data.nodes.map(({ id }) => id))],
        node1 = (() => {
            const candidates = rawNodes.filter(node => (
                !relatedNodes()[node] || relatedNodes()[node].length <= INITIAL_SIZE
            ));
            return candidates[Math.floor(Math.random() * candidates.length)]
        })(),
        node2 = (() => {
            const candidates = rawNodes.filter(node => {
                return (!relatedNodes()[node] || !relatedNodes()[node].includes(node1)) && getFood(node).type === (
                    rawNodes.length === INITIAL_SIZE ? 'food' : 'product'
                ) && (node !== node1);
            });
            return candidates[Math.floor(Math.random() * candidates.length)]
        })(),
        catalic = (() => {
            const candidates = rawNodes.filter(node => {
                return node !== node1 && node !== node2;
            });
            return candidates[Math.floor(Math.random() * candidates.length)]
        })();

        if(!node1 || !node2 || !catalic) return null;
        if(rawNodes.includes(node1 + node2)) return null;

        const array = [node1, node2, catalic];
        
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                for(let k = 0; k < 1; k++){
                    if(
                        ([...new Set([array[i], array[j], array[k]])].length < 3) || 
                        rawNodes.includes(array[i] + array[j])
                    ) continue;

                    makeProduct(
                        getFood(array[i]),
                        getFood(array[j]),
                        getFood(array[k])
                    );            
                }
            }   
        }
        makeProduct(getFood(node1), getFood(node2), getFood(catalic));
        makeProduct(getFood(node2), getFood(node1), getFood(catalic));
	});

let result = true;
for(let i = 1; i <= 2; i++) build();
