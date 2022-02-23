Ext.define('GSmartApp.view.cutplan_processing.CutplanProcessing_POrderList', {
    extend: 'Ext.grid.Panel',
    xtype: 'CutplanProcessing_POrderList',
    itemId: 'CutplanProcessing_POrderList',
    reference: 'CutplanProcessing_POrderList',
    controller: 'CutplanProcessing_POrderList_Controller',
    viewConfig: {
        stripeRows: false,
        columnLines: true,
        rowLines: true
    },
    bind:{
        store: '{POrder_ListStore}'
    },
    columns: [
        {text: 'Lệnh SX', dataIndex: 'ordercode', flex: 1,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                var val = value == 'null' ? "" : value;
                metaData.tdAttr = 'data-qtip="' + val + '"';
                return val;
            },
            // items: {
            //     xtype: 'textfield',
            //     fieldStyle: "",
            //     reference: 'cutplanProcessing_pordercodeFilter',
            //     width: 125,
            //     flex: 1,
            //     margin: 2,
            //     enableKeyEvents: true,
            //     listeners: {
            //         keyup: 'onCutplanProcessing_pordercodeFilterKeyup',
            //         buffer: 500
            //     }
            // },
        },
        {text: 'SL yêu cầu', dataIndex: 'totalorder_req', width: 120,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                var val = value == 'null' ? "" : value;
                metaData.tdAttr = 'data-qtip="' + val + '"';
                return val;
            },
        },
    ],
    dockedItems: [
        {
            dock: 'top',
            layout: 'vbox',
            xtype: 'toolbar',
            border: false,
            items: [
                {
                    xtype: 'combo',
                    itemId:'combo_DonVi',
                    valueField: 'id',
                    displayField: 'name',
                    bind: {
                        value: '{porderSearchObj.donvi}',
                        store: '{ListOrgStore}',
                        readOnly: '{!iscombo_DonVi_editable}',
                        editable: '{iscombo_DonVi_editable}'
                    },
                    queryMode: 'local',
                    anyMatch: true,
                    fieldLabel: 'Đơn vị',					
                    margin: 1,
                    labelWidth: 80,
                    flex: 1,
                },
                {
                    xtype: 'combo',
                    itemId:'POrder_AutoComplete',
                    fieldLabel: 'Mã lệnh',
                    margin: 1,
                    labelWidth: 80,
                    flex: 1,
                    hideLabel: false,
                    hideTrigger: true,
                    bind:{
                        store: '{POrder_AutoComplete}',
                        disabled: '{isPOrder_AutoComplete_disable}',
                        value: '{porderSearchObj.lenhsx}'
                    },
                    displayField: 'ordercode',
                    valueField: 'ordercode',
                    listConfig: {
                        loadingText: 'Tải mã lệnh...',
                        emptyText: 'Không có mã lệnh phù hợp.',
                    },
                    anyMatch: true,
                    queryMode: 'remote',
                    queryParam: 'ordercode',		
                    enableKeyEvents : true,
                },
                // {
                //     xtype: 'textfield',
                //     itemId: 'LenhSX',
                //     fieldLabel: "Lệnh SX",
                //     // allowBlank: false,
                //     bind: {
                //         value: '{porderSearchObj.lenhsx}'
                //     },
                //     margin: 1,
                //     labelWidth: 80,
                //     flex: 1,
                //     enableKeyEvents : true,
                // },
                {
                    xtype: 'combo',
                    itemId:'Product_AutoComplete',
                    fieldLabel: 'Mã SP',
                    margin: 1,
                    labelWidth: 80,
                    flex: 1,
                    hideLabel: false,	
                    hideTrigger: true,		
                    bind:{
                        store: '{Product_AutoComplete}',
                        disabled: '{isProduct_AutoComplete_disable}',
                        value: '{porderSearchObj.sanpham}'
                    },
                    // store: {
                    //     type: 'POrder_AutoComplete',
                    //     // pageSize: 10
                    // },
                    displayField: 'buyercode',
                    valueField: 'buyercode',
                    listConfig: {
                        loadingText: 'Tải mã SP...',
                        emptyText: 'Không có mã SP phù hợp.',
                    },
                    anyMatch: true,
                    minChars: 2,
                    queryMode: 'remote',
                    queryParam: 'buyercode',		
                    enableKeyEvents : true,
                    // listeners: {
                    //     keypress: 'onPressEnterSkucode'
                    // }
                },
                // {
                //     xtype: 'textfield',
                //     itemId: 'SanPham',
                //     fieldLabel: "Sản phẩm",
                //     // allowBlank: false,
                //     bind: {
                //         value: '{porderSearchObj.sanpham}'
                //     },
                //     margin: 2,
                //     labelWidth: 80,
                //     flex: 1,
                //     enableKeyEvents : true,
                // },
                {
                    xtype:'button',
                    text:  'Tìm kiếm',
                    iconCls: 'x-fa fa-search',
                    itemId: 'btnSearchPorder',
                    // ui: 'normal',
                    margin: 2,
                    bind:{
                        disabled: '{isbtnSearchPorder_disable}'
                    },
                    // flex: 1,
                },
            ]
        },
    ],
});

