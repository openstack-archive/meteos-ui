# plugin.sh - DevStack plugin.sh dispatch script meteos-ui

METEOS_UI_DIR=$(cd $(dirname $BASH_SOURCE)/.. && pwd)

function install_meteos_ui {
    # NOTE(shu-mutou): workaround for devstack bug: 1540328
    # where devstack install 'test-requirements' but should not do it
    # for meteos-ui project as it installs Horizon from url.
    # Remove following two 'mv' commands when mentioned bug is fixed.
    mv $METEOS_UI_DIR/test-requirements.txt $METEOS_UI_DIR/_test-requirements.txt

    setup_develop ${METEOS_UI_DIR}

    mv $METEOS_UI_DIR/_test-requirements.txt $METEOS_UI_DIR/test-requirements.txt
}

function configure_meteos_ui {
    cp -a ${METEOS_UI_DIR}/meteos_ui/enabled/* ${DEST}/horizon/openstack_dashboard/local/enabled/
    # NOTE: If locale directory does not exist, compilemessages will fail,
    # so check for an existence of locale directory is required.
    if [ -d ${METEOS_UI_DIR}/meteos_ui/locale ]; then
        (cd ${METEOS_UI_DIR}/meteos_ui; DJANGO_SETTINGS_MODULE=openstack_dashboard.settings ../manage.py compilemessages)
    fi
}

# check for service enabled
if is_service_enabled meteos-ui; then

    if [[ "$1" == "stack" && "$2" == "pre-install"  ]]; then
        # Set up system services
        # no-op
        :

    elif [[ "$1" == "stack" && "$2" == "install"  ]]; then
        # Perform installation of service source
        echo_summary "Installing Meteos UI"
        install_meteos_ui

    elif [[ "$1" == "stack" && "$2" == "post-config"  ]]; then
        # Configure after the other layer 1 and 2 services have been configured
        echo_summary "Configurng Meteos UI"
        configure_meteos_ui

    elif [[ "$1" == "stack" && "$2" == "extra"  ]]; then
        # no-op
        :
    fi

    if [[ "$1" == "unstack"  ]]; then
        # no-op
        :
    fi

    if [[ "$1" == "clean"  ]]; then
        # Remove state and transient data
        # Remember clean.sh first calls unstack.sh
        # no-op
        :
    fi
fi
