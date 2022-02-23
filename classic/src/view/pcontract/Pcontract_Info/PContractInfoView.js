Ext.define('GSmartApp.view.PContract.PContractInfoView', {
    extend: 'Ext.form.Panel',
    xtype: 'PContractInfoView',
    id: 'PContractInfoView',
    controller: 'PContractInfoViewCotroller',
    bodyPadding: 5,
    border: false,
    IdPContract: 0,
    // layout: 'vbox',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            layout: 'hbox',
            flex:1,
            border: false,
            items: [
                {
                    xtype: 'combo',
                    allowBlank: false,
                    queryMode: 'local',
                    anyMatch: true,
                    valueField: 'id',
                    displayField: 'code',
                    margin: 2,
                    fieldLabel: "Buyer (<span style = 'color: red'>*</span>)",
                    bind: {
                        value: '{PContract.orgbuyerid_link}',
                        store: '{EndBuyer}'
                    },
                    itemId: 'orgbuyerid_link',
                    labelWidth: 110,
                    flex: 1               
                 }, 
                 {
                    xtype: 'combo',
                    queryMode: 'local',
                    anyMatch: true,
                    valueField: 'id',
                    displayField: 'code',
                    margin: 2,
                    fieldLabel: "Vendor:",
                    bind: {
                        value: '{PContract.orgvendorid_link}',
                        store: '{Vender}'
                    },
                    itemId: 'orgvenderid_link',
                    labelWidth: 80,
                    flex: 1
                },                  
                {
                    xtype: 'combo',
                    queryMode: 'local',
                    anyMatch: true,
                    valueField: 'id',
                    displayField: 'name',
                    margin: 2,
                    fieldLabel: "Loại hình:",
                    bind: {
                        value: '{PContract.contracttypeid_link}',
                        store: '{ContractTypes}'
                    },
                    itemId: 'contracttypeid_link',
                    labelWidth: 100,
                    flex: 1
                },
                {
                    xtype: 'combo',
                    margin: 2,
                    fieldLabel: "Thị trường:",
                    itemId: 'market',
                    blankText: 'Không được để trống',
                    bind: {
                        store: '{MarketStore}',
                        value: '{PContract.marketypeid_link}'
                    },
                    displayField: 'name',
                    valueField: 'id',
                    labelWidth: 100,
                    flex: 1
                }           
                // {
                //     xtype: 'datefield',
                //     margin: 2,
                //     fieldLabel: "Ngày chốt:",
                //     bind: {
                //         value: '{PContract.confirmdate}'
                //     },
                //     format: 'd/m/Y',
                //     altFormats: "Y-m-d\\TH:i:s.uO",
                //     value: new Date(),
                //     itemId: 'confirmdate',
                //     labelWidth: 90,
                //     width: 300
                // }
            ]
        }, 
        {
            layout: 'hbox',
            flex:1,
            border: false,
            items: [
                {
                    xtype: 'textfield',
                    margin: 2,
                    fieldLabel: "Mã đơn hàng:",
                    // allowBlank: false,
                    itemId: 'contractcode',
                    blankText: 'Không được để trống',
                    bind: {
                        value: '{PContract.contractcode}'
                    },
                    labelWidth: 110,
                    flex: 1
                }, 
                {
                    xtype: 'datefield',
                    margin: 2,
                    fieldLabel: "Ngày lập:",
                    bind: {
                        value: '{PContract.contractdate}'
                    },
                    format: 'd/m/Y',
                    altFormats: "Y-m-d\\TH:i:s.uO",
                    value: new Date(),
                    itemId: 'contractdate',
                    labelWidth: 80,
                    flex: 1
                }, 
                {
                    xtype: 'combo',
                    queryMode: 'local',
                    anyMatch: true,
                    valueField: 'id',
                    displayField: 'contract_code',
                    margin: 2,
                    allowBlank: false,
                    fieldLabel: "H.đồng GC (<span style = 'color: red'>*</span>)",
                    bind: {
                        value: '{PContract.contractbuyerid_link}',
                        store: '{ContractBuyerStore}'
                    },
                    itemId: 'contractbuyerid_link',
                    labelWidth: 100,
                    flex: 1
                },                
                {
                    xtype: 'combo',
                    queryMode: 'local',
                    anyMatch: true,
                    valueField: 'id',
                    displayField: 'name',
                    margin: 2,
                    fieldLabel: "Bên thanh toán:",
                    bind: {
                        value: '{PContract.payer}',
                        store: '{PayerStore}'
                    },
                    itemId: 'orgpayerid_link',
                    labelWidth: 100,
                    flex: 1,
                    listeners :{
                        select: 'onSelectPayer'
                    }
                }
            ]
        }
    ]
})