Ext.define('GSmartApp.view.salary.TimeSheet_Sum_D_WorkTable', {
    extend: 'Ext.pivot.Grid',
    xtype: 'TimeSheet_Sum_D_WorkTable',
    id:'TimeSheet_Sum_D_WorkTable',
    requires: [
        'Ext.pivot.plugin.Exporter',
        'Ext.pivot.plugin.Configurator',
        'Ext.pivot.plugin.CellEditing'
    ],
    multiSelect: true,
    columnLines: true,
    viewConfig: {
        scrollable: true,
        stripeRows: false
    },

    selModel: {
        type: 'rowmodel'
        // type: 'spreadsheet'
    },
    bind:{
        store:'{TimeSheetSumStore}'
    },
    // plugins: {
    //     // pivotexporter: true
    //     pivotcellediting: {
    //         clicksToEdit: 2,
    //         // define here the type of editing: 'overwrite', 'increment',
    //         // 'percentage', 'uniform'
    //         defaultUpdater: 'overwrite',
    //         listeners: {
    //             validateedit: 'onSalTypeLevel_Edit'
    //         }       
    //     }        
    // },       
    // Set this to false if multiple dimensions are configured on leftAxis and
    // you want to automatically expand the row groups when calculations are ready.
    enableLocking: true,
    startRowGroupsCollapsed: false,
    startColGroupsCollapsed: false,
    matrix: {
        type: 'local',
        // store: {
        //     type: 'CMPStore'
        // },

        // Set layout type to "outline". If this config is missing then the default
        // layout is "outline"
        viewLayoutType: 'compact',
        textRowLabels: 'Họ và tên',
        compactViewColumnWidth: 180,
        rowGrandTotalsPosition: 'none',
        colGrandTotalsPosition: 'none',
        textGrandTotalTpl: 'Tổng:',
        textTotalTpl: 'Tổng cộng',
        // textTotalTpl: 'Tổng ({name})',
        // Configure the aggregate dimensions. Multiple dimensions are supported.
        aggregate: [
            // {
            //     dataIndex: 'salratio',
            //     header: 'HS',
            //     width: 50,
            //     editor: {xtype: 'numberfield', hideTrigger:true, allowBlank: false, maxValue: 100, selectOnFocus: false},
            //     // renderer: function(value){
            //     //     return Ext.util.Format.number(value, '0,000');
            //     // }
            // },     
            {
                dataIndex: 'sumvalue',
                header: 'Lương',
                // aggregator: 'sum',
                width: 80,
                editor: {xtype: 'numberfield', hideTrigger:true, allowBlank: false, maxValue: 1000000000, selectOnFocus: false},
                renderer: function(value){
                    return Ext.util.Format.number(value, '0,000.00');
                }
            }
        ],

        // Configure the left axis dimensions that will be used to generate
        // the grid rows
        leftAxis: [
            {
                sortIndex: 'personel_fullname',
                dataIndex: 'personel_fullname',
                header: 'Họ và tên',
                sortable: false,
                width: 180
            }
        ],

        /**
         * Configure the top axis dimensions that will be used to generate
         * the columns.
         *
         * When columns are generated the aggregate dimensions are also used.
         * If multiple aggregation dimensions are defined then each top axis
         * result will have in the end a column header with children columns
         * for each aggregate dimension defined.
         */
        topAxis: [
            {
                dataIndex: 'sumcoltype_name',
                header: 'Nhóm',
                // labelRenderer: 'monthLabelRenderer'
            },
            {
                dataIndex: 'sumcol_code',
                sortIndex: 'sumcolid_link',
                header: 'Cột',
                // labelRenderer: 'monthLabelRenderer'
            }
        ]
    },
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        // padding: '0 0 5 5',
        height: 40,
        items: [
            {
                xtype: 'combobox',
                name: 'cbosalarymonth',
                reference:'cbosalarymonth',                
                width: 210,
                editable: false,
                //margin: '0 5 0 5',
                fieldLabel: 'Tháng/Năm TL:',
                labelWidth: 95,
                store: {
                    type: 'monthstore'
                },
                displayField: 'name',
                valueField: 'id',
                bind: {
                    value:'{month}'
                }       
            },            
            {
                xtype: 'numberfield',
                clearable: false,
                hideTrigger:true,
                allowBlank: true, 
                minValue: Ext.Date.format(new Date(), 'Y') - 10,
                name: 'txtsalaryyear',
                reference:'txtsalaryyear',
                width: 65,
                hideLabel: false,
                emptyText: 'Năm',
                bind: {
                    value:'{year}'
                }
            }, 
            {
                tooltip: 'Tải bảng công',
                iconCls: 'x-fa fa-refresh',
                weight: 30,
                handler: 'onReload_WorkTable'
            },
            {
                text: 'Tính công',
                iconCls: 'x-fa fa-calculator',
                weight: 30,
                handler: 'onCal_WorkTable'
            },
            '->',
            {
                text: 'Chốt bảng lương',
                iconCls: 'x-fa fa-check',
                weight: 30,
                handler: 'onConfirm_WorkTable'
            },
    ]
    }],
    listeners: {
        pivotgroupexpand: 'onPivotGroupExpand',
        pivotgroupcollapse: 'onPivotGroupCollapse',
        pivotupdate: 'onPivotUpdate',
        pivotitemclick: 'onPivotItemClick'
    },
});

