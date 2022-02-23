Ext.define('GSmartApp.view.pprocess.POrderUngrantWindow', {
    extend: 'Ext.window.Window',
    xtype: 'porderungrantwindow',
    title: 'Hủy phân chuyền',
    controller: 'porderungrant',
    viewModel: 'porderungrant',
    width: 300,
    height: 150,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    bodyPadding: 10,
    modal: true,
    items: [{
        xtype: 'label',
        bind: '{comment}'
    }
    // ,{
    //     xtype: 'textfield',
    //     readOnly: true,
    //     anchor: '100%',            
    //     fieldLabel: 'Hủy phân chuyền Mã SX:',
    //     labelAlign: 'left',
    //     labelWidth: 180,
    //     bind: '{ordercode}',
    // }
    ],
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
