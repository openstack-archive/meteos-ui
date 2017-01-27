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
   * @name horizon.dashboard.machine_learning.datasets
   * @ngModule
   * @description
   * Provides all the services and widgets require to display the dataset
   * panel
   */
  angular
    .module('horizon.dashboard.machine_learning.datasets', [
      'ngRoute',
      'horizon.dashboard.machine_learning.datasets.actions'
    ])
    .constant('horizon.dashboard.machine_learning.datasets.events', events())
    .constant('horizon.dashboard.machine_learning.datasets.resourceType', 'OS::Meteos::Dataset')
    .run(run)
    .config(config);

  /**
   * @ngdoc constant
   * @name horizon.dashboard.machine_learning.datasets.events
   * @description A list of events used by Dataset
   */
  function events() {
    return {
      CREATE_SUCCESS: 'horizon.dashboard.machine_learning.datasets.CREATE_SUCCESS',
      DELETE_SUCCESS: 'horizon.dashboard.machine_learning.datasets.DELETE_SUCCESS'
    };
  }

  run.$inject = [
    'horizon.framework.conf.resource-type-registry.service',
    'horizon.app.core.openstack-service-api.meteos',
    'horizon.dashboard.machine_learning.datasets.basePath',
    'horizon.dashboard.machine_learning.datasets.resourceType'
  ];

  function run(registry, meteos, basePath, resourceType) {
    registry.getResourceType(resourceType)
    .setNames(gettext('Machine Learning'), gettext('Datasets'))
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
      'label': gettext('Source Dataset URL'),
      'name': 'source_dataset_url',
      'singleton': true
    });

    function listFunction(params) {
      return meteos.getDatasets(params).then(modifyResponse);

      function modifyResponse(response) {
        return {data: {items: response.data.items.map(addTrackBy)}};

        function addTrackBy(item) {
          item.trackBy = item.id;
          return item;
        }
      }
    }

    function urlFunction(item) {
      return 'project/ngdetails/OS::Meteos::Dataset/' + item.id;
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
    var path = $windowProvider.$get().STATIC_URL + 'dashboard/machine_learning/datasets/';
    $provide.constant('horizon.dashboard.machine_learning.datasets.basePath', path);
    $routeProvider.when('/project/machine_learning/datasets', {
      templateUrl: path + 'panel.html'
    });
  }
})();
