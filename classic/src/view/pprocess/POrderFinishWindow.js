Ext.define('GSmartApp.view.pprocess.POrderFinishWindow', {
    extend: 'Ext.window.Window',
    xtype: 'porderfinishwindow',
    title: 'Dừng sản xuất',
    controller: 'porderfinish',
    viewModel: 'porderfinish',
    width: 300,
    height: 300,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    bodyPadding: 10,
    modal: true,
    items: [{
        xtype: 'textfield',
        readOnly: true,
        anchor: '100%',            
        fieldLabel: 'Tổ SX:',
        labelAlign: 'left',
        labelWidth: 100,
        bind: '{granttoorgid_link}',
    },{
        xtype: 'textfield',
        readOnly: true,
        anchor: '100%',            
        fieldLabel: 'Mã SX:',
        labelAlign: 'left',
        labelWidth: 100,
        bind: '{ordercode}',
    },{
        xtype: 'textareafield',
        anchor: '100%',            
        fieldLabel: 'Nguyên nhân:',
        labelAlign: 'left',
        labelWidth: 100,
        grow: true,
        bind: '{comment}',
    }],
    fbar: [{
        minWidth: 80,
        text: 'Xác nhận',
        handler: 'onSelectButton'
    }, {
        minWidth: 80,
        text: 'Đóng',
        handler: 'onCloseButton'
    }]
});
