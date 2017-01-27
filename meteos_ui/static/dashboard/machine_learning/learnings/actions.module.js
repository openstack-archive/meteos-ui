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
   * @ngname horizon.dashboard.machine_learning.learnings.actions
   *
   * @description
   * Provides all of the actions for learnings.
   */
  angular.module('horizon.dashboard.machine_learning.learnings.actions', ['horizon.framework', 'horizon.dashboard.machine_learning'])
   .run(registerLearningActions);

  registerLearningActions.$inject = [
    'horizon.framework.conf.resource-type-registry.service',
    'horizon.framework.util.i18n.gettext',
    'horizon.dashboard.machine_learning.learnings.create.service',
    'horizon.dashboard.machine_learning.learnings.delete.service',
    'horizon.dashboard.machine_learning.learnings.resourceType',
  ];

  function registerLearningActions(
    registry,
    gettext,
    createLearningService,
    deleteLearningService,
    resourceType)
  {
    var learningsResourceType = registry.getResourceType(resourceType);

    learningsResourceType.globalActions
      .append({
        id: 'createLearningAction',
        service: createLearningService,
        template: {
          type: 'create',
          text: gettext('Create Learning')
        }
      });

    learningsResourceType.batchActions
      .append({
        id: 'batchDeleteLearningAction',
        service: deleteLearningService,
        template: {
          type: 'delete-selected',
          text: gettext('Delete Learnings')
        }
      });
  }

})();
