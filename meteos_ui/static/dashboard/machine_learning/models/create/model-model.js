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
    .module('horizon.dashboard.machine_learning.models')
    .factory('horizon.dashboard.machine_learning.models.modelModel', modelModel);

  modelModel.$inject = [
    'horizon.app.core.openstack-service-api.meteos'
  ];

  function modelModel(meteos) {
    var model = {
      id: null,
      newModelSpec: {},
      newCommonDataset: {},
      newParamsSpec: {},

      // API methods
      init: init,
      createModel: createModel
    };

    function initNewModelSpec() {
      model.newModelSpec = {
        display_name: null,
        display_description: null,
        source_dataset_url: null,
        dataset_format: null,
        experiment_id: null,
        model_type: null,
        model_params: null,
        swift_tenant: null,
        swift_username: null,
        swift_password: null
      };

      model.newCommonDataset = {
        location: null,
        format: 'csv',
        dataset_uuid: null,
        dataset_format: null,
        container_name: null,
        object_name: null,
        swift_tenant: null,
        swift_username: null,
        swift_password: null
      };

      model.newParamsSpec = {
        numIterations: '10',
        lambda: '1.0',
        numClasses: '2',
        runs: '10',
        mode: 'random',
        rank: '10',
        step: '0.00000001',
        impurity: null,
        numTrees: '3',
        maxDepth: '5',
        maxBins: '32',
        learningRate: '0.025',
        minCount: '5',
        minSupport: '0.2',
        limits: '10'
      };

    }

    function init() {
      // Reset the new Model spec
      initNewModelSpec();
    }

    function createModel() {
      var modelId = model.id;
      var finalSpec = angular.copy(model.newModelSpec);
      var commonDataset = angular.copy(model.newCommonDataset);
      var finalParams = angular.copy(model.newParamsSpec);
      var url = "";

      cleanNullProperties(finalParams);

      finalSpec.model_params = JSON.stringify(finalParams);

      if(commonDataset.location == 'swift'){
        url = 'swift://' +
              commonDataset.container_name + '/' +
              commonDataset.object_name;
      }else{
        url = 'internal://' + commonDataset.dataset_uuid;
      }

      finalSpec.source_dataset_url = url;
      finalSpec.dataset_format = commonDataset.format;
      finalSpec.swift_tenant = commonDataset.swift_tenant;
      finalSpec.swift_username = commonDataset.swift_username;
      finalSpec.swift_password = commonDataset.swift_password;

      if(modelId){
        delete finalSpec['experiment_id'];
        return meteos.recreateModel(modelId, finalSpec);
      }else{
        return meteos.createModel(finalSpec);
      }
    }


    function cleanNullProperties(finalParams) {
      // Initially clean fields that don't have any value.
      // Not only "null", blank too.
      for (var key in finalParams) {
        if (finalParams[key] === null || finalParams[key] === "") {
          delete finalParams[key];
        }
      }
    }

    return model;
  }
})();
