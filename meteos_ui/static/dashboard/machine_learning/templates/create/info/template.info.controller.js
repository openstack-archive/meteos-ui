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
   * @name createTemplateInfoController
   * @ngController
   * @description
   * Controller for the template info step in create workflow
   */
  angular
    .module('horizon.dashboard.machine_learning.templates')
    .controller('createTemplateInfoController', createTemplateInfoController);

  createTemplateInfoController.$inject = [
    'horizon.app.core.openstack-service-api.glance'
  ];

  function createTemplateInfoController(glance) {

    var ctrl = this;
    ctrl.images = [];
    init();

    function init() {
      glance.getImages().success(onGetImages);
    }

    function onGetImages(response) {
      ctrl.images = response.items;
    }

  }
})();
