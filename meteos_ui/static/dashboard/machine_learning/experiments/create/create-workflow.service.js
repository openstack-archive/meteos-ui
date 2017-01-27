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
    .factory('horizon.dashboard.machine_learning.experiments.workflow', experimentWorkflow);

  experimentWorkflow.$inject = [
    'horizon.dashboard.machine_learning.basePath',
    'horizon.app.core.workflow.factory',
    'horizon.framework.util.i18n.gettext'
  ];

  function experimentWorkflow(basePath, dashboardWorkflow, gettext) {
    return dashboardWorkflow({
      title: gettext('Create Experiment'),

      steps: [
        {
          title: gettext('Info'),
          templateUrl: basePath + 'experiments/create/info/info.html',
          helpUrl: basePath + 'experiments/create/info/info.help.html',
          formName: 'experimentInfoForm'
        },
        {
          title: gettext('Spec'),
          templateUrl: basePath + 'experiments/create/spec/spec.html',
          helpUrl: basePath + 'experiments/create/spec/spec.help.html',
          formName: 'experimentSpecForm'
        },
      ],

      btnText: {
        finish: gettext('Create')
      },

      btnIcon: {
        finish: 'fa fa-check'
      }
    });
  }
})();
