var RepublicanNationalPolling = [
  { label: 'Cruz', count: 31.6 },
  { label: 'Trump', count: 42.4 },
  { label: 'Kasich', count: 18.6 },
];
var makePieChart = function(target, name, dataset) {


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
            var donutWidth = 75; // NEW
            var color = d3.scale.category20b();
            var legendRectSize = 18;
            var legendSpacing = 4;

            dataset.forEach(function(d) { // NEW
                d.enabled = true; // NEW
            });

            var svg = d3.select('#' + name)
                .append('svg')
                .attr('width', width)
                .attr('height', height)
                .append('g')
                .attr('transform', 'translate(' + (width / 2) +
                    ',' + (height / 2) + ')');

            var arc = d3.svg.arc()
                .innerRadius(radius - donutWidth) // NEW
                .outerRadius(radius);

            var pie = d3.layout.pie()
                .value(function(d) {
                    return d.count;
                })
                .sort(null);

            var path = svg.selectAll('path')
                .data(pie(dataset))
                .enter()
                .append('path')
                .attr('d', arc)
                .attr('fill', function(d, i) {
                    return color(d.data.label);
                }) // UPDATED (removed semicolon)
                .each(function(d) {
                    this._current = d;
                });

            var legend = svg.selectAll('.legend')
                .data(color.domain())
                .enter()
                .append('g')
                .attr('class', 'legend')
                .attr('transform', function(d, i) {
                    var height = legendRectSize + legendSpacing;
                    var offset = height * color.domain().length / 2;
                    var horz = -2 * legendRectSize;
                    var vert = i * height - offset;
                    return 'translate(' + horz + ',' + vert + ')';
                });

            legend.append('rect')
                .attr('width', legendRectSize)
                .attr('height', legendRectSize)
                .style('fill', color)
                .style('stroke', color) // UPDATED (removed semicolon)
                .on('click', function(label) { // NEW
                    var rect = d3.select(this); // NEW
                    var enabled = true; // NEW
                    var totalEnabled = d3.sum(dataset.map(function(d) { // NEW
                        return (d.enabled) ? 1 : 0; // NEW
                    })); // NEW

                    if (rect.attr('class') === 'disabled') { // NEW
                        rect.attr('class', ''); // NEW
                    } else { // NEW
                        if (totalEnabled < 2) return; // NEW
                        rect.attr('class', 'disabled'); // NEW
                        enabled = false; // NEW
                    } // NEW

                    pie.value(function(d) { // NEW
                        if (d.label === label) d.enabled = enabled; // NEW
                        return (d.enabled) ? d.count : 0; // NEW
                    }); // NEW

                    path = path.data(pie(dataset)); // NEW

                    path.transition() // NEW
                        .duration(750) // NEW
                        .attrTween('d', function(d) { // NEW
                            var interpolate = d3.interpolate(this._current, d); // NEW
                            this._current = interpolate(0); // NEW
                            return function(t) { // NEW
                                return arc(interpolate(t)); // NEW
                            }; // NEW
                        }); // NEW
                }); // NEW

            legend.append('text')
                .attr('x', legendRectSize + legendSpacing)
                .attr('y', legendRectSize - legendSpacing)
                .text(function(d) {
                    return d;
                });


        })(window.d3);
    }

