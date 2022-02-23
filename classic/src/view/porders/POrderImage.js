Ext.define('GSmartApp.view.porders.POrderImage', {
    extend: 'Ext.window.Window',
    xtype: 'porderimage',
    title: 'Hình ảnh sản phẩm',
    controller: 'porderimage',
    viewModel: 'porderimage',
    width: 650,
    height: 650,
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    bodyPadding: 10,
    modal: true,    
    items: [
        {
            xtype: 'porderimagelist',
            width: 200,
        },
        {
            xtype: 'panel',
            width: 5
        },
        {
            xtype: 'image',
            reference: 'imgviewdetail',
            flex: 1,
        } 
    ],
    fbar: [{
        minWidth: 80,
        text: 'Đóng',
        handler: 'onCloseButton'
    }],
    listeners:{
        activate: 'onActivate'
    }    
});   

