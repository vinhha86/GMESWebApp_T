Ext.define('GSmartApp.view.cut_plan.warehouse.WareHouse_View', {
    extend: 'Ext.grid.Panel',
    xtype: 'WareHouse_View',
    id: 'WareHouse_View',
    controller: 'WareHouse_ViewController',
    viewConfig: {
        stripeRows: false,
        enableTextSelection: false,
        columnLines: true,
        rowLines: true,
        plugins: {
            ptype: 'gridviewdragdrop',
            enableDrag: true,
            dragText: '{0} cây vải',
            dragGroup: 'WarehouseDropGroup',
            dropGroup: 'WarehouseCutPlanDropGroup'
        } 
    },
    bind: {
        store: '{WarehouseStore}'
    },
    columns: [{
        text: 'STT',
        width: 45,
        xtype: 'rownumberer',
        align: 'center'
    },{
        text:'Ảnh',
        locked: true,
        dataIndex:'imgproduct',
        width: 45,
        textAlign: 'center',
        renderer: function(value, meta, record){
            return '<img style="width:16px; height:14px" src="data:image/gif;base64,'+ value +'">';
        },
        listeners:{
            click: 'viewImg'
        }
    },{
        locked: true,
        text: 'Mã NPL',
        dataIndex: 'material_product_code',
        width: 120,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value == 'null' ? '' : value;
        }
    }, {
        text: 'Màu NPL',
        dataIndex: 'color_name',
        width: 150,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value == 'null' ? '' : value;
        }
    }, {
        text: 'Cỡ khổ',
        dataIndex: 'width',
        width: 100,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value == 'null' ? '' : value;
        }
    }, {
        text: 'Số lot',
        dataIndex: 'lotnumber',
        width: 80,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value == 'null' ? '' : value;
        }
    }, {
        text: 'Cây vải',
        dataIndex: 'packageid',
        width: 120,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value == 'null' ? '' : value;
        }
    }, {
        text: 'ĐVT',
        dataIndex: 'unit_name',
        width: 100
    }],
    dockedItems:[{
        dock:'top',
        xtype:'toolbar',
        padding: '0 0 10 5',
        height: 35,
        items:[{
            xtype:'displayfield',
            fieldStyle: "font-weight: bold; font-size: 14px; color: black;",
            labelWidth : 0,
            value: 'Cây vải trong kho'
        },
        '->',
        {
            xtype:'button',
            itemId:'btnHideWarehouse',
            ui: 'header',
            margin: '10 5 0 0',
			text: 'Ẩn',
            iconCls: 'x-fa fa-eye'
        }
        ]
    }]
});

