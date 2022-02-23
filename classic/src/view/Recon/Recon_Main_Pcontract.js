Ext.define('GSmartApp.view.Recon.Recon_Main_Pcontract', {
    extend: 'Ext.container.Container',
    xtype: 'Recon_Main_Pcontract',
    id: 'Recon_Main_Pcontract',
    itemId: 'Recon_Main_Pcontract',
    controller: 'Recon_Main_Pcontract_Controller',
    viewModel: {
        type: 'Recon_Main_Pcontract_ViewModel'
    },
    layout: {
        type: 'border'
    },
    items: [
        {
            region: 'north',
            height: 40,
            items:[
                {
                    xtype: 'combobox',
                    itemId: 'cboMaterialId',
                    bind: {
                        store: '{Material_ByContract_Store}',
                        value: '{Balance.materialid_link}'
                    },
                    triggerAction: 'all',
                    displayField: 'description',
                    valueField: 'material_skuid_link',
                    queryMode: 'local',
                    anyMatch: true,
                    editable: true,
                    allowBlank: true,
                    margin: 2,
                    width: 600,
                    emptyText: 'Nguyên phụ liệu (chọn tất)',
                    handler: 'onMaterialSelect'
                },
            ]
        },
        {
            region: 'center',
            layout: {
                type: 'border'
            },
            items:[
                {
                    region: 'west',
                    width: 200,
                    xtype: 'Recon_ProductTree'
                },
                {
                    region: 'center',
                    layout: {
                        type: 'border'
                    },
                    items:[
                        {
                            region: 'north',
                            height: '50%',
                            xtype: 'Recon_Product_HQ15a'
                        },
                        {
                            region: 'center',
                            xtype: 'Recon_Material_HQ15'
                        }
                    ]
                }
            ]
        }
    ]
});
