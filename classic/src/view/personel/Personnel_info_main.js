Ext.define('GSmartApp.view.personel.Personnel_info_main', {
    extend: 'Ext.form.Panel',
    xtype: 'Personnel_info_main',
    id: 'Personnel_info_main',
    controller: 'Personnel_info_main_ViewController',
    viewModel: {
        type: 'Personnel_info_main_ViewModel'
    },
    layout: 'border',
    items: [{
        region: 'north',
        title: 'Thông tin chung',
        xtype: 'Personnel_info',
        height: 352,
        border: true,
        margin: 1,

       
    },{
        region: 'center',
        title: 'Quá trình công tác',
        xtype: 'Personnel_history',
        border: true,
        margin: 1,
        
    }],
    dockedItems: [{
        layout: 'hbox',
        reference: 'dockBottomBar',
        border: false,
        dock: 'bottom',
        items: [{
            xtype: 'button',
            text: 'Thoát',
            margin: 1,
            itemId: 'btnThoat',
            iconCls: 'x-fa fa-window-close'
        }, 
        {
            xtype: 'button',
            text: 'Lưu',
            margin: 1,
            itemId: 'btnLuu',
            iconCls: 'x-fa fa-save',
            formBind: true
        },{
            flex:1
        },
        
        {
            xtype: 'button',
            text: 'Xóa',
            margin: 1,
            itemId: 'btnXoa',
            iconCls: 'x-fa fa-trash',
           
        }
    
    ]
    }]
})