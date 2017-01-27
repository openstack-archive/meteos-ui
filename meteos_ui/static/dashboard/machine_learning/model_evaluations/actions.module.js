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
   * @ngdoc overview
   * @ngname horizon.dashboard.machine_learning.model_evaluations.actions
   *
   * @description
   * Provides all of the actions for model_evaluations.
   */
  angular.module('horizon.dashboard.machine_learning.model_evaluations.actions', ['horizon.framework', 'horizon.dashboard.machine_learning'])
   .run(registerModelEvaluationActions);

  registerModelEvaluationActions.$inject = [
    'horizon.framework.conf.resource-type-registry.service',
    'horizon.framework.util.i18n.gettext',
    'horizon.dashboard.machine_learning.model_evaluations.create.service',
    'horizon.dashboard.machine_learning.model_evaluations.delete.service',
    'horizon.dashboard.machine_learning.model_evaluations.resourceType',
  ];

  function registerModelEvaluationActions(
    registry,
    gettext,
    createModelEvaluationService,
    deleteModelEvaluationService,
    resourceType)
  {
    var model_evaluationsResourceType = registry.getResourceType(resourceType);

    model_evaluationsResourceType.globalActions
      .append({
        id: 'createModelEvaluationAction',
        service: createModelEvaluationService,
        template: {
          type: 'create',
          text: gettext('Create ModelEvaluation')
        }
      });

    model_evaluationsResourceType.batchActions
      .append({
        id: 'batchDeleteModelEvaluationAction',
        service: deleteModelEvaluationService,
        template: {
          type: 'delete-selected',
          text: gettext('Delete ModelEvaluations')
        }
      });
  }

})();
