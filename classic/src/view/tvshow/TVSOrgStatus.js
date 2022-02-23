Ext.define('GSmartApp.view.tvshow.TVSOrgStatus', {
    extend: 'Ext.view.View',
    xtype: 'tvsorgstatus',

    requires: [
        'Ext.toolbar.TextItem',
        'Ext.view.View',
        'Ext.ux.BoxReorderer',
        'Ext.ux.DataView.Animated',
        'GSmartApp.store.TVSOrgStatus'
    ],
    reference: 'tvsorgstatus',
    cls:'list',
    plugins: {
        'ux-animated-dataview': true
    },

    itemSelector: 'div.tvsorgItem',
    itemTpl: [
        // '<tpl for="orders">',
            '<div class="tvsorgItem"',
                '<div>' +
                '<tpl if="status == 1">'+
                    '<table width=100% height=100% class="tvsorgitem-frame-ready">'+
                '</tpl>'+
                '<tpl if="status == 2">'+
                    '<table width=100% height=100% class="tvsorgitem-frame-ready">'+
                '</tpl>'+
                    '<tr height="50px">'+
                        '<td width=100% align="center" colspan="2"><span class="tvsorgtitem-title">{orgname}</span><hr></td>'+
                    '</tr>'+ 
                    '<tr height="10px">'+
                        '<td width=70%><span class="tvsorgitem-body">Tỷ lệ HT khoán:</span></td>'+
                        '<td width=30%><span class="tvsorgitem-body">95%</span></td>'+    
                    '</tr>'+ 
                    '<tr height="10px">'+
                        '<td width=70%><span class="tvsorgitem-body">Đang sản xuất:</span><hr></td>'+
                        '<td width=30%><span class="tvsorgitem-body">{orderamount} Mã</span><hr></td>'+    
                    '</tr>'+                     
                    // '<tr>'+
                    //     '<td width=100% align="center" colspan="2"><span class="tvsorgitem-body">Đang sản xuất: {orderamount}</span></td>'+
                    // '</tr>'+                                      
                    '<tr>'+
                        '<td width=100% colspan="2"><span class="tvsorgitem-body">{orderlist}</span></td>'+
                        // '<td width=45%><span class="tvsorgitem-body">Đang SX:</span></td>'+
                        // '<td width=55%><span class="tvsorgitem-body">{orderlist}</span></td>'+                
                    '</tr>'+                 

 
                    '</table>'+
                '</div>',
            '</div>',
        // '</tpl>',
    ],

    store: {
        type: 'tvsorgstatus'
    }
});   

