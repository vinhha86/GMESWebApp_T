Ext.define('GSmartApp.view.TaskBoard.TaskBoardView', {
    extend: 'Ext.panel.Panel',
    xtype: 'TaskBoardView',
    id: 'TaskBoardView',
    controller: 'TaskBoardViewController',
    viewModel: {
        type: 'TaskBoardViewModel'
    },
    layout: 'fit',
    requires: [
        'GSmartApp.view.TaskBoard.TaskBoardViewController',
        'GSmartApp.model.TaskBoard.TaskBoard_Model',
        'GSmartApp.view.TaskBoard.TaskEditor',

        'GSmartApp.plugin.DragSelector'
    ],
    initComponent: function () {
        var me = this;

        var viewmodel = this.getViewModel();
        // console.log(viewmodel);
        var taskStore = viewmodel.getStore('TaskBoard_Store');
        // console.log(taskStore);
        taskStore.loadStore();
        var userStore = viewmodel.getStore('TaskUser_Store');
        userStore.loadUserbyOrg(-1);
        userStore.load();

        var task = Ext.create('Kanban.view.TaskBoard', {
            id: 'taskboard',
            enableUserMenu: false,
            border: true,
            taskMenu: false,
            taskStore: taskStore,
            resourceStore: userStore,

            editor: {
                xtype: 'TaskEditor'
            },

            fitColumns: false,
            // defaults: {
            //     width: 300
            // },
            // columnConfigs : {
            //     all : {
            //         iconCls : 'x-fa fa-gear' // add some icon to the header
            //     },
        
            //     'NotStarted' : {
            //         dockedItems : {
            //             xtype   : 'container',
            //             dock    : 'top',
            //             layout  : 'fit',
            //             border  : 0,
            //             padding : '5 8',    
            //             items   : {
            //                 height : 30,
            //                 xtype : 'columnfilter',
            //                 emptyText: 'Tên công việc',
            //                 store: taskStore
            //             }
            //         }
            //     }
            // },
 
            columns: [
                {
                    state: 'ChuaLam',
                    title: 'Chưa làm',
                    border: true
                },
                {
                    state: 'DangLam',
                    title: 'Đang làm',
                    border: true
                },
                {
                    state: 'DaXong',
                    title: 'Đã xong',
                    border: true
                },
                {
                    state: 'TuChoi',
                    title: 'Từ chối',
                    border: true
                }
            ],

            viewConfig: {
                resourceImgTpl: '',
                // taskRenderer : function (task, renderData) {
                //     if (task.getState() === 'DaXong') {
                //         renderData.style = 'border-left-color: powderblue';
                //     }
                //     else if (task.getState() === 'ChuaLam') {
                //         renderData.style = 'border-left-color: palegoldenrod';
                //     }
                //     else if (task.getState() === 'DangLam') {
                //         renderData.style = 'border-left-color: yellowgreen';
                //     }
                //     else if (task.getState() === 'TuChoi') {
                //         renderData.style = 'border-left-color: red';
                //     } 
                // },
                multiSelect: false,
                plugins: 'kanban_dragselector',
                // taskRenderer : function (task, renderData) {
                //     renderData.style = 'border-left-color: red'
                // },
                taskBodyTpl: '<div class="{cls_task}">' +
                    '<div class="task-progress" style="width:{PercentDone}%"></div>' +
                    '<span class="task-id">{Name}</span>' +
                    '<span class="task-user">{[values.task.getResource() && values.task.getResource().getName()]}</span>' +
                    '</div>' +
                    '<div class="task-body">' +
                    '<div class="sch-task-name">{Description}</div>' +
                    '<tpl if="values.task.getResource() && values.task.getResource().get(\'ImageUrl\')">' +
                    '<img class="task-userimg" src="{[values.task.getResource().get("ImageUrl")]}"/>' +
                    '</tpl>' +
                    '<ul class="subtasks">' +
                    '<tpl for="values.task.subTasks()">' +
                    '<li class="{[values.data.Done ? "subtask-done" : ""]}"><label class="subtask"><input data-id="{[values.internalId]}" class="subtask-checkbox" disabled = "true" type="checkbox" name="checkbox" {[ values.data.Done ? "checked" : "" ]} >{[values.data.Name]}</label></li>' +
                    '</tpl>' +
                    '</ul>' +
                    '<div class="task-footer">' +
                    '<tpl if="values.task.comments().getCount() == 1">' +
                    '<span class="task-comments x-fa fa-comment-o"> {[values.task.comments().getCount()]} comment</span>' +
                    '<tpl elseif = "values.task.comments().getCount() &gt;= 2">'+ 
                    '<span class="task-comments x-fa fa-comment-o"> {[values.task.comments().getCount()]} comments</span>'+
                    '</tpl>' +
                    '</div>' +
                    '</div>',

                // Enable smart diff update of the Task HTML contents
                onUpdate: function (store, record, operation, modifiedFieldNames) {
                    var fragment = document.createElement('div');
                    var currentNode = this.getNode(record);
                    var selModel = this.getSelectionModel();

                    this.tpl.overwrite(fragment, this.collectData([record]));
                    Ext.fly(currentNode).down('.'+record.get('cls_task')).syncContent(Ext.fly(fragment).down('.'+record.get('cls_task'), true));

                    Ext.fly(currentNode).down('.task-body').update(Ext.fly(fragment).down('.task-body', true).innerHTML);

                    selModel.onUpdate(record);
                    if (selModel.isSelected(record)) {
                        this.onItemSelect(record);
                    }
                }
            },
            listeners: {
                //// Event check subtask o ngoai tam thoi bo khong cho check
                // "change": {
                //     fn: 'onCheckboxChange',
                //     element: 'body'
                // }, 
                taskdrop: 'onTaskDrop',
                beforetaskdropfinalize: 'beforeDrop',
            }
        
        })

        Ext.apply(me, {
            items: [task],
            dockedItems: [{
                dock: 'top',
                xtype: 'toolbar',
                items:[{
                    xtype: 'button',
                    tooltip: 'Chuyển view',
                    iconCls: 'x-fa fa-toggle-off',
                    itemId: 'btnSwitch',
                    margin: 5
                },{
                    xtype: 'button',
                    tooltip: 'Làm mới danh sách',
                    iconCls: 'x-fa fa-refresh',
                    itemId: 'btnRefresh',
                    margin: 5
                },{
                    xtype: 'button',
                    tooltip: 'Thêm việc khác',
                    iconCls: 'x-fa fa-plus',
                    itemId: 'btnAddTask',
                    margin: 5
                },{
                    xtype      : 'columnfilter',
                    fieldLabel : 'Cột hiển thị',
                    labelWidth: 80,
                    margin     : 5,
                    panel      : task
                },{
                    xtype      : 'filterfield',
                    store       : taskStore,
                    fieldLabel : 'Tìm kiếm',
                    margin     : 5,
                    panel      : task,
                    width      : 190,
                    labelWidth : 90,
                    field: 'Description'
                },{
                    xtype: 'combo',
                    margin: 5,
                    bind : {
                        store: '{TaskTypeStore}',
                        value: -10
                    },
                    valueField: 'id',
                    displayField: 'name',
                    margin: 5,
                    editable: false,
                    emptyText: 'Loại công việc',
                    itemId: 'cmbtype'
                }]
            }]
        });

        me.callParent();
    }
})