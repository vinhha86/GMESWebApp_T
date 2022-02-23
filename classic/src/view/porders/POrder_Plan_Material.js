Ext.define('GSmartApp.view.porders.POrder_Plan_Material', {
    extend: 'Ext.grid.Panel',
    xtype: 'POrder_Plan_Material',
    requires: [
        'Ext.grid.Panel'
    ],
    layout: 'fit',
    border: true,
    scrollable: true,
    viewModel: 'porderfilter',
    bind: {
        store: '{POrder_Plan_MaterialStore}'
    },
    viewConfig: {
        enableTextSelection: false,
        stripeRows: false,
    },                  
    columns: [
        { header: 'Mã NPL', dataIndex: 'sku_code', width: 120},
        { header: 'Ngày kế hoạch', dataIndex: 'plan_date', width: 120},
        { header: 'Số lượng về', dataIndex: 'plan_amount', width: 90},
        { header: 'ĐVT', dataIndex: 'unit_code', width: 80},
        { header: 'Ghi chú', dataIndex: 'comment', flex: 1}
    ],
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        items: [
            {
                xtype: 'textfield',
                // labelAlign: 'top',
                // fieldLabel: 'Ghi chú:',
                emptyText: 'Mã NPL',
                reference:'POrder_Plan_Material_sku_code',
                width: 80,
            },   
            {
                tooltip: 'Tìm thẻ vải',
                iconCls: 'x-fa fa-search',
                weight: 30,
                handler: 'onSkuSearchTap'
            },         
            {
                xtype: 'datefield',
                // labelAlign: 'top',
                // fieldLabel: 'Ngày kế hoạch:',
                emptyText: 'Ngày KH',
                width: 130,
                format: 'd/m/Y',
                reference:'POrder_Plan_Material_plan_date',
                value: new Date(),  // defaults to today
            }, 
            {
                xtype: 'numberfield',
                // labelAlign: 'top',
                // fieldLabel: 'Số lượng về',
                emptyText: 'Số lượng',
                clearable: false,
                hideTrigger:true,
                allowBlank: false, 
                minValue: 0,
                maxValue: 100000,
                reference:'POrder_Plan_Material_plan_amount',
                width: 80,
                // enableKeyEvents: true,
                // listeners: {
                //     specialkey: 'onYdsOriginKeyup'
                // }
            },
            {
                xtype: 'combobox',
                // labelAlign: 'top',
                // fieldLabel: 'ĐVT:',       
                emptyText: 'ĐVT',         
                width: 80,
                editable: false,
                bind:{
                    store: '{UnitStore}'
                },
                displayField: 'name',
                valueField: 'id',
            },            
            {
                xtype: 'textfield',
                // labelAlign: 'top',
                // fieldLabel: 'Ghi chú:',
                emptyText: 'Ghi chú',
                reference:'POrder_Plan_Material_plan_amount',
                width: 200,
            },
            {
                tooltip: 'Thêm kế hoạch',
                // margin: '10 0 0 0',
                iconCls: 'x-fa fa-plus',
                weight: 30,
                handler: 'onAddItemTap'
            }   
    ]
    }]   
});
