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
   * @ngdoc controller
   * @name createExperimentInfoController
   * @ngController
   * @description
   * Controller for the experiment info step in create workflow
   */
  angular
    .module('horizon.dashboard.machine_learning.experiments')
    .controller('createExperimentInfoController', createExperimentInfoController);

  createExperimentInfoController.$inject = [
    'horizon.app.core.openstack-service-api.meteos'
  ];

  function createExperimentInfoController(meteos) {

    var ctrl = this;
    ctrl.templates = [];
    init();

    function init() {
      meteos.getTemplates().success(onGetTemplates);
    }

    function onGetTemplates(response) {
      ctrl.templates = response.items;
    }

  }
})();
