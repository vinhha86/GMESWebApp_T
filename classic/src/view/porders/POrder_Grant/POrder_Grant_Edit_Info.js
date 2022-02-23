Ext.define('GSmartApp.view.porders.POrder_Grant_Edit_Info', {
    extend: 'Ext.form.Panel',
    xtype: 'POrder_Grant_Edit_Info',
    id:'POrder_Grant_Edit_Info',
    layout: 'border',
    items: [
        {
            region: 'center',
            layout: 'hbox',
            items:[
                {
                    // region: 'west',
                    xtype: 'textfield',
                    labelStyle: "font-size:11px;padding:10px 0px 0px 10px;",
                    fieldStyle: 'font-size:11px;',
                    fieldLabel: 'Đơn vị QC:',
                    reference: 'poinfo_qcorgname',
                    labelAlign: 'left',
                    labelWidth: 75,
                    width: '33%',
                    margin: 1,
                    bind: {
                        value: '{porder.qcorgname}'
                    }
                },    
                {
                    // region: 'center',
                    labelStyle: "font-size:11px;padding:10px 0px 0px 10px;",
                    fieldStyle: 'font-size:11px;',
                    xtype: 'textfield',
                    labelWidth: 75,
                    labelAlign: 'left',
                    fieldLabel:'Đóng gói:',
                    margin: 1,
                    bind: {
                        value: '{porder.packingnotice}'
                    },
                    width: '67%',
                }
            ]

        },
        {
            region: 'north',
            height: 70,
            layout: 'border',
            items:[
                {
                    region: 'west',
                    width: '33%',
                    layout: 'vbox',
                    items:[
                        {
                            xtype: 'textfield',
                            labelStyle: "font-size:11px;padding:10px 0px 0px 10px;",
                            fieldStyle: 'font-size:11px;',
                            fieldLabel: 'PO Buyer:',
                            labelAlign: 'left',
                            labelWidth: 75,
                            width: '100%',
                            margin: 1,
                            bind: {
                                value: '{porder.po_buyer}'
                            },
                            listeners: {
                                focusleave: 'onPOBuyerChange'
                            }                               
                        }, 
                        {
                            xtype: 'datefield',
                            labelStyle: "font-size:11px;padding:10px 0px 0px 10px;",
                            fieldStyle: 'font-size:11px;',
                            fieldLabel: 'Ngày giao:',
                            reference: 'poinfo_shipdate',
                            labelAlign: 'left',
                            labelWidth: 75,
                            width: '100%',
                            margin: 1,
                            format: 'd/m/Y',
                            altFormats: "Y-m-d\\TH:i:s.uO",
                            bind: {
                                value: '{porder.shipdate}'
                            }
                        },                         
  
                        // {
                        //     xtype: 'numberfield',
                        //     labelStyle: "font-size:11px;padding:10px 0px 0px 10px;",
                        //     fieldStyle: 'font-size:11px;text-align:right',
                        //     readOnly: true,
                        //     fieldLabel: 'Số ngày SX:',
                        //     hideTrigger:true,
                        //     reference: 'poinfo_productiondays',
                        //     labelAlign: 'left',
                        //     labelWidth: 75,
                        //     width: '100%',
                        //     margin: 1,
                        //     bind: {
                        //         value: '{po.productiondays}'
                        //     }
                        // },                                                  
                    ]
                },
                {
                    region: 'east',
                    width: '33%',
                    layout: 'vbox',
                    items:[
                        {
                            xtype: 'numberfield',
                            labelStyle: "font-size:11px;padding:10px 0px 0px 10px;",
                            fieldStyle: 'font-size:11px;text-align:right',
                            fieldLabel: 'Số lượng:',
                            hideTrigger:true,
                            labelAlign: 'left',
                            labelWidth: 75,
                            width: '100%',
                            margin: 1,
                            bind: {
                                value: '{porder.po_quantity}'
                            }
                        },     
                        {
                            xtype: 'datefield',
                            labelStyle: "font-size:11px;padding:10px 0px 0px 10px;",
                            fieldStyle: 'font-size:11px;',
                            fieldLabel: 'Ngày VC:',
                            readOnly: true,
                            reference: 'poinfo_productiondate',
                            labelAlign: 'left',
                            labelWidth: 75,
                            width: '100%',
                            margin: 1,
                            format: 'd/m/Y',
                            altFormats: "Y-m-d\\TH:i:s.uO",
                            bind: {
                                value: '{porder.productiondate}'
                            }
                        },                                                                    
                    ]
                },
                {
                    region: 'center',
                    layout: 'vbox',
                    items:[
                        {
                            xtype: 'textfield',
                            labelStyle: "font-size:11px;padding:10px 0px 0px 10px;",
                            fieldStyle: 'font-size:11px;',
                            fieldLabel: 'PO Vendor:',
                            labelAlign: 'left',
                            labelWidth: 75,
                            width: '100%',
                            margin: 1,
                            bind: {
                                value: '{porder.po_vendor}'
                            }
                        },
                        {
                            xtype: 'datefield',
                            labelStyle: "font-size:11px;padding:10px 0px 0px 10px;",
                            fieldStyle: 'font-size:11px;',
                            fieldLabel: 'Ngày NPL về:',
                            reference: 'poinfo_matdate',
                            labelAlign: 'left',
                            labelWidth: 75,
                            width: '100%',
                            margin: 1,
                            format: 'd/m/Y',
                            altFormats: "Y-m-d\\TH:i:s.uO",
                            bind: {
                                value: '{porder.matdate}'
                            }          
                        },      
    
                                        
                    ]
                }
            ]
        },
        {
            region: 'south',
            height: 35,
            layout: 'hbox',
            items:[
                {
                    // region: 'west',
                    xtype: 'textfield',
                    labelStyle: "font-size:11px;padding:10px 0px 0px 10px;",
                    fieldStyle: 'font-size:11px; font-weight:bold;',
                    fieldLabel: 'Mã lệnh:',
                    reference: 'poinfo_qcorgname',
                    labelAlign: 'left',
                    labelWidth: 75,
                    width: '33%',
                    margin: 1,
                    bind: {
                        value: '{porder.ordercode}'
                    }
                },    
                {
                    // region: 'center',
                    labelStyle: "font-size:11px;padding:10px 0px 0px 10px;",
                    fieldStyle: 'font-size:11px;',
                    xtype: 'textfield',
                    labelWidth: 75,
                    labelAlign: 'left',
                    fieldLabel:'Phân chuyền:',
                    margin: 1,
                    bind: {
                        value: '{granttoorg_name}'
                    },
                    width: '33%',
                },
                {
                    // region: 'center',
                    labelStyle: "font-size:11px;padding:10px 0px 0px 10px;",
                    fieldStyle: 'font-size:11px;text-align:right',
                    xtype: 'numberfield',
                    hideTrigger:true,
                    labelWidth: 85,
                    labelAlign: 'left',
                    fieldLabel:'Số lượng lệnh:',
                    margin: 1,
                    bind: {
                        value: '{porder.totalorder}'
                    },
                    width: '34%',
                }
            ]

        },
    ]
})