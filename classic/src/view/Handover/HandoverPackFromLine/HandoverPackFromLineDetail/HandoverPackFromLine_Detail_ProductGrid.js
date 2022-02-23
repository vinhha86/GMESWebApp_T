Ext.define('GSmartApp.view.handover.HandoverPackFromLine_Detail_ProductGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'HandoverPackFromLine_Detail_ProductGrid',
    id: 'HandoverPackFromLine_Detail_ProductGrid',
    reference: 'HandoverPackFromLine_Detail_ProductGrid',
    viewConfig: {
        stripeRows: true,
        columnLines: true,
        rowLines: true
    },
    plugins: {
        cellediting: {
            clicksToEdit: 1,
            listeners: {
                edit: 'onEditProductTotalPackage'
            } 
        }
    },
    bind: {
        store: '{HandoverProductStore}'
    },
    columns: [{
        text: 'STT',
        width: 50,
        xtype: 'rownumberer',
        align: 'center'
    }, {
        text: 'Mã SP(Buyer)',
        dataIndex: 'buyercode',
        flex: 1,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    }, {
        text: 'Tên SP(Buyer)',
        dataIndex: 'buyername',
        flex: 1,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    }, {
        text: 'SL giao',
        dataIndex: 'totalpackage',
        // editor:{
        //     xtype:'textfield',
        //     maskRe: /[0-9]/,
        //     selectOnFocus: true
        // },
        renderer: function(value){
            return Ext.util.Format.number(parseFloat(value), '0,000');
        },
        flex: 1,
        align: 'end'
    }, {
        text: 'SL nhận',
        dataIndex: 'totalpackagecheck',
        editor:{
            xtype:'textfield',
            maskRe: /[0-9]/,
            selectOnFocus: true
        },
        renderer: function(value){
            return Ext.util.Format.number(parseFloat(value), '0,000');
        },
        flex: 1,
        align: 'end'
    }, {
        text: 'Đơn vị tính',
        dataIndex: 'unitName',
        flex: 1,
    }],
});

