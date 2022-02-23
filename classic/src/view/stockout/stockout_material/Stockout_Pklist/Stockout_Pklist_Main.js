Ext.define('GSmartApp.view.stockout.stockout_material.Stockout_Pklist.Stockout_Pklist_Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'Stockout_Pklist_Main',
    id: 'Stockout_Pklist_Main',
    controller: 'Stockout_Pklist_Main_Controller',
    viewModel:{
        type:'Stockout_Pklist_Main_ViewModel'
    },
	layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    items: [
        {
            margin: 1,
            flex: 1,
            layout: 'border',
            items: [
                // {
                //     region: 'west',
                //     xtype: 'Stockout_Pklist_Stock',
                //     width: '30%',
                //     margin: 1
                // },
                {
                    region: 'center',
                    xtype: 'Stockout_Pklist_Warehouse',
                    margin: 1
                }
            ]
        }, 
    ],
    dockedItems: [
        {
            dock: 'top',
            layout: 'hbox',
            border: false,
            items: [
                {
                    margin: 3,
                    xtype:'button',
                    text:  'Thêm cây vải mất tem',
                    iconCls: 'x-fa fa-plus',
                    itemId: 'btnThemMatTem',
                    hidden: true,
                    bind: {
                        hidden: '{isBtnThemMatTemHidden}'
                    }
                },
            ]
        },
        {
            dock: 'bottom',
            layout: 'hbox',
            border: false,
            items: [
                {
                    margin: 3,
                    xtype:'button',
                    text:  'Thoát',
                    iconCls: 'x-fa fa-window-close',
                    itemId: 'btnThoat'
                },
                {
                    xtype:'button',
                    text: 'Thêm cây vải',
                    margin: 3,
                    itemId:'btnSelect',
                    iconCls: 'x-fa fa-plus',
                    hidden: true,
                    bind: {
                        hidden: '{isBtnSelectHidden}'
                    }
                },
                {
                    xtype:'button',
                    text: 'Info',
                    margin: 3,
                    itemId:'btnInfo',
                    iconCls: 'x-fa fa-plus',
                    hidden: true
                },
                {
                    margin: 3,
                    flex: 1,
                },
                {
                    xtype: 'displayfield',
                    margin: 3,
                    // fieldStyle: "font-weight: bold; font-size: 14px; color: black;",
                    labelWidth: 0,
                    bind: {
                        value: 'Tổng số cây vải:'
                    },
                },
                {
                    xtype: 'displayfield',
                    margin: 3,
                    fieldStyle: "font-weight: bold; color: black;",
                    labelWidth: 0,
                    bind: {
                        value: '{totalcay}' + ' cây'
                    },
                },
                {
                    margin: 3,
                },
                // met
                {
                    xtype: 'displayfield',
                    margin: 3,
                    // fieldStyle: "font-weight: bold; font-size: 14px; color: black;",
                    labelWidth: 0,
                    value: 'Tổng độ dài:',
                    hidden: true,
                    bind: {
                        hidden: '{isMetColumnHidden}'
                    }
                },
                {
                    xtype: 'displayfield',
                    margin: 3,
                    fieldStyle: "font-weight: bold; color: black;",
                    labelWidth: 0,
                    hidden: true,
                    bind: {
                        hidden: '{isMetColumnHidden}',
                        value: '{totaldai}' + ' met'
                    },
                },
                // yds
                {
                    xtype: 'displayfield',
                    margin: 3,
                    // fieldStyle: "font-weight: bold; font-size: 14px; color: black;",
                    labelWidth: 0,
                    value: 'Tổng độ dài:',
                    hidden: true,
                    bind: {
                        hidden: '{isYdsColumnHidden}'
                    }
                },
                {
                    xtype: 'displayfield',
                    margin: 3,
                    fieldStyle: "font-weight: bold; color: black;",
                    labelWidth: 0,
                    hidden: true,
                    bind: {
                        hidden: '{isYdsColumnHidden}',
                        value: '{totaldaiyard}' + ' yard'
                    },
                },
                // kg
                {
                    xtype: 'displayfield',
                    margin: 3,
                    // fieldStyle: "font-weight: bold; font-size: 14px; color: black;",
                    labelWidth: 0,
                    value: 'Tổng khối lượng (kg):',
                    hidden: true,
                    bind: {
                        hidden: '{isKgColumnHidden}',
                    },
                },
                {
                    xtype: 'displayfield',
                    margin: 3,
                    fieldStyle: "font-weight: bold; color: black;",
                    labelWidth: 0,
                    hidden: true,
                    bind: {
                        hidden: '{isKgColumnHidden}',
                        value: '{totalkg}' + ' kg'
                    },
                },
                //lbs
                {
                    xtype: 'displayfield',
                    margin: 3,
                    // fieldStyle: "font-weight: bold; font-size: 14px; color: black;",
                    labelWidth: 0,
                    value: 'Tổng khối lượng (lbs):',
                    hidden: true,
                    bind: {
                        hidden: '{isLbsColumnHidden}',
                    },
                },
                {
                    xtype: 'displayfield',
                    margin: 3,
                    fieldStyle: "font-weight: bold; color: black;",
                    labelWidth: 0,
                    hidden: true,
                    bind: {
                        hidden: '{isLbsColumnHidden}',
                        value: '{totallbs}' + ' lbs'
                    },
                },
                {
                    margin: '3 6 3 6',
                },
            ]
        }
    ],
});
