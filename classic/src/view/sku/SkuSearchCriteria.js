Ext.define('GSmartApp.view.sku.SkuSearchCriteria', {
    extend: 'Ext.Panel',
    xtype: 'SkuSearchCriteria',
    id: 'SkuSearchCriteria',
    controller: 'SkuSearchCriteriaController',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },    
    items: [
        {
            xtype: 'container',
            margin: '0 0 2 0',
            layout: 'vbox',
            items:[
                {
                    xtype:  'combo',
                    margin: '0 0 2 0',
                    width: '100%',
                    reference:'skusearch_ProductType',
                    editable: false,
                    valueField: 'id',
                    displayField: 'name',
                    queryMode: 'local',
                    anyMatch: true,
                    fieldLabel: "Phân loại:",
                    allowBlank: false,
                    labelWidth: 90,
                    blankText: 'Không được để trống',
                    bind:{
                        store: '{ProductTypeStore}',
                        value: '{type}'
                    },
                    listeners: {
                        select: 'onProductTypeItemSelected'
                    }                    
                }, 
                {
                    xtype: 'container',
                    margin: '0 0 2 0',
                    width: '100%',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            width: 190,
                            reference:'skusearch_code',
                            fieldLabel: 'Mã SP (Buyer):',
                            labelWidth: 90,
                            hideLabel: false,
                            bind: '{code}'
                        },
                        {
                            xtype: 'textfield',
                            flex: 1,
                            margin: '0 0 0 5',
                            reference:'skusearch_partnercode',
                            fieldLabel: 'Mã NCC:',
                            labelWidth: 60,
                            hideLabel: false,
                            bind: '{partnercode}'
                        },
                    ]
                },
                {
                    xtype:  'combo',
                    width: '100%',
                    reference:'skusearch_cboPartner',
                    // editable: false,
                    margin: '0 0 2 0',
                    valueField: 'id',
                    displayField: 'name',
                    queryMode: 'local',
                    anyMatch: true,
                    fieldLabel: "Buyer",
                    selectOnFocus: true,
                    labelWidth: 90,
                    bind:{
                        store: '{OrgStore}',
                        value: '{orgcustomerid_link}',
                        readOnly: '{isReadOnly_cmbKhachHang}'
                    }
                },
                {
                    xtype:  'combo',
                    width: '100%',
                    reference:'skusearch_cboProvider',
                    // editable: false,
                    margin: '0 0 2 0',
                    valueField: 'id',
                    displayField: 'name',
                    queryMode: 'local',
                    anyMatch: true,
                    fieldLabel: "Provider",
                    selectOnFocus: true,
                    labelWidth: 90,
                    bind:{
                        store: '{OrgStore}'
                    },
                    hidden: true
                },  
            ]
        },    
        {
            xtype: 'SkuSearchCriteria_Attr',
            // margin: '2 2 0 2',
            border: true,
            flex: 1
        }
    ],
    fbar: [{
        minWidth: 80,
        text: 'Đóng',
        iconCls: 'x-fa fa-window-close',
        handler: 'onCloseButton'
    }, 
    '->',{
        minWidth: 80,
        text: 'Tìm sản phẩm',
        iconCls: 'x-fa fa-search',
        handler: 'onSearchButton'
    }],    
});
