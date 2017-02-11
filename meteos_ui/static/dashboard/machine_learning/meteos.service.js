/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
(function () {
  'use strict';

  angular
    .module('horizon.app.core.openstack-service-api')
    .factory('horizon.app.core.openstack-service-api.meteos', MeteosAPI);

  MeteosAPI.$inject = [
    'horizon.framework.util.http.service',
    'horizon.framework.widgets.toast.service',
    'horizon.framework.util.i18n.gettext'
  ];

  function MeteosAPI(apiService, toastService, gettext) {
    var service = {
      createTemplate: createTemplate,
      getTemplate: getTemplate,
      getTemplates: getTemplates,
      deleteTemplate: deleteTemplate,
      deleteTemplates: deleteTemplates,
      createExperiment: createExperiment,
      getExperiment: getExperiment,
      getExperiments: getExperiments,
      deleteExperiment: deleteExperiment,
      deleteExperiments: deleteExperiments,
      createDataset: createDataset,
      getDataset: getDataset,
      getDatasets: getDatasets,
      deleteDataset: deleteDataset,
      deleteDatasets: deleteDatasets,
      createModel: createModel,
      getModel: getModel,
      getModels: getModels,
      deleteModel: deleteModel,
      deleteModels: deleteModels,
      loadModel: loadModel,
      unloadModel: unloadModel,
      createModelEvaluation: createModelEvaluation,
      getModelEvaluation: getModelEvaluation,
      getModelEvaluations: getModelEvaluations,
      deleteModelEvaluation: deleteModelEvaluation,
      deleteModelEvaluations: deleteModelEvaluations,
      createLearning: createLearning,
      getLearning: getLearning,
      getLearnings: getLearnings,
      deleteLearning: deleteLearning,
      deleteLearnings: deleteLearnings,
    };

    return service;

    ///////////////
    // Templates //
    ///////////////

    function createTemplate(params) {
      return apiService.post('/api/meteos/templates/', params)
        .error(function() {
          toastService.add('error', gettext('Unable to create Template'));
        });
    }

    function getTemplate(id) {
      return apiService.get('/api/meteos/templates/' + id)
        .success(function(data, status, headers, config) {
          return data;
        })
        .error(function() {
          toastService.add('error', gettext('Unable to retrieve the Template.'));
        });
    }

    function getTemplates() {
      return apiService.get('/api/meteos/templates/')
        .success(function(data, status, headers, config) {
          return data;
        })
        .error(function() {
          toastService.add('error', gettext('Unable to retrieve the Templates.'));
        });
    }

    function deleteTemplate(id, suppressError) {
      var promise = apiService.delete('/api/meteos/templates/', [id]);
      return suppressError ? promise : promise.error(function() {
        var msg = gettext('Unable to delete the Template with id: %(id)s');
        toastService.add('error', interpolate(msg, { id: id }, true));
      });
    }

    function deleteTemplates(ids) {
      return apiService.delete('/api/meteos/templates/', ids)
        .error(function() {
          toastService.add('error', gettext('Unable to delete the Templates.'));
        });
    }

    /////////////////
    // Experiments //
    /////////////////

    function createExperiment(params) {
      return apiService.post('/api/meteos/experiments/', params)
        .error(function() {
          toastService.add('error', gettext('Unable to create Experiment'));
        });
    }

    function getExperiment(id) {
      return apiService.get('/api/meteos/experiments/' + id)
        .success(function(data, status, headers, config) {
          return data;
        })
        .error(function() {
          toastService.add('error', gettext('Unable to retrieve the Experiment.'));
        });
    }

    function getExperiments() {
      return apiService.get('/api/meteos/experiments/')
        .success(function(data, status, headers, config) {
          return data;
        })
        .error(function() {
          toastService.add('error', gettext('Unable to retrieve the Experiments.'));
        });
    }

    function deleteExperiment(id, suppressError) {
      var promise = apiService.delete('/api/meteos/experiments/', [id]);
      return suppressError ? promise : promise.error(function() {
        var msg = gettext('Unable to delete the Experiment with id: %(id)s');
        toastService.add('error', interpolate(msg, { id: id }, true));
      });
    }

    function deleteExperiments(ids) {
      return apiService.delete('/api/meteos/experiments/', ids)
        .error(function() {
          toastService.add('error', gettext('Unable to delete the Experiments.'));
        });
    }

    //////////////
    // Datasets //
    //////////////

    function createDataset(params) {
      return apiService.post('/api/meteos/datasets/', params)
        .error(function() {
          toastService.add('error', gettext('Unable to create Dataset'));
        });
    }

    function getDataset(id) {
      return apiService.get('/api/meteos/datasets/' + id)
        .success(function(data, status, headers, config) {
          return data;
        })
        .error(function() {
          toastService.add('error', gettext('Unable to retrieve the Dataset.'));
        });
    }

    function getDatasets() {
      return apiService.get('/api/meteos/datasets/')
        .success(function(data, status, headers, config) {
          return data;
        })
        .error(function() {
          toastService.add('error', gettext('Unable to retrieve the Datasets.'));
        });
    }

    function deleteDataset(id, suppressError) {
      var promise = apiService.delete('/api/meteos/datasets/', [id]);
      return suppressError ? promise : promise.error(function() {
        var msg = gettext('Unable to delete the Dataset with id: %(id)s');
        toastService.add('error', interpolate(msg, { id: id }, true));
      });
    }

    function deleteDatasets(ids) {
      return apiService.delete('/api/meteos/datasets/', ids)
        .error(function() {
          toastService.add('error', gettext('Unable to delete the Datasets.'));
        });
    }

    ////////////
    // Models //
    ////////////

    function createModel(params) {
      return apiService.post('/api/meteos/models/', params)
        .error(function() {
          toastService.add('error', gettext('Unable to create Model'));
        });
    }

    function getModel(id) {
      return apiService.get('/api/meteos/models/' + id)
        .success(function(data, status, headers, config) {
          return data;
        })
        .error(function() {
          toastService.add('error', gettext('Unable to retrieve the Model.'));
        });
    }

    function getModels() {
      return apiService.get('/api/meteos/models/')
        .success(function(data, status, headers, config) {
          return data;
        })
        .error(function() {
          toastService.add('error', gettext('Unable to retrieve the Models.'));
        });
    }

    function deleteModel(id, suppressError) {
      var promise = apiService.delete('/api/meteos/models/', [id]);
      return suppressError ? promise : promise.error(function() {
        var msg = gettext('Unable to delete the Model with id: %(id)s');
        toastService.add('error', interpolate(msg, { id: id }, true));
      });
    }

    function deleteModels(ids) {
      return apiService.delete('/api/meteos/models/', ids)
        .error(function() {
          toastService.add('error', gettext('Unable to delete the Models.'));
        });
    }

    function loadModel(id) {
      return apiService.post('/api/meteos/models/' + id + '/load')
        .error(function() {
          toastService.add('error', gettext('Unable to load Model'));
        });
    }

    function unloadModel(id) {
      return apiService.post('/api/meteos/models/' + id + '/unload')
        .error(function() {
          toastService.add('error', gettext('Unable to load Model'));
        });
    }

    //////////////////////
    // ModelEvaluations //
    //////////////////////

    function createModelEvaluation(params) {
      return apiService.post('/api/meteos/model_evaluations/', params)
        .error(function() {
          toastService.add('error', gettext('Unable to create ModelEvaluation'));
        });
    }

    function getModelEvaluation(id) {
      return apiService.get('/api/meteos/model_evaluations/' + id)
        .success(function(data, status, headers, config) {
          return data;
        })
        .error(function() {
          toastService.add('error', gettext('Unable to retrieve the ModelEvaluation.'));
        });
    }

    function getModelEvaluations() {
      return apiService.get('/api/meteos/model_evaluations/')
        .success(function(data, status, headers, config) {
          return data;
        })
        .error(function() {
          toastService.add('error', gettext('Unable to retrieve the ModelEvaluations.'));
        });
    }

    function deleteModelEvaluation(id, suppressError) {
      var promise = apiService.delete('/api/meteos/model_evaluations/', [id]);
      return suppressError ? promise : promise.error(function() {
        var msg = gettext('Unable to delete the ModelEvaluation with id: %(id)s');
        toastService.add('error', interpolate(msg, { id: id }, true));
      });
    }

    function deleteModelEvaluations(ids) {
      return apiService.delete('/api/meteos/model_evaluations/', ids)
        .error(function() {
          toastService.add('error', gettext('Unable to delete the ModelEvaluations.'));
        });
    }

    ///////////////
    // Learnings //
    ///////////////

    function createLearning(params) {
      return apiService.post('/api/meteos/learnings/', params)
        .error(function() {
          toastService.add('error', gettext('Unable to create Learning'));
        });
    }

    function getLearning(id) {
      return apiService.get('/api/meteos/learnings/' + id)
        .success(function(data, status, headers, config) {
          return data;
        })
        .error(function() {
          toastService.add('error', gettext('Unable to retrieve the Learning.'));
        });
    }

    function getLearnings() {
      return apiService.get('/api/meteos/learnings/')
        .success(function(data, status, headers, config) {
          return data;
        })
        .error(function() {
          toastService.add('error', gettext('Unable to retrieve the Learnings.'));
        });
    }

    function deleteLearning(id, suppressError) {
      var promise = apiService.delete('/api/meteos/learnings/', [id]);
      return suppressError ? promise : promise.error(function() {
        var msg = gettext('Unable to delete the Learning with id: %(id)s');
        toastService.add('error', interpolate(msg, { id: id }, true));
      });
    }

    function deleteLearnings(ids) {
      return apiService.delete('/api/meteos/learnings/', ids)
        .error(function() {
          toastService.add('error', gettext('Unable to delete the Learnings.'));
        });
    }

  }
}());
