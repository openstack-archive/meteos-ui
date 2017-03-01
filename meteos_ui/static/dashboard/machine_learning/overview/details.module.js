/**
 * Licensed under the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License. You may obtain
 * a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */
(function () {
  'use strict';

  angular
    .module('horizon.framework.widgets')
    .controller('OverviewController', OverviewController);

  OverviewController.$inject = [
    '$q',
    '$scope',
    'horizon.dashboard.machine_learning.overview.basePath',
    'horizon.app.core.openstack-service-api.meteos'
  ];

  function OverviewController($q, $scope, basePath, meteos) {

    var topologyNodes = [];
    var topologyLinks = [];

    var templates = meteos.getTemplates().then(function(response){
                      response.data.items.map(addIcon, 'template');
                    });

    var experiments = meteos.getExperiments().then(function(response){
                        response.data.items.map(addIcon, 'experiment');
                      });

    var datasets = meteos.getDatasets().then(function(response){
                     response.data.items.map(addIcon, 'dataset');
                   });

    var models = meteos.getModels().then(function(response){
                   response.data.items.map(addIcon, 'model');
                 });

    var evaluations = meteos.getModelEvaluations().then(function(response){
                        response.data.items.map(addIcon, 'evaluation');
                      });

    var learnings = meteos.getLearnings().then(function(response){
                      response.data.items.map(addIcon, 'learning');
                    });

    function addIcon(item){

      item.icon = "meteos-" + this + ".svg";
      topologyNodes.push(item);
    }

    var promiseAll = $q.all([templates,
                             experiments,
                             datasets,
                             models,
                             evaluations,
                             learnings]);

    promiseAll.then(drawTopology);

    function drawTopology() {

      angular.forEach(topologyNodes,function(record, index){
        if("template_id" in record){
          createIndex(index, record.template_id);
        }
        if("experiment_id" in record){
          createIndex(index, record.experiment_id);
        }
        if("model_id" in record){
          createIndex(index, record.model_id);
        }
        if("source_dataset_url" in record){
          if ( record.source_dataset_url.indexOf('internal') != -1) {
            createIndex(index, record.source_dataset_url.split('//')[1]);
          }
        }
      });

      function createIndex(source_index, id){
        angular.forEach(topologyNodes,function(record,i){
          if(record.id == id){
          topologyLinks.push({"source": source_index, "target": i})
          }
        });
      }

      var topology = {
      "nodes":topologyNodes,
      "links":topologyLinks}

      var width = 900,
          height = 500;

      var force = d3.layout.force()
                    .charge(-2500)
                    .linkDistance(100)
                    .size([width, height])
                    .nodes(topology.nodes)
                    .links(topology.links)
                    .start();

      var zoom = d3.behavior.zoom()
                   .scaleExtent([1, 10])
                   .on("zoom", zoomed);

      var svg = d3.select("#meteosTopologyCanvas").append("svg")
                                                  .attr("width", width)
                                                  .attr("height", height)
                                                  .append("g")
                                                  .call(zoom);

      var rect = svg.append("rect")
                    .attr("width", width)
                    .attr("height", height)
                    .style("fill", "none");

      var container = svg.append("g");

      var link = container.append("g")
                          .attr("class", "links")
                          .selectAll(".link")
                          .data(topology.links)
                          .enter().append("line")
                          .attr("class", "link");

      var node = container.append("g")
                          .attr("class", "nodes")
                          .selectAll(".node")
                          .data(topology.nodes)
                          .enter().append("g")
                          .attr("class", "node")
                          .attr("cx", function(d) { return d.x; })
                          .attr("cy", function(d) { return d.y; })
                          .call(force.drag);

      var div = d3.select("#meteosMenu").append("div")
                                        .style("width", "360px")
                                        .style("height", "180px")
                                        .style("background", "#d6dadf")
                                        .style("position", "absolute")
                                        .style("opacity", 0)
                                        .style("text-overflow", "ellipsis")
                                        .style("display", "inline-block")
                                        .style("overflow", "hidden")
                                        .style("border-radius", "8px")
                                        .style("padding", "5px")
                                        .style("box-shadow", "0px 0px 3px 3px #d6dadf");

      node.append("image")
          .attr("xlink:href", function(d) {return basePath + "/images/" + d.icon})
          .attr("x", -35)
          .attr("y", -35)
          .attr("width", 70)
          .attr("height", 70);

      node.on("mouseover", function(d) {
             div.transition()
                .style("opacity", .9);
             div.html(createMenu(d))
                .style("left", (d3.event.pageX - 200) + "px")
                .style("top", (d3.event.pageY - 10) + "px");
          });

      node.on("mouseout", function(d) {
             div.transition()
                .duration(600)
                .style("opacity", 0);
          });

      node.append("text")
          .attr("dx", 50)
          .attr("dy", ".60em")
          .text(function(d) { return d.name });

      force.on("tick", function() {
                  link.attr("x1", function(d) { return d.source.x; })
                      .attr("y1", function(d) { return d.source.y; })
                      .attr("x2", function(d) { return d.target.x; })
                      .attr("y2", function(d) { return d.target.y; });
                  node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
      });

      var hiddenFields=['x', 'y', 'px', 'py',
                        'index','head','fixed','icon', 'stdout',
                        'weight', 'links', 'name', 'created_at'];

      function createMenu(d){
        var form = "";
        angular.forEach(d, function(v, k){

          if(hiddenFields.indexOf(k) == -1){
          form += "<b>" + k + "</b> : " + v + "</br>";
          }
        });
        return form;
      }

      function zoomed() {
        container.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
      }
    }
  }
})();
