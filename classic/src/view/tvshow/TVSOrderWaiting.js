Ext.define('GSmartApp.view.tvshow.TVSOrderWaiting', {
    extend: 'Ext.panel.Panel',
    xtype: 'tvsorderwaiting',

    requires: [
        'Ext.toolbar.TextItem',
        'Ext.view.View',
        'Ext.ux.BoxReorderer',
        'Ext.ux.DataView.Animated',
        'GSmartApp.store.POrderWaiting'
    ],
    layout: 'fit',
    scrollable: true,

    items: {
        xtype: 'dataview',
        reference: 'dataview',
        cls:'list',
        plugins: {
            'ux-animated-dataview': true
        },

        itemSelector: 'div.tvsproductItem',
        itemTpl: [
            // '<tpl for="orders">',
                '<div class="tvsproductItem"',
                    '<div>' +
                    '<tpl if="status == 1">'+
                        '<table width=100% class="tvsitem-frame-ready">'+
                    '</tpl>'+
                    '<tpl if="status == 2">'+
                        '<table width=100% class="tvsitem-frame-ready">'+
                    '</tpl>'+
                        '<tr>'+
                            '<td width=100% align="center" colspan="2"><span class="tvstitem-title">Mã SX: {ordercode}</span><hr></td>'+
                        '</tr>'+ 
                        '<tr height = "20px">'+
                            '<td width=45% ><span class="tvsitem-body">Tổ SX:</span></td>'+
                            '<td width=55%><span class="tvsitem-body">{granttoorgid_link}</span></td>'+                
                        '</tr>'+                 
                        '<tr height = "20px">'+
                            '<td width=45%><span class="tvsitem-body">Ngày SX:</span></td>'+
                            '<td width=55%><span class="tvsitem-body">{productiondate_str}</span></td>'+                
                        '</tr>'+
     
                        '</table>'+
                    '</div>',
                '</div>',
            // '</tpl>',
        ],

        store: {
            type: 'porderwaiting'
        }
    }
});   

