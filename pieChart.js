var FullData = [{name:"Republican Polling Data", data:[
  { label: 'Cruz', count: 31.6 },
  { label: 'Trump', count: 42.4 },
  { label: 'Kasich', count: 18.6 },
]}];
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
            var color = d3.scale.category20b();


            dataset.forEach(function(d) { 
                d.enabled = true; 
            });

            var svg = d3.select('#' + name)
                .append('svg')
                .attr('width', width)
                .attr('height', height)
                .append('g')
                .attr('transform', 'translate(' + (width / 2) +
                    ',' + (height / 2) + ')');

            var arc = d3.svg.arc()
                .innerRadius(radius - 75) 
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
                    var height = 22;
                    var offset = 11 * color.domain().length;
                    var horz = -36;
                    var vert = i * height - offset;
                    return 'translate(' + horz + ',' + vert + ')';
                });

            legend.append('rect')
                .attr('width', 18)
                .attr('height', 18)
                .style('fill', color)
                .style('stroke', color) // UPDATED (removed semicolon)
                .on('click', function(label) { 
                    var rect = d3.select(this); 
                    var enabled = true; 
                    var totalEnabled = d3.sum(dataset.map(function(d) { 
                        return (d.enabled) ? 1 : 0; 
                    })); 

                    if (rect.attr('class') === 'disabled') { 
                        rect.attr('class', ''); 
                    } else { 
                        if (totalEnabled < 2) return; 
                        rect.attr('class', 'disabled'); 
                        enabled = false; 
                    } 

                    pie.value(function(d) { 
                        if (d.label === label) d.enabled = enabled; 
                        return (d.enabled) ? d.count : 0; 
                    }); 

                    path = path.data(pie(dataset)); 

                    path.transition() 
                        .duration(750) 
                        .attrTween('d', function(d) { 
                            var interpolate = d3.interpolate(this._current, d); 
                            this._current = interpolate(0); 
                            return function(t) { 
                                return arc(interpolate(t)); 
                            }; 
                        }); 
                }); 

            legend.append('text')
                .attr('x', 22)
                .attr('y', 14)
                .text(function(d) {
                    return d;
                });


        })(window.d3);
    }

