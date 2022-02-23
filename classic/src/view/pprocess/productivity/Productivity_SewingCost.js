Ext.define('GSmartApp.view.pprocess.Productivity_SewingCost', {
    extend: 'Ext.grid.Panel',
    xtype: 'Productivity_SewingCost',
    id: 'Productivity_SewingCost',
    // controller: 'Personnel_ListView_Controller',
    viewConfig: {
        stripeRows: false,
        columnLines: true,
        rowLines: true
    },
    plugins: {
        cellediting: {
            clicksToEdit: 1,
            listeners: {
                edit: 'onEditAmount'
            } 
        }
    },
    bind: {
        store: '{PorderSewingCostStore}'
    },
    columns: [{
        text: 'STT',
        width: 40,
        xtype: 'rownumberer',
        align: 'center'
    }, {
        text: 'Tên công đoạn',
        dataIndex: 'workingprocess_name',
        flex: 1,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    }, {
        text: 'Số lượng',
        dataIndex: 'amount_complete',
        editor:{
            xtype:'textfield',
            maskRe: /[0-9]/,
            selectOnFocus: true
        },
        // renderer: function(value){
        //     return Ext.util.Format.number(parseFloat(value), '0,000');
        // },
        flex: 1,
        align: 'end'
    }],
    dockedItems: [{
        dock: 'bottom',
        layout: 'hbox',
        border: false,
        items: [{
            flex:1
        },{
            xtype: 'button',
            margin: 5,
            text: 'Lưu',
            width: 90,
            itemId: 'btnLuu',
            iconCls: 'x-fa fa-save'
        }]
    }]
});

