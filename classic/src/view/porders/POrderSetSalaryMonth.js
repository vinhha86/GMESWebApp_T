Ext.define('GSmartApp.view.porders.POrderSetSalaryMonth', {
    extend: 'Ext.grid.Panel',
    xtype: 'pordersetsalarymonth',
    reference: 'pordersetsalarymonth',
    requires: [
        'GSmartApp.store.POrderSetSalaryMonth',
        'Ext.Number',
        'Ext.Date'
    ],
    controller: 'pordersetsalarymonth',
    // collapseDirection: 'right',
    // collapseFirst: true,
    // collapsed: true,
    // collapsible: true,
    //collapseMode: 'mini',
    //closeToolText: 'Lệnh tính lương',
    title: 'Lệnh tính lương',    
    store: {
        type: 'pordersetsalarymonth'
    },
    columnLines: true,
    multiSelect: true,
    selModel: 'rowmodel',
    features: [{
        id: 'group',
        ftype: 'groupingsummary',
        groupHeaderTpl: '<b>Tổ sản xuất: {name}</b>',
        hideGroupedHeader: false,
        enableGroupingMenu: false
    },{
        ftype: 'summary',
        dock: 'bottom'
    }], 
    viewConfig: {
        //enableTextSelection: true,
        stripeRows: false,
        plugins: {
            ptype: 'gridviewdragdrop',
            dragText: '{0} Mã sản xuất hủy tính lương',
            dragGroup: 'secondGridDDGroup',
            dropGroup: 'firstGridDDGroup'
        },
        listeners: {
            drop: 'onDrop',
            beforedrop: 'onBeforeDrop'
        }        
     },
    columns: [
        { header: 'Mã SX', locked: false, dataIndex: 'ordercode', width: 70,
            editor: {xtype: 'textfield', readOnly: true},
            items: {
                xtype: 'textfield',
                fieldStyle: "",
                reference: 'porderFilterField_Salary',
                width: 65,
                margin: 2,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onPOrderFilterKeyup',
                    buffer: 500
                }
            },
            renderer: function (value, metaData, record, rowIndex) {
                var c = record.get('status');
                if (c == 1) {
                    metaData.tdCls = 'process-granted';
                } else if (c == 2) {
                    metaData.tdCls =  'process-ready';
                } else if (c == 3) {
                    metaData.tdCls =  'process-running';
                } else if (c == 4) {
                    metaData.tdCls =  'process-done';
                } else if (c == 5) {
                    metaData.tdCls =  'process-finish';
                } else if (c == 6) {
                    metaData.tdCls =  'process-subprocess';
                } else if (c == 0) {
                    metaData.tdCls =  'process-free';
                }              
                //metaData.tdCls = record.get('change') > 0 ? 'color-other' : 'color-gio';
                // if (null != record.get('productiondate')){
                //     metaData.tdAttr = 'data-qtip="' + Ext.util.Format.date(record.get('productiondate'),'d/m/Y') + '"';
                // }
                return value;
            },
            summaryType: 'count', summaryRenderer: 'renderSum'                   
        },
        { header: 'Vào chuyền', reference: 'pprocess_edit_amountinput', dataIndex: 'amountinputsum', width: 80, summaryType: 'sum', summaryRenderer: 'renderSum'},
        { header: 'Ra chuyền', reference: 'pprocess_edit_amountoutput', dataIndex: 'amountoutputsum', width: 80, summaryType: 'sum', summaryRenderer: 'renderSum'},
        { header: 'Nhập kho', reference: 'pprocess_edit_amountstocked', dataIndex: 'amountstockedsum', width: 80, summaryType: 'sum', summaryRenderer: 'renderSum'},
        { header: 'Đóng gói', reference: 'pprocess_edit_amountpacked', dataIndex: 'amountpackedsum', flex: 1, summaryType: 'sum', summaryRenderer: 'renderSum'},
    ],
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        items: [
            {
                xtype: 'combobox',
                width: 100,
                editable: false,
                //margin: '0 5 0 5',
                // fieldLabel: 'Tổ SX',
                // labelWidth: 40,
                store: {
                    type: 'orgtosx'
                },
                displayField: 'name',
                valueField: 'id',
                reference:'cboOrg_Salary',
                listeners: {
                    select: 'onOrgItemSelected'
                }                
            },
            {
                xtype: 'combobox',
                reference:'cbosalarymonth_Salary',                
                width: 150,
                editable: false,
                //margin: '0 5 0 5',
                // fieldLabel: 'Tháng/Năm TL:',
                // labelWidth: 95,
                store: {
                    type: 'monthstore'
                },
                displayField: 'name',
                valueField: 'id',
                listeners: {
                    select: 'onMonthItemSelected'
                }                
            },            
            {
                xtype: 'numberfield',
                clearable: false,
                hideTrigger:true,
                allowBlank: true, 
                minValue: Ext.Date.format(new Date(), 'Y') - 10,
                reference:'txtsalaryyear_Salary',
                width: 60,
                hideLabel: false,
                emptyText: 'Năm',
                //value: Ext.Date.format(new Date(), 'Y')
            },                        
            {
                tooltip: 'Tìm kiếm lệnh',
                iconCls: 'x-fa fa-search',
                weight: 30,
                handler: 'onSearchTap'
            }
    ]
    }]
});
