Ext.define('GSmartApp.view.pcontract.PContract_PO_Edit_Info_Main', {
    extend: 'Ext.form.Panel',
    xtype: 'PContract_PO_Edit_Info_Main',
    id: 'PContract_PO_Edit_Info_Main',
    layout: 'border',
    controller: 'PContract_PO_Edit_Info_Main_Controller',
    // requires: ['Ext.ux.TreePicker'],
    // viewModel: {
    //     type: 'PContract_PO_Edit_Info_Main_ViewModel'
    // },
    items: [
        {
            region: 'center',
            layout: 'border',
            items: [
                {
                    region: 'center',
                    xtype: 'PContract_PO_Edit_Info',
                    border: true,
                    margin: 1,
                },
                {
                    region: 'east',
                    xtype: 'PContract_PO_Edit_Porder_Req',
                    itemId: 'PContract_PO_Edit_Porder_Req',
                    border: true,
                    margin: 1,
                    bind: {
                        width: '{width_PContract_PO_Edit_Porder_Req}'
                    }
                }
            ]
        },
        {
            region: 'east',
            width: 0,
            xtype: 'ListOrg_Req',
            border: true,
            margin: 1,
        }
    ],
    dockedItems: [{
        dock: 'bottom',
        layout: 'hbox',
        items: [{
            xtype: 'button',
            text: 'Thoát',
            itemId: 'btnThoat',
            iconCls: 'x-fa fa-window-close',
            margin: 5
        }, {
            xtype: 'button',
            formBind: true,
            text: 'Lưu',
            margin: 5,
            itemId: 'btnLuu',
            iconCls: 'x-fa fa-save'
        }, {
            xtype: 'button',
            formBind: true,
            text: 'Lưu',
            margin: 5,
            iconCls: 'x-fa fa-save',
            bind: {
                hidden: '{ishidden_luu_linegiaohang}'
            },
            itemId: 'btnLuuPOLine'
        }, {
            flex: 1
        }]
    }]
})