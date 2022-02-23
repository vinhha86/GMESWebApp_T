Ext.define('GSmartApp.view.handover.HandoverDetailPorderSearch', {
    extend: 'Ext.grid.Grid',
    xtype: 'HandoverDetailPorderSearch',
    id: 'HandoverDetailPorderSearch',
    reference: 'HandoverDetailPorderSearch',
    controller: 'HandoverDetailPorderSearchController',
    viewModel:{
        type:'HandoverDetailPorderSearchViewModel'
    },

    height: '100%',
    width: '100%',

    selectable: {
        rows: false,
        cells: true
    },

    bind: {
        store:'{POrder_ListStore}'
    },

    hideHeaders: true,

    columns: [{
        text: 'Mã lệnh',
        flex: 1,
        dataIndex: 'ordercode',
        // editable: true
    }],
});

