Ext.define('GSmartApp.view.stockin.stockin_material.stockin_m_edit.Stockin_M_Edit_LotSpace_Edit_Info', {
    extend: 'Ext.form.Panel',
    xtype: 'Stockin_M_Edit_LotSpace_Edit_Info',
    itemId: 'Stockin_M_Edit_LotSpace_Edit_Info',
    // viewModel: {
    //     type: 'HandoverDetailViewModel'
    // },
    cls: 'Stockin_M_Edit_LotSpace_Edit_Info',
    // controller: 'Stockin_M_Edit_D_Controller',
    reference: 'Stockin_M_Edit_LotSpace_Edit_Info',

    items: [
        {
            xtype: 'textfield',
            itemId: 'lot_number',
            label: 'Số lot:',
            bind: {
                value: '{stockinLot.lot_number}'
            },
        }, 
        {
            xtype: 'numberfield',
            label: 'SL cây:',
            bind: {
                value: '{stockinLot.totalpackage}'
            },
        }, 
        {
            xtype: 'numberfield',
            itemId: 'totalmet',
            label: 'Độ dài (M):',
            bind: {
                value: '{stockinLot.totalmet}',
                hidden: '{isMetColumnHidden}',
            },
        }, 
        {
            xtype: 'numberfield',
            itemId: 'totalyds',
            label: 'Độ dài (Y):',
            bind: {
                value: '{stockinLot.totalyds}',
                hidden: '{isYdsColumnHidden}',
            },
        }, 
        {
            xtype: 'numberfield',
            itemId: 'kg',
            label: 'Kg:',
            bind: {
                value: '{stockinLot.grossweight}',
                hidden: '{isKgColumnHidden}',
            },
        },
        {
            xtype: 'numberfield',
            itemId: 'lbs',
            label: 'Lbs:',
            bind: {
                value: '{stockinLot.grossweight_lbs}',
                hidden: '{isLbsColumnHidden}',
            },
        },
    ]
});