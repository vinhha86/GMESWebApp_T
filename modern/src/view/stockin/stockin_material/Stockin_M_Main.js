Ext.define('GSmartApp.view.stockin.stockin_material.Stockin_M_Main', {
    extend: 'Ext.Container',
    xtype: 'Stockin_M_Main',
    id: 'Stockin_M_Main',
    reference: 'Stockin_M_Main',
    viewModel: {
        type: 'Stockin_M_ViewModel'
    },
    controller: 'Stockin_M_MainController',
    height: '100%',
    layout: 'fit',
    width: '100%',
    items:[
        {
            xtype: 'panel',
            height: '100%',
            layout: 'vbox',
            items: [
                // {
                //     layout: 'hbox',
                //     defaults: {
                //         margin: 5
                //     },
                //     items: [
                //         // {
                //         //     // xtype: 'textfield',
                //         //     xtype: 'numberfield',
                //         //     // itemId: 'maNPLFilter',
                //         //     label: 'Test:',
                //         //     labelWidth: 70,
                //         //     // margin: 1,
                //         //     // padding: 6,
                //         //     flex: 1,
                //         //     // width: '100%',
                //         //     // minWidth: 80,
                //         //     // maxWidth: 200,
                //         //     textAlign: 'left',
                //         //     placeholder: 'Test',
                //         //     // editable: false,
                //         //     // readOnly: true,
                //         //     // clearable: false,
                //         //     // cls: 'notEditable',
                //         //     bind: {

                //         //     },
                //         //     stepValue: 0.1,
                //         //     // inputType: 'number'
                //         // },
                //         // {
                //         //     margin: 1,
                //         //     flex: 1,
                //         //     xtype: 'Stockin_M_Edit_Pkl_Detail',
                //         // }
                //     ]
                // },

                {
                    layout: 'hbox',
                    defaults: {
                        margin: 5
                    },
                    items: [
                        {
                            xtype: 'datefield',
                            reference: 'fromDate',
                            itemId: 'fromDate',
                            label: 'Nhập từ:',
                            // labelWidth: 'auto',
                            labelWidth: 70,
                            value: new Date(),
                            // value: new Date(2020, 1, 1),
                            dateFormat : 'd/m/y',
                            flex: 1,
                            enableKeyEvents: true,
                            listeners: {
                                change : 'loadData'
                            }
                        },
                        {
                            xtype: 'datefield',
                            reference: 'toDate',
                            itemId: 'toDate',
                            label: 'đến:',
                            // labelWidth: 'auto',
                            labelWidth: 60,
                            value: new Date(),
                            dateFormat : 'd/m/y',
                            flex: 1,
                            enableKeyEvents: true,
                            listeners: {
                                change : 'loadData'
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
                            itemId: 'invoiceFilter',
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
                                change: 'oninvoiceFilterKeyup',
                                keyup: 'oninvoiceFilterKeyup',
                                buffer: 500
                            }
                        },
                    ]
                },
                {
                    margin: 1,
                    flex: 1,
                    xtype: 'Stockin_M_List',
                },
            ],
            tbar: [
                {
                    xtype:'button',
                    iconCls: 'x-fa fa-arrow-left',
                    itemId:'btnBack',
                    ui: 'action',
                },
                '->'
                ,
                // {
                //     xtype:'button',
                //     iconCls: 'x-fa fa-arrow-right',
                //     itemId:'btnTest',
                //     ui: 'action',
                // },
            ]            
        }
    ]
});
