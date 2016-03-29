var makePieChart = function(target,name, dataset){
    var div = document.createElement("div");
    var body = document.getElementById(target);
    div.id = name;
    div.text = "<b>" + name + "</b>";
    body.appendChild(div);
    
      (function(d3) {
        'use strict';
        var width = 360;
        var height = 360;
        var radius = Math.min(width, height) / 2;
        var donutWidth = 75;                            // NEW
        var color = d3.scale.category20b();
        var svg = d3.select('#' + name)
          .append('svg')
          .attr('width', width)
          .attr('height', height)
          .append('g')
          .attr('transform', 'translate(' + (width / 2) + 
            ',' + (height / 2) + ')');
        var arc = d3.svg.arc()
          .innerRadius(radius - donutWidth)             // NEW
          .outerRadius(radius);
          
        var pie = d3.layout.pie()
          .value(function(d) { return d.count; })
          .sort(null);
        var path = svg.selectAll('path')
          .data(pie(dataset))
          .enter()
          .append('path')
          .attr('d', arc)
          .attr('fill', function(d, i) { 
            return color(d.data.label);
          });
      })(window.d3);}
