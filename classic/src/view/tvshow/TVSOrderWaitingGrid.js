Ext.define('GSmartApp.view.dashboard.TVSOrderWaitingGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'tvsorderwaitinggrid',
    reference: 'tvsorderwaitinggrid',
    requires: [
        'GSmartApp.store.POrderWaiting',
        'Ext.Number'
    ],
    cls: 'tvs-header-row',
    // autoWidth: true,
    frame: true,
    layout: 'fit',
    //scrollable: true,
    store: {
        type: 'porderwaiting'
    },
    columnLines: true,
    renderTo: Ext.getBody(),   
    columns: [
        { header: 'YÊU CẦU NGUYÊN PHỤ LIỆU',
            columns: [
            { header: 'Mã SX', align: 'center', dataIndex: 'ordercode', width:70},
            { header: 'Tổ SX', align: 'center', dataIndex: 'granttolinename', width: 90},
            { header: 'Ngày vào chuyền', align: 'center', dataIndex: 'productiondate_str', flex: 1}
        ]}
    ],
    viewConfig: {
        getRowClass: function(record, index) {
            return 'tvs-grid-row';
        }
    }
});
