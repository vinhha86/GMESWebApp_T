Ext.define('GSmartApp.view.stockin.stockin_material.stockin_m_edit_d_phieukhovai.Stockin_M_Edit_D_PhieuKhoVai', {
    extend: 'Ext.container.Container',
    xtype: 'Stockin_M_Edit_D_PhieuKhoVai',
    itemId: 'Stockin_M_Edit_D_PhieuKhoVai',
    controller: 'Stockin_M_Edit_D_PhieuKhoVaiController',
    // viewModel: 'Stockin_M_Edit_D_PhieuKhoVaiViewModel',
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
                {
                    region: 'west',
                    xtype: 'Stockin_M_Edit_D_PhieuKhoVai_Kho',
                    width: '30%',
                    margin: 1
                },
                {
                    region: 'center',
                    xtype: 'Stockin_M_Edit_D_PhieuKhoVai_Pkl',
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
