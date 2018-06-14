
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

class HeatMapPainter extends Painter {

    constructor(){
        super();
        this.heatmapInstance = h337.create({
            // only container is required, the rest will be defaults
            container: document.getElementById('heatmapCanvasDiv')
        });
        this.paintSomeHeatMap(this.heatmapInstance);
    }


    paintNode(node) {
        console.log('painting node', node);
        this.heatmapInstance.addData({
            x: 10,
            y: 20,
            value: 100,
            radius: 100
        });
        this.heatmapInstance.repaint();
    }



    paintEdge(edge) {

    }

    paintSomeHeatMap(heatmapInstance) {

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
        // heatmapInstance.repaint();
    }

}