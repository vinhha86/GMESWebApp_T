Ext.define('GSmartApp.view.Schedule.Plan.FilterFieldPorder', {
    extend: 'Ext.form.TextField',
    xtype: 'FilterFieldPorder',

    enableKeyEvents: true,
    store: null,
    property: '',

    initComponent: function () {
        this.callParent(arguments);
    },

    triggers: {
        clear: {
            cls: 'fa-times',
            handler: function () {
                this.doHighlight('');
                this.setValue('');
            },
            scope: 'this'
        }
    },

    onKeyUp: function (e) {
        if (e.keyCode == e.ENTER) {
            var value = this.getValue();

            this.doHighlight(value);
        }
    },

    doHighlight: function (value) {
        var store = this.store;
        if (!value) {
            store.clearFilter();
            // store.each(function(task) {
            //     task.set('Cls', task.get('cls'));
            // })
        } else {
            var rec = null;
            store.each(function (task) {
                if (task.get('mahang') != null) {
                    if (task.get('mahang').toLowerCase().replace(" ", "").includes(value.toLowerCase())) {
                        task.set('Cls', task.get('cls') + ' match');
                        rec = task;
                    } else {
                        task.set('Cls', task.get('cls'));
                    }
                }
            });
            if (rec) {
                Ext.getCmp('treeplan').getSchedulingView().scrollEventIntoView(rec, true, true);
                Ext.getCmp('treeplan').getEventSelectionModel().select(rec);
            }
        }

        Ext.getCmp('treeplan')[value.length > 0 ? 'addCls' : 'removeCls']('highlighting');
    },

    listeners: {
        keyup: 'onKeyUp',
        buffer: 200
    }

});