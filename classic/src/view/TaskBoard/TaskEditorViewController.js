Ext.define('GSmartApp.view.TaskBoard.TaskEditorViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TaskEditorViewController',

    control: {
        checkboxgroup: {
            change: 'onCheckboxChange'
        },
        'TaskEditor': {
            activate: 'onActivate'
        },
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
        var storeUser = viewmodel.getStore('TaskUser_Store');
        storeUser.loadUserbyOrg(-1);
        storeUser.load();

        var flowStatusStore = viewmodel.getStore('FlowStatusStore');
        flowStatusStore.loadStore();

        var storeUserFull = viewmodel.getStore('TaskUser_Store_Full');
        storeUserFull.loadUserbyOrg(1);
        storeUserFull.load();

        var listid = "13";
        var orgStore = viewmodel.getStore('OrgStore');
        orgStore.loadStore_allchildren_byorg(listid);

    },
    onActivate: function () {
        var form = this.getView();
        var viewmodel = this.getViewModel();
        var comment = form.getCommentView();
        comment.userStore = viewmodel.getStore('TaskUser_Store_Full');

        var objectStore = viewmodel.getStore('TaskObjectStore');
        var taskid_link = form.getRecord().getId();
        objectStore.loadStore(taskid_link);

        var form = this.getView();
        if (form.getRecord().data.tasktypeid_link == -1) {
            viewmodel.set('ishidden_add_checklist', false);
            viewmodel.set('isdisable_checkbox', false);
        }
        else {
            viewmodel.set('isdisable_checkbox', true);
        }

        form.down('#comboUser').setValue(form.getRecord().getResourceId());
        form.down('#comboOrg').setValue(form.getRecord().data.orgid_link);

        //Loai task la ycsx thi moi hien day du 
        var flowStatusStore = viewmodel.getStore('FlowStatusStore');
        if (form.getRecord().data.tasktypeid_link != 0){
            filters = flowStatusStore.getFilters();
            filters.add({
                property: 'id',
                value: 1,
                operator: '>',
            })
        }
        else {
            flowStatusStore.clearFilter();
        }
    },
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
            title: 'Chi ti???t m??u, c??? s???n ph???m',
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
            
            var taskboard = Ext.getCmp('taskboard');
            var taskStore = taskboard.getTaskStore();
            taskStore.load();
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
                viewmodel.set('comment','Ph??n x?????ng ch???p nh???n Y??u c???u');
                viewmodel.set('btncomment', true);
                viewmodel.set('btnreject', true);
                viewmodel.set('btnaccept', false);
                break;
            case 2:
                viewmodel.set('isedit_comment', true);
                viewmodel.set('comment','Ph??n x?????ng kh??ng s???n xu???t ???????c!');
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
                viewmodel.set('comment','T??i kh??ng th??? nh???n vi???c trong th???i gian n??y!');
                break;
            default:
                break;
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
            params.taskid_link = form.getRecord().getId();
            params.comment = field.getValue();

            GSmartApp.Ajax.post('/api/v1/task/accept_porer_req', Ext.JSON.encode(params),
            function (success, response, options) {
                form.setLoading(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {

                        me.onCloseClick();

                        var taskboard = Ext.getCmp('taskboard');
                        var taskStore = taskboard.getTaskStore();
                        taskStore.load();
                    }
                    else {
                        Ext.MessageBox.show({
                            title: "Th??ng b??o",
                            msg: response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: '????ng'
                            }
                        });
                    }
                }
                else {
                    Ext.MessageBox.show({
                        title: "Th??ng b??o",
                        msg: "C?? l???i trong qu?? tr??nh x??? l?? d??? li???u!",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: '????ng'
                        }
                    });
                }
            })
        }
        else {
            Ext.MessageBox.show({
                title: "Th??ng b??o",
                msg: "B???n kh??ng ph???i Ng?????i ph??? tr??ch c??ng vi???c! B???n kh??ng ???????c ch???p nh???n YCSX cho ph??n x?????ng",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: '????ng'
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
            params.taskid_link = form.getRecord().getId();
            params.comment = field.getValue();
            params.status = 2;

            GSmartApp.Ajax.post('/api/v1/task/reject_porder_req', Ext.JSON.encode(params),
            function (success, response, options) {
                form.setLoading(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {

                        me.onCloseClick();
                        
                        var taskboard = Ext.getCmp('taskboard');
                        var taskStore = taskboard.getTaskStore();
                        taskStore.remove(form.getRecord());
                    }
                    else {
                        Ext.MessageBox.show({
                            title: "Th??ng b??o",
                            msg: response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: '????ng'
                            }
                        });
                    }
                }
                else {
                    Ext.MessageBox.show({
                        title: "Th??ng b??o",
                        msg: "C?? l???i trong qu?? tr??nh x??? l?? d??? li???u!",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: '????ng'
                        }
                    });
                }
            })
        }
        else {
            Ext.MessageBox.show({
                title: "Th??ng b??o",
                msg: "B???n kh??ng ph???i Ng?????i ph??? tr??ch c??ng vi???c! B???n kh??ng ???????c t??? ch???i YCSX cho ph??n x?????ng",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: '????ng'
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
        form.setLoading("??ang x??? l?? d??? li???u");

        var params = new Object();
        params.userid_link = record.get('Id');
        params.taskid_link = form.getRecord().getId();

        GSmartApp.Ajax.post('/api/v1/task/update_task_userincharge', Ext.JSON.encode(params),
            function (success, response, options) {
                form.setLoading(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {

                        form.getRecord().comments().add(response.data);
                        var cmbOrg = form.down('#comboOrg');
                        
                        var taskboard = Ext.getCmp('taskboard');
                        var taskStore = taskboard.getTaskStore();
                        var mainTask = taskStore.getById(form.getRecord().getId());
                        mainTask.set('ResourceId',record.get('Id'));
                        mainTask.set('State', 'ChuaLam');
                        mainTask.set('orgid_link', cmbOrg.getValue());
                        taskboard.refreshTaskNode(mainTask);
                    }
                    else {
                        Ext.MessageBox.show({
                            title: "Th??ng b??o",
                            msg: response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: '????ng'
                            },
                            fn: function () {
                                form.down('#comboUser').setValue(form.getRecord().getResourceId());
                            }
                        });
                    }
                }
                else {
                    Ext.MessageBox.show({
                        title: "Th??ng b??o",
                        msg: "C?? l???i trong qu?? tr??nh x??? l?? d??? li???u!",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: '????ng'
                        },
                        fn: function () {
                            form.down('#comboUser').setValue(form.getRecord().getResourceId());
                        }
                    });
                }
            })
    },
    onCheckboxChange: function (checkboxGroup, newValue) {
        var me = this.getView();
        me.setLoading('??ang x??? l?? d??? li???u');
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
                            title: "Th??ng b??o",
                            msg: response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: '????ng'
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
                        title: "Th??ng b??o",
                        msg: "C?? l???i trong qu?? tr??nh x??? l?? d??? li???u!",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: '????ng'
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
        var form = this.getView();

        if (form.isValid()) {
            form.updateRecord();
            form.hide();
        }

        this.getView().hide();
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
                                title: "Th??ng b??o",
                                msg: "Tha??nh c??ng",
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: '????ng',
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
                                title: "Th??ng b??o",
                                msg: response.message,
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: '????ng'
                                }
                            });
                        }
                    }
                })
        }
    },

    onAddCommentClick: function () {
        var form = this.getView();
        var field = form.down('#textcomment');
        var text = field.getValue();

        if (text) {
            var params = new Object();
            params.taskid_link = form.getRecord().getId();
            params.text = text;

            GSmartApp.Ajax.post('/api/v1/task/add_comment', Ext.JSON.encode(params),
                function (success, response, options) {
                    if (success) {
                        var response = Ext.decode(response.responseText);
                        if (response.respcode == 200) {
                            // Ext.MessageBox.show({
                            //     title: "Th??ng b??o",
                            //     msg: "Tha??nh c??ng",
                            //     buttons: Ext.MessageBox.YES,
                            //     buttonText: {
                            //         yes: '????ng',
                            //     },
                            //     fn: function () {

                            //     }
                            // });
                            form.getRecord().comments().add({
                                Text: field.getValue(),
                                Date: response.data.Date,
                                UserId: response.data.UserId, /* TODO read logged in user id */
                                TaskId: form.getRecord().getId(),
                                typename : response.data.typename
                            });

                            field.reset();

                            var taskboard = Ext.getCmp('taskboard');
                            var taskStore = taskboard.getTaskStore();
                            var mainTask = taskStore.getById(form.getRecord().getId());
                            taskboard.refreshTaskNode(mainTask);
                        }
                        else {
                            Ext.MessageBox.show({
                                title: "Th??ng b??o",
                                msg: response.message,
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: '????ng'
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