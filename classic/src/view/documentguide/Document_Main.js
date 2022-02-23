Ext.define('GSmartApp.view.documentguide.Document_Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'Document_Main',
    id:'Document_Main',
    controller: 'Document_Cotroller',
    viewModel: {
        type: 'Document_ViewModel'
    },
    items: [
        {
            title: 'Tài liệu hướng dẫn sử dụng',
            xtype: 'DocumentGuideView',
            margin: 1,
            // region: 'center'
        },
        {
            title: 'Tài liệu kỹ thuật',
            xtype: 'DocumentTechView',
            margin: 1,
        }, 
    ], 
})
