Ext.define('GSmartApp.view.TaskBoard.TaskBoardViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TaskBoardViewController',
    listen : {
        store : {
            '*' : {
                update : 'refreshMainTask',
                remove : 'refreshMainTask',
                add    : 'refreshMainTask'
            }
        }
    },
    control: {
        '#btnAddTask': {
            click: 'onAddTask'
        },
        '#btnRefresh' : {
            click: 'onRefresh'
        },
        '#cmbtype' : {
            select: 'onSelectType'
        },
        '#btnSwitch' : {
            click: 'onBtnSwitch'
        }
    },
    init: function(){
        var me = this.getView().down('#taskboard');

        var viewmodel = this.getViewModel();
        var typeStore = viewmodel.getStore('TaskTypeStore');
        typeStore.loadStore();

    },
    onBtnSwitch: function () {
        var viewmodel = this.getViewModel();
        viewmodel.set('isTaskBoardHidden',true);
        Ext.getCmp('TaskGrid').getViewModel().set('isTaskGridHidden',false);
        Ext.getCmp('TaskGrid').getViewModel().getStore('TaskBoard_Store').loadStore();
    },
    onSelectType: function(combo, record){
        var tasktypeid_link = record.get('id');
        var me = this.getView().down('#taskboard');
        var store = me.getTaskStore();
        store.clearFilter();
        filters = store.getFilters();
        console.log()
        if (tasktypeid_link > -10) {
            filters.add({
                id: tasktypeid_link,
                operator: '=',
                value: tasktypeid_link,
                property: 'tasktypeid_link'
            });
        }
    },
    onRefresh: function(){
        var me = this.getView().down('#taskboard');
        var taskStore = me.getTaskStore();
        taskStore.load();
    },
    onAddTask: function(){
        var view = this.getView();
        var form = Ext.create('Ext.window.Window', {
            height: 200,
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Thêm việc mới',
            closeAction: 'destroy',
            width: 300,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'AddTask'
            }]
        });
        form.show();        
        form.down('#AddTask').down('#text').focus();

        form.down('#AddTask').on('Addtask', function(task){
            var taskStore = view.down('#taskboard').getTaskStore();

            taskStore.insert(0, task);
            form.close();
        })
    },

    refreshMainTask : function (store, model) {
        model = model instanceof Array ? model[ 0 ] : model;

        var taskStore = this.getView().down('#taskboard').getTaskStore();
        var mainTask  = taskStore.getById(model.get('TaskId'));

        if (model instanceof GSmartApp.model.TaskBoard.SubTask_model) {
            var subTasks = mainTask.subTasks();
            var nbrDone  = subTasks.query('Done', true).length;

            mainTask.set('PercentDone', nbrDone > 0 ? 100 * nbrDone / subTasks.getCount() : 0, { silent : true });

            this.getView().down('#taskboard').refreshTaskNode(mainTask);
        } else if (model instanceof GSmartApp.model.TaskBoard.Comment_model) {
            this.getView().down('#taskboard').refreshTaskNode(mainTask);
        }
    },

    beforeDrop: function(drop, dragContext, e, eOpts){
        var task = dragContext.taskRecords[0];
        var data = GSmartApp.util.State.get('session');
        var session = data ? GSmartApp.model.Session.loadData(data) : null;
        var current_user = session.get('Id');

        if(task.get('tasktypeid_link') != -1){
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Bạn không được phép di chuyển công việc! Trạng thái công việc sẽ được tự động cập nhật',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                },
                fn: function () {
                    dragContext.finalize(false);
                }
            });
            return false;
        }
        else if (current_user != task.get('ResourceId')){
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Bạn không được phép di chuyển công việc không phải mình phụ trách!',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                },
                fn: function () {
                    dragContext.finalize(false);
                }
            });
            return false;
        }
        return true;
    },

    onTaskDrop: function(drop, task, eOpts ){
        var data = task[0];
        console.log(data);
        var me = this;
        var form = this.getView();
        form.setLoading('Đang xử lý dữ liệu');

        var taskstatusid_link = 0;
        if(data.get('State') == 'DangLam'){
            taskstatusid_link = 1;
        } else if(data.get('State') == 'DaXong'){
            taskstatusid_link = 2;
        } else if(data.get('State') == 'TuChoi'){
            taskstatusid_link = -1;
        }
        var params = new Object();
        params.taskid_link = data.get('Id');
        params.taskstatusid_link = taskstatusid_link;

        GSmartApp.Ajax.post('/api/v1/task/update_state_task', Ext.JSON.encode(params),
            function (success, response, options) {
                form.setLoading(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode != 200) {
                        Ext.MessageBox.show({
                            title: "Thông báo",
                            msg: response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng'
                            },
                            fn: function(){
                                var state = data.previousValues.State;
                                data.set('State',state)
                            }
                        });
                    }
                }
                else {
                    Ext.MessageBox.show({
                        title: "Thông báo",
                        msg: "Có lỗi trong quá trình xử lý dữ liệu!",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng'
                        },
                        fn: function(){
                            var state = data.previousValues.State;
                            data.set('State',state)
                        }
                    });
                }
            })

    }

    // onCheckboxChange : function (e, checkbox) {
    //     var taskboard = this.getView().down('#taskboard');
    //     var task      = taskboard.resolveRecordByNode(checkbox);
    //     var subtask   = task.subTasks().getByInternalId(Number(checkbox.getAttribute('data-id')));
    //     var current   = subtask.get('Done');

    //     subtask.set('Done', !current);
    // }
})