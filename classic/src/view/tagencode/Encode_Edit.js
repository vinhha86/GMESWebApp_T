Ext.define('GSmartApp.view.tagencode.Encode_Edit', {
    extend: 'Ext.container.Container',
    xtype: 'Encode_Edit',
    controller: 'Encode_EditController',
    viewModel: {
        type: 'Encode_EditModel'
    },
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            layout: 'border',
            flex: 1,
            items: [
                {
                    xtype: 'Encode_Edit_D',
                    width: 580,
                    margin: 1,
                    region: 'west'
                },
                {
                    xtype: 'Encode_Edit_SKU',
                    flex: 1,
                    region: 'center',
                    margin: 1
                }
            ]
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
                text:  'Duyệt',
                iconCls: 'x-fa fa-floppy-o',
                itemId: 'btnLuu',
                bind: {
                    disabled: '{isStart}',
                    hidden: '{isApprove}'
                }
            }
        ]
        }   
    ]
});
