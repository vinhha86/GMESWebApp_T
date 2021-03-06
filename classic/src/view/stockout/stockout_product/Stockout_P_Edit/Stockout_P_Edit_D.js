Ext.define('GSmartApp.view.stockout.stockout_product.Stockout_P_Edit.Stockout_P_Edit_D', {
    extend: 'Ext.grid.Panel',
    xtype: 'stockout_p_edit_d',
    itemId: 'stockout_p_edit_d',
    controller: 'Stockout_P_Edit_D_Controller',
    cls: 'stockout_p_edit_d',
    requires: [
		'Ext.grid.plugin.CellEditing'
	],
    border: true,
    bind:{
        store: '{StockoutD_Store}'
    },
    features: [{
        ftype: 'summary',
        dock: 'bottom'
    }],
	plugins: {
        cellediting: {
            clicksToEdit: 1,
            listeners: {
                edit: 'onDItemEdit',
                // beforeedit: 'onPriceDItemBeforeEdit'
            }
        }
    },
    columnLines: true,
    viewConfig: {
        enableTextSelection: true,
        stripeRows: false,
        getRowClass: function(record, index) {
            var c = record.get('status');
            //
            var isPklistNotInStore = record.get('isPklistNotInStore');
            if(isPklistNotInStore == null) isPklistNotInStore = false;
            if(isPklistNotInStore == true){
                return 'epc-notinstock';
            }
            //
            var totalpackage = record.get('totalpackage');
            var totalpackagecheck = record.get('totalpackagecheck');
            if(totalpackage == null) totalpackage = 0;
            if(totalpackagecheck == null) totalpackagecheck = 0;
            if (totalpackagecheck != totalpackage && totalpackage != 0) {
                return 'epc-error';
            }
            else {
                return 'epc-ok';
            }
        }                     
    },
    columns: [
        {
            xtype: 'actioncolumn',
            width: 28,
            menuDisabled: true,
            sortable: false,
            align: 'center',
            items: [
                {
                    iconCls: 'x-fa fas fa-bars violetIcon',
                    handler: 'onMenu_Stockout_P_Edit_D'
                },
            ]
        },
        {
			header: 'SKU', 
			dataIndex: 'skucode',
			width: 120,	
			summaryRenderer:function (grid, context) {
				return "T????ng c????ng";
			}
		},{
			header: 'Ma?? SP', 
			dataIndex: 'sku_product_code',
            width: 120,
		},{
			header: 'T??n sa??n ph????m', 
			dataIndex: 'skuname',
			flex: 1
		},
        {
			text: 'Ma??u', 
			dataIndex: 'color_name',
			flex: 1
		},
        {
			text: 'C????', 
			dataIndex: 'size_name',
			width: 50
		},
        {
			text: 'Lo???i th??nh ph???m', 
			dataIndex: 'loaiThanhPham',
			flex: 1
		},
        {
            header: 'SL t???n', dataIndex: 'totalSLTon', width: 90,
            align:'right',
            summaryType: 'sum', summaryRenderer: 'renderCount',
            // xtype: 'numbercolumn',
            // format: '0,000',
            // editor:{
            //     xtype:'textfield',
            //     maskRe: /[0-9.]/,
            //     selectOnFocus: true,
            //     bind: {
            //         // editable: '{iseditSL}'
            //     }
            // }
        },
        {
            // header: 'S??? l?????ng YC', dataIndex: 'totalpackage_req', width: 80,
            header: 'SL Y/C', dataIndex: 'totalpackage', width: 80,
            align:'right',
            xtype: 'numbercolumn',
            format: '0,000',
            summaryType: 'sum', summaryRenderer: 'renderCount',
            editor:{
                xtype:'textfield',
                maskRe: /[0-9.]/,
                selectOnFocus: true,
                bind: {
                    // editable: '{iseditSL_YC}',
                }
            },
            bind: {
                // hidden: '{is_SLYC_hidden}'
            }
        },
        {
            header: 'SL xu???t', dataIndex: 'totalpackagecheck', width: 90,
            align:'right',
            summaryType: 'sum', summaryRenderer: 'renderCount',
            // xtype: 'numbercolumn',
            // format: '0,000',
            editor:{
                xtype:'textfield',
                maskRe: /[0-9.]/,
                selectOnFocus: true,
                bind: {
                    // editable: '{iseditSL}'
                }
            }
        },
        // {
        //     header: 'T???n kho', dataIndex: 'so_luong_ton_kho', width: 90,
        //     align:'right',
        //     bind:{
        //         hidden: '{isBtnTonKhoHidden}',
        //     },
        // },
    ],
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        items: [
            {
                margin: '0 0 0 5',
                xtype: 'button',
                iconCls: 'x-fa fa-angle-double-up',
                itemId: 'btnThuGon',
                bind: {
                    hidden: '{IsformMaster}'
                }
            }, {
                margin: '0 0 0 5',
                xtype: 'button',
                itemId: 'btnMoRong',
                iconCls: 'x-fa fa-angle-double-down',
                bind: {
                    hidden: '{!IsformMaster}'
                }
            },{
                labelWidth: 120,
                margin:'0 5 5 5',
                xtype: 'combobox',
                editable: false,
                fieldLabel: 'Ph????ng ph??p xu???t',
                bind: {
                    store: '{StockoutGroupStore}',
                    value: '{groupstockout}'
                },
                width: 270,
                displayField: 'name',
                valueField: 'id',
                itemId: 'cmbGroupStockout'
            }, {
                labelWidth: 90,
                margin: '0 0 0 5',
                xtype: 'combobox',
                fieldLabel: 'Thi???t b??? RFID:',
                bind: {
                    store: '{DeviceInvStore}',
				    hidden: '{isRFIDHidden}',
                    value: '{deviceid_link}',
                    selection: '{device}'
                },
                width: 300,
                displayField: 'name',
                valueField: 'id',
            },
            {
                margin: '0 5 5 5',
                text: "Start",
                iconCls: 'x-fa fa-play',
                xtype: 'button',
                handler: 'onStart',
                bind: {
                    disabled: '{isStart}',
                    userCls: '{clsbtnStart}',
				    hidden: '{isRFIDHidden}'
                }
            },
            {
                margin: '0 5 5 5',
                text: "Stop",
                iconCls: 'x-fa fa-stop',
                xtype: 'button',
                handler: 'onStop',
                bind: {
                    userCls: '{clsbtnSt}',
				    hidden: '{isRFIDHidden}'
                }
            },
            {
                xtype: 'combo',
                margin: '0 5 0 5',
                itemId:'Sku_AutoComplete',
                fieldLabel: 'M?? h??ng',
                width: 350,
                labelWidth: 70,
                hideLabel: false,		
                hideTrigger: false,	
                bind:{
                    store: '{Sku_AutoComplete}',
                    hidden: '{isBarcodeHidden}',
                },
                displayField: 'code',
                valueField: 'id',
                listConfig: {
                    loadingText: 'T???i m?? h??ng...',
                    emptyText: 'Kh??ng c?? m?? h??ng ph?? h???p.',
                },
                anyMatch: true,
                minChars: 2,
                queryMode: 'remote',
                queryParam: 'code',		
                enableKeyEvents : true,
            },
            {
                tooltip: 'Th??m SP',
                margin: '0 0 0 5',
                iconCls: 'x-fa fa-plus',
                weight: 30,
                itemId: 'btnThemSP',
                bind:{
                    hidden: '{isBarcodeHidden}',
                },
            },
            {
                tooltip: 'T??m SP',
                margin: '0 5 0 5',
                itemId: 'btnTimSP',
                iconCls: 'x-fa fa-search',
                weight: 30,			
                bind:{
                    hidden: '{isManualHidden}',
                },
            },
            '->',
            // {
            //     tooltip: 'T???n kho',
            //     text: 'T???n kho',
            //     margin: '0 5 0 5',
            //     itemId: 'btnTonKhoPOLine',
            //     // iconCls: 'x-fa fa-house',
            //     weight: 30,
            //     bind:{
            //         hidden: '{isBtnTonKhoHidden}',
            //     },
            // },
            {
                tooltip: 'T??nh SL t???n kho',
                text: 'T??nh SL t???n kho',
                margin: '0 5 0 5',
                itemId: 'btnTonKho',
                // iconCls: 'x-fa fa-house',
                weight: 30,
                // bind:{
                //     hidden: '{isBtnTonKhoHidden}',
                // },
            },
        ]
    }]
});
