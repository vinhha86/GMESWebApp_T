Ext.define('GSmartApp.view.cut_plan.CutPlan_MainView', {
    extend: 'Ext.form.Panel',
    xtype: 'CutPlan_MainView',
    id: 'CutPlan_MainView',
    controller: 'CutPlan_MainView_Controller',
    viewModel: {
        type: 'CutPlan_Main_ViewModel'
    },
    layout: 'border',
    items: [{
        xtype: 'CutPlan_Tab_View',
        border: true,
        margin: 1,
        height: '60%',
        region: 'north'
    }, {
        region: 'center',
        xtype: 'tabpanel',
        margin: 1,
        border: true,
        items: [{
            title: 'Định mức',
            xtype: 'DinhMucKyThuatView'
        }, {
            title: 'Giữ cây vải',
            xtype: 'Cutplan_Warehouse_MainView'
        }]
    }],
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
            itemId: 'btnLuu',
            iconCls: 'x-fa fa-save'
        }]
    }]
})