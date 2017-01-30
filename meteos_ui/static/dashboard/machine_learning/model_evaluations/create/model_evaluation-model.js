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
    .module('horizon.dashboard.machine_learning.model_evaluations')
    .factory('horizon.dashboard.machine_learning.model_evaluations.model_evaluationModel', model_evaluationModel);

  model_evaluationModel.$inject = [
    'horizon.app.core.openstack-service-api.meteos'
  ];

  function model_evaluationModel(meteos) {
    var model = {
      newModelEvaluationSpec: {},
      newCommonDataset: {},

      // API methods
      init: init,
      createModelEvaluation: createModelEvaluation
    };

    function initNewModelEvaluationSpec() {
      model.newModelEvaluationSpec = {
        display_name: null,
        model_id: null,
        source_dataset_url: null,
        dataset_format: null,
        swift_tenant: null,
        swift_username: null,
        swift_password: null
      };

      model.newCommonDataset = {
        location: null,
        format: null,
        dataset_uuid: null,
        dataset_format: null,
        container_name: null,
        object_name: null,
        swift_tenant: null,
        swift_username: null,
        swift_password: null
      };
    }

    function init() {
      // Reset the new ModelEvaluation spec
      initNewModelEvaluationSpec();
    }

    function createModelEvaluation() {
      var finalSpec = angular.copy(model.newModelEvaluationSpec);
      var commonDataset = angular.copy(model.newCommonDataset);
      var url = "";

      if(commonDataset.location == 'swift'){
        url = 'swift://' +
              commonDataset.container_name + '/' +
              commonDataset.object_name;
      }else{
        url = 'internal://' + commonDataset.dataset_uuid;
      }

      finalSpec.source_dataset_url = url;
      finalSpec.dataset_format = commonDataset.dataset_format;
      finalSpec.swift_tenant = commonDataset.swift_tenant;
      finalSpec.swift_username = commonDataset.swift_username;
      finalSpec.swift_password = commonDataset.swift_password;

      return meteos.createModelEvaluation(finalSpec);
    }

    return model;
  }
})();
