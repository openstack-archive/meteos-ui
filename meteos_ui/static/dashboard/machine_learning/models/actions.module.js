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
   * @ngname horizon.dashboard.machine_learning.models.actions
   *
   * @description
   * Provides all of the actions for models.
   */
  angular.module('horizon.dashboard.machine_learning.models.actions', ['horizon.framework', 'horizon.dashboard.machine_learning'])
   .run(registerModelActions);

  registerModelActions.$inject = [
    'horizon.framework.conf.resource-type-registry.service',
    'horizon.framework.util.i18n.gettext',
    'horizon.dashboard.machine_learning.models.create.service',
    'horizon.dashboard.machine_learning.models.delete.service',
    'horizon.dashboard.machine_learning.models.recreate.service',
    'horizon.dashboard.machine_learning.models.load.service',
    'horizon.dashboard.machine_learning.models.unload.service',
    'horizon.dashboard.machine_learning.models.resourceType',
  ];

  function registerModelActions(
    registry,
    gettext,
    createModelService,
    deleteModelService,
    recreateModelService,
    loadModelService,
    unloadModelService,
    resourceType)
  {
    var modelsResourceType = registry.getResourceType(resourceType);

    modelsResourceType.globalActions
      .append({
        id: 'createModelAction',
        service: createModelService,
        template: {
          type: 'create',
          text: gettext('Create Model')
        }
      });

    modelsResourceType.batchActions
      .append({
        id: 'batchDeleteModelAction',
        service: deleteModelService,
        template: {
          type: 'delete-selected',
          text: gettext('Delete Models')
        }
      });

    modelsResourceType.itemActions
      .append({
        id: 'recreateModelAction',
        service: recreateModelService,
        template: {
          text: gettext('Recreate Model')
        }
      })
      .append({
        id: 'loadModelAction',
        service: loadModelService,
        template: {
          text: gettext('Load Model')
        }
      })
      .append({
        id: 'unloadModelAction',
        service: unloadModelService,
        template: {
          text: gettext('Unload Model')
        }
      });

  }

})();
