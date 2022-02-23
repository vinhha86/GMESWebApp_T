Ext.define('GSmartApp.view.stockin.stockin_material.stockin_m_edit.Stockin_M_Edit_D_Main', {
    extend: 'Ext.form.Panel',
    xtype: 'Stockin_M_Edit_D_Main',
    id: 'Stockin_M_Edit_D_Main',
    itemId: 'Stockin_M_Edit_D_Main',
    layout: 'fit',
    items: [
    {
        region: 'center',
        border: true,
        margin: 1,
        xtype: 'tabpanel',
        itemId:'tabmain',
        items: [
            {
                title: 'Danh sách nguyên liệu',
                xtype: 'Stockin_M_Edit_D',
            },
            {
                title: 'Danh sách sản phẩm',
                xtype: 'Stockin_M_Edit_Product',
            }
        ]
    }],
})