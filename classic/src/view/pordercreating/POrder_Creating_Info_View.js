Ext.define('GSmartApp.view.pordercreating.POrder_Creating_Info_View', {
    extend: 'Ext.form.Panel',
    xtype: 'POrder_Creating_Info_View',
    id: 'POrder_Creating_Info_View',
    controller: 'POrder_Creating_Info_ViewCotroller',
	bodyPadding: 5,
    items:[{
        layout:'hbox',
        border: false,
        items:[{
            layout:'vbox',
            border: false,
            items:[{
                layout:'hbox',
                border:false,
                items:[{
                    xtype:'textfield',
                    margin: 2,
                    fieldLabel: "Style KH",
                    bind:{
                        value : '{PContract.cust_contractcode}'
                    },
                    itemId:'cust_contractcode',
                    allowBlank: false,
                    blankText: 'Không được để trống',
                    labelWidth: 80,
                    readOnly: true,
                    width: 250
                },{
                    xtype:'textfield',
                    margin: 2,
                    fieldLabel: "Số LSX",
                    allowBlank: false,
                    itemId: 'ordercode',
                    bind:{
                        value: '{ordercode}'
                    },
                    blankText: 'Không được để trống',
                    labelWidth: 80,
                    width: 250
                },{
                    xtype:'datefield',
                    margin: 2,
                    fieldLabel: "Ngày SX",
                    format: 'd/m/Y',
                    altFormats: "Y-m-d\\TH:i:s.uO",
                    bind: {
                        value: '{orderdate}'
                    },
                    itemId:'contractdate',
                    labelWidth: 100,
                    width: 250
                },{
                    xtype: 'combo',
                    margin: 2,
                    bind: {
                        store: '{ListOrgStore}',
                        value: '{org_order_id_link}'
                    },
                    valueField: 'id',
                    displayField: 'name',
                    fieldLabel: 'Xưởng sản suất',
                    itemId: 'cmbSanPham'
                }]
            },{
                layout:'hbox',
                border:false,
                items:[{
                    xtype:'combo',
                    queryMode: 'local',
                    anyMatch: true,
                    valueField: 'id',
                    displayField: 'name',
                    margin: 2,
                    readOnly: true,
                    fieldLabel: "Khách hàng",
                    bind:{
                        value : '{PContract.orgcustomerid_link}',
                        store : '{CustomerStore}'
                    },
                    itemId:'orgcustomerid_link',
                    labelWidth: 80,
                    width: 250
                },{
                    xtype:'combo',
                    queryMode: 'local',
                    anyMatch: true,
                    valueField: 'id',
                    displayField: 'name',
                    margin: 2,
                    readOnly: true,
                    fieldLabel: "Vender",
                    bind:{
                        value : '{PContract.orgvenderid_link}',
                        store : '{Vender}'
                    },
                    itemId:'orgvenderid_link',
                    labelWidth: 80,
                    width: 250
                },{
                    xtype:'combo',
                    queryMode: 'local',
                    anyMatch: true,
                    valueField: 'id',
                    displayField: 'name',
                    margin: 2,
                    readOnly: true,
                    fieldLabel: "End Buyer",
                    bind:{
                        value : '{PContract.orgbuyerid_link}',
                        store : '{EndBuyer}'
                    },
                    itemId:'orgbuyerid_link',
                    labelWidth: 100,
                    width: 250
                }]
            },{
                layout:'hbox',
                border:false,
                items:[{
                    xtype:'combo',
                    queryMode: 'local',
                    anyMatch: true,
                    valueField: 'id',
                    displayField: 'name',
                    margin: 2,
                    readOnly: true,
                    fieldLabel: "Branch",
                    bind:{
                        value : '{PContract.branchid_link}',
                        store : '{BranchStore}'
                    },
                    itemId:'branchid_link',
                    labelWidth: 80,
                    width: 250
                },{
                    xtype:'combo',
                    queryMode: 'local',
                    anyMatch: true,
                    valueField: 'id',
                    displayField: 'name',
                    margin: 2,
                    readOnly: true,
                    fieldLabel: "Season",
                    bind:{
                        value : '{PContract.seasonid_link}',
                        store : '{SeasonStore}'
                    },
                    itemId:'seasonid_link',
                    labelWidth: 80,
                    width: 250
                },{
                    xtype:'datefield',
                    margin: 2,
                    fieldLabel: "Ngày giao hàng",
                    bind:{
                        value : '{PContract.deliverydate}'
                    },
                    readOnly: true,
                    format: 'd/m/Y',
                    altFormats: "Y-m-d\\TH:i:s.uO",
                    itemId:'deliverydate',
                    labelWidth: 100,
                    width: 250
                }]
            }]
        }]
    }]
})