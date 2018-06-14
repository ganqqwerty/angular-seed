
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
    paintNode(node) {
        console.log('painting node', node)
    }

    paintEdge(edge) {

    }
}