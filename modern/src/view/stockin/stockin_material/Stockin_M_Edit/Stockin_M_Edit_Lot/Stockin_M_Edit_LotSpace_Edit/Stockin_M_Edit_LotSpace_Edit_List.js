Ext.define('GSmartApp.view.stockin.stockin_material.stockin_m_edit.Stockin_M_Edit_LotSpace_Edit_List', {
    extend: 'Ext.grid.Grid',
    xtype: 'Stockin_M_Edit_LotSpace_Edit_List',
    itemId: 'Stockin_M_Edit_LotSpace_Edit_List',
    // viewModel: {
    //     type: 'HandoverDetailViewModel'
    // },
    cls: 'Stockin_M_Edit_LotSpace_Edit_List',
    // controller: 'Stockin_M_Edit_D_Controller',
    reference: 'Stockin_M_Edit_LotSpace_Edit_List',

    requires: [
        'Ext.grid.plugin.CellEditing'
    ],
    // height: '100%',
    // width: '100%',
    markDirty: false,
    columnLines: true,
    striped: false,

    plugins: {
        gridcellediting: {
            selectOnEdit: true
        },
    },

    selectable: {
        rows: true,
        cells: false
    },

    bind: {
        store:'{stockinLot.stockin_lot_space}'
    },

    columns: [
        {
            text: '',
            width: 60,
            xtype: 'rownumberer',
            align: 'center'
        },
        {
            text: 'Khoang', 
            flex: 1,
            dataIndex: 'spaceepcid_link',
            renderer: function(value, record, dataIndex, cell, column) {
                // var spaceepcid_link = record.get('spaceepcid_link');
                // var totalpackage = record.get('totalpackage') == null ? 0 : record.get('totalpackage');
                // return spaceepcid_link + ' (' + totalpackage + ')';
                var spaceInfo = record.get('spaceInfo');
                var space = record.get('space');
                var totalpackage = record.get('totalpackage') == null ? 0 : record.get('totalpackage');
                return space + ' (' + totalpackage + ')';
                // return spaceInfo;
            },
        },
        {
            width: 50,
            hideable: false,
            align: 'center',

            cell: {
                tools: {
                    approve: {
                        iconCls: 'x-fa fa-trash',
                        handler: 'onLotSpaceDelete'
                    },
                }
            }
        }
    ],
});