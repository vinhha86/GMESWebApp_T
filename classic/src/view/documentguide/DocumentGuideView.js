Ext.define('GSmartApp.view.documentguide.DocumentGuideView', {
    extend: 'Ext.grid.Panel',
    xtype: 'DocumentGuideView',
    id:'DocumentGuideView',
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
        store:'{DocumentGuideStore}'
    },
    columns:[{
        xtype: 'actioncolumn',
        width: 30,
        menuDisabled: true,
        sortable: false,
        align: 'center',
        items: [{
            iconCls: 'x-fa fas fa-download',
            tooltip: "Tải xuống",
            handler: 'onDownload'
        }]
    },{
        text:'Tên tài liệu',
        dataIndex:'name',
        flex : 1,
        editor:{
            xtype:'textfield',
            selectOnFocus: true,
        }
    },{
        text:'Tên file',
        dataIndex:'filename',
        width: 250
    },{
        xtype: 'actioncolumn',
        width: 30,
        menuDisabled: true,
        sortable: false,
        align: 'center',
        items: [{
            iconCls: 'x-fa fas fa-trash',
            tooltip: GSmartApp.Locales.btn_xoa[GSmartApp.Locales.currentLocale],
            handler: 'onXoa'
        }]
    }],
    dockedItems:[{
        dock:'top',
        layout: 'hbox',
        items:[{
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
            itemId:'btnAddGuide',
            margin: 5,
			text: 'Thêm tài liệu hướng dẫn',
            iconCls: 'x-fa fa-plus'
        }]
    }]
});

