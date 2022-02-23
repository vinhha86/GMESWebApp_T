Ext.define('GSmartApp.view.invoice.InvoiceEdit_M', {
	extend: 'Ext.container.Container',
	xtype: 'InvoiceEdit_M',
	controller: 'InvoiceEdit_M_Controller',
	requires: ['Ext.form.field.Hidden', 'Ext.form.field.Date'],
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	items: [{
        layout: 'hbox',
        xtype: 'container',
        margin: '1 0 0 0',
        items:[{
            xtype: 'textfield',
            // fieldLabel: 'Số hóa đơn ('+ '<span style="color:red">*</span>' + ')',
            fieldLabel: 'Số hóa đơn',
            itemId: 'invoicenumber',
            // allowBlank: false,
            labelWidth: 95,
            width: 335,
            margin: '0 5 0 5',
            // readOnly: true,
            bind: {
                value: '{invoice.invoicenumber}'
            }
        },{
            xtype: 'datefield',
            editable: false,
            format: 'd/m/Y',
            altFormats: "Y-m-d\\TH:i:s.uO",
            fieldLabel: 'Ngày hóa đơn',
            margin: '0 5 0 0',
            labelWidth: 90,
            width: 220,
            bind: {
                value: '{invoice.invoicedate}'
            }
        },{
            xtype: 'datefield',
            editable: false,
            format: 'd/m/Y',
            altFormats: "Y-m-d\\TH:i:s.uO",
            fieldLabel: 'Ngày rời cảng',
            margin: '0 5 0 5',
            width: 280,
            bind: {
                value: '{invoice.shipdatefrom}'
            }
        },{
            xtype: 'datefield',
            editable: false,
            format: 'd/m/Y',
            margin: '0 5 0 0',
            altFormats: "Y-m-d\\TH:i:s.uO",
            fieldLabel: 'Ngày cập cảng',
            flex: 1,
            bind: {
                value: '{invoice.shipdateto}'
            }
        }]
    },{
        layout: 'hbox',
        xtype: 'container',
        margin: '1 0 0 0',
        items:[{
            xtype:'combo',
            fieldLabel: 'Nhà cung cấp',
            labelWidth: 95,
            margin: '0 5 0 5',
            bind:{
                store: '{OrgProviderStore}',
                value: '{invoice.org_prodviderid_link}'
            },
            valueField: 'id',
            displayField: 'name',
            width: 560,
            queryMode: 'local'
        },{
            xtype:'combo',
            margin: '0 5 0 5',
            fieldLabel: 'Đơn vị nhập',
            bind:{
                store: '{OrgToStore}',
                value: '{invoice.orgid_to_link}'
            },
            valueField: 'id',
            displayField: 'name',
            flex: 1,
            queryMode: 'local'
        }]
    },{
        layout: 'hbox',
        xtype: 'container',
        margin: '1 0 0 0',
        items:[{
            xtype:'combo',
            fieldLabel: 'Cảng xếp hàng',
            labelWidth: 95,
            bind:{
                store: '{PortFromStore}',
                value: '{invoice.port_from_link}'
            },
            valueField: 'id',
            displayField: 'name',
            width: 560,
            margin: '0 5 0 5',
            queryMode: 'local'
        },{
            xtype:'combo',
            fieldLabel: 'Cảng dỡ hàng',
            bind:{
                store: '{PortToStore}',
                value: '{invoice.port_to_link}'
            },
            valueField: 'id',
            displayField: 'name',
            flex: 1,
            margin:'0 5 0 5',
            queryMode: 'local'
        }]
    },
    // {
    //     layout: 'hbox',
    //     xtype: 'container',
    //     margin: '1 0 0 0',
    //     items:[
    //         {
    //             layout: 'hbox',
    //             xtype: 'container',
    //             margin: '0 5 0 5',
    //             border: false,
    //             width: 335,
    //             items:[
    //                 {
    //                     xtype: 'textfield',
    //                     fieldLabel: 'Số tờ khai',
    //                     labelWidth: 95,
    //                     width: 270,
    //                     bind: {
    //                         value: '{invoice.custom_declaration}'
    //                     }
    //                 },
    //                 {
    //                     xtype:'button',
    //                     margin: '0 0 0 2',
    //                     itemId:'btnInvoice_Plus',
    //                     iconCls: 'x-fa fa-plus',
    //                     width: 30,
    //                     tooltip: 'Thêm số tờ khai',
    //                 },
    //                 {
    //                     xtype:'button',
    //                     margin: '0 0 0 2',
    //                     itemId:'btnInvoice_Search',
    //                     iconCls: 'x-fa fa-search',
    //                     width: 30,
    //                     tooltip: 'Tìm số tờ khai',
    //                 }
    //             ]
    //         },
    //         {
    //             xtype: 'datefield',
    //             editable: false,
    //             format: 'd/m/Y',
    //             altFormats: "Y-m-d\\TH:i:s.uO",
    //             fieldLabel: 'Ngày tờ khai',
    //             margin: '0 5 0 0',
    //             labelWidth: 90,
    //             width: 220,
    //             bind: {
    //                 value: '{invoice.declaration_date}'
    //             }
    //         },
    //         {
    //             xtype: 'textfield',
    //             fieldLabel: 'Người giao',
    //             margin:'0 5 0 5',
    //             flex : 1,
    //             bind: {
    //                 value: '{invoice.shippersson}'
    //             }
    //         }
    //     ]
    // },
    {
        layout: 'hbox',
        xtype: 'container',
        margin: '1 0 0 0',
        items:[
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
                        width: 335,
                        items:[
                            {
                                xtype: 'textfield',
                                bind: {
                                    value: '{invoice.pcontractcode}'
                                },
                                fieldLabel: 'Mã đơn hàng',					
                                labelWidth: 95,
                                width: 270,
                                enableKeyEvents : true,
                                listeners: {
                                    keypress: 'onPressEnterBtnPContract_Search'
                                }
                            },
                            {
                                xtype:'button',
                                margin: '0 0 0 2',
                                itemId:'btnPcontract_Plus',
                                iconCls: 'x-fa fa-plus',
                                width: 30,
                                tooltip: 'Thêm mã đơn hàng',
                            },
                            {
                                xtype:'button',
                                margin: '0 0 0 2',
                                itemId:'btnPContract_Search',
                                iconCls: 'x-fa fa-search',
                                width: 30,
                                tooltip: 'Tìm mã đơn hàng',
                            }
                        ]
                    },
                    {
                        xtype: 'datefield',
                        editable: false,
                        readOnly:true,
                        format: 'd/m/Y',
                        altFormats: "Y-m-d\\TH:i:s.uO",
                        fieldLabel: 'Ngày lập',
                        margin: '0 5 0 0',
                        labelWidth: 90,
                        width: 220,
                        bind: {
                            value: '{invoice.contractdate}'
                        },
                        hidden: true
                    },
                    {
                        xtype:'combo',
                        fieldLabel: 'Đ/vị tính',
                        bind:{
                            store: '{UnitStore}',
                            value: '{invoice.unitid_link}'
                        },
                        valueField: 'id',
                        displayField: 'name',
                        margin: '0 5 0 0',
                        labelWidth: 90,
                        width: 220,
                        queryMode: 'local',
                        anyMatch: true,
                        listeners: {
                            select: 'onSelectUnit'
                        },
                    },
                ]
            },            
            {
                xtype: 'textfield',
                fieldLabel: 'Ghi chú',
                margin: '0 5 0 5',
                flex: 1,
                bind: {
                    value: '{invoice.extrainfo}'
                }
            }
        ]
    }]
});

