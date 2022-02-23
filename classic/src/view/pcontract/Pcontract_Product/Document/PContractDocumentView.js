Ext.define('GSmartApp.view.pcontract.PContractDocumentView', {
    extend: 'Ext.grid.Panel',
    xtype: 'PContractDocumentView',
    id:'PContractDocumentView',
    controller: 'PContractDocumentViewCotroller',
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true,
        columnLines: true,
        rowLines: true
    },
    selModel: {
        //selType: 'checkboxmodel',
        mode: 'SINGLE'
    },
    plugins: {
        cellediting: {
            clicksToEdit: 1,
            listeners: {
                edit: 'onEdit'
            } 
        }
    },
    bind:{
        store:'{PContractDocumentStore}'
    },
    columns:[{
        xtype: 'actioncolumn',
        width: 50,
        menuDisabled: true,
        sortable: false,
        align: 'center',
        items: [{
            iconCls: 'x-fa fas fa-download',
            tooltip: "Tải xuống",
            handler: 'onDownload'
        },{
            iconCls: 'x-fa fas fa-trash',
            tooltip: GSmartApp.Locales.btn_xoa[GSmartApp.Locales.currentLocale],
            handler: 'onXoa'
        }]
    },{
        text:'Tên tài liệu',
        dataIndex:'filename',
        width: 150,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },{
        text:'Mô tả',
        dataIndex:'description',
        flex: 1,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        },
        editor:{
            xtype:'textfield',
            selectOnFocus: true
        }
    },],
    dockedItems:[{
        dock:'top',
        xtype:'toolbar',
        padding: '0 0 10 5',
        height: 35,
        items:[{
            xtype:'displayfield',
            fieldStyle: "font-weight: bold; font-size: 14px; color: black",
            labelWidth : 0,
            bind:{
                value: '{titleDoccument}'
            }
        },
		'->'
		,
		{
            xtype: 'new_fileupload',
            buttonText: '+',
            buttonOnly: true,
            itemId: 'btnFile',
            tooltip:'Upload File',
            multiple: true,
            hidden: true,
            margin: 1
        },{
            xtype:'button',
            itemId:'btnDoc_PContractDocumentView',
            ui: 'header',
            margin: '10 5 0 0',
			tooltip: 'Thêm tài liệu',
            iconCls: 'x-fa fa-plus'
        }]
    }]
});

