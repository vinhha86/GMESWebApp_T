Ext.define('GSmartApp.view.pcontract.PContractProduct_Bom2_TabColorView', {
    extend: 'Ext.tab.Panel',
    xtype: 'PContractProduct_Bom2_TabColorView',
    id: 'PContractProduct_Bom2_TabColorView',
    itemId: 'PContractProduct_Bom2_TabColorView',
    controller: 'PContractProduct_Bom2_TabColorViewController',
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
                itemId: 'btnAddMaterial_Bom2',
                text: 'Thêm NPL',
                margin: 3,
                iconCls: 'x-fa fa-plus'
            },
            {
                xtype: 'combo',
                width: 400,
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
                valueField: 'productid_link',
                displayField: 'productBuyerCode'
            },
            {
                xtype: 'button',
                text: 'Chốt định mức',
                itemId: 'btnConfirmBOM2',
                // ui: 'header',
                tooltip: 'Chốt định mức cân đối',
                iconCls: 'x-fa fa-check greenIcon',
                // handler: 'onFactoriesTap',
            }
        ]
    }]
})