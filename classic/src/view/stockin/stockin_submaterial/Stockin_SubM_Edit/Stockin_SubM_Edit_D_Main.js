Ext.define('GSmartApp.view.stockin.stockin_submaterial.stockin_subm_edit.Stockin_SubM_Edit_D_Main', {
    extend: 'Ext.form.Panel',
    xtype: 'Stockin_SubM_Edit_D_Main',
    id: 'Stockin_SubM_Edit_D_Main',
    itemId: 'Stockin_SubM_Edit_D_Main',
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
                title: 'Danh sách phụ liệu',
                xtype: 'Stockin_SubM_Edit_D',
            },
            {
                title: 'Danh sách sản phẩm',
                xtype: 'Stockin_SubM_Edit_Product',
            }
        ]
    }],
})