Ext.define('GSmartApp.view.porders.POrderBySaleRequest', {
    extend: 'Ext.grid.Panel',
    xtype: 'porderbysalerequest',
    reference: 'porderbysalerequest',
    requires: [
        'GSmartApp.store.POrderFilter',
        'Ext.Number',
        'Ext.Date',
        'Ext.grid.column.Widget',
        'Ext.ProgressBarWidget'    
    ],
    controller: 'porderbysalerequest',
    store: {
        type: 'porderbysalerequest'
    },
    columnLines: true,
    selModel: 'rowmodel',
    features: [{
        ftype: 'summary',
        dock: 'bottom'
    }], 
    viewConfig: {
        enableTextSelection: true,
        stripeRows: false,
     },
    columns: [
        { 
			xtype: 'actioncolumn',
			width: 25,
			menuDisabled: true,
            sortable: false,
            locked: true,
            iconCls: 'x-fa fas fa-picture-o',
            handler: 'onImageViewClick' 
		},        
        { header: 'Mã SX', locked: true, dataIndex: 'ordercode', width: 80,
            editor: {xtype: 'textfield', readOnly: true},
            items: {
                xtype: 'textfield',
                fieldStyle: "",
                reference: 'porderFilterField',
                width: 75,
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
        //{ header: 'Mầu sắc', headerWrap: true, locked: true, dataIndex: 'mausac', width: 90},
        { header: 'SL Sale đặt', headerWrap: true, locked: true, dataIndex: 'soluongsaledat', width: 200},
        // { text: 'Mầu sắc', headerWrap: true, locked: true, width: 100,
        //     renderer: function (v, record) {
        //         return record.record._saleorder.data.items[0]? record.record._saleorder.data.items[0].get('mausac') : null;
        //     }
        // },
        //{ header: 'Lịch lên hàng', headerWrap: true, locked: true, dataIndex: 'golivedesc', width: 90},
        { header: 'Ngày vào chuyền', headerWrap: true, locked: true, dataIndex: 'productiondate', width: 80, renderer: Ext.util.Format.dateRenderer('d/m/Y')},
        { header: 'Dự kiến hoàn thành', headerWrap: true, locked: true, dataIndex: 'estcompletedate', width: 80, renderer: Ext.util.Format.dateRenderer('d/m/Y')},
        {
            text: 'Thực tế hoàn thành',
            locked: true, 
            xtype: 'widgetcolumn',
            width: 90,
            widget: {
                bind: '{record.complete_rate}',
                xtype: 'progressbarwidget',
                textTpl: [
                    '{percent:number("0")}%'
                ]
            }
        },
        { header: 'SL cắt', locked: false, dataIndex: 'amountcutsum', width: 70, summaryType: 'sum', summaryRenderer: 'renderSum',
            renderer: function (value, metaData, record, rowIndex) {
                var c = record.get('iscuttt');
                if (c == 0) {
                    metaData.tdCls = 'process-granted';
                } else {
                    metaData.tdCls =  'process-finish';
                }      
                return value;
            },        
        },
        { header: 'Vào chuyền', reference: 'pprocess_edit_amountinput', dataIndex: 'amountinputsum', width: 70, summaryType: 'sum', summaryRenderer: 'renderSum'},
        { header: 'Ra chuyền', reference: 'pprocess_edit_amountoutput', dataIndex: 'amountoutputsum', width: 70, summaryType: 'sum', summaryRenderer: 'renderSum'},
        //{ header: 'Nhập hoàn thiện', reference: 'pprocess_edit_amountstocked', dataIndex: 'amountstockedsum', width: 70, summaryType: 'sum', summaryRenderer: 'renderSum'},
        { header: 'Đóng gói', reference: 'pprocess_edit_amountpacked', dataIndex: 'amountpackedsum', width: 70, summaryType: 'sum', summaryRenderer: 'renderSum'},
        { header: 'Nhập thành phẩm', dataIndex: 'totalstocked', width: 80, summaryType: 'sum', summaryRenderer: 'renderSum'},
        { header: 'Còn lại', dataIndex: 'amountcut_stock', width: 65, summaryType: 'sum', summaryRenderer: 'renderSum'},        
        { header: 'Ghi chú', dataIndex: 'comment', flex: 1,},
    ],
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        items: [
            {
                xtype: 'combobox',
                width: '15%',
                editable: false,
                //margin: '0 5 0 5',
                fieldLabel: 'Giao SX',
                labelWidth: 50,
                store: {
                    type: 'porderdatesearch'
                },
                displayField: 'name',
                valueField: 'id',
                reference:'cboOrderDate'
            },
            {
                xtype: 'combobox',
                reference:'cboGoliveMonth',                
                width: 260,
                editable: false,
                //margin: '0 5 0 5',
                fieldLabel: 'Tháng/Năm lên hàng:',
                labelWidth: 140,
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
                minValue: Ext.Date.format(new Date(), 'Y') - 1,
                reference:'txtGoliveYear',
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
    },
    {
        dock: 'bottom',
        height: 40,
        xtype: 'toolbar',
        items: [
            { xtype: 'checkboxfield', id: 'chkFree', reference: 'chkFree', boxLabel:  '<span style="background-color:lightblue; color:black">' + 'Chưa phân chuyền' + '</span>', checked: true, listeners: {change:'onCheckStatusChange'}},
            { xtype: 'checkboxfield', id: 'chkGrant', reference: 'chkGrant', boxLabel:  'Chưa SX', checked: true, listeners: {change:'onCheckStatusChange'}},
            { xtype: 'checkboxfield', id: 'chkReady', reference: 'chkReady', boxLabel: '<span style="background-color:yellow; color:red">' + 'Chuẩn bị SX' + '</span>', checked: true, listeners: {change:'onCheckStatusChange'}},
            { xtype: 'checkboxfield', id: 'chkSubProcess', reference: 'chkSubProcess', boxLabel: '<span style="background-color:blue; color:yellow">' + 'Công đoạn phụ' + '</span>', checked: true, listeners: {change:'onCheckStatusChange'}},
            { xtype: 'checkboxfield', id: 'chkRunning', reference: 'chkRunning', boxLabel: '<span style="background-color:green; color:yellow">' + 'Đang SX' + '</span>', checked: true, listeners: {change:'onCheckStatusChange'}},
            { xtype: 'checkboxfield', id: 'chkDone', reference: 'chkDone', boxLabel: '<span style="background-color:lightgray; color:blue">' + 'Kết thúc SX' + '</span>', checked: true, listeners: {change:'onCheckStatusChange'}},
            { xtype: 'checkboxfield', id: 'chkPacked', reference: 'chkPacked', boxLabel: '<span style="background-color:red; color:yellow">' + 'Đóng gói xong' + '</span>', checked: true, listeners: {change:'onCheckStatusChange'}},
        ]
    }    
    ],
    listeners: {
        activate: 'onActivate'
    }
});
