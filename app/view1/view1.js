'use strict';
// // import HeatmapJS from 'heatmap.js'
// const h337 = HeatmapJS;
//

const mockedData = Promise.resolve({
    'nodes': [
        {
            'id': 'sid-E2ADBCA5-EEF2-4DCA-8E57-A083B85BC97F',
            'weight': 100
        },
        {
            'id': 'sid-7901FAC1-F8AB-40D9-AB3E-DB32F0F205BC',
            'weight': 200
        }
    ],
    'edges': [
        {
            'id': 'sid-3A925D4C-8047-49ED-9A18-70222CDA5EEA_1',
            'weight': 255,
            'from': 'sid-AD05BC4B-7D09-486A-8093-90ECBD6AC07F_1',
            'to': 'sid-AD05BC4B-7D09-486A-8093-90ECBD6AC07F_2'
        },
        {
            'id': 'sid-AD05BC4B-7D09-486A-8093-90ECBD6AC07F_1'
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
         * @param
         * @param painter: Painter
         */
        function generateHeatMap(heatMapData, painter) {
            heatMapData.nodes.forEach((x) => painter.paintNode(x));
            heatMapData.edges.forEach(painter.paintEdge);
        }
    }]);



