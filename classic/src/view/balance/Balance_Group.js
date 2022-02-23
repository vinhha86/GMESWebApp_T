Ext.define('GSmartApp.view.balance.Balance_Group', {
    extend: 'Ext.form.Panel',
    xtype: 'Balance_Group',
    id: 'Balance_Group',
    itemId: 'Balance_Group',
    layout: 'fit',
    items: [
    {
        region: 'center',
        border: true,
        margin: 1,
        xtype: 'tabpanel',
        items: [
            // {
            //     title: 'Mầu',
            //     xtype: 'Balance_Color',
            // }, 
            {
                title: 'PO Line',
                xtype: 'Balance_POLine',
            }
        ]
    }],
    fbar: [
        '->',
        {
            minWidth: 80,
            text: 'Tính cân đối',
            iconCls: 'x-fa fa-calculator',
            handler: 'onCalBalance'
        }
    ],      
})