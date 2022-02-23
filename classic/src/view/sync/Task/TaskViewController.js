Ext.define('GSmartApp.view.sync.Task.TaskViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TaskViewController',
    init: function () {

    },
    control: {
        '#TaskView': {
            select: 'onSelectTask',
            deselect: 'onDeSelectTask'
        }
    },
    listen: {
        controller: {
            'FolderLocalViewController': {
                'ReloadTask': 'onReloadTask'
            }
        }
    },
    onDeSelectTask: function () {
        var viewmodel = this.getViewModel();
        var inteval = viewmodel.get('intervalDetail');
        clearInterval(inteval);
    },
    onSelectTask: function (grid, record, index, eOpts) {
        var me = this;
        var viewmodel = this.getViewModel();
        var jobid = record.get('jobid');
        me.GetStatusJob(jobid);
        if (record.get('status') == 0) {
            var inteval = viewmodel.get('intervalDetail');
            clearInterval(inteval);
            inteval = setInterval(function () {
                me.GetStatusJob(jobid);
            }, 3000);
            viewmodel.set('intervalDetail', inteval);
        }

    },
    GetStatusJob: function (jobid) {
        var viewmodel = this.getViewModel();
        // var storeFile = viewmodel.getStore('FileTransferStore');
        // storeFile.LoadFileByJob(jobid)
        var params = new Object();
        params.jobid = jobid;

        GSmartApp.Ajax.post_demo('sync/getlist_taskdetail', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        var storeFile = viewmodel.getStore('FileTransferStore');
                        storeFile.removeAll();
                        storeFile.setData(response.data);

                        if (response.success) {
                            var inteval = viewmodel.get('intervalDetail');
                            clearInterval(inteval);
                            var rec = viewmodel.get('task_selection');
                            rec.set('status', 1);
                        }
                    }
                }
            })
    },
    onReloadTask: function (taskid) {
        var grid = this.getView();
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('SyncTaskStore');
        store.load({
            callback: function (records, operation, success) {
                if (success) {
                    var rec = store.findRecord('id', taskid);
                    grid.getSelectionModel().select(rec, false, false);
                }
            }
        })
    }
})