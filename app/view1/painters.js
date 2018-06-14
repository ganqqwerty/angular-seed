class Painter {
    paintNode(node) {
    }

    paintEdge(edge) {
    }
}

/**
 * Fills the strokes and the fills with the color
 */
class SimplePainter extends Painter {
    paintNode(node) {
        console.log('painting node', node, document.getElementById(node.id + NODE_BG_SUFFIX));
        document.getElementById(node.id + NODE_BG_SUFFIX).setAttribute('fill', `rgb(${node.weight},100,100)`);
    }

    paintEdge(edge) {
        console.log('painting edge', edge, document.getElementById(edge.id));
        document.getElementById(edge.id).setAttribute('stroke', `rgb(${node.weight},100,100)`);
    }
}

const LINE_THICKNESS = 20;
const HALO_MARGIN = 0;

class HeatMapPainter extends Painter {

    constructor() {
        super();
        const gradient = {
            0.0: "rgba(000,000,255,1)",
            0.2: "rgba(000,000,255,1)",
            0.6: "rgba(000,255,50,1)",
            0.8: "rgba(255,255,000,1)",
            1.0: "rgba(255,000,000,1)"
        };
        this.heatmapInstance = h337.create({
            // only container is required, the rest will be defaults
            container: document.getElementById('heatmapCanvasDiv'),
            gradient: gradient,
            blur: 0.65
        });
        this.initHeatMapProperties(this.heatmapInstance);
    }

    paintNode(node) {
        console.log('painting node', node);
        this.drawBox(node.x, node.y + node.height/2, node.width, node.weight, node.height);
    }

    /**
     *
     * @param edge real edge object
     * @param weight
     */
    paintEdge(edge, weight) {
        const from = edge.from;
        const to = edge.to;
        this.drawLine(from, to, weight, LINE_THICKNESS);
    }

    /**
     *
     * @param from {x:44, y: 55}
     * @param to {x:46. y: 99}
     * @param weight number
     */
    drawLine(from, to, weight, thickness) {

        var steps = Math.sqrt(((from.x - to.x) * (from.x - to.x)) + ((from.y - to.y) * (from.y - to.y))) / 15;
        var h_step = -(from.x - to.x) / steps;
        var v_step = -(from.y - to.y) / steps;

        var actualx = from.x + h_step;
        var actualy = from.y + v_step;
        for (var int = 0; int < steps - 1; int++) {
            this.heatmapInstance.addData({
                x: actualx,
                y: actualy,
                value: weight,
                radius: thickness
            });
            actualx = actualx + h_step;
            actualy = actualy + v_step;
        }

    }

    drawBox(x,y, width, weight, height ) {
        this.drawLine({x: x,y: y},
            {x: x + width, y: y},
            weight,
            height + HALO_MARGIN //the halo around box is as thick as it's
        );
    }

    /**
     *
     * @param nodeId
     * @returns DOMRect
     */
    getNodeCoordinates(node) {
        //another possible options will be to just read them from the rest api, or maybe use getBBox() to get coordinates in a local svg space
        return node.getBoundingClientRect();
    }

    initHeatMapProperties(heatmapInstance) {

        console.log(document.getElementById('heatmapCanvasDiv'));
        // minimal heatmap instance configuration

        // now generate some random data
        var points = [];
        var max = 0;
        var width = 1200;
        var height = 1050;
        var len = 200;

        // while (len--) {
        //     var val = Math.floor(Math.random() * 100);
        //     max = Math.max(max, val);
        //     var point = {
        //         x: Math.floor(Math.random() * width),
        //         y: Math.floor(Math.random() * height),
        //         value: val
        //     };
        //     points.push(point);
        // }
        // heatmap data format

        var data = {
            max: 100,
            min: 0,
            data: points
        };
        // if you have a set of datapoints always use setData instead of addData
        // for data initialization
        heatmapInstance.setData(data);
    }

}