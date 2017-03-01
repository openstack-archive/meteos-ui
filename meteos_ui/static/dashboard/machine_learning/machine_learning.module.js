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
   * @name horizon.dashboard.machine_learning
   * @description
   * Dashboard module to host various machine_learning panels.
   */
  angular
    .module('horizon.dashboard.machine_learning', [
      'horizon.dashboard.machine_learning.templates',
      'horizon.dashboard.machine_learning.experiments',
      'horizon.dashboard.machine_learning.datasets',
      'horizon.dashboard.machine_learning.models',
      'horizon.dashboard.machine_learning.model_evaluations',
      'horizon.dashboard.machine_learning.learnings',
      'horizon.dashboard.machine_learning.overview'
    ])
    .config(config)

  config.$inject = ['$provide', '$windowProvider'];

  function config($provide, $windowProvider) {
    var path = $windowProvider.$get().STATIC_URL + 'dashboard/machine_learning/';
    $provide.constant('horizon.dashboard.machine_learning.basePath', path);
  }
})();
