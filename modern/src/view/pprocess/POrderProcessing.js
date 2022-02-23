Ext.define('GSmartApp.view.pprocess.POrderProcessing', {
    extend: 'Ext.form.Panel',
    xtype: 'lsporderprocessing',
    controller: 'POrderProcessingController',
	viewModel: {
        type: 'POrderProcessingViewModel'
    },
    requires: [
        'GSmartApp.store.POrderProcessing'
    ],
    layout: 'vbox',
    header: false,
    bodyPadding: 2,
    defaults: {
        margin:'0 0 10 0'
    },
    cls: 'porderprocessing-modern',

    items: [{
        layout: 'hbox',
        defaults: {
            margin:'5 5 0 5'
        },
        items: [{
            xtype: 'textfield',
            reference: 'porderFilterField',
            placeholder: 'Mã SX',
            maxWidth: 200,
            flex: 1,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onPOrderFilterKeyup',
                buffer: 500
            }
        }, {
            xtype: 'combobox',
            reference:'factorycombo',
            editable: false,
            maxWidth: 200,
            flex: 1,
            bind: {
                store:'{FactoryStore}'
            },
            displayField: 'name',
            valueField: 'id',
            listeners: {
                select: 'onFactoryItemSelected'
            }
        }, {
            xtype: 'combobox',
            reference:'orgcombo',
            editable: false,
            maxWidth: 200,
            flex: 1,
            bind: {
                store:'{ProductionLineStore}'
            },
            displayField: 'name',
            valueField: 'id',
            listeners: {
                select: 'onOrgItemSelected'
            }
        }]
    },{
        xtype: 'grid',
        height: '100%',
        width: '100%',
        features: [{
            id: 'group',
            ftype: 'grouping',
            groupHeaderTpl: '<b>Tổ sản xuất: {name}</b>',
            hideGroupedHeader: false,
            enableGroupingMenu: false
        }],
        columnLines: true,
        // viewConfig: {
        //     enableTextSelection: false,
        //     stripeRows: false,
        //  },
        bind: {
            store:'{POrderProcessingStore}'
        },
        cls: 'porderprocessing-modern-grid',
        columns: [{
            text: 'Mã SX',
            flex: 1,
            dataIndex: 'pordercode',
            renderer: function (value, record, dataIndex, cell, column ) {
                var c = record.data.status;
                if (c == 1) {
                    cell.setCls('process-granted');
                } else if (c == 2) {
                    cell.setCls('process-ready');
                } else if (c == 3) {
                    cell.setCls('process-subprocess');
                } else if (c == 4) {
                    cell.setCls('process-running');
                } else if (c == 5) {
                    cell.setCls('process-done');
                } else if (c == 6) {
                    cell.setCls('process-finish');
                }
                return value;
            },
        }, {
            text: 'PO Buyer',
            flex: 1,
            dataIndex: 'po_buyer'
        }, {
            text: 'PO Vendor',
            flex: 1,
            dataIndex: 'po_vendor'
        }],
        listeners: {
            // itemtap: 'onItemTap',
            childtap: 'onChildTap'
        },
    },{
        flex: 1,
        height: '70px'
    }],

    tbar: [{
        xtype:'button',
        iconCls: 'x-fa fa-arrow-left',
        itemId:'btnBack',
        ui: 'action',
    }]
});
