Ext.define('GSmartApp.view.stockout.StockoutForCheckPklistSelect', {
    extend: 'Ext.grid.Panel',
    xtype: 'stockoutforcheckpklistselect',
    requires: [
        'Ext.grid.Panel',
        'GSmartApp.store.Stockout_pklist_select'
    ],
    // title: 'Danh sách cây vải',
    layout: 'fit',
    border: true,
    scrollable: true,
    store: {
        type: 'stockout_pklist_select'
    },
    flex: 1,
    viewConfig: {
        enableTextSelection: false,
        stripeRows: false,
    },                  
    columns: [
        { text: 'Theo hóa đơn',flex: 1,
            columns:[
                { text: 'SL', dataIndex: 'ydsorigin', width: 70, summaryType: 'sum', summaryRenderer: 'renderSummary',
                },                
                { text: 'Khổ', dataIndex: 'widthorigin', width: 70, summaryType: 'count', summaryRenderer: 'renderSummary',
                }
            ]
        },
        { text: 'Sau kiểm vải', flex: 1,
            columns:[
                { text: 'SL', dataIndex: 'ydscheck', width: 70, summaryType: 'sum', summaryRenderer: 'renderSummary',
                },                
                { text: 'Khổ', dataIndex: 'widthcheck', width: 70, name: 'widthcheck',
                },        
                { text: 'Lỗi', dataIndex: 'totalerror', width: 70, summaryType: 'sum', summaryRenderer: 'renderSummary',
                },
                { text: 'Chênh lệch', headerWrap: true, dataIndex: 'dif_checked', width: 70,
                    renderer: 'renderCell',
                    summaryType: 'sum', summaryRenderer: 'renderSummary'
                }                                
            ]
        },
        { text: 'Sau xử lý vải', flex: 1,
            columns:[
                { text: 'SL', dataIndex: 'ydsprocessed', width: 70, summaryType: 'sum', summaryRenderer: 'renderSummary',
                },                
                { text: 'Khổ', dataIndex: 'widthprocessed', width: 70,
                },        
                { text: 'Chênh lệch', headerWrap: true, dataIndex: 'dif_processed', width: 70, 
                    renderer: 'renderCell',
                    summaryType: 'sum', summaryRenderer: 'renderSummary'
                }
            ]
        },
        { header: 'Ghi chú', dataIndex: 'extrainfo', flex: 1,
            editable: true,
            editor: {
                xtype: 'textfield'
            }              
        },
    ],
    fbar: [{
        minWidth: 80,
        text: 'Chọn',
        handler: 'onSelectButton'
    }, {
        minWidth: 80,
        text: 'Đóng',
        handler: 'onCloseButton'
    }],    
});
