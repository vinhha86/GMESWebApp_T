Ext.define('GSmartApp.view.stockout.stockout_material.stockout_m_list.Stockout_M_List_Main', {
    extend: 'Ext.form.Panel',
    xtype: 'Stockout_M_List_Main',
    id: 'Stockout_M_List_Main',
    reference: 'Stockout_M_List_Main',
    // viewModel: {
    //     type: 'Stockout_M_List_MainViewModel'
    // },
    controller: 'Stockout_M_List_MainController',
    height: '100%',
    layout: 'vbox',
    width: '100%',
    items: [
        {
            layout: 'hbox',
            defaults: {
                margin: 5
            },
            items: [
                {
                    xtype: 'datefield',
                    reference: 'stockoutdate_from',
                    itemId: 'stockoutdate_from',
                    label: 'Từ:',
                    // labelWidth: 'auto',
                    labelWidth: 60,
                    value: new Date(),
                    // value: new Date(2020, 1, 1),
                    dateFormat : 'd/m/y',
                    flex: 1,
                    enableKeyEvents: true,
                    listeners: {
                        change : 'onSearch'
                    }
                },
                {
                    xtype: 'datefield',
                    reference: 'stockoutdate_to',
                    itemId: 'stockoutdate_to',
                    label: 'Đến:',
                    // labelWidth: 'auto',
                    labelWidth: 60,
                    value: new Date(),
                    dateFormat : 'd/m/y',
                    flex: 1,
                    enableKeyEvents: true,
                    listeners: {
                        change : 'onSearch'
                    }
                }
            ]
        },
        {
            layout: 'hbox',
            defaults: {
                margin: 5
            },
            items: [
                {
                    xtype: 'textfield',
                    itemId: 'stockout_M_ListFilter',
                    // label: 'Invoice:',
                    // labelWidth: 60,
                    // margin: 1,
                    // padding: 6,
                    flex: 1,
                    // width: '100%',
                    // minWidth: 80,
                    // maxWidth: 200,
                    textAlign: 'left',
                    placeholder: 'Tìm kiếm nhanh ...',
                    // editable: false,
                    // readOnly: true,
                    // clearable: false,
                    cls: 'searchField',
                    // bind: {
                    //     value: '{maNPLFilter}'
                    // },
                    listeners: {
                        change: 'onStockout_M_ListFilterKeyup',
                        keyup: 'onStockout_M_ListFilterKeyup',
                        buffer: 500
                    }
                },
            ]
        },
        {
            margin: 1,
            flex: 1,
            xtype: 'Stockout_M_List',
        },
    ],
});
