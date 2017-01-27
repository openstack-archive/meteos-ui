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

  angular
    .module('horizon.dashboard.machine_learning.experiments')
    .factory('horizon.dashboard.machine_learning.experiments.experimentModel', experimentModel);

  experimentModel.$inject = [
    'horizon.app.core.openstack-service-api.meteos'
  ];

  function experimentModel(meteos) {
    var model = {
      newExperimentSpec: {},

      // API methods
      init: init,
      createExperiment: createExperiment
    };

    function initNewExperimentSpec() {
      model.newExperimentSpec = {
        display_name: null,
        display_description: null,
        key_name: null,
        neutron_management_network: null,
        template_id: null
      };
    }

    function init() {
      // Reset the new Experiment spec
      initNewExperimentSpec();
    }

    function createExperiment() {
      var finalSpec = angular.copy(model.newExperimentSpec);

      cleanNullProperties(finalSpec);

      return meteos.createExperiment(finalSpec);
    }

    function cleanNullProperties(finalSpec) {
      // Initially clean fields that don't have any value.
      // Not only "null", blank too.
      for (var key in finalSpec) {
        if (finalSpec.hasOwnProperty(key) && finalSpec[key] === null
            || finalSpec[key] === "") {
          delete finalSpec[key];
        }
      }
    }

    return model;
  }
})();
