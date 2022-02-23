Ext.define('GSmartApp.view.material.MaterialDetailView', {
    extend: 'Ext.form.Panel',
    xtype: 'MaterialDetailView',
    id:'MaterialDetailView',
    controller: 'MaterialDetailViewCotroller',
    viewModel:{
        type:'MaterialDetailViewModel'
    },
    layout: 'border',
    height: 500,
    items: [{
        region: 'north',
        height: 180,
        xtype: 'MaterialInfoView',
        border: true,
        margin: 1
    }, {
        region: 'center',
        border : true,
        xtype: 'MaterialAttributeView',
        margin: 1
    }, {
        region: 'east',
        width: '50%',
        xtype: 'MaterialSKUView',
        border: true,
        margin: 1
    }],
    dockedItems:[{
        layout:'hbox',
        border: false,
        dock:'bottom',
        items:[{
            xtype:'button',
            text: 'Quay lại',
            margin: 3,
            itemId:'btnQuayLai',
            iconCls: 'x-fa fa-backward',
            bind: {
                hidden: '{btnQuayLai}'
            }
        },{
            xtype:'button',
            text: 'Thoát',
            margin: 3,
            itemId:'btnThoat',
            bind: {
                hidden: '{!isWindow}'
            },
            iconCls: 'x-fa fa-window-close'
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
        }]
    }]
})