Ext.define('GSmartApp.view.personnel.TimeSheetLunch.ChitietTabView', {
    extend: 'Ext.tab.Panel',
    xtype: 'ChitietTabView',
    itemId: 'ChitietTabView',
    controller: 'ChitietTabViewController',
    items: [
        {
            title: 'Lao động chính thức',
            xtype: 'TimeSheetLunch_ListView'
        },
        {
            title: 'Khách',
            xtype: 'LunchKhachView',
            bind: {
                disabled: '{isHidden_khach}'
            }
        },
    ],
})