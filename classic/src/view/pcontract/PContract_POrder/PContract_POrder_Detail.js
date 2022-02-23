Ext.define('GSmartApp.view.pcontract.PContract_POrder_Detail', {
    extend: 'Ext.form.Panel',
    xtype: 'PContract_POrder_Detail',
    id: 'PContract_POrder_Detail',
    itemId: 'PContract_POrder_Detail',
    controller: 'PContract_POrder_Detail_Controller',

    layout: 'border',
    items: [
        {
            region: 'north',
            height: 117,
            border: true,
            xtype: 'panel',
            padding: 1,
            layout: 'vbox',
            items:[
                {
                    xtype: 'panel',
                    margin: 2,
                    width: '100%',
                    layout: 'hbox',
                    items:[
                        {
                            xtype: 'textfield',
                            readOnly: true,
                            labelStyle: "font-size:11px;padding:5px 0px 0px 5px;",
                            fieldStyle: 'font-size:11px;font-weight:bold;text-align:right;background-color:azure',                            
                            fieldLabel: "Mã lệnh",
                            bind: {
                                value: '{porder_selected.ordercode}'
                            },
                            labelWidth: 80,
                            width: '50%',
                        },
                        {
                            xtype: 'textfield',
                            readOnly: true,
                            labelStyle: "font-size:11px;padding:5px 0px 0px 5px;",
                            fieldStyle: 'font-size:11px;text-align:right;background-color:azure',                            
                            fieldLabel: "Trạng thái",
                            bind: {
                                value: '{porder_selected.statusName}'
                            },
                            labelWidth: 80,
                            width: '50%',
                        },                
                    ]      
                },
                {
                    xtype: 'panel',
                    margin: 2,
                    width: '100%',
                    layout: 'hbox',
                    items:[
                        {
                            xtype: 'datefield',
                            readOnly: true,
                            hideTrigger: true,
                            labelStyle: "font-size:11px;padding:5px 0px 0px 5px;",
                            fieldStyle: 'font-size:11px;text-align:right;background-color:azure',
                            fieldLabel: "Ngày VC",
                            bind: {
                                value: '{porder_selected.productiondate}'
                            },
                            format: 'd/m/Y',
                            altFormats: "Y-m-d\\TH:i:s.uO",
                            labelWidth: 80,
                            width: '50%',
                        },                        
                        {
                            xtype: 'datefield',
                            readOnly: true,
                            hideTrigger: true,
                            labelStyle: "font-size:11px;padding:5px 0px 0px 5px;",
                            fieldStyle: 'font-size:11px;text-align:right;background-color:azure',
                            fieldLabel: "Ngày giao",
                            bind: {
                                value: '{porder_selected.shipdate}'
                            },
                            format: 'd/m/Y',
                            altFormats: "Y-m-d\\TH:i:s.uO",
                            labelWidth: 80,
                            width: '50%',
                        }                    
                    ]                        
                },
                {
                    xtype: 'panel',
                    margin: 2,
                    width: '100%',
                    layout: 'hbox',
                    items:[
                        {
                            xtype: 'textfield',
                            readOnly: true,
                            labelStyle: "font-size:11px;padding:5px 0px 0px 5px;",
                            fieldStyle: 'font-size:11px;font-weight:bold;text-align:right;background-color:azure',                            
                            fieldLabel: "NS target",
                            bind: {
                                value: '{porder_selected.plan_productivity}'
                            },
                            labelWidth: 80,
                            width: '50%',
                            vtype: 'dollar',
                            textAlign: 'right',
                            labelAlign: 'left',        
                            listeners: {
                                focusleave: 'onPOrder_update'
                            }                                               
                        },
                        {
                            xtype: 'datefield',
                            readOnly: true,
                            hideTrigger: true,
                            labelStyle: "font-size:11px;padding:5px 0px 0px 5px;",
                            fieldStyle: 'font-size:11px;text-align:right;background-color:azure',
                            fieldLabel: "Ngày kết thúc",
                            bind: {
                                value: '{porder_selected.finishdate_plan}'
                            },
                            format: 'd/m/Y',
                            altFormats: "Y-m-d\\TH:i:s.uO",
                            labelWidth: 80,
                            width: '50%',
                        },                
                    ]      
                },                
            ]
        },
        {
            region: 'center',
            border: true,
            // title: 'Yêu cầu sản xuất',
            xtype: 'PContract_POrder_Edit_PorderSKU',
            padding: 1,
            // width: '25%',       
        },
        {
            region: 'south',
            layout:'hbox',
            items:[
                {
                    xtype: 'button',
                    itemId: 'btnAddSKU',
                    text: 'Thêm SKU',
                    margin: 1,
                    iconCls: 'x-fa fa-plus'
                },
                {
                    xtype: 'button',
                    itemId: 'btnDeletePorder',
                    text: 'Xóa lệnh',
                    margin: 1,
                    iconCls: 'x-fa fa-trash'
                },
                {
                    xtype: 'textfield',
                    labelStyle: "font-size:11px;padding:5px 0px 0px 5px;",
                    fieldStyle: 'font-size:11px;font-weight:bold;text-align:right;background-color:azure',                            
                    fieldLabel: "SL yêu cầu",
                    bind: {
                        value: '{porder_selected.totalorder_req}'
                    },
                    labelWidth: 70,
                    flex: 1,
                    margin: 1,
                    vtype: 'dollar',
                    textAlign: 'right',
                    labelAlign: 'left',
                    readOnly: true,
                    // listeners: {
                    //     focusleave: 'onPOrder_update'
                    // }   
                },                     
            ]
        }
    ]
})