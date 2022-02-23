Ext.define('GSmartApp.view.sewingtrim.SewingThreadDetailView', {
    extend: 'Ext.form.Panel',
    xtype: 'SewingThreadDetailView',
    id:'SewingThreadDetailView',
    controller: 'SewingThreadDetailViewCotroller',
    viewModel:{
        type:'SewingThreadDetailViewModel'
    },
    layout: 'border',
    height: 500,
    items: [{
        region: 'north',
        height: 180,
        xtype: 'SewingThreadInfoView',
        border: true,
        margin: 1
    }, {
        region: 'center',
        border : true,
        xtype: 'SewingThreadAttributeView',
        margin: 1
    }, {
        region: 'east',
        width: '50%',
        xtype: 'SewingThreadSKUView',
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