Ext.define('GSmartApp.view.pcontract.Report_CMP_ReqIncluded', {
    extend: 'Ext.pivot.Grid',
    xtype: 'Report_CMP_ReqIncluded',
    controller: 'Report_CMP_Controller',
    viewModel: {
        type: 'Report_CMP_ViewModel'
    },    
    requires: [
        'Ext.pivot.plugin.Exporter',
        'Ext.pivot.plugin.Configurator'
    ],
    // title: 'Bảng Tổng hợp CMP',
    // width: 750,
    // height: 350,
    // collapsible: true,
    multiSelect: true,
    columnLines: true,
    viewConfig: {
        scrollable: true,
    },

    selModel: {
        type: 'rowmodel'
    },
    bind:{
        store:'{CMPReportStore}'
    },
    plugins: {
        pivotexporter: true
    },       
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
        textRowLabels: 'Đơn vị',
        compactViewColumnWidth: 110,
        rowGrandTotalsPosition: 'last',
        colGrandTotalsPosition: 'none',
        textGrandTotalTpl: 'Tổng:',
        textTotalTpl: 'Tổng ({name})',
        // Configure the aggregate dimensions. Multiple dimensions are supported.
        aggregate: [{
            dataIndex: 'cmpamount',
            header: 'Tổng',
            aggregator: 'sum',
            width: 90,
            renderer: function(value){
                return Ext.util.Format.number(value, '0,000');
            }
        }],

        // Configure the left axis dimensions that will be used to generate
        // the grid rows
        leftAxis: [
            {
                id: 'parentorgcode',
                dataIndex: 'parentorgname',
                header: 'Phân xưởng',
                width: 65
            }, 
            {
                dataIndex: 'orgname',
                header: 'Tổ SX',
                sortable: false,
                width: 65
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
                dataIndex: 'year',
                header: 'Năm'
            },            
            {
                dataIndex: 'month',
                header: 'Tháng',
                labelRenderer: 'monthLabelRenderer'
            }
        ]
    },
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        items: [
        {
            xtype:'displayfield',
            fieldStyle: "font-weight: bold; font-size: 14px; color: black;",
            labelWidth : 0,
            value: 'Bảng Tổng hợp giá gia công (CMP)'
        },
        '->'
        ,            
        {
            xtype: 'combobox',
            id: 'Report_CMP_cmpoption',
            width: 200,
            editable: false,
            //margin: '0 5 0 5',
            fieldLabel: 'Nhìn trước:',
            labelWidth : 70,
            store: {
                type: 'CMPOptionStore'
            },
            displayField: 'name',
            valueField: 'id'
        },{
            tooltip: 'Tải lại bảng CMP',
            iconCls: 'x-fa fa-refresh',
            weight: 30,
            handler: 'onRefreshTap'
        },{
            tooltip: 'Xuất Excel',
            iconCls: 'x-fa fa-file-excel-o',
            weight: 30,
            handler: 'onExportExcel'
        },
        // {
        //     tooltip: 'Zoom',
        //     iconCls: 'x-fa fa-arrows-h',
        //     weight: 30,
        //     handler: 'onZoom'
        // }
    ]
    }],
    listeners: {
        // pivotgroupexpand: 'onPivotGroupExpand',
        // pivotgroupcollapse: 'onPivotGroupCollapse',
        // celldblclick: 'onPivotgroupdblclick',
        pivotitemdblclick: 'onPivotitemdblclick'
    },
});