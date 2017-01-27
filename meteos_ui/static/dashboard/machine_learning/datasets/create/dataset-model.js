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
    .module('horizon.dashboard.machine_learning.datasets')
    .factory('horizon.dashboard.machine_learning.datasets.datasetModel', datasetModel);

  datasetModel.$inject = [
    'horizon.app.core.openstack-service-api.meteos'
  ];

  function datasetModel(meteos) {
    var model = {
      newDatasetSpec: {},

      // API methods
      init: init,
      createDataset: createDataset
    };

    function initNewDatasetSpec() {
      model.newDatasetSpec = {
        method: null,
        display_name: null,
        display_description: null,
        source_dataset_url: null,
        experiment_id: null,
        params: null,
        swift_tenant: null,
        swift_username: null,
        swift_password: null
      };
    }

    function init() {
      // Reset the new Dataset spec
      initNewDatasetSpec();
    }

    function createDataset() {
      var finalSpec = angular.copy(model.newDatasetSpec);

      cleanNullProperties(finalSpec);

      return meteos.createDataset(finalSpec);
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
