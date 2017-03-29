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


from horizon import exceptions
from horizon.utils.memoized import memoized
import logging
from meteosclient.api import client as meteos_client
from openstack_dashboard.api import base


LOG = logging.getLogger(__name__)

TEMPLATE_CREATE_ATTRS = ['display_name', 'display_description', 'image_id',
                         'master_nodes_num', 'master_flavor_id',
                         'worker_nodes_num', 'worker_flavor_id',
                         'spark_version', 'floating_ip_pool']
EXPERIMENT_CREATE_ATTRS = ['display_name', 'display_description', 'key_name',
                           'neutron_management_network', 'template_id']
DATASET_CREATE_ATTRS = ['method', 'source_dataset_url', 'display_name',
                        'display_description', 'experiment_id', 'params',
                        'percent_train', 'percent_test', 'swift_tenant',
                        'swift_username', 'swift_password']
MODEL_CREATE_ATTRS = ['source_dataset_url', 'display_name',
                      'display_description', 'experiment_id',
                      'model_type', 'model_params', 'dataset_format',
                      'swift_tenant', 'swift_username', 'swift_password']
MODEL_EVA_CREATE_ATTRS = ['source_dataset_url', 'display_name',
                          'display_description', 'model_id', 'dataset_format',
                          'swift_tenant', 'swift_username', 'swift_password']
LEARNING_CREATE_ATTRS = ['display_name', 'display_description',
                         'model_id', 'method', 'args']


@memoized
def meteosclient(request):
    meteos_url = ""
    try:
        meteos_url = base.url_for(request, 'machine-learning')
    except exceptions.ServiceCatalogException:
        LOG.debug('No Machine Learning service is configured.')
        return None

    LOG.debug('meteosclient connection created using the token "%s" and url'
              '"%s"' % (request.user.token.id, meteos_url))
    c = meteos_client.Client(username=request.user.username,
                             project_id=request.user.tenant_id,
                             input_auth_token=request.user.token.id,
                             meteos_url=meteos_url)
    return c


def template_create(request, **kwargs):
    args = {}
    for (key, value) in kwargs.items():
        if key in TEMPLATE_CREATE_ATTRS:
            args[str(key)] = str(value)
        else:
            raise exceptions.BadRequest(
                "Key must be in %s" % ",".join(TEMPLATE_CREATE_ATTRS))
    return meteosclient(request).templates.create(**args)


def template_delete(request, id):
    return meteosclient(request).templates.delete(id)


def template_list(request, search_opts=None, limit=None, marker=None,
                  sort_key=None, sort_dir=None):
    return meteosclient(request).templates.list(search_opts,
                                                limit,
                                                marker,
                                                sort_key,
                                                sort_dir)


def template_show(request, id):
    return meteosclient(request).templates.get(id)


def experiment_create(request, **kwargs):
    args = {}
    for (key, value) in kwargs.items():
        if key in EXPERIMENT_CREATE_ATTRS:
            args[str(key)] = str(value)
        else:
            raise exceptions.BadRequest(
                "Key must be in %s" % ",".join(EXPERIMENT_CREATE_ATTRS))
    return meteosclient(request).experiments.create(**args)


def experiment_delete(request, id):
    return meteosclient(request).experiments.delete(id)


def experiment_list(request, search_opts=None, limit=None, marker=None,
                    sort_key=None, sort_dir=None):
    return meteosclient(request).experiments.list(search_opts,
                                                  limit,
                                                  marker,
                                                  sort_key,
                                                  sort_dir)


def experiment_show(request, id):
    return meteosclient(request).experiments.get(id)


def dataset_create(request, **kwargs):
    args = {}
    for (key, value) in kwargs.items():
        if key in DATASET_CREATE_ATTRS:
            args[str(key)] = str(value)
        else:
            raise exceptions.BadRequest(
                "Key must be in %s" % ",".join(DATASET_CREATE_ATTRS))
    return meteosclient(request).datasets.create(**args)


def dataset_delete(request, id):
    return meteosclient(request).datasets.delete(id)


def dataset_list(request, search_opts=None, limit=None, marker=None,
                 sort_key=None, sort_dir=None):
    return meteosclient(request).datasets.list(search_opts,
                                               limit,
                                               marker,
                                               sort_key,
                                               sort_dir)


def dataset_show(request, id):
    return meteosclient(request).datasets.get(id)


def model_create(request, **kwargs):
    args = {}
    for (key, value) in kwargs.items():
        if key in MODEL_CREATE_ATTRS:
            args[str(key)] = str(value)
        else:
            raise exceptions.BadRequest(
                "Key must be in %s" % ",".join(MODEL_CREATE_ATTRS))
    return meteosclient(request).models.create(**args)


def model_recreate(request, id, **kwargs):
    args = {}
    for (key, value) in kwargs.items():
        if key in MODEL_CREATE_ATTRS:
            args[str(key)] = str(value)
        else:
            raise exceptions.BadRequest(
                "Key must be in %s" % ",".join(MODEL_CREATE_ATTRS))
    return meteosclient(request).models.recreate(id, **args)


def model_delete(request, id):
    return meteosclient(request).models.delete(id)


def model_list(request, search_opts=None, limit=None, marker=None,
               sort_key=None, sort_dir=None):
    return meteosclient(request).models.list(search_opts,
                                             limit,
                                             marker,
                                             sort_key,
                                             sort_dir)


def model_show(request, id):
    return meteosclient(request).models.get(id)


def model_load(request, id):
    return meteosclient(request).models.load(id)


def model_unload(request, id):
    return meteosclient(request).models.unload(id)


def model_evaluation_create(request, **kwargs):
    args = {}
    for (key, value) in kwargs.items():
        if key in MODEL_EVA_CREATE_ATTRS:
            args[str(key)] = str(value)
        else:
            raise exceptions.BadRequest(
                "Key must be in %s" % ",".join(MODEL_EVA_CREATE_ATTRS))
    return meteosclient(request).model_evaluations.create(**args)


def model_evaluation_delete(request, id):
    return meteosclient(request).model_evaluations.delete(id)


def model_evaluation_list(request, search_opts=None, limit=None, marker=None,
                          sort_key=None, sort_dir=None):
    return meteosclient(request).model_evaluations.list(search_opts,
                                                        limit,
                                                        marker,
                                                        sort_key,
                                                        sort_dir)


def model_evaluation_show(request, id):
    return meteosclient(request).model_evaluations.get(id)


def learning_create(request, **kwargs):
    args = {}
    for (key, value) in kwargs.items():
        if key in LEARNING_CREATE_ATTRS:
            args[str(key)] = str(value)
        else:
            raise exceptions.BadRequest(
                "Key must be in %s" % ",".join(LEARNING_CREATE_ATTRS))
    return meteosclient(request).learnings.create(**args)


def learning_delete(request, id):
    return meteosclient(request).learnings.delete(id)


def learning_list(request, search_opts=None, limit=None, marker=None,
                  sort_key=None, sort_dir=None):
    return meteosclient(request).learnings.list(search_opts,
                                                limit,
                                                marker,
                                                sort_key,
                                                sort_dir)


def learning_show(request, id):
    return meteosclient(request).learnings.get(id)
