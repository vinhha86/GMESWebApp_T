Ext.define('GSmartApp.view.porders.POrder_List.PorderBom.PorderBom_TabColor', {
    extend: 'Ext.tab.Panel',
    xtype: 'PorderBom_TabColor',
    id: 'PorderBom_TabColor',
    controller: 'PorderBom_TabColor_ViewController',
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
                text: 'Đồng bộ định mức cân đối',
                margin: 3,
                itemId: 'btnDongBo',
                iconCls: 'x-fa fa-refresh',
            },
            {
                xtype: 'button',
                text: 'Chốt định mức',
                itemId: 'btnConfirmBOM_POrder',
                // ui: 'header',
                tooltip: 'Chốt định mức sản xuất',
                iconCls: 'x-fa fa-check greenIcon',
                // handler: 'onFactoriesTap',
            }
        ]
    }]
})