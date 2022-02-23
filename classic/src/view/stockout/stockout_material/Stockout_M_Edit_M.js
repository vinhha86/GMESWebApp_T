Ext.define('GSmartApp.view.stockout.Stockout_M_Edit_M', {
    extend: 'Ext.container.Container',
    xtype: 'Stockout_M_Edit_M',
    itemId: 'Stockout_M_Edit_M',
    controller: 'Stockout_M_Edit_M_Controller',
    cls: 'Stockout_M_Edit_M',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'container',
            layout: 'hbox',
            items: [
                {
                    xtype: 'combobox',
                    reference: 'cbostockouttype',
                    width: 375,
                    labelWidth: 80,
                    fieldLabel: 'Loại xuất:',
                    readOnly: true,
                    editable: false,
                    cls: 'notEditable',
                    displayField: 'name',
                    valueField: 'id',
                    bind: {
                        store: '{StockoutTypeStore}',
                        value: '{stockout.stockouttypeid_link}'
                    },
                    queryMode: 'local',
                    anyMatch: true,
                    margin: '5 5 0 5',
                },
                {
                    xtype: 'textfield',
                    margin: '5 5 0 5',
                    reference: 'txtstockoutcode',
                    width: 235,
                    labelWidth: 85,
                    fieldLabel: 'Số phiếu:',
                    readOnly: true,
                    cls: 'notEditable',
                    bind: {
                        value:'{stockout.stockoutcode}'
                    }
                },
                {
                    xtype: 'datefield',
                    margin: '5 5 0 5',
                    reference: 'txtstockoutdate',
                    width: 200,
                    labelWidth: 70,
                    fieldLabel: 'Ngày xuất:',
                    editable: false,
                    format:'d/m/Y',
			        altFormats: "Y-m-d\\TH:i:s.uO",
                    bind: {
                        value: '{stockout.stockoutdate}'
                    }
                },
                {
                    xtype: 'textfield',
                    margin: '5 5 0 5',
                    reference: 'stockout_usercreate_name',
                    flex: 1,
                    labelWidth: 85,
                    fieldLabel: 'Người lập:',
                    readOnly: true,
                    cls: 'notEditable',
                    hideLabel: false,
                    bind: {
                        value: '{stockout.usercreate_name}'
                    }
                }
            ]
        },
        {
            xtype: 'container',
            layout: 'hbox',
            margin: '1 0 0 0',
            items: [
                {
                    xtype: 'combobox',
                    reference: 'stockout_orgid_from_link',
                    width: 375,
                    labelWidth: 80,
                    fieldLabel: 'Nơi xuất:',
                    editable: false,
                    bind: {
                        store: '{OrgFromStore}',
                        value: '{stockout.orgid_from_link}'
                    },
                    queryMode: 'local',
                    anyMatch: true,
                    margin: '0 5 0 5',
                    displayField: 'name',
                    valueField: 'id'
                },
                {
                    xtype: 'combobox',
                    reference: 'stockout_orgid_to_link',
                    width: 445,
                    labelWidth: 85,
                    fieldLabel: 'Nơi nhận:',
                    editable: false,
                    margin: '0 5 0 5',
                    bind: {
                        store: '{OrgToStore}',
                        value: '{stockout.orgid_to_link}'
                    },
                    displayField: 'nameParent',
                    valueField: 'id'
                },
                {
                    xtype: 'textfield',
                    margin: '0 5 0 5',
                    reference: 'stockout_userApprove_name',
                    flex: 1,
                    labelWidth: 85,
                    fieldLabel: 'Người duyệt:',
                    readOnly: true,
                    cls: 'notEditable',
                    hideLabel: false,
                    bind: {
                        value: '{stockout.userApprove_name}'
                    }
                }
            ]
        },
        {
            xtype: 'container',
            layout: 'hbox',
            margin: '1 0 0 0',
            items: [
                {
                    xtype: 'textfield',
                    margin: '0 5 0 5',
                    reference: 'stockout_reason',
                    width: 375,
                    labelWidth: 80,
                    fieldLabel: 'Lý do xuất:',
                    hideLabel: false,
                    bind: {value:'{stockout.reason}'}
                },
                {
                    xtype: 'textfield',
                    margin: '0 5 0 5',
                    reference: 'stockout_extrainfo',
                    flex: 1,
                    labelWidth: 85,
                    fieldLabel: 'Kèm theo:',
                    hideLabel: false,
                    bind: {
                        value:'{stockout.extrainfo}'
                    }
                }
            ]
        },
        {
            layout: 'hbox',
            xtype: 'container',
            margin: '1 0 0 0',
            items: [
                {
                    layout: 'hbox',
                    xtype: 'container',
                    margin: '0 5 0 5',
                    border: false,
                    width: 375,
                    items:[
                        {
                            xtype: 'textfield',
                            bind: {
                                value: '{stockout.stockout_order_code}'
                            },
                            fieldLabel: 'Lệnh cấp vải',
                            labelWidth: 80,
                            width: 343,
                            enableKeyEvents : true,
                            listeners: {
                                keypress: 'onPressEnterBtnStockoutOrder_Search'
                            }
                        },
                        // {
                        // 	xtype:'button',
                        // 	margin: '0 0 0 2',
                        // 	itemId:'btnInvoice_Plus',
                        // 	iconCls: 'x-fa fa-plus',
                        // 	width: 30
                        // },
                        {
                            xtype:'button',
                            tooltip: 'Tìm lệnh cấp vải',
                            margin: '0 0 0 2',
                            itemId:'btnStockoutOrder_Search',
                            iconCls: 'x-fa fa-search',
                            width: 30
                        }
                    ]
                },
                // {
                //     margin: '0 5 0 5',
                //     xtype: 'datefield',
                //     format: GSmartApp.util.State.get('dataFormat'),
                //     altFormats: "Y-m-d\\TH:i:s.uO",
                //     bind: {
                //         value: '{stockout.invoice_date}'
                //     },
                //     editable: false,
                //     labelWidth: 85,
                //     width: 235,
                //     fieldLabel: "Ngày yêu cầu"
                // },
                {
                    xtype:'combo',
                    itemId: 'UnitStoreCombo',
                    fieldLabel: 'Đ/vị xuất',
                    bind:{
                        store: '{UnitStore}',
                        value: '{stockout.unitid_link}'
                    },
                    valueField: 'id',
                    displayField: 'name',
                    margin: '0 5 0 5',
                    labelWidth: 85,
                    width: 235,
                    queryMode: 'local',
                    anyMatch: true,
                    editable: false
                },
                {
                    margin: '0 5 0 5',
                    xtype: 'textfield',
                    itemId: 'statusString',
                    bind: {
                        value: '{stockout.statusString}'
                    },
                    readOnly: true,
                    fieldLabel: "Trạng thái",
                    width: 200,
                    labelWidth: 70
                },
                {
                    xtype: 'combo',
                    itemId:'Product_AutoComplete',
                    fieldLabel: 'Sản phẩm',
                    margin: '0 5 0 5',
                    labelWidth: 85,
                    flex: 1,
                    hideLabel: false,	
                    hideTrigger: true,
                    bind:{
                        store: '{Product_AutoComplete}',
                        value: '{stockout.product_buyercode}'
                    },
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
            ]
        }
    ]
});
