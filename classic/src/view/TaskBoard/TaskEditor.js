Ext.define('GSmartApp.view.TaskBoard.TaskEditor', {
    extend : 'Ext.form.Panel',
    xtype  : 'TaskEditor',
    mixins : [
        'Kanban.editor.Base'
    ],

    requires : [
        'GSmartApp.view.TaskBoard.TaskEditorViewController',
        'GSmartApp.view.TaskBoard.Comment'
    ],

    controller : 'TaskEditorViewController',
    viewModel: {
        type: 'TaskEditor_ViewModel'
    },

    /**
     * @cfg {String} triggerEvent The event that should trigger the editing to start. Set to null to disable the editor from being activated.
     */
    triggerEvent : 'taskdblclick',

    width       : 550,
    height      : 550,
    autoScroll  : true,
    bodyPadding : 10,
    floating    : true,
    constrain   : true,
    modal       : true,
    cls         : 'taskeditor',
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
                     quereMode: 'local',
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
            labelStyle: "font-weight: bold; font-size: 13px",
            itemId     : 'descriptionField',
            fieldStyle: "font-size: 13px",
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
                        store: '{OrgStore}'
                    },
                    displayField : 'name',
                    valueField   : 'id',
                    fieldLabel   : 'Đơn vị:',
                    labelWidth: 50,
                },
                {
                    xtype        : 'combobox',
                    flex: 1,
                    itemId      : 'comboUser',
                    bind: {
                        store: '{TaskUser_Store}'
                    },
                    // name         : 'ResourceId',
                    displayField : 'Name',
                    valueField   : 'Id',
                    fieldLabel   : 'Người phụ trách:',
                    labelWidth: 120,
                },
            ]
        },

        {
            xtype      : 'checkboxgroup',
            fieldLabel : 'Chi tiết công việc',
            itemId      : 'checklist',
            columns    : 1,
            vertical   : true,
            cls        : 'checklist',
            bind: {
                disabled: '{isdisable_checkbox}'
            },
            defaults   : {
                boxLabelAlign : 'after'
            }
        },
        {
            xtype  : 'container',
            layout : 'hbox',
            itemId : 'addButtons',
            bind: {
                hidden: '{ishidden_add_checklist}'
            },
            items  : [
                {
                    xtype     : 'textfield',
                    emptyText : 'Thêm chi tiết',
                    reference : 'newItemName',
                    flex      : 1,
                    listeners : {
                        specialkey : 'onAddSpecialKey',
                        focus      : 'onAddItemFocus',
                        blur       : 'onAddItemBlur'
                    }
                },
                {
                    xtype   : 'tool',
                    cls     : 'cancel-add',
                    hidden  : true,
                    type    : 'close',
                    handler : function () {
                        this.getEl().focus();
                    },
                    width   : 50
                }
            ]
        },
        {
            xtype      : 'htmleditor',
            itemId     : 'textcomment',
            cls        : 'comments',
            emptyText  : 'Nội dung tin nhắn...',
            fieldLabel : 'Thêm tin nhắn',
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
            html      : 'Danh sách tin nhắn'
        },
        {
            xtype        : 'Comment'
        }

    ],

    buttons : [
        {
            text    : 'Thoát',
            iconCls: 'x-fa fa-window-close',
            handler : 'onCloseClick'
        }
    ],

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