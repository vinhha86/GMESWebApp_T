Ext.define('GSmartApp.view.dashboard_kho.Dashboard_Kho_View', {
    extend: 'Ext.form.Panel',
    xtype: 'Dashboard_Kho_View',
    id: 'Dashboard_Kho_View',
    viewModel: {
        type: 'Dashboard_Kho_ViewModel'
    },
    layout: 'border',
    items: [{
        region: 'north',
        height: 300,
        xtype: 'KeHoachVaoChuyenView'
    }, {
        region: 'center',
        title: 'Lệnh xuất vải',
        xtype: 'StockoutOrderMaterialView'
    }]
});
