Ext.define('GSmartApp.view.handover.Handover_kho_tocut_packinglist', {
    extend: 'Ext.container.Container',
    xtype: 'Handover_kho_tocut_packinglist',
    id: 'Handover_kho_tocut_packinglist',
    controller: 'Handover_kho_tocut_packinglist_Controller',
    // viewModel: 'Invoice_packinglist_ViewModel',
	layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    items: [
        {
            margin: 1,
            flex: 1,
            layout: 'border',
            items: [
                // {
                //     region: 'west',
                //     xtype: 'Handover_kho_tocut_packinglist_lotnumber',
                //     width: '15%',
                //     margin: 1
                // },
                {
                    region: 'center',
                    xtype: 'Handover_kho_tocut_packinglist_detail',
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
                flex:1
            },
            {
                margin: 1,
                xtype:'button',
                text:  'Thoát',
                iconCls: 'x-fa fa-window-close',
                itemId: 'btnThoat'
            }
        ]
        }        
    ] 
});
