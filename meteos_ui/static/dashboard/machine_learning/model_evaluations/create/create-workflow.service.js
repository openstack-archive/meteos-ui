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
    .factory('horizon.dashboard.machine_learning.model_evaluations.workflow', model_evaluationWorkflow);

  model_evaluationWorkflow.$inject = [
    'horizon.dashboard.machine_learning.basePath',
    'horizon.app.core.workflow.factory',
    'horizon.framework.util.i18n.gettext'
  ];

  function model_evaluationWorkflow(basePath, dashboardWorkflow, gettext) {
    return dashboardWorkflow({
      title: gettext('Create ModelEvaluation'),

      steps: [
        {
          title: gettext('Info'),
          templateUrl: basePath + 'model_evaluations/create/info/info.html',
          helpUrl: basePath + 'model_evaluations/create/info/info.help.html',
          formName: 'model_evaluationInfoForm'
        },
        {
          title: gettext('Spec'),
          templateUrl: basePath + 'model_evaluations/create/spec/spec.html',
          helpUrl: basePath + 'model_evaluations/create/spec/spec.help.html',
          formName: 'model_evaluationSpecForm'
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
