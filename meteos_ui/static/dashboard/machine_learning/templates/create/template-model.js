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
    .module('horizon.dashboard.machine_learning.templates')
    .factory('horizon.dashboard.machine_learning.templates.templateModel', templateModel);

  templateModel.$inject = [
    'horizon.app.core.openstack-service-api.meteos'
  ];

  function templateModel(meteos) {
    var model = {
      newTemplateSpec: {},

      // API methods
      init: init,
      createTemplate: createTemplate
    };

    function initNewTemplateSpec() {
      model.newTemplateSpec = {
        display_name: null,
        display_description: null,
        image_id: null,
        master_nodes_num: null,
        master_flavor_id: null,
        worker_nodes_num: null,
        worker_flavor_id: null,
        spark_version: null,
        floating_ip_pool: null
      };
    }

    function init() {
      // Reset the new Template spec
      initNewTemplateSpec();
    }

    function createTemplate() {
      var finalSpec = angular.copy(model.newTemplateSpec);

      cleanNullProperties(finalSpec);

      return meteos.createTemplate(finalSpec);
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
