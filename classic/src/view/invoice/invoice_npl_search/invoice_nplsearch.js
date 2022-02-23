Ext.define('GSmartApp.view.invoice.invoice_npl_search.invoice_nplsearch', {
    extend: 'Ext.form.Panel',
    xtype: 'invoice_nplsearch',
    id:'invoice_nplsearch',
    controller: 'invoice_nplsearch_Controller',
    layout: 'hbox',
    items: [{
        xtype: 'invoice_productlist',
        margin: 1,
        flex:1,
        hidden: true
    },{
        xtype: 'invoice_npllist',
        margin: 1,
        flex:2,
    }],
    dockedItems:[{
        layout:'hbox',
        border: false,
        dock:'bottom',
        items:[{
            xtype:'button',
            text: 'Thoát',
            margin: 3,
            itemId:'btnThoat',
            iconCls: 'x-fa fa-window-close',
            formBind: false
        },{
            xtype:'button',
            text: 'Lưu',
            margin: 3,
            itemId:'btnLuu',
            iconCls: 'x-fa fa-save',
            formBind: true
        },{
            flex:1,
            border: false
        },]
    }]
})