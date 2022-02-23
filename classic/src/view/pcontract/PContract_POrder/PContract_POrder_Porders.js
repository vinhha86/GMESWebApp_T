Ext.define('GSmartApp.view.pcontract.PContract_POrder_Porders', {
    extend: 'Ext.grid.Panel',
    xtype: 'PContract_POrder_Porders',
    id:'PContract_POrder_Porders',
    viewConfig: {
        stripeRows: false,
        enableTextSelection: true,
        columnLines: true,
        rowLines: true,
    },
    plugins: {
        cellediting: {
            clicksToEdit: 1,
            // listeners: {
            //     edit: 'onEdit'
            // } 
        }
    },
    features: [{
        ftype:'summary',
        groupHeaderTpl: 'Tổng',
        dock: 'bottom'
    }],
    selModel: {
        //selType: 'checkboxmodel',
        mode: 'SINGLE'
    },
    bind:{
        store:'{porderStore}'
    },
    columns:[
        {
            header:'Mã SP(Buyer)',
            dataIndex:'stylebuyer',
            flex: 1,
            renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            }
        },        
        {
            header:'Mã lệnh',
            dataIndex:'ordercode',
            flex: 1,
            renderer: function (value, metaData, record, rowIndex) {
                var c = record.get('status');
                if(c == 0){
                    metaData.tdCls = 'process-free';
                }else if (c == 1) {
                    metaData.tdCls = 'process-granted';
                } else if (c == 2) {
                    metaData.tdCls =  'process-ready';
                } else if (c == 3) {
                    metaData.tdCls =  'process-subprocess';
                } else if (c == 4) {
                    metaData.tdCls =  'process-running';
                } else if (c == 5) {
                    metaData.tdCls =  'process-done';
                } else if (c == 6) {
                    metaData.tdCls =  'process-finish';
                } 
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            },
        },        
        {
            header:'Ngày tạo lệnh',
            dataIndex:'orderdate',
            renderer: Ext.util.Format.dateRenderer('d/m/y'),
            width: 70
        },
        {
            header:'Dự kiến VC',
            dataIndex:'productiondate_plan',
            // renderer: Ext.util.Format.dateRenderer('d/m/y'),
            renderer: function(value){
                var date = Ext.Date.parse(value, 'c');
                return Ext.Date.format(date, 'd/m/y');
            },
            width: 70
        },
        {
            header:'SL',
            align: 'end',
            dataIndex:'totalorder',
            width: 70,
            summaryType: 'sum', 
            summaryRenderer: 'renderSumPOrder',
            renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
                return value == 0 ? "" : Ext.util.Format.number(value, '0,000');
            },
            // editor: {xtype: 'numberfield', hideTrigger:true, allowBlank: true, maxValue: 9999999, selectOnFocus: false}
        },{
            xtype: 'actioncolumn',
            width: 28,
            menuDisabled: true,
            sortable: false,
            items: [
                {
                    iconCls: 'x-fa fas fa-bars violetIcon',
                    handler: 'onMenu_POrder'
                },            
            ]
        }
    ],
    dockedItems: [{
        dock: 'bottom',
        layout: 'hbox',
        border: true,
        items: [{
            layout: 'vbox',
            border: false,
            flex: 1,
            items: [{
                html: '<div class="color-box">'
                +'<div class="color-square process-free"></div>&nbspChưa phân chuyền'
                +'</div>',
                margin: '5'
            },{
                html: '<div class="color-box">'
                +'<div class="color-square process-granted"></div>&nbspĐã phân chuyền'
                +'</div>',
                margin: '5'
            },]
        },{
            layout: 'vbox',
            border: false,
            flex: 1,
            items: [{
                html: '<div class="color-box">'
                +'<div class="color-square process-ready"></div>&nbspChuẩn bị SX'
                +'</div>',
                margin: '5'
            },{
                html: '<div class="color-box">'
                +'<div class="color-square process-running"></div>&nbspĐang SX'
                +'</div>',
                margin: '5'
            }]
        },{
            layout: 'vbox',
            border: false,
            flex: 1,
            items: [{
                html: '<div class="color-box">'
                +'<div class="color-square process-done"></div>&nbspSX xong'
                +'</div>',
                margin: '5'
            },{
                html: '<div class="color-box">'
                +'<div class="color-square process-finish"></div>&nbspNhập kho xong'
                +'</div>',
                margin: '5'
            }]
        }]
    }]
});

