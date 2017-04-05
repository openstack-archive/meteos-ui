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

(function() {
  'use strict';

  /**
   * @ngdoc overview
   * @name horizon.dashboard.machine_learning.model_evaluations
   * @ngModule
   * @description
   * Provides all the services and widgets require to display the model_evaluation
   * panel
   */
  angular
    .module('horizon.dashboard.machine_learning.model_evaluations', [
      'ngRoute',
      'horizon.dashboard.machine_learning.model_evaluations.actions'
    ])
    .constant('horizon.dashboard.machine_learning.model_evaluations.events', events())
    .constant('horizon.dashboard.machine_learning.model_evaluations.resourceType', 'OS::Meteos::ModelEvaluation')
    .run(run)
    .config(config);

  /**
   * @ngdoc constant
   * @name horizon.dashboard.machine_learning.model_evaluations.events
   * @description A list of events used by ModelEvaluation
   */
  function events() {
    return {
      CREATE_SUCCESS: 'horizon.dashboard.machine_learning.model_evaluations.CREATE_SUCCESS',
      DELETE_SUCCESS: 'horizon.dashboard.machine_learning.model_evaluations.DELETE_SUCCESS'
    };
  }

  run.$inject = [
    'horizon.framework.conf.resource-type-registry.service',
    'horizon.app.core.openstack-service-api.meteos',
    'horizon.dashboard.machine_learning.model_evaluations.basePath',
    'horizon.dashboard.machine_learning.model_evaluations.resourceType'
  ];

  function run(registry, meteos, basePath, resourceType) {
    registry.getResourceType(resourceType)
    .setNames(gettext('Machine Learning'), gettext('ModelEvaluations'))
    // for detail summary view on table row.
    .setSummaryTemplateUrl(basePath + 'details/drawer.html')
    // for table row items and detail summary view.
    .setProperty('name', {
      label: gettext('Name')
    })
    .setProperty('id', {
      label: gettext('ID')
    })
    .setProperty('status', {
      label: gettext('Status')
    })
    .setProperty('model_id', {
      label: gettext('Model ID')
    })
    .setProperty('model_type', {
      label: gettext('Model Type')
    })
    .setProperty('source_dataset_url', {
      label: gettext('Source Dataset URL')
    })
    .setListFunction(listFunction)
    .tableColumns
    .append({
      id: 'name',
      priority: 1,
      sortDefault: true,
      filters: ['noName'],
      urlFunction: urlFunction
    })
    .append({
      id: 'id',
      priority: 3
    })
    .append({
      id: 'status',
      priority: 2
    })
    .append({
      id: 'model_id',
      priority: 2
    })
    .append({
      id: 'model_type',
      priority: 2
    })
    .append({
      id: 'source_dataset_url',
      priority: 2
    })
    // for magic-search
    registry.getResourceType(resourceType).filterFacets
    .append({
      'label': gettext('Name'),
      'name': 'name',
      'singleton': true
    })
    .append({
      'label': gettext('ID'),
      'name': 'id',
      'singleton': true
    })
    .append({
      'label': gettext('Status'),
      'name': 'status',
      'singleton': true
    })
    .append({
      'label': gettext('Model Type'),
      'name': 'model_type',
      'singleton': true
    })
    .append({
      'label': gettext('Source Dataset URL'),
      'name': 'source_dataset_url',
      'singleton': true
    });

    function listFunction(params) {
      return meteos.getModelEvaluations(params).then(modifyResponse);

      function modifyResponse(response) {
        return {data: {items: response.data.items.map(parseItems)}};

        function parseItems(item) {
          item.trackBy = item.id;

          if (item.stdout) {
            item.result = angular.fromJson(item.stdout.replace(/'/g, '"'));

            if (item.result.Matrix) {
              item.matrix = createMatrix(item.result.Matrix);
              delete item.result["Matrix"];
            }
          }
          return item;
        }

        function sum(i) {
          return i.reduce(function(x, y) { return x + y; });
        }

        function createMatrix(matrix){

          var table = [];
          var row = [];
          var sum_row;

          angular.forEach(matrix, function(record, i) {
            sum_row = sum(record);

            angular.forEach(record, function(num, i) {
              row[i] = num + ' (' + Math.round(num/sum_row*1000)/10 + '%)';
            });

            table[i] = row.concat();
          });

          return table;
        }
      }
    }

    function urlFunction(item) {
      return 'project/ngdetails/OS::Meteos::ModelEvaluation/' + item.id;
    }
  }

  config.$inject = [
    '$provide',
    '$windowProvider',
    '$routeProvider'
  ];

  /**
   * @name config
   * @param {Object} $provide
   * @param {Object} $windowProvider
   * @param {Object} $routeProvider
   * @description Routes used by this module.
   * @returns {undefined} Returns nothing
   */
  function config($provide, $windowProvider, $routeProvider) {
    var path = $windowProvider.$get().STATIC_URL + 'dashboard/machine_learning/model_evaluations/';
    $provide.constant('horizon.dashboard.machine_learning.model_evaluations.basePath', path);
    $routeProvider.when('/project/machine_learning/model_evaluations', {
      templateUrl: path + 'panel.html'
    });
  }
})();
