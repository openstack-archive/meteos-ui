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
   * @name createTemplateSpecController
   * @ngController
   * @description
   * Controller for the template spec step in create workflow
   */
  angular
    .module('horizon.dashboard.machine_learning.templates')
    .controller('createTemplateSpecController', createTemplateSpecController);

  createTemplateSpecController.$inject = [
    '$scope',
    'horizon.framework.util.i18n.gettext',
    'horizon.app.core.openstack-service-api.neutron'
  ];

  function createTemplateSpecController($scope, gettext, neutron) {
    var ctrl = this;
    ctrl.networks = [];

    ctrl.templateVersionOptions = [
      { label: gettext('1.6.0'), value: '1.6.0' }
    ];

    init();

    function init() {
      neutron.getNetworks().success(onGetNetworks);
    }

    function onGetNetworks(response) {
      ctrl.networks = response.items;
    }

  }
})();
