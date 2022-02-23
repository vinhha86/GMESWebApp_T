Ext.define('GSmartApp.view.stock.stock_material.StockMaterialList_Main', {
    extend: 'Ext.form.Panel',
    xtype: 'StockMaterialList_Main',
    itemId: 'StockMaterialList_Main',
    reference: 'StockMaterialList_Main',
    controller: 'StockMaterialList_MainController',
    viewModel: {
        type: 'StockMaterialListViewModel',
    },
    cls: 'StockMaterialList_Main',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    requires: [
        'Ext.Toast',
        'Ext.Responsive',
        'Ext.dataview.listswiper.ListSwiper'
    ],

    items:[
        {
            layout: 'hbox',
            // flex: 1,
            items:[
                {
                    xtype: 'textfield',
                    itemId: 'materialListFilter',
                    // label: 'Mã hàng:',
                    // labelWidth: 85,
                    margin: '1',
                    // padding: 6,
                    flex: 1,
                    // width: '100%',
                    // minWidth: 80,
                    // maxWidth: 200,
                    textAlign: 'left',
                    placeholder: 'Tìm kiếm nhanh',
                    // editable: false,
                    // readOnly: true,
                    clearable: false,
                    cls: 'searchField',
                    bind: {
                        value: '{materialListFilter}'
                    },
                    listeners: {
                        keyup: 'filterWarehouseStore',
                        buffer: 500
                    }
                },
            ]
        },
        {
            margin: 1,
            flex: 1,
            xtype: 'StockMaterialList',
        },
        {
            layout: 'hbox',
            // flex: 1,
            items:[
                // {
                //     xtype:'button',
                //     iconCls: 'x-fa fa-arrow-left',
                //     itemId:'btnThoat',
                //     // text: 'Chuyển khoang',
                //     ui: 'action',
                //     margin: 1,
                // },
                {
                    xtype: 'textfield',
                    itemId: 'pklRowTxt',
                    // label: 'Mã hàng:',
                    // labelWidth: 85,
                    margin: 1,
                    // padding: 6,
                    flex: 1,
                    // width: '100%',
                    // minWidth: 80,
                    // maxWidth: 200,
                    textAlign: 'left',
                    placeholder: 'Dãy',
                    // editable: false,
                    // readOnly: true,
                    // clearable: false,
                    // cls: 'notEditable',
                    bind: {
                        value:'{objStock.row}'
                    },
                    // listeners: {
                    //     focus: 'onFocus',
                    //     focusleave: 'onFocusLeave'
                    // }
                },
                {
                    xtype: 'numberfield',
                    itemId: 'pklSpaceTxt',
                    // label: 'Mã hàng:',
                    // labelWidth: 85,
                    margin: 1,
                    // padding: 6,
                    flex: 1,
                    // width: '100%',
                    // minWidth: 80,
                    // maxWidth: 200,
                    textAlign: 'left',
                    placeholder: 'Tầng',
                    // editable: false,
                    // readOnly: true,
                    // clearable: false,
                    // cls: 'notEditable',
                    bind: {
                        value:'{objStock.space}'
                    },
                    // stepValue: 0.1,
                    // listeners: {
                    //     focus: 'onFocus',
                    //     focusleave: 'onFocusLeave'
                    // }
                },
                {
                    xtype: 'numberfield',
                    itemId: 'pklFloorTxt',
                    // label: 'Mã hàng:',
                    // labelWidth: 85,
                    margin: 1,
                    // padding: 6,
                    flex: 1,
                    // width: '100%',
                    // minWidth: 80,
                    // maxWidth: 200,
                    textAlign: 'left',
                    placeholder: 'Khoang',
                    // editable: false,
                    // readOnly: true,
                    // clearable: false,
                    // cls: 'notEditable',
                    bind: {
                        value:'{objStock.floor}'
                    },
                    // stepValue: 0.1,
                    // listeners: {
                    //     focus: 'onFocus',
                    //     focusleave: 'onFocusLeave'
                    // }
                },
                {
                    xtype:'button',
                    iconCls: 'x-fa fa-random',
                    itemId:'btnChuyenKhoang',
                    // text: 'Chuyển khoang',
                    ui: 'action',
                    margin: 1,
                },    
            ]
        },
        // {
        //     layout: 'hbox',
        //     // flex: 1,
        //     items:[
        //         {
        //             xtype:'button',
        //             iconCls: 'x-fa fa-random',
        //             itemId:'btnChuyenKhoang',
        //             text: 'Chuyển khoang',
        //             ui: 'action',
        //             margin: 1,
        //         },    
        //     ]
        // },
    ],
    tbar: [
        {
            xtype:'button',
            iconCls: 'x-fa fa-arrow-left',
            itemId:'btnBack',
            ui: 'action',
        },
        {
            xtype:'button',
            iconCls: 'x-fa fa-home',
            itemId:'btnHome',
            ui: 'action',
        },    
        '->'
        ,
    ]
});