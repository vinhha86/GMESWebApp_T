Ext.define('GSmartApp.view.pcontract.PContractProduct_Bom_TabColorView', {
    extend: 'Ext.tab.Panel',
    xtype: 'PContractProduct_Bom_TabColorView',
    id: 'PContractProduct_Bom_TabColorView',
    itemId: 'PContractProduct_Bom_TabColorView',
    controller: 'PContractProduct_Bom_TabColorViewController',
    // tabPosition: 'right',
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        border: true,
        height: 45,
        style: "background-color : white",
        items: [
            {
                xtype: 'button',
                itemId: 'btnAddMaterial_Bom',
                text: 'Thêm NPL',
                margin: 3,
                iconCls: 'x-fa fa-plus'
            },
            {
                xtype: 'combo',
                width:400,
                margin: 3,
                bind: {
                    store: '{PContractProductStore}',
                    value: '{IdProduct}',
                    readOnly: '{isReadOnlycmbSanPham}'
                },
                fieldLabel: 'Sản phẩm',
                labelWidth: 80,
                itemId: 'cmbSanPham',
                queryMode: 'local',
				anyMatch: true,
                editable: false,
                valueField: 'productid_link',
                displayField: 'productBuyerCode'
            },
            {
                xtype:'button',
                text: 'Chốt định mức',
                itemId:'btnConfirmBOM1',
                // ui: 'header',
                tooltip: 'Chốt định mức hải quan',
                iconCls: 'x-fa fa-check greenIcon',
                // handler: 'onFactoriesTap',
            }            
        ]
    }]
})