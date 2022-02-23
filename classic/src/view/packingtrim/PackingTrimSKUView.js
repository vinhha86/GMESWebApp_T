Ext.define('GSmartApp.view.packingtrim.PackingTrimSKUView', {
    extend: 'Ext.grid.Panel',
    xtype: 'PackingTrimSKUView',
    id:'PackingTrimSKUView',
    controller: 'PackingTrimSKUViewController',
    plugins: {
        cellediting: {
            clicksToEdit: 1
        }
    },
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true,
        columnLines: true,
        rowLines: true
    },    
    bind:{
        store:'{SKUStore}'
    },
    columns:[{
        text: 'STT',
        width: 45,
        xtype: 'rownumberer',
        align: 'center'
    },{
        text:'SKU ',
        dataIndex:'code',
        width: 80
    },{
        text:'Mã vạch',
        dataIndex:'barcode',
        flex: 1,
        getEditor: function (record) {
            return Ext.create('Ext.grid.CellEditor', {
                field: {
                    xtype: 'textfield',
                    allowBlank: false,
                    blankText: 'Không được để trống',
                    itemId:'txtcode'
                }
            })
        }
    },{
        text:'Màu NPL',
        dataIndex:'color_name',
        width: 100
    },{
        text:'Cỡ khổ',
        dataIndex:'size_name',
        width: 80
    }],
    dockedItems:[{
        dock:'top',
        xtype:'toolbar',
		//bodypadding: 5,
        border: true,
        height: 45,
        style:"background-color : white",
        items:[{
            xtype:'displayfield',
			flex: 1,
            fieldStyle: "font-weight: bold; font-size: 14px; color: black",
            labelWidth : 0,
            value: 'Phân loại phụ liệu hoàn thiện'
        }
		]
    }]	
});

