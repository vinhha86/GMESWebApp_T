Ext.define('GSmartApp.view.stockout.StockoutForCheckReport', {
    extend: 'Ext.grid.Panel',
    xtype: 'stockoutforcheckreport',
    requires: [
        'Ext.grid.Panel',
        'GSmartApp.store.Stockout_forcheck_report',
    ],
    //title: 'Báo cáo kiểm vải',
    controller: 'stockoutforcheckreport',
    layout: 'fit',
    // border: true,
    scrollable: true,
    store: {
        type: 'stockoutforcheckreport'
    },
    features: [{
        ftype: 'summary',
        dock: 'bottom'
    }],  
    viewConfig: {
        enableTextSelection: true,
        stripeRows: false,
    },   
    plugins: {
        gridexporter: true
    },               
    columns: [
        { header: 'Thẻ vải', dataIndex: 'skucode', width: 80,
            //editor: {xtype: 'textfield', readOnly: true},
            items: {
                xtype: 'textfield',
                fieldStyle: "",
                reference: 'materialFilterField',
                width: 65,
                margin: 2,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onMaterialFilterKeyup',
                    buffer: 500
                }
            },
            summaryType: 'count', summaryRenderer: 'renderSummary'                   
        },
        { header: 'Loại vải', dataIndex: 'skutype', width: 120},
        { header: 'Mầu vải', dataIndex: 'color_name', flex: 1},
        { header: 'SL cây kiểm', dataIndex: 'packagecheck', width: 100, 
            summaryType: 'sum', summaryRenderer: 'renderSummary'
        },
        { header: 'SL cây khử co', dataIndex: 'packageprocessed', width: 100, 
            summaryType: 'sum', summaryRenderer: 'renderSummary'
        },        
        { header: 'SL hóa đơn', dataIndex: 'ydsorigin', width: 100, 
            renderer: 'renderCell',
            summaryType: 'sum', summaryRenderer: 'renderSummary',
            exportStyle: {
                format: '0.00',
                alignment: {
                    horizontal: 'Right'
                }
            }                    
        },
        { header: 'SL sau kiểm', dataIndex: 'ydscheck', width: 100, 
            renderer: 'renderCell',
            summaryType: 'sum', summaryRenderer: 'renderSummary',
            exportStyle: {
                format: '0.00',
                alignment: {
                    horizontal: 'Right'
                }
            }            
        },
        { header: 'Chênh lệch sau kiểm', dataIndex: 'ydscheck_dif', width: 100, 
            renderer: 'renderCell',
            summaryType: 'sum', summaryRenderer: 'renderSummary',
            exportStyle: {
                format: '0.00',
                alignment: {
                    horizontal: 'Right'
                }
            }        
        },        
        { header: 'SL sau khử co', dataIndex: 'ydsprocessed', width: 100, 
            renderer: 'renderCell',
            summaryType: 'sum', summaryRenderer: 'renderSummary',
            exportStyle: {
                format: '0.00',
                alignment: {
                    horizontal: 'Right'
                }
            }        
        },
        { header: 'Chênh lệch sau khử co', dataIndex: 'ydsprocessed_dif', width: 100, 
            renderer: 'renderCell',
            summaryType: 'sum', summaryRenderer: 'renderSummary',
            exportStyle: {
                format: '0.00',
                alignment: {
                    horizontal: 'Right'
                }
            }        
        },          
        { header: 'SL lỗi', dataIndex: 'totalerror', width: 100, 
            renderer: 'renderCell',
            summaryType: 'sum', summaryRenderer: 'renderSummary',
            exportStyle: {
                format: '0.00',
                alignment: {
                    horizontal: 'Right'
                }
            }        
        },
        { 
            xtype: 'actioncolumn',
            reference: 'stockout_contextmenu',
            width: 25,
            menuDisabled: true,
            sortable: false,
            items: [
            {
                iconCls: 'x-fa fas fa-bars violetIcon',
                tooltip:'Chi tiết kiểm đo',
                handler: 'onCheckDetail'
                //handler: 'onMenu'
            }
        ]
        }

    ],
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        items: [
            {
                xtype: 'radiogroup',
                reference:'forcheckR_rdoStockoutType',
                simpleValue: true,
                width: 250,
                cls: 'x-check-group-alt',
                items: [
                    { boxLabel: 'Kết hợp', inputValue: -1, checked: true},
                    { boxLabel: 'Kiểm vải', inputValue: 0, margin: '0 0 0 5'},
                    { boxLabel: 'Khử co', inputValue: 1, margin: '0 0 0 5'}
                ]       
            },               
            {
                xtype: 'datefield',
                fieldLabel: 'Kiểm từ ngày:',
                labelWidth: 90,
                width: 220,
                format: 'd/m/Y',
                reference:'stockoutdate_from',
                //value: Ext.Date.add (new Date(),Ext.Date.DAY,-5),  // defaults to today
                value: new Date()  // defaults to today
            }, 
            {
                xtype: 'datefield',
                fieldLabel: 'đến ngày:',
                margin: '0 0 0 5',
                labelWidth: 70,
                width: 200,
                format: 'd/m/Y',
                reference:'stockoutdate_to',
                value: new Date(),  // defaults to today
            }, 
            {
                xtype: 'button',
                margin: '0 0 0 5',
                //text: 'Tìm kiếm',
                iconCls: 'x-fa fa-search',
                weight: 30,
                handler: 'onSearchTap'
            } ,
            {
                xtype: 'button',
                margin: '0 0 0 5',
                text: 'Xuất ra Excel',
                iconCls: 'x-fa fa-table',
                weight: 30,
                handler: 'onExportExcel'
            }                   
    ]
    }]        
});
