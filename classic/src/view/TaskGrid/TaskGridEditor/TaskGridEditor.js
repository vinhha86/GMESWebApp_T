Ext.define('GSmartApp.view.TaskGrid.TaskGridEditor', {
    extend : 'Ext.form.Panel',
    xtype  : 'TaskGridEditor',
    id: 'TaskGridEditor', 

    requires : [
        'GSmartApp.view.TaskGrid.TaskGridEditorController',
        'GSmartApp.view.TaskGrid.CommentGrid'
    ],

    controller : 'TaskGridEditorController',
    viewModel: {
        type: 'TaskGridEditorViewModel'
    },

    // width       : 550,
    // height      : 550,
    autoScroll  : true,
    bodyPadding : 10,
    // floating    : true,
    // constrain   : true,
    // modal       : true,
    // cls         : 'taskeditor',
    defaults    : {
        labelAlign : 'top',
        anchor     : '100%'
    },

    items : [
        {
            xtype  : 'container',
            layout : 'hbox',
            items  : [
                {
                    xtype      : 'displayfield',
                    bind: {
                       value: '{record.Name}'
                    },
                    name       : 'Name',
                    itemId     : 'nameField',
                    fieldStyle: "font-weight: bold; font-size: 15px",
                    flex       : 2,
                    margin     : '1 20 1 1'
                },
                {
                    flex: 1
                },
                {
                     xtype: 'combo',
                     bind: {
                        store: '{TaskObjectStore}'
                     },
                     queryMode: 'local',
                     anyMatch: true,
                     valueField: 'objectid_link',
                     displayField: 'name',
                     itemId: 'cmbObject',
                     emptyText: 'Chọn đối tượng',
                     margin: '1 0 1 1'
                },
                {
                    xtype: 'button',
                    iconCls: 'x-fa fa-forward',
                    margin: '1 1 1 1',
                    itemId : 'btnForward'
                }
            ]
        },
        {
            xtype      : 'displayfield',
            name       : 'Description',
            fieldLabel: 'Mô tả công việc:',
            bind: {
                value: '{record.description}'
            },
            labelStyle: "font-weight: bold; font-size: 13px",
            itemId     : 'descriptionField',
            fieldStyle: "font-size: 13px; margin:0 5px 10px 5px;",
            flex       : 1,
            margin     : '0 20 0 0'
        },
        {
            xtype: 'container',
            layout: 'hbox',
            items:[
                {
                    xtype        : 'combobox',
                    width: 220,
                    itemId      : 'comboOrg',
                    bind: {
                        store: '{OrgStore}',
                        value: '{record.orgid_link}'
                    },
                    displayField : 'name',
                    valueField   : 'id',
                    fieldLabel   : 'Đơn vị:',
                    labelStyle: "font-weight: bold; font-size: 13px;",
                    labelWidth: 50,
                },
                {width: 5},
                {
                    xtype        : 'combobox',
                    flex: 1,
                    itemId      : 'comboUser',
                    bind: {
                        store: '{TaskUser_Store}',
                        value: '{record.userinchargeid_link}'
                    },
                    // name         : 'ResourceId',
                    displayField : 'Name',
                    valueField   : 'Id',
                    fieldLabel   : 'Người phụ trách:',
                    labelStyle: "font-weight: bold; font-size: 13px;",
                    labelWidth: 120,
                },
            ]
        },
        {
            xtype      : 'checkboxgroup',
            fieldLabel : 'Chi tiết công việc',
            labelStyle: "font-weight: bold; font-size: 13px",
            // itemId      : 'checklist',
            // columns    : 1,
            // vertical   : true,
            // cls        : 'checklist',
            // bind: {
            //     disabled: '{isdisable_checkbox}'
            // },
            // defaults   : {
            //     boxLabelAlign : 'after'
            // }
        },
        {
            xtype: 'grid',
            hideHeaders: true,
            bind: {
                store: '{record.SubTasks}',
            },
            columns:[{
                text:'Tên',
                dataIndex:'Name',
                flex: 1,
            },{
                text:'Trạng thái',
                dataIndex:'Done',
                width: 110,
                renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                    if(value == true) return 'Hoàn thành';
                    return 'Chưa hoàn thành';
                }
            }]
        },
        // {
        //     xtype  : 'container',
        //     layout : 'hbox',
        //     itemId : 'addButtons',
        //     bind: {
        //         hidden: '{ishidden_add_checklist}'
        //     },
        //     items  : [
        //         {
        //             xtype     : 'textfield',
        //             emptyText : 'Thêm chi tiết',
        //             reference : 'newItemName',
        //             flex      : 1,
        //             listeners : {
        //                 specialkey : 'onAddSpecialKey',
        //                 focus      : 'onAddItemFocus',
        //                 blur       : 'onAddItemBlur'
        //             }
        //         },
        //         {
        //             xtype   : 'tool',
        //             cls     : 'cancel-add',
        //             hidden  : true,
        //             type    : 'close',
        //             handler : function () {
        //                 this.getEl().focus();
        //             },
        //             width   : 50
        //         }
        //     ]
        // },
        {
            xtype      : 'htmleditor',
            itemId     : 'textcomment',
            cls        : 'comments',
            emptyText  : 'Nội dung tin nhắn...',
            fieldLabel : 'Thêm tin nhắn',
            labelStyle: "font-weight: bold; font-size: 13px",
            anchor     : '100%',
            height     : 180,
            bind: {
                disabled: '{!isedit_comment}',
                value: '{comment}'
            }
        },
        {
            layout: 'hbox',
            items: [{
                xtype   : 'button',
                text    : 'Gửi',
                anchor  : null,
                margin: 3,
                handler : 'onAddCommentClick',
                bind : {
                    hidden: '{btncomment}'
                }
            },{
                xtype   : 'button',
                text    : 'Gửi',
                anchor  : null,
                margin: 3,
                handler : 'onAcceptReq',
                bind : {
                    hidden: '{btnaccept}'
                }
            },{
                xtype   : 'button',
                text    : 'Gửi',
                anchor  : null,
                margin: 3,
                handler : 'onRejectReq',
                bind : {
                    hidden: '{btnreject}'
                }
            },{
                xtype: 'combo',
                itemId: 'comboFlowStatus',
                bind: {
                    store: '{FlowStatusStore}',
                    value: '{flow_status}'
                },
                displayField: 'name',
                valueField: 'id',
                margin: 3,
                editable: false,
                emptyText: 'Loại phản hồi'
            }]
        },
        {
            xtype     : 'component',
            cls       : 'comment-title',
            focusable : false,
            html      : '<div style="font-weight: bold; font-size: 13px;">Danh sách tin nhắn</div>'
        },
        {
            xtype        : 'CommentGrid',
            bind: {
                store: '{TaskCommentStore}',
            }
        }

    ],

    // buttons : [
    //     {
    //         text    : 'Thoát',
    //         iconCls: 'x-fa fa-window-close',
    //         handler : 'onCloseClick'
    //     }
    // ],

    dockedItems:[{
        layout:'hbox',
        border: false,
        dock:'bottom',
        items:[{
            flex:1,
            border: false
        },{
            xtype:'button',
            text: 'Thoát',
            margin: 3,
            itemId:'btnThoat',
            iconCls: 'x-fa fa-window-close',
            handler : 'onCloseClick'
        }]
    }],

    // afterRender : function () {
        // var controller = this.getController();
        // this.callParent(arguments);

        // var model  = this.panel.taskStore.getModel(),
        //     states = model.prototype.states,
        //     locale = Sch.locale.Active[ 'Kanban.locale' ] || {};

        // var data =  Ext.Array.map(states, function (state) {
        //     return {
        //         Id   : state,
        //         Name : locale[ state ] || state
        //     };
        // });

        // this.down('#stateCombo').setStore({
        //     fields : ['Id', 'Name'],
        //     data : data
        // });
        // this.getEl().on('keyup', controller.onKeyUp, controller);
    // },


    listeners : {
        show : {
            // Close editor when clicking on its mask element
            fn : function() {
                if (this.zIndexManager.mask) {
                    this.mon(this.zIndexManager.mask, 'click', function() {
                        if (this.isVisible()) {
                            this.getController().onCloseClick();
                        }
                    }, this);
                }
            },

            single : true
        }
    },

    getSubtaskList: function() {
        return this.down('checkboxgroup');
    },

    getCommentView : function() {
        return this.down('#Comment');
    },

    triggerEdit : function (record, e) {

        if (e.getTarget('.subtask')) return;

        this.getForm().loadRecord(record);

        var checkboxGroup = this.getSubtaskList();
        var commentView   = this.getCommentView();

        checkboxGroup.removeAll();

        record.subTasks().sort('Id', 'DESC');
        checkboxGroup.add(Ext.Array.map(record.subTasks().getRange(), function (subtask) {
            return {
                boxLabel : subtask.getName(),
                checked  : subtask.get('Done'),
                name  : subtask.getId()
            };
        }));

        record.comments().sort('Date', 'DESC');

        commentView.setStore(record.comments());

        this.show();

        this.down('field').focus();
    }
});