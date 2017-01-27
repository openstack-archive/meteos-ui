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
   * @name horizon.dashboard.machine_learning.experiments
   * @ngModule
   * @description
   * Provides all the services and widgets require to display the experiment
   * panel
   */
  angular
    .module('horizon.dashboard.machine_learning.experiments', [
      'ngRoute',
      'horizon.dashboard.machine_learning.experiments.actions'
    ])
    .constant('horizon.dashboard.machine_learning.experiments.events', events())
    .constant('horizon.dashboard.machine_learning.experiments.resourceType', 'OS::Meteos::Experiment')
    .run(run)
    .config(config);

  /**
   * @ngdoc constant
   * @name horizon.dashboard.machine_learning.experiments.events
   * @description A list of events used by Experiment
   */
  function events() {
    return {
      CREATE_SUCCESS: 'horizon.dashboard.machine_learning.experiments.CREATE_SUCCESS',
      DELETE_SUCCESS: 'horizon.dashboard.machine_learning.experiments.DELETE_SUCCESS'
    };
  }

  run.$inject = [
    'horizon.framework.conf.resource-type-registry.service',
    'horizon.app.core.openstack-service-api.meteos',
    'horizon.dashboard.machine_learning.experiments.basePath',
    'horizon.dashboard.machine_learning.experiments.resourceType'
  ];

  function run(registry, meteos, basePath, resourceType) {
    registry.getResourceType(resourceType)
    .setNames(gettext('Machine Learning'), gettext('Experiments'))
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
    .setProperty('key_name', {
      label: gettext('Key Name')
    })
    .setProperty('management_network', {
      label: gettext('Management Network')
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
      id: 'key_name',
      priority: 2
    })
    .append({
      id: 'management_network',
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
      'label': gettext('Key Name'),
      'name': 'key_name',
      'singleton': true
    })
    .append({
      'label': gettext('Management Network'),
      'name': 'management_network',
      'singleton': true
    });

    function listFunction(params) {
      return meteos.getExperiments(params).then(modifyResponse);

      function modifyResponse(response) {
        return {data: {items: response.data.items.map(addTrackBy)}};

        function addTrackBy(item) {
          item.trackBy = item.id;
          return item;
        }
      }
    }

    function urlFunction(item) {
      return 'project/ngdetails/OS::Meteos::Experiment/' + item.id;
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
    var path = $windowProvider.$get().STATIC_URL + 'dashboard/machine_learning/experiments/';
    $provide.constant('horizon.dashboard.machine_learning.experiments.basePath', path);
    $routeProvider.when('/project/machine_learning/experiments', {
      templateUrl: path + 'panel.html'
    });
  }
})();
