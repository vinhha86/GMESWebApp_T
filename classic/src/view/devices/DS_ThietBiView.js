Ext.define('GSmartApp.view.devices.DS_ThietBiView', {
	extend: 'Ext.panel.Panel',
	xtype:'DS_ThietBiView',
	
	viewModel:{
		type:'DS_ThietBiViewModel'
	},

	controller:'DS_ThietBiViewController',
    layout: {
		type:'border',
	},
	items: [
        {
            region: 'west',
            xtype: 'ThietBiView',
            border: true,
            marrgin: 1,
        },
        {
            region: 'center',
            xtype: 'ThietBiChiTietView',
        },
    ]
})