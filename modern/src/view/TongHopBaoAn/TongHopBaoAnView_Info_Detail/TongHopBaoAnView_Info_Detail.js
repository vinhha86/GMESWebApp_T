Ext.define('GSmartApp.view.TongHopBaoAn.TongHopBaoAnView_InfoDetail.TongHopBaoAnView_Info_Detail', {
    extend: 'Ext.form.Panel',
    xtype: 'TongHopBaoAnView_Info_Detail',
    itemId: 'TongHopBaoAnView_Info_Detail',
    reference: 'TongHopBaoAnView_Info_Detail',
    controller: 'TongHopBaoAnView_Info_DetailController',
    viewModel: {
        type: 'TongHopBaoAnView_Info_DetailViewModel',
    },
    cls: 'TongHopBaoAnView_Info_Detail',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    requires: [
        'Ext.Toast',
        'Ext.Responsive',
        'Ext.dataview.listswiper.ListSwiper'
    ],

    items:[
        {
            // margin: 1,
            padding: 1,
            flex: 1,
            xtype: 'TongHopBaoAnView_Info_DetailList',
        },
    ],
    tbar: [
        {
            xtype:'button',
            iconCls: 'x-fa fa-arrow-left',
            itemId:'btnBack',
            ui: 'action',
        },
        {
            xtype:'button',
            iconCls: 'x-fa fa-home',
            itemId:'btnHome',
            ui: 'action',
        },    
        '->'
        ,
    ]
});