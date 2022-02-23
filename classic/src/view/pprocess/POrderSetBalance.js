Ext.define('GSmartApp.view.pprocess.POrderSetBalance', {
    extend: 'Ext.window.Window',
    xtype: 'pordersetbalance',
    controller: 'pordersetbalance',
    title: 'Cân đối nguyên phụ liệu',
    viewModel: 'pordersetbalance',
    width: 950,
    height: 600,
    // layout: 'hbox',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    modal: true,
    items:[
        {
            xtype: 'form',
            width: 280,
            bodyPadding: 10,
            layout: 'vbox',
            items: [{
                xtype: 'textfield',
                readOnly: true,
                height: 30,
                width: 250,
                textAlign: 'right',
                anchor: '100%',            
                fieldLabel: 'Mã SX:',
                labelAlign: 'left',
                labelWidth: 100,
                bind: '{ordercode}',
            },{
                xtype: 'radiogroup',
                height: 30,
                fieldLabel: 'Trạng thái NPL',
                labelAlign: 'left',
                labelWidth: 100,            
                reference: 'rdogrp_balance_status',
                layout: 'column',
                defaultType: 'container',
                //publishes: ['checked','items'],
                simpleValue: true,
                //bind: {value: '{balance_status}'},
                items: [{
                    columnWidth: 0.5,
                    items:[{xtype: 'radiofield', id: 'rdo_balance_status_ok', name: 'rdo_balance_status', boxLabel: 'Đã về', inputValue: 1}]
                },{
                    columnWidth: 0.5,
                    margin: '0 0 0 10',
                    items:[{xtype: 'radiofield', id: 'rdo_balance_status_notok', name: 'rdo_balance_status', boxLabel: 'Chưa về', inputValue: 0, checked: true}]
                }]
            },{
                xtype: 'datefield',
                height: 30,
                width: 250,
                anchor: '100%',            
                fieldLabel: 'Dự kiến về:',
                labelAlign: 'left',
                labelWidth: 100,
                format: 'd/m/Y',
                reference:'balance_date',
                name: 'balance_date',
                bind: '{balance_date}'
                //value: new Date()  // defaults to today
            }]
        },
        {
            xtype:'grid',
            reference:'gridBalance',
            // height:550,
            flex: 1,
            border: true,
            columnLines:true,
            scrollable: true,
            autoLoad: true,
            store: {
                type: 'stockout_d_balance'
            },  
            features: [{
                id: 'group',
                ftype: 'groupingsummary',
                groupHeaderTpl: '<b>Mã vải chính: {name} </b>',
                hideGroupedHeader: false,
                enableGroupingMenu: false
            },{
                ftype: 'summary',
                dock: 'bottom'
            }],                 
            viewConfig: {
                enableTextSelection: true,
                stripeRows: false
            },
            columns: [
                // { header: 'Mã vải chính', dataIndex: 'mainskucode', width: 70},
                { header: 'Mã NPL', dataIndex: 'skucode', flex: 1},
                { header: 'Loại NPL', dataIndex: 'skutype', width: 80},  
                { header: 'Khổ vải', dataIndex: 'widthorder', width: 80},   
                // { header: 'Màu vải', dataIndex: 'amountinputsum', width: 70},   
                { header: 'Mã màu', dataIndex: 'color_code', width: 80},                                      
                { header: 'Yêu cầu KT', dataIndex: 'totalorder_tech', width: 65, 
                    summaryType: 'sum', summaryRenderer: 'renderSum'
                },          
                { header: 'Kiểm đo', dataIndex: 'totalydscheck', width: 65, 
                    summaryType: 'sum', summaryRenderer: 'renderSum'
                },
                { header: 'Khử co', dataIndex: 'totalydsprocessed', width: 65, 
                    summaryType: 'sum', summaryRenderer: 'renderSum'
                },
                { header: 'Xuất cắt', dataIndex: 'totalydsstockout', width: 65, 
                    summaryType: 'sum', summaryRenderer: 'renderSum'
                }, 
                { header: 'Chênh lệch', dataIndex: 'totaldif', width: 65, 
                    summaryType: 'sum', summaryRenderer: 'renderSum', renderer: 'renderCell'
                }
            ]	            
        }
    ],
    fbar: [{
        minWidth: 80,
        text: 'Xác nhận',
        handler: 'onSelectButton'
    }, {
        minWidth: 80,
        text: 'Đóng',
        handler: 'onCloseButton'
    }],
    listeners: {
        activate: 'onActivate'
    } 
});
