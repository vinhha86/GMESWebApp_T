Ext.define('GSmartApp.view.stockout.StockoutForCheckReportDWindow', {
    extend: 'Ext.window.Window',
    xtype: 'stockoutforcheckreportdwindow',
    requires: [
        'Ext.grid.Panel'
    ],
    viewModel: 'stockoutforcheckreport',
    controller: 'stockoutforcheckreportd',
    title: '',
    header: false,
    width: 930,
    height: 500,
    margin:10,
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'grid',
            title: 'Cây vải kiểm chưa khử co',
            reference: 'grd_pklistcheck',
            padding: 5,
            border: true,
            bind: '{stockout_d.checkpklist}',
            width: 320,
            viewConfig: {
                enableTextSelection: false,
                stripeRows: false,
            }, 
            features: [{
                ftype: 'summary',
                dock: 'bottom'
            }],
            columns: [
                // { header: 'Mã NPL', dataIndex: 'skucode', flex: 1},
                { text: 'Theo HĐ',
                    columns:[
                        { text: 'Khổ', dataIndex: 'widthorigin', width: 70, summaryType: 'count', summaryRenderer: 'renderSummary'},        
                        { text: 'SL', dataIndex: 'ydsorigin', width: 70, summaryType: 'sum', summaryRenderer: 'renderSummary'}
                    ]
                },
                { text: 'Sau kiểm', 
                    columns:[
                        { text: 'Khổ', dataIndex: 'widthcheck', width: 70},        
                        { text: 'SL', dataIndex: 'ydscheck', width: 70, summaryType: 'sum', summaryRenderer: 'renderSummary',
                        renderer: function (value, metaData, record, rowIndex) {
                            metaData.tdCls = record.get('status') > 0 ? 'process-granted' : 'process-finish';
                            return value;
                        },
                    },
                        // { text: 'Trạng thái', dataIndex: 'status', width: 70, summaryType: 'sum', summaryRenderer: 'renderSummary'},                
                    ]
                }                         
            ]            
        },
        {
            xtype: 'panel',
            width: 5
        },
        {
            xtype: 'grid',
            title: 'Cây vải đã khử co',
            reference: 'grd_pklistcheck',
            padding: 5,
            layout: 'fit',
            border: true,
            scrollable: true,
            bind: '{stockout_d.processedpklist}',
            flex: 1,
            viewConfig: {
                enableTextSelection: false,
                stripeRows: false,
            }, 
            features: [{
                ftype: 'summary',
                dock: 'bottom'
            }],
            columns: [
                // { header: 'Mã NPL', dataIndex: 'skucode', flex: 1},
                { text: 'Theo HĐ',
                    columns:[
                        { text: 'Khổ', dataIndex: 'widthorigin', width: 70, summaryType: 'count', summaryRenderer: 'renderSummary'},        
                        { text: 'SL', dataIndex: 'ydsorigin', width: 70, summaryType: 'sum', summaryRenderer: 'renderSummary'}
                    ]
                },
                { text: 'Sau kiểm', 
                    columns:[
                        { text: 'Khổ', dataIndex: 'widthcheck', width: 70},        
                        { text: 'SL', dataIndex: 'ydscheck', width: 70, summaryType: 'sum', summaryRenderer: 'renderSummary'},
                        { text: 'Lỗi', dataIndex: 'totalerror', width: 70, summaryType: 'sum', summaryRenderer: 'renderSummary'},                
                    ]
                },
                { text: 'Sau khử co', 
                    columns:[
                        { text: 'Khổ', dataIndex: 'widthprocessed', width: 70},        
                        { text: 'SL', dataIndex: 'ydsprocessed', width: 70, summaryType: 'sum', summaryRenderer: 'renderSummary'},
                        { text: 'Chênh lệch', dataIndex: 'dif_processed', width: 70, summaryType: 'sum', summaryRenderer: 'renderSummary', renderer: 'renderCell'},
                    ]
                }                               
            ] 
        }
    ],
    fbar: [{
        minWidth: 80,
        text: 'Đóng',
        handler: 'onCloseButton'
    }]     
});
