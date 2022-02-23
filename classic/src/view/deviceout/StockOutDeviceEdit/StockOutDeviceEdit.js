Ext.define('GSmartApp.view.deviceiout.StockOutDeviceEdit', {
    extend: 'Ext.container.Container',
    xtype: 'StockOutDeviceEdit',
    id: 'StockOutDeviceEdit',
    controller: 'StockOutDeviceEditController',
    viewModel: 'StockOutDeviceMainViewModel',
	layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'StockOutDeviceEdit_M',
            id: 'StockOutDeviceEdit_M',
            margin: '5 0 0 0',
            height: 120
        },
        {
            xtype: 'StockOutDeviceEdit_D',
            margin: '0 5 5 0',
            flex: 1
        },
        {
            xtype: 'container',
            height: 35,
            layout:'hbox',
            items:[
            {
                xtype:'button',
                text:  "Quay lại",
                iconCls: 'x-fa fa-backward',
                itemId: 'btnBack'
            },
            {
                flex:1
            },
            {
                margin: '0 5 5 0',
                xtype:'button',
                text:  'Lưu',
                iconCls: 'x-fa fa-floppy-o',
                itemId: 'btnLuu',
                bind: {
                    disabled: '{isStart}'
                }
            }
        ]
        }        
    ] 
});
