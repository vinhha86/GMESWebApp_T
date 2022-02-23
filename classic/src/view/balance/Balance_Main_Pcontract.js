Ext.define('GSmartApp.view.balance.Balance_Main_Pcontract', {
    extend: 'Ext.container.Container',
    xtype: 'Balance_Main_Pcontract',
    id: 'Balance_Main_Pcontract',
    itemId: 'Balance_Main_Pcontract',
    controller: 'Balance_Main_Pcontract_Controller',
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
                    xtype: 'PContractProductTreeView'
                },
                {
                    region: 'center',
                    xtype: 'Balance_D_Pcontract'
                }
            ]
        }

    ],
});
