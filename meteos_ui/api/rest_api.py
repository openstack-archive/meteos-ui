#    Licensed under the Apache License, Version 2.0 (the "License"); you may
#    not use this file except in compliance with the License. You may obtain
#    a copy of the License at
#
#         http://www.apache.org/licenses/LICENSE-2.0
#
#    Unless required by applicable law or agreed to in writing, software
#    distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
#    WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
#    License for the specific language governing permissions and limitations
#    under the License.

from django.views import generic

from meteos_ui.api import client

from openstack_dashboard.api.rest import urls
from openstack_dashboard.api.rest import utils as rest_utils


@urls.register
class Template(generic.View):
    """API for retrieving a single template"""
    url_regex = r'meteos/templates/(?P<id>[^/]+)$'

    @rest_utils.ajax()
    def get(self, request, id):
        """Get a specific template"""
        return change_to_id(client.template_show(request, id).to_dict())


@urls.register
class TemplateActions(generic.View):
    """API for retrieving a single template"""
    url_regex = r'meteos/templates/(?P<id>[^/]+)/(?P<action>[^/]+)$'


@urls.register
class Templates(generic.View):
    """API for Meteos Templates"""
    url_regex = r'meteos/templates/$'

    @rest_utils.ajax()
    def get(self, request):
        """Get a list of the Templates for a project.

        The returned result is an object with property 'items' and each
        item under this is a Template.
        """
        result = client.template_list(request)
        return {'items': [n.to_dict() for n in result]}

    @rest_utils.ajax(data_required=True)
    def delete(self, request):
        """Delete one or more Templates by id.

        Returns HTTP 204 (no content) on successful deletion.
        """
        for id in request.DATA:
            client.template_delete(request, id)

    @rest_utils.ajax(data_required=True)
    def post(self, request):
        """Create a new Template.

        Returns the new Template object on success.
        """
        new_template = client.template_create(request, **request.DATA)
        return rest_utils.CreatedResponse(
            '/api/meteos/template/%s' % new_template.id,
            new_template.to_dict())


@urls.register
class Experiment(generic.View):
    """API for retrieving a single experiment"""
    url_regex = r'meteos/experiments/(?P<id>[^/]+)$'

    @rest_utils.ajax()
    def get(self, request, id):
        """Get a specific experiment"""
        return change_to_id(client.experiment_show(request, id).to_dict())


@urls.register
class ExperimentActions(generic.View):
    """API for retrieving a single experiment"""
    url_regex = r'meteos/experiments/(?P<id>[^/]+)/(?P<action>[^/]+)$'


@urls.register
class Experiments(generic.View):
    """API for Meteos Experiments"""
    url_regex = r'meteos/experiments/$'

    @rest_utils.ajax()
    def get(self, request):
        """Get a list of the Experiments for a project.

        The returned result is an object with property 'items' and each
        item under this is a Experiment.
        """
        result = client.experiment_list(request)
        return {'items': [n.to_dict() for n in result]}

    @rest_utils.ajax(data_required=True)
    def delete(self, request):
        """Delete one or more Experiments by id.

        Returns HTTP 204 (no content) on successful deletion.
        """
        for id in request.DATA:
            client.experiment_delete(request, id)

    @rest_utils.ajax(data_required=True)
    def post(self, request):
        """Create a new Experiment.

        Returns the new Experiment object on success.
        """
        new_experiment = client.experiment_create(request, **request.DATA)
        return rest_utils.CreatedResponse(
            '/api/meteos/experiment/%s' % new_experiment.id,
            new_experiment.to_dict())


@urls.register
class Dataset(generic.View):
    """API for retrieving a single dataset"""
    url_regex = r'meteos/datasets/(?P<id>[^/]+)$'

    @rest_utils.ajax()
    def get(self, request, id):
        """Get a specific dataset"""
        return change_to_id(client.dataset_show(request, id).to_dict())


@urls.register
class DatasetActions(generic.View):
    """API for retrieving a single dataset"""
    url_regex = r'meteos/datasets/(?P<id>[^/]+)/(?P<action>[^/]+)$'


@urls.register
class Datasets(generic.View):
    """API for Meteos Datasets"""
    url_regex = r'meteos/datasets/$'

    @rest_utils.ajax()
    def get(self, request):
        """Get a list of the Datasets for a project.

        The returned result is an object with property 'items' and each
        item under this is a Dataset.
        """
        result = client.dataset_list(request)
        return {'items': [n.to_dict() for n in result]}

    @rest_utils.ajax(data_required=True)
    def delete(self, request):
        """Delete one or more Datasets by id.

        Returns HTTP 204 (no content) on successful deletion.
        """
        for id in request.DATA:
            client.dataset_delete(request, id)

    @rest_utils.ajax(data_required=True)
    def post(self, request):
        """Create a new Dataset.

        Returns the new Dataset object on success.
        """
        new_dataset = client.dataset_create(request, **request.DATA)
        return rest_utils.CreatedResponse(
            '/api/meteos/dataset/%s' % new_dataset.id,
            new_dataset.to_dict())


@urls.register
class Model(generic.View):
    """API for retrieving a single model"""
    url_regex = r'meteos/models/(?P<id>[^/]+)$'

    @rest_utils.ajax()
    def get(self, request, id):
        """Get a specific model"""
        return change_to_id(client.model_show(request, id).to_dict())


@urls.register
class ModelActions(generic.View):
    """API for retrieving a single model"""
    url_regex = r'meteos/models/(?P<id>[^/]+)/(?P<action>[^/]+)$'


@urls.register
class Models(generic.View):
    """API for Meteos Models"""
    url_regex = r'meteos/models/$'

    @rest_utils.ajax()
    def get(self, request):
        """Get a list of the Models for a project.

        The returned result is an object with property 'items' and each
        item under this is a Model.
        """
        result = client.model_list(request)
        return {'items': [n.to_dict() for n in result]}

    @rest_utils.ajax(data_required=True)
    def delete(self, request):
        """Delete one or more Models by id.

        Returns HTTP 204 (no content) on successful deletion.
        """
        for id in request.DATA:
            client.model_delete(request, id)

    @rest_utils.ajax(data_required=True)
    def post(self, request):
        """Create a new Model.

        Returns the new Model object on success.
        """
        new_model = client.model_create(request, **request.DATA)
        return rest_utils.CreatedResponse(
            '/api/meteos/model/%s' % new_model.id,
            new_model.to_dict())


@urls.register
class ModelEvaluation(generic.View):
    """API for retrieving a single model_evaluation"""
    url_regex = r'meteos/model_evaluations/(?P<id>[^/]+)$'

    @rest_utils.ajax()
    def get(self, request, id):
        """Get a specific model_evaluation"""
        return change_to_id(client.model_evaluation_show(request, id).to_dict())


@urls.register
class ModelEvaluationActions(generic.View):
    """API for retrieving a single model_evaluation"""
    url_regex = r'meteos/model_evaluations/(?P<id>[^/]+)/(?P<action>[^/]+)$'


@urls.register
class ModelEvaluations(generic.View):
    """API for Meteos ModelEvaluations"""
    url_regex = r'meteos/model_evaluations/$'

    @rest_utils.ajax()
    def get(self, request):
        """Get a list of the ModelEvaluations for a project.

        The returned result is an object with property 'items' and each
        item under this is a ModelEvaluation.
        """
        result = client.model_evaluation_list(request)
        return {'items': [n.to_dict() for n in result]}

    @rest_utils.ajax(data_required=True)
    def delete(self, request):
        """Delete one or more ModelEvaluations by id.

        Returns HTTP 204 (no content) on successful deletion.
        """
        for id in request.DATA:
            client.model_evaluation_delete(request, id)

    @rest_utils.ajax(data_required=True)
    def post(self, request):
        """Create a new ModelEvaluation.

        Returns the new ModelEvaluation object on success.
        """
        new_model_evaluation = client.model_evaluation_create(request,
                                                              **request.DATA)
        return rest_utils.CreatedResponse(
            '/api/meteos/model_evaluation/%s' % new_model_evaluation.id,
            new_model_evaluation.to_dict())


@urls.register
class Learning(generic.View):
    """API for retrieving a single learning"""
    url_regex = r'meteos/learnings/(?P<id>[^/]+)$'

    @rest_utils.ajax()
    def get(self, request, id):
        """Get a specific learning"""
        return change_to_id(client.learning_show(request, id).to_dict())


@urls.register
class LearningActions(generic.View):
    """API for retrieving a single learning"""
    url_regex = r'meteos/learnings/(?P<id>[^/]+)/(?P<action>[^/]+)$'


@urls.register
class Learnings(generic.View):
    """API for Meteos Learnings"""
    url_regex = r'meteos/learnings/$'

    @rest_utils.ajax()
    def get(self, request):
        """Get a list of the Learnings for a project.

        The returned result is an object with property 'items' and each
        item under this is a Learning.
        """
        result = client.learning_list(request)
        return {'items': [n.to_dict() for n in result]}

    @rest_utils.ajax(data_required=True)
    def delete(self, request):
        """Delete one or more Learnings by id.

        Returns HTTP 204 (no content) on successful deletion.
        """
        for id in request.DATA:
            client.learning_delete(request, id)

    @rest_utils.ajax(data_required=True)
    def post(self, request):
        """Create a new Learning.

        Returns the new Learning object on success.
        """
        new_learning = client.learning_create(request, **request.DATA)
        return rest_utils.CreatedResponse(
            '/api/meteos/learning/%s' % new_learning.id,
            new_learning.to_dict())
