'use strict';
// // import HeatmapJS from 'heatmap.js'
// const h337 = HeatmapJS;
//

const mockedData = Promise.resolve({
    "nodes": [
        {
            "x": 100,
            "y": 163,
            "width": 30,
            "height": 30,
            "weight": 50
        },
        {
            "x": 175,
            "y": 138,
            "width": 100,
            "height": 80,
            "weight": 50
        },
        {
            "x": 315,
            "y": 135,
            "width": 100,
            "height": 80,
            "weight": 50
        },
        {
            "x": 460,
            "y": 161,
            "width": 28,
            "height": 28,
            "weight": 50
        }
    ],
    "edges": [
        {
            "from": {
                "x": 130,
                "y": 178
            },
            "to": {
                "x": 175,
                "y": 178
            },
            "weight": 0
        },
        {
            "from": {
                "x": 275,
                "y": 177
            },
            "to": {
                "x": 315,
                "y": 176
            },
            "weight": 30
        },
        {
            "from": {
                "x": 415,
                "y": 175
            },
            "to": {
                "x": 460,
                "y": 175
            },
            "weight": 159.0823729370407
        }
    ]
});



const NODE_BG_SUFFIX = 'bg_frame';




angular.module('myApp.view1', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl'
        });
    }])
    .controller('View1Ctrl', [function () {

        const painter = new HeatMapPainter();
        mockedData.then(heatMapData => {
            generateHeatMap(heatMapData, painter);
        });

        /**
         * generates heatmap from the statistics
         * @param heatMapData
         * @param painter: Painter
         */
        function generateHeatMap(heatMapData, painter) {
            heatMapData.nodes.forEach((node) => painter.paintNode(node));
            heatMapData.edges.forEach((edge) => painter.paintEdge(edge, edge.weight));
        }
    }]);



