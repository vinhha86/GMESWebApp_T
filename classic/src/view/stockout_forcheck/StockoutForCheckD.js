Ext.define('GSmartApp.view.stockout.StockoutForCheckD', {
    extend: 'Ext.grid.Panel',
    xtype: 'stockoutforcheckd',
    requires: [
        'Ext.grid.Panel',
        'GSmartApp.store.Stockout_d_forcheck'
    ],
    title: 'Danh sách vải kiểm',
    layout: 'fit',
    border: true,
    scrollable: true,
    store: {
        type: 'stockout_d_forcheck'
    },
    features: [{
        ftype: 'summary',
        dock: 'bottom'
    }],  
    viewConfig: {
        enableTextSelection: false,
        stripeRows: false,
    },                  
    columns: [
        { header: 'Thẻ vải', dataIndex: 'skucode', width: 70,
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
        { header: 'Loại vải', dataIndex: 'skutype', width: 70},
        { header: 'Mầu vải', dataIndex: 'color_name', width: 150},
        { header: 'Mô tả', dataIndex: 'extrainfo', flex: 1},
        // { header: 'Ngày kiểm', dataIndex: 'stockoutdate', renderer: Ext.util.Format.dateRenderer('d/m/y'), width: 70},                             
        {
            xtype: 'actioncolumn',
            reference: 'porderprocessing_contextmenu',
            width: 25,
            menuDisabled: true,
            sortable: false,
            renderer: function (value, metadata, record) {
                if (record.get('status') > 0) {
                    this.iconCls = 'x-fa fas fa-trash-o greyIcon';
                    this.tooltip = 'Đã xuất kho';                    
                }
                else {
                    this.iconCls = 'x-fa fas fa-trash-o redIcon';
                    this.tooltip = 'Xóa thẻ vải';  
                }
            },            
            handler: 'onStockoutItemDelete'
        }  
    ],
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        items: [
            {
                xtype: 'textfield',
                margin: '0 0 0 5',
                name: 'txtskucode',
                reference:'txtskucode',
                fieldLabel: 'Thẻ vải:',
                width: 160,
                labelWidth: 50,
                hideLabel: false,
                fieldStyle: {
                    textTransform: "uppercase"
                },
                enableKeyEvents: true,
                listeners: {
                    // change: function (obj, newValue) {
                    //     //console.log(newValue);
                    //     obj.setRawValue(newValue.toUpperCase());
                    // },
                    keyup: 'onSkuCodeKeyup',
                    buffer: 100
                }    
            },
            {
                tooltip: 'Thêm thẻ vải vào danh sách kiểm',
                margin: '0 0 0 5',
                //text: 'Thêm thẻ vải',
                iconCls: 'x-fa fa-plus',
                weight: 30,
                handler: 'onAddItemTap'
            },
            {
                tooltip: 'Tìm thẻ vải',
                margin: '0 0 0 5',
                //text: 'Thêm thẻ vải',
                iconCls: 'x-fa fa-search',
                weight: 30,
                handler: 'onSkuSearchTap'
            }                 
    ]
    }],
    listeners: {
        select: 'onStockoutDItemSelected'
    }           
});
