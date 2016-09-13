//
// Chartist: https://gionkunz.github.io/chartist-js/
//

import './graphs.html';

import { Template } from 'meteor/templating';

Template.graphs.onRendered(() => {
  // Demo: Line Graph: Basic
  new Chartist.Line('#line-graph-basic', {
    labels: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri'],
    series: [
      [12, 9, 7, 8, 5],
      [2, 1, 3.5, 7, 3],
      [1, 3, 4, 5, 6]
    ]
  }, {
    fullWidth: true
  });

  // Demo: Line Graph: Area
  new Chartist.Line('#line-graph-area', {
    labels: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri'],
    series: [
      [12, 9, 7, 8, 5],
      [2, 1, 3.5, 7, 3],
      [1, 3, 4, 5, 6]
    ]
  }, {
    showArea:  true,
    fullWidth: true
  });

  // Demo: Bar Graph: Basic
  new Chartist.Bar('#bar-graph-basic', {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    series: [
      [5, 4, 3, 7, 5, 10, 3, 4, 8, 10, 6, 8]
    ]
  }, {
    seriesBarDistance: 10
  });

  // Demo: Bar Graph: Multi
  new Chartist.Bar('#bar-graph-multi', {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    series: [
      [5, 4, 3, 7, 5, 10, 3, 4, 8, 10, 6, 8],
      [3, 2, 9, 5, 4, 6, 4, 6, 7, 8, 7, 4]
    ]
  }, {
    seriesBarDistance: 10
  });

  // Demo: Bar Graph: Stacked
  new Chartist.Bar('#bar-graph-stacked', {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    series: [
      [800000, 1200000, 1400000, 1300000],
      [200000, 400000, 500000, 300000],
      [100000, 200000, 400000, 600000]
    ]
  }, {
    stackBars: true,
    axisY: {
      labelInterpolationFnc: function(value) {
        return (value / 1000) + 'k';
      }
    }
  }).on('draw', function(data) {
    if(data.type === 'bar') {
      data.element.attr({
        style: 'stroke-width: 30px'
      });
    }
  });

  // Demo: Bar Graph: Horizontal
  new Chartist.Bar('#bar-graph-horizontal', {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    series: [
      // [5, 4, 3, 7, 5],
      [3, 2, 9, 5, 4]
    ]
  }, {
    reverseData:       true,
    horizontalBars:    true,
    seriesBarDistance: 10,
    axisY: {
      offset: 70
    }
  });

  // Demo: Pie Graph: Basic
  const data = {
    series: [5, 3, 4]
  };

  new Chartist.Pie('#pie-graph-basic', data, {
    labelInterpolationFnc: function(value) {
      return Math.round(value / data.series.reduce(function (a, b) {
        return a + b;
      }) * 100) + '%';
    }
  });

  // Demo: Pie Graph: Gauge
  new Chartist.Pie('#pie-graph-gauge', {
    series: [20, 10, 30, 40]
  }, {
    donut:      true,
    total:      200,
    showLabel:  false,
    donutWidth: 60,
    startAngle: 270
  });
});
