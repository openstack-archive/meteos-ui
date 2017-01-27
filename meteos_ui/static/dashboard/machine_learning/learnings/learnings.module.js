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
   * @name horizon.dashboard.machine_learning.learnings
   * @ngModule
   * @description
   * Provides all the services and widgets require to display the learning
   * panel
   */
  angular
    .module('horizon.dashboard.machine_learning.learnings', [
      'ngRoute',
      'horizon.dashboard.machine_learning.learnings.actions'
    ])
    .constant('horizon.dashboard.machine_learning.learnings.events', events())
    .constant('horizon.dashboard.machine_learning.learnings.resourceType', 'OS::Meteos::Learning')
    .run(run)
    .config(config);

  /**
   * @ngdoc constant
   * @name horizon.dashboard.machine_learning.learnings.events
   * @description A list of events used by Learning
   */
  function events() {
    return {
      CREATE_SUCCESS: 'horizon.dashboard.machine_learning.learnings.CREATE_SUCCESS',
      DELETE_SUCCESS: 'horizon.dashboard.machine_learning.learnings.DELETE_SUCCESS'
    };
  }

  run.$inject = [
    'horizon.framework.conf.resource-type-registry.service',
    'horizon.app.core.openstack-service-api.meteos',
    'horizon.dashboard.machine_learning.learnings.basePath',
    'horizon.dashboard.machine_learning.learnings.resourceType'
  ];

  function run(registry, meteos, basePath, resourceType) {
    registry.getResourceType(resourceType)
    .setNames(gettext('Machine Learning'), gettext('Learnings'))
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
    .setProperty('type', {
      label: gettext('Model Type')
    })
    .setProperty('args', {
      label: gettext('Input Data')
    })
    .setProperty('stdout', {
      label: gettext('Result')
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
      id: 'type',
      priority: 2
    })
    .append({
      id: 'args',
      priority: 2
    })
    .append({
      id: 'stdout',
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
      'name': 'type',
      'singleton': true
    })
    .append({
      'label': gettext('Input Data'),
      'name': 'args',
      'singleton': true
    })
    .append({
      'label': gettext('Result'),
      'name': 'stdout',
      'singleton': true
    });

    function listFunction(params) {
      return meteos.getLearnings(params).then(modifyResponse);

      function modifyResponse(response) {
        return {data: {items: response.data.items.map(addTrackBy)}};

        function addTrackBy(item) {
          item.trackBy = item.id;
          return item;
        }
      }
    }

    function urlFunction(item) {
      return 'project/ngdetails/OS::Meteos::Learning/' + item.id;
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
    var path = $windowProvider.$get().STATIC_URL + 'dashboard/machine_learning/learnings/';
    $provide.constant('horizon.dashboard.machine_learning.learnings.basePath', path);
    $routeProvider.when('/project/machine_learning/learnings', {
      templateUrl: path + 'panel.html'
    });
  }
})();
