Ext.define('GSmartApp.view.TaskGrid.TaskGridEditorController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TaskGridEditorController',

    control: {
        checkboxgroup: {
            change: 'onCheckboxChange'
        },
        // 'TaskGridEditor': {
        //     activate: 'onActivate'
        // },
        '#comboUser' : {
            select: 'onUpdateUser'
        },
        '#comboFlowStatus' : {
            select: 'onSelectStatus'
        },
        '#comboOrg' : {
            select : 'onSelectOrg'
        },
        '#cmbObject' : {
            select: 'onSelectObject'
        },
        '#btnForward': {
            click: 'ShowByType'
        }
    },
    init: function () {
        var form = this.getView();
        var viewmodel = this.getViewModel();
        var record = viewmodel.get('record');
        console.log(record);

        // top right combo
        var objectStore = viewmodel.getStore('TaskObjectStore');
        var taskid_link = record.id;
        objectStore.loadStore(taskid_link);

        // Người phụ trách
        var storeUser = viewmodel.getStore('TaskUser_Store');
        storeUser.loadUserbyOrg(-1);
        storeUser.load();

        // combo 'Gửi'
        var flowStatusStore = viewmodel.getStore('FlowStatusStore');
        flowStatusStore.loadStore();

        // Chưa thấy dùng store này ?
        var storeUserFull = viewmodel.getStore('TaskUser_Store_Full');
        storeUserFull.loadUserbyOrg(1);
        storeUserFull.load();

        // Đơn vị
        var listid = "13";
        var orgStore = viewmodel.getStore('OrgStore');
        orgStore.loadStore_allchildren_byorg(listid);

        // Comments
        var TaskCommentStore = viewmodel.getStore('TaskCommentStore');
        TaskCommentStore.loadStore(taskid_link);

        //Loai task la ycsx thi moi hien day du 
        var FlowStatusStore = viewmodel.getStore('FlowStatusStore');
        var tasktypeid_link = record.tasktypeid_link;
        if (tasktypeid_link != 0){
            filters = FlowStatusStore.getFilters();
            filters.add({
                property: 'id',
                value: 1,
                operator: '>',
            })
        }
        else {
            FlowStatusStore.clearFilter();
        }

        // 
        if (record.tasktypeid_link == -1) {
            viewmodel.set('ishidden_add_checklist', false);
            viewmodel.set('isdisable_checkbox', false);
        }
        else {
            viewmodel.set('isdisable_checkbox', true);
        }

    },
    // onActivate: function () {
    //     var form = this.getView();
    //     var viewmodel = this.getViewModel();
    //     var comment = form.getCommentView();
    //     comment.userStore = viewmodel.getStore('TaskUser_Store_Full');

    //     var objectStore = viewmodel.getStore('TaskObjectStore');
    //     // var taskid_link = form.getRecord().getId();
    //     var taskid_link = viewmodel.get('record.id');
    //     objectStore.loadStore(taskid_link);

    //     var form = this.getView();
    //     if (form.getRecord().data.tasktypeid_link == -1) {
    //         viewmodel.set('ishidden_add_checklist', false);
    //         viewmodel.set('isdisable_checkbox', false);
    //     }
    //     else {
    //         viewmodel.set('isdisable_checkbox', true);
    //     }

    //     form.down('#comboUser').setValue(form.getRecord().getResourceId());
    //     form.down('#comboOrg').setValue(form.getRecord().data.orgid_link);

    //     //Loai task la ycsx thi moi hien day du 
    //     var flowStatusStore = viewmodel.getStore('FlowStatusStore');
    //     if (form.getRecord().data.tasktypeid_link != 0){
    //         filters = flowStatusStore.getFilters();
    //         filters.add({
    //             property: 'id',
    //             value: 1,
    //             operator: '>',
    //         })
    //     }
    //     else {
    //         flowStatusStore.clearFilter();
    //     }
    // },
    onSelectObject: function(combo, record){
        var me = this;
        var viewmodel = this.getViewModel();

        var type = record.get('taskobjecttypeid_link');
        viewmodel.set('objecttype', type);
        me.ShowByType();
    },
    ShowByType: function(){
        var me = this;
        var viewmodel = this.getViewModel();
        var type = viewmodel.get('objecttype');
        switch(type){
            case 2:
                // this.redirectTo("lspcontract/" + objectid + "/edit_2");
                // me.onCloseClick();
                me.ShowPContractSKU();
                break;
            default:
                break;
        }
    },
    ShowPContractSKU: function(){
        var form = this.getView();
        var objectid = form.down('#cmbObject').getValue();

        var form = Ext.create('Ext.window.Window', {
            height: Ext.getBody().getViewSize().height*.95,
            width: Ext.getBody().getViewSize().width*.95,
            closable: true,
            title: 'Chi tiết màu, cỡ sản phẩm',
            resizable: false,
            modal: true,
            border: false,
            closeAction: 'destroy',
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'PContractView',
                viewModel: {
                    data: {
                        PContract: {
                            id: objectid
                        },
                        isWindow: true,
                        tabActivate: 2
                    }
                }
            }]
        });
        form.show();

        form.down('#PContractView').down('#PContractSKUView').on('ConfimSKU', function(){
            form.close();
            
            // var taskboard = Ext.getCmp('taskboard');
            // var taskStore = taskboard.getTaskStore();
            // taskStore.load();
            var TaskGrid = Ext.getCmp('TaskGrid');
            var TaskBoard_Store = TaskGrid.getStore();
            TaskBoard_Store.load();
        })
    },
    onSelectOrg: function(combo, record){
        var viewmodel = this.getViewModel();
        var storeUser = viewmodel.getStore('TaskUser_Store');
        storeUser.loadUserbyOrg(record.data.id);
        storeUser.load();
    },
    onSelectStatus: function(combo, record, eOpts){
        var viewmodel = this.getViewModel();
        var status = record.get('id');
        switch(status){
            case 1:
                viewmodel.set('isedit_comment', false);
                viewmodel.set('comment','Phân xưởng chấp nhận Yêu cầu');
                viewmodel.set('btncomment', true);
                viewmodel.set('btnreject', true);
                viewmodel.set('btnaccept', false);
                break;
            case 2:
                viewmodel.set('isedit_comment', true);
                viewmodel.set('comment','Phân xưởng không sản xuất được!');
                viewmodel.set('btncomment', true);
                viewmodel.set('btnreject', false);
                viewmodel.set('btnaccept', true);
                break;
            case 3:
                viewmodel.set('isedit_comment', true);
                viewmodel.set('comment','');
                viewmodel.set('btncomment', false);
                viewmodel.set('btnreject', true);
                viewmodel.set('btnaccept', true);
                break;
            case 4:
                viewmodel.set('isedit_comment', true);
                viewmodel.set('comment','Tôi không thể nhận việc trong thời gian này!');
                break;
            default:
                break;
        }
    },
    onAddCommentClick: function () {
        var form = this.getView();
        var field = form.down('#textcomment');
        var text = field.getValue();
        var viewmodel = this.getViewModel();

        if (text) {
            var params = new Object();
            // params.taskid_link = form.getRecord().getId();
            params.taskid_link = viewmodel.get('record.id');
            params.text = text;

            GSmartApp.Ajax.post('/api/v1/task/add_comment', Ext.JSON.encode(params),
                function (success, response, options) {
                    if (success) {
                        var response = Ext.decode(response.responseText);
                        if (response.respcode == 200) {
                            Ext.MessageBox.show({
                                title: "Thông báo",
                                msg: "Thành công",
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Đóng',
                                },
                                fn: function () {

                                }
                            });
                            // form.getRecord().comments().add({
                            //     Text: field.getValue(),
                            //     Date: response.data.Date,
                            //     UserId: response.data.UserId, /* TODO read logged in user id */
                            //     TaskId: form.getRecord().getId(),
                            //     typename : response.data.typename
                            // });
                            var TaskCommentStore = viewmodel.getStore('TaskCommentStore');
                            // console.log(TaskCommentStore);
                            TaskCommentStore.insert(0, {
                                "typename": response.data.typename,
                                "date": response.data.Date,
                                "text": field.getValue(),
                                "taskId": response.data.TaskId,
                                "userId": response.data.UserId,
                                "userFullName": response.data.UserFullName,
                                "Date": response.data.Date,
                                "TaskId": response.data.TaskId,
                                "UserId": response.data.UserId,
                                "Text": field.getValue(),
                                "UserFullName": response.data.UserFullName,
                            });

                            field.reset();

                        }
                        else {
                            Ext.MessageBox.show({
                                title: "Thông báo",
                                msg: response.message,
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Đóng'
                                }
                            });
                        }
                    }
                })
        }
    },
    onAcceptReq: function(){
        var me = this;
        var form = this.getView();
        var viewmodel = this.getViewModel();

        var user_incharge = form.down('#comboUser').getValue();
        var data = GSmartApp.util.State.get('session');
        var session = data ? GSmartApp.model.Session.loadData(data) : null;
        var current_user = session.get('Id');

        var field = form.down('#textcomment');

        if(user_incharge == current_user){
        var params = new Object();
            params.taskid_link = viewmodel.get('record.id');
            params.comment = field.getValue();

            GSmartApp.Ajax.post('/api/v1/task/accept_porer_req', Ext.JSON.encode(params),
            function (success, response, options) {
                form.setLoading(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {

                        // me.onCloseClick();

                        // var taskboard = Ext.getCmp('taskboard');
                        // var taskStore = taskboard.getTaskStore();
                        // taskStore.load();
                        var TaskGrid = Ext.getCmp('TaskGrid');
                        var TaskBoard_Store = TaskGrid.getStore();
                        TaskBoard_Store.load();
                        form.close();
                    }
                    else {
                        Ext.MessageBox.show({
                            title: "Thông báo",
                            msg: response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng'
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
                        }
                    });
                }
            })
        }
        else {
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: "Bạn không phải Người phụ trách công việc! Bạn không được chấp nhận YCSX cho phân xưởng",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng'
                },
                fn: function () {
                    viewmodel.set('flow_status', 3);
                    field.reset();
                }
            });
        }
    },
    onRejectReq: function(){
        var me = this;
        var form = this.getView();
        var viewmodel = this.getViewModel();

        var user_incharge = form.down('#comboUser').getValue();
        var data = GSmartApp.util.State.get('session');
        var session = data ? GSmartApp.model.Session.loadData(data) : null;
        var current_user = session.get('Id');

        if(user_incharge == current_user){
            var field = form.down('#textcomment');

            var params = new Object();
            params.taskid_link = viewmodel.get('record.id');
            params.comment = field.getValue();
            params.status = 2;

            GSmartApp.Ajax.post('/api/v1/task/reject_porder_req', Ext.JSON.encode(params),
            function (success, response, options) {
                form.setLoading(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {

                        // me.onCloseClick();
                        
                        // var taskboard = Ext.getCmp('taskboard');
                        // var taskStore = taskboard.getTaskStore();
                        // taskStore.remove(form.getRecord());

                        var TaskGrid = Ext.getCmp('TaskGrid');
                        var TaskBoard_Store = TaskGrid.getStore();
                        var task = TaskBoard_Store.getById(viewmodel.get('record.id'));
                        TaskBoard_Store.remove(task);
                        me.getView().up('window').close();
                    }
                    else {
                        Ext.MessageBox.show({
                            title: "Thông báo",
                            msg: response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng'
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
                        }
                    });
                }
            })
        }
        else {
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: "Bạn không phải Người phụ trách công việc! Bạn không được từ chối YCSX cho phân xưởng",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng'
                },
                fn: function () {
                    viewmodel.set('flow_status', 3);
                    var field = form.down('#textcomment');
                    field.reset();
                }
            });
        }
    },
    onUpdateUser: function(combo, record, eOpts){

        var form = this.getView();
        var viewmodel = this.getViewModel();
        form.setLoading("Đang xử lý dữ liệu");

        var params = new Object();
        params.userid_link = record.get('Id');
        params.taskid_link = viewmodel.get('record.id');
        // params.taskid_link = form.getRecord().getId();

        GSmartApp.Ajax.post('/api/v1/task/update_task_userincharge', Ext.JSON.encode(params),
            function (success, response, options) {
                form.setLoading(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {

                        var TaskCommentStore = viewmodel.getStore('TaskCommentStore');
                            // console.log(TaskCommentStore);
                        TaskCommentStore.insert(0, {
                            "typename": response.data.typename,
                            "date": response.data.Date,
                            "text": response.data.Text,
                            "taskId": response.data.TaskId,
                            "userId": response.data.UserId,
                            "userFullName": response.data.UserFullName,
                            "Date": response.data.Date,
                            "TaskId": response.data.TaskId,
                            "UserId": response.data.UserId,
                            "Text": response.data.Text,
                            "UserFullName": response.data.UserFullName,
                        });
                        
                        // var taskboard = Ext.getCmp('taskboard');
                        // var taskStore = taskboard.getTaskStore();
                        // var mainTask = taskStore.getById(form.getRecord().getId());
                        // mainTask.set('ResourceId',record.get('Id'));
                        // mainTask.set('State', 'ChuaLam');
                        // mainTask.set('orgid_link', cmbOrg.getValue());
                        // taskboard.refreshTaskNode(mainTask);

                        var TaskGrid = Ext.getCmp('TaskGrid');
                        var TaskBoard_Store = TaskGrid.getStore();
                        var task = TaskBoard_Store.getById(response.data.TaskId);
                        var cmbOrg = form.down('#comboOrg');
                        var comboUser = form.down('#comboUser');
                        var comboUserSelection = comboUser.getSelection();
                        // console.log(comboUserSelection);
                        // đơn vị
                        task.set('orgid_link', cmbOrg.getValue());
                        // người phu trách id, Tên
                        task.set('userInChargeName', comboUserSelection.get('Name'));
                        task.set('UserInChargeName', comboUserSelection.get('Name'));
                        task.set('userinchargeid_link', comboUserSelection.get('Id'));
                        // trạng thái
                        task.set('state', 'ChuaLam');
                        task.set('State', 'ChuaLam');
                        // console.log(task);
                    }
                    else {
                        Ext.MessageBox.show({
                            title: "Thông báo",
                            msg: response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng'
                            },
                            fn: function () {
                                // form.down('#comboUser').setValue(form.getRecord().getResourceId());
                                // form.down('#comboOrg').setValue(viewmodel.get('record.orgid_link'));
                                // form.down('#comboUser').setValue(viewmodel.get('record.userinchargeid_link'));
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
                        fn: function () {
                            // form.down('#comboUser').setValue(form.getRecord().getResourceId());
                        }
                    });
                }
            })
    },
    onCheckboxChange: function (checkboxGroup, newValue) {
        var me = this.getView();
        me.setLoading('Đang xử lý dữ liệu');
        var mainTask = this.getView().getRecord();
        var subTasks = mainTask.subTasks();

        var params = new Object();
        params.data = [];
        checkboxGroup.items.each(function (box, index) {
            var obj = new Object();
            obj.Id = box.getName();
            obj.Done = box.getValue();
            obj.Name = "";
            obj.TaskId = 0;

            params.data.push(obj);
        });

        GSmartApp.Ajax.post('/api/v1/task/update_checklist', Ext.JSON.encode(params),
            function (success, response, options) {
                me.setLoading(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        checkboxGroup.items.each(function (box, index) {
                            subTasks.getAt(index).set('Done', box.getValue());
                        });

                        var taskboard = Ext.getCmp('taskboard');
                        var taskStore = taskboard.getTaskStore();
                        var mainTask = taskStore.getById(me.getRecord().getId());
                        mainTask.set('State',response.status);
                        taskboard.refreshTaskNode(mainTask);
                    }
                    else {
                        Ext.MessageBox.show({
                            title: "Thông báo",
                            msg: response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng'
                            },
                            fn: function () {
                                checkboxGroup.removeAll();

                                checkboxGroup.add(Ext.Array.map(subTasks.getRange(), function (subtask) {
                                    return {
                                        boxLabel: subtask.getName(),
                                        checked: subtask.get('Done'),
                                        name: subtask.getId()
                                    };
                                }));
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
                        fn: function () {
                            checkboxGroup.removeAll();

                            checkboxGroup.add(Ext.Array.map(subTasks.getRange(), function (subtask) {
                                return {
                                    boxLabel: subtask.getName(),
                                    checked: subtask.get('Done'),
                                    name: subtask.getId()
                                };
                            }));
                        }
                    });
                }
            })
    },

    onCloseClick: function () {
        // var form = this.getView();

        // if (form.isValid()) {
        //     form.updateRecord();
        //     form.hide();
        // }

        // this.getView().hide();
        this.getView().up('window').close();
    },

    onAddSpecialKey: function (field, e, t) {
        if (e.getKey() === e.ENTER) {
            this.onItemAddClick();
        }
    },

    onAddItemFocus: function () {
        this.getView().down('#addButtons tool').show();
    },

    onAddItemBlur: function () {
        this.getView().down('#addButtons tool').hide();

        this.getView().down('[reference=newItemName]').reset();
    },

    onItemAddClick: function () {
        var form = this.getView();
        var field = form.down('[reference=newItemName]');
        var text = field.getValue();

        if (text) {
            var params = new Object();
            params.taskid_link = form.getRecord().getId();
            params.checklist = text;

            GSmartApp.Ajax.post('/api/v1/task/add_checklist', Ext.JSON.encode(params),
                function (success, response, options) {
                    if (success) {
                        var response = Ext.decode(response.responseText);
                        if (response.respcode == 200) {
                            Ext.MessageBox.show({
                                title: "Thông báo",
                                msg: "Thành công",
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Đóng',
                                },
                                fn: function () {
                                    form.getRecord().subTasks().add({
                                        Name: text,
                                        TaskId: form.getRecord().getId()
                                    });

                                    form.down('checkboxgroup').add({
                                        boxLabel: text,
                                        name: response.data.id
                                    });

                                    field.setValue();
                                    field.focus();

                                    var taskboard = Ext.getCmp('taskboard');
                                    var taskStore = taskboard.getTaskStore();
                                    var mainTask = taskStore.getById(form.getRecord().getId());
                                    taskboard.refreshTaskNode(mainTask);
                                }
                            });
                        }
                        else {
                            Ext.MessageBox.show({
                                title: "Thông báo",
                                msg: response.message,
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Đóng'
                                }
                            });
                        }
                    }
                })
        }
    },

    

    onKeyUp: function (e, t) {
        if (e.getKey() === e.ESC) {
            this.onCloseClick();
        }
    }
});