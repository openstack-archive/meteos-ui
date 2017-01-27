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
    .module('horizon.dashboard.machine_learning.learnings')
    .factory('horizon.dashboard.machine_learning.learnings.learningModel', learningModel);

  learningModel.$inject = [
    'horizon.app.core.openstack-service-api.meteos'
  ];

  function learningModel(meteos) {
    var model = {
      newLearningSpec: {},

      // API methods
      init: init,
      createLearning: createLearning
    };

    function initNewLearningSpec() {
      model.newLearningSpec = {
        display_name: null,
        display_description: null,
        model_id: null,
        method: null,
        args: null
      };
    }

    function init() {
      // Reset the new Learning spec
      initNewLearningSpec();
    }

    function createLearning() {
      var finalSpec = angular.copy(model.newLearningSpec);

      cleanNullProperties(finalSpec);

      return meteos.createLearning(finalSpec);
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
