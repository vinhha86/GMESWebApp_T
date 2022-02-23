Ext.define('GSmartApp.view.porders.POrderFilter', {
    extend: 'Ext.grid.Panel',
    xtype: 'porderfilter',
    reference: 'porderfilter',
    requires: [
        'GSmartApp.store.POrderFilter',
        'Ext.Number',
        'Ext.Date',
        'Ext.grid.column.Widget',
        'Ext.ProgressBarWidget'            
    ],
    // store: {
    //     type: 'porderfilter'
    // },
    bind: {
        store: '{POrderFilterStore}'
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
            dragText: 'Phân chuyền',
            dragGroup: 'firstGridDDGroup',
            // dropGroup: 'secondGridDDGroup'
        },
        listeners: {
            drop: 'onDrop'
        }     
     },
    columns: [
        // { 
		// 	xtype: 'actioncolumn',
		// 	width: 25,
		// 	menuDisabled: true,
        //     sortable: false,
        //     locked: true,
        //     iconCls: 'x-fa fas fa-picture-o',
        //     handler: 'onImageViewClick' 
		// },    
        // { 
		// 	xtype: 'actioncolumn',
		// 	width: 25,
		// 	menuDisabled: true,
        //     sortable: false,
        //     locked: true,
        //     renderer: function (value, metadata, record) {
        //         if (record.get('balance_status') > 0) {
        //             this.iconCls = 'x-fa fas fa-battery-4 greenIcon';
        //             this.tooltip = 'NPL Sẵn sàng';                    

        //         }
        //         else {
        //             if (record.get('balance_date') != null){
        //                 var dt = new Date(record.get('balance_date'));
        //                 this.tooltip = 'Dự kiến NPL về: ' + Ext.Date.format(dt, "d/m/Y"); 
        //                 this.iconCls = 'x-fa fas fa-battery-2 violetIcon';    
        //             } else {
        //                 this.tooltip = 'Dự kiến NPL về: Chưa xác định';
        //                 this.iconCls = 'x-fa fas fa-battery-0 redIcon';
        //             }
        //         }
        //     },
        //     handler: 'onSetBalance' 
		// },           
        { header: 'Mã SX', locked: true, dataIndex: 'ordercode', width: 70,
            editor: {xtype: 'textfield', readOnly: true},
            items: {
                xtype: 'textfield',
                fieldStyle: "",
                reference: 'porderFilterField',
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
                if (c == 0) {
                    metaData.tdCls = 'process-free';
                } else if (c == 1) {
                    metaData.tdCls =  'process-granted';
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
                } else if (c >= 20 && c <= 24) {
                    metaData.tdCls =  'process-cutting';
                }                      
                //metaData.tdCls = record.get('change') > 0 ? 'color-other' : 'color-gio';
                // if (null != record.get('productiondate')){
                //     metaData.tdAttr = 'data-qtip="' + Ext.util.Format.date(record.get('productiondate'),'d/m/Y') + '"';
                // }
                return value;
            },
            summaryType: 'count', summaryRenderer: 'renderSum'                   
        },
        { header: 'Đơn hàng', headerWrap: false, locked: true, dataIndex: 'contractcode', width: 90},
        { header: 'Đơn vị SX', headerWrap: false, locked: true, dataIndex: 'granttoorgname', width: 80},
        { header: 'Tổ SX', headerWrap: false, locked: true, dataIndex: 'granttolinename', width: 60},
        { header: 'SL đơn', headerWrap: false, locked: true, dataIndex: 'totalorder', width: 60},
        { header: 'NPL về',
            columns: [
                { header: 'KH', dataIndex: 'material_date', width: 70, renderer: Ext.util.Format.dateRenderer('d/m/y')},
                { header: 'TT', dataIndex: 'material_date', width: 70, renderer: Ext.util.Format.dateRenderer('d/m/y')}
            ]
        },
        { header: 'May mẫu', 
            columns: [
                { header: 'KH', dataIndex: 'sample_date', width: 70, renderer: Ext.util.Format.dateRenderer('d/m/y')},
                { header: 'TT', dataIndex: 'sample_date', width: 70, renderer: Ext.util.Format.dateRenderer('d/m/y')}
            ]
        },
        { header: 'Cắt', 
            columns: [
                { header: 'KH', dataIndex: 'cut_date', width: 70, renderer: Ext.util.Format.dateRenderer('d/m/y')},
                { header: 'TT', dataIndex: 'cut_date', width: 70, renderer: Ext.util.Format.dateRenderer('d/m/y')}
            ]        
        },
        { header: 'Vào chuyền', 
            columns: [
                { header: 'KH', dataIndex: 'productiondate', width: 70, renderer: Ext.util.Format.dateRenderer('d/m/y')},
                { header: 'TT', dataIndex: 'productiondate', width: 70, renderer: Ext.util.Format.dateRenderer('d/m/y')}
            ]
        },
        { header: 'QC', 
            columns: [
                { header: 'KH', dataIndex: 'qc_date', width: 70, renderer: Ext.util.Format.dateRenderer('d/m/y')},
                { header: 'TT', dataIndex: 'qc_date', width: 70, renderer: Ext.util.Format.dateRenderer('d/m/y')}
            ]        
        },
        { header: 'Hoàn thiện', 
            columns: [
                { header: 'KH', dataIndex: 'packing_date', width: 70, renderer: Ext.util.Format.dateRenderer('d/m/y')},
                { header: 'TT', dataIndex: 'packing_date', width: 70, renderer: Ext.util.Format.dateRenderer('d/m/y')}
            ]
        },
        { header: 'Nhập kho', 
            columns: [
                { header: 'KH', dataIndex: 'stockout_date', width: 70, renderer: Ext.util.Format.dateRenderer('d/m/y')},
                { header: 'TT', dataIndex: 'stockout_date', width: 70, renderer: Ext.util.Format.dateRenderer('d/m/y')}
            ]        
        },
        { header: 'Giao hàng', 
            columns: [
                { header: 'KH', dataIndex: 'golivedesc', width: 70},
                { header: 'TT', dataIndex: 'golivedesc', width: 70}
            ]        
        },
        // { header: 'Tháng/Năm tính lương', headerWrap: true, locked: true, dataIndex: 'salary_monthyear', width: 85},
        
        // { header: 'Cắt DK', locked: true, dataIndex: 'totalorder', width: 60, summaryType: 'sum', summaryRenderer: 'renderSum'},
        // { header: 'Cắt TT', locked: true, dataIndex: 'amountcutsum', width: 60, summaryType: 'sum', summaryRenderer: 'renderSum',
        //     renderer: function (value, metaData, record, rowIndex) {
        //         var c = record.get('iscuttt');
        //         if (c == 0) {
        //             metaData.tdCls = 'process-granted';
        //         } else {
        //             metaData.tdCls =  'process-finish';
        //         }      
        //         return value;
        //     },        
        // },
        { header: 'Ghi chú', dataIndex: 'comment', width: 100},        
        // {
        //     text: 'Thực tế hoàn thành',
        //     xtype: 'widgetcolumn',
        //     flex: 1,
        //     widget: {
        //         bind: '{record.complete_rate}',
        //         xtype: 'progressbarwidget',
        //         textTpl: [
        //             '{percent:number("0")}%'
        //         ]
        //     }
        // },        
        // { header: 'Vào chuyền', reference: 'pprocess_edit_amountinput', dataIndex: 'amountinputsum', width: 70, summaryType: 'sum', summaryRenderer: 'renderSum'},
        // { header: 'Ra chuyền', reference: 'pprocess_edit_amountoutput', dataIndex: 'amountoutputsum', width: 70, summaryType: 'sum', summaryRenderer: 'renderSum'},
        // { header: 'Nhập kho', reference: 'pprocess_edit_amountstocked', dataIndex: 'amountstockedsum', width: 70, summaryType: 'sum', summaryRenderer: 'renderSum'},
        // { header: 'Đóng gói', reference: 'pprocess_edit_amountpacked', dataIndex: 'amountpackedsum', width: 70, summaryType: 'sum', summaryRenderer: 'renderSum'},
        // { header: 'Nhập thành phẩm', dataIndex: 'amountpackstockedsum', width: 80, summaryType: 'sum', summaryRenderer: 'renderSum'},
        // { header: 'ĐG-RC', dataIndex: 'amountdg_rc', width: 65, summaryType: 'sum', summaryRenderer: 'renderSum'},
        // { 
        //     xtype: 'actioncolumn',
        //     reference: 'porderprocessing_contextmenu',
		// 	width: 25,
		// 	menuDisabled: true,
		// 	sortable: false,
		// 	items: [
        //     {
		// 		iconCls: 'x-fa fas fa-bars violetIcon',
        //         handler: 'onMenu'
        //     },
        // ]
        // }
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
                xtype: 'textfield',
                //cls: 'auth-textbox',
                name: 'txtordercode',
                reference:'txtordercode',
                fieldLabel: 'Mã SX:',
                width: '10%',
                labelWidth: 45,
                hideLabel: false,
                //emptyText: 'Mã SX'
            },             
            {
                xtype: 'combobox',
                width: '15%',
                editable: false,
                //margin: '0 5 0 5',
                fieldLabel: 'Tổ SX',
                labelWidth: 40,
                store: {
                    type: 'orgtosx'
                },
                displayField: 'name',
                valueField: 'id',
                reference:'cboOrg'
            },
            {
                xtype: 'combobox',
                width: '20%',
                editable: false,
                //margin: '0 5 0 5',
                fieldLabel: 'Trạng thái SX:',
                labelWidth: 90,
                multiSelect: false,
                store: {
                    type: 'pprocessstatus'
                },
                displayField: 'name',
                valueField: 'id',
                reference:'cboStatus',
                listeners: {
                    select: 'onStatusItemSelected'
                }   
                //tpl: new Ext.XTemplate('<tpl for=".">', '<div class="x-boundlist-item">', '<input type="checkbox" />', '{name}', '</div>', '</tpl>'),
                // queryMode: 'local',
                // listeners: {
                //     select: function (combo, records) {
                //         var node;
                        
                //         Ext.each(records, function (rec) {
                //             node = combo.getPicker().getNode(rec);
                //             /*Ext.get(node).down('input').set({
                //                 checked: true
                //             });*/
                //             Ext.get(node).down('input').dom.checked = true;
                //         });
                //     },
                //     beforedeselect: function (combo, rec) {
                //         var node = combo.getPicker().getNode(rec);
    
                //         /*Ext.get(node).down('input').set({
                //             checked: undefined
                //         });*/
                //         Ext.get(node).down('input').dom.checked = false;
                //     }
                // }                
            },
            // {
            //     xtype: 'combobox',
            //     name: 'cbosalarymonth',
            //     reference:'cbosalarymonth',                
            //     width: '20%',
            //     editable: false,
            //     //margin: '0 5 0 5',
            //     fieldLabel: 'Tháng/Năm TL:',
            //     labelWidth: 95,
            //     store: {
            //         type: 'monthstore'
            //     },
            //     displayField: 'name',
            //     valueField: 'id',
            //     listeners: {
            //         select: 'onMonthItemSelected'
            //     }                
            // },            
            // {
            //     xtype: 'numberfield',
            //     clearable: false,
            //     hideTrigger:true,
            //     allowBlank: true, 
            //     minValue: Ext.Date.format(new Date(), 'Y') - 10,
            //     name: 'txtsalaryyear',
            //     reference:'txtsalaryyear',
            //     width: 60,
            //     hideLabel: false,
            //     emptyText: 'Năm',
            //     //value: Ext.Date.format(new Date(), 'Y')
            // },                        
            {
                tooltip: 'Tìm kiếm lệnh',
                iconCls: 'x-fa fa-search',
                weight: 30,
                handler: 'onSearchTap'
            },
            {
                tooltip: 'Phân lệnh vào tổ chuyền',
                text: 'Phân chuyền',
                iconCls: 'x-fa fa-sliders',
                weight: 30,
                handler: 'onGrantToOrgTap'
            }
    ]
    }],
    listeners: {
        activate: 'onActivate',
        celldblclick: 'onCelldblclick'
    }
});
