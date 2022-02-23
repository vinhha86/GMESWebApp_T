Ext.define('GSmartApp.view.stockout.stockout_material.stockout_order.Stockout_Order_D', {
    extend: 'Ext.dataview.DataView',
    xtype: 'Stockout_Order_D',
    itemId: 'Stockout_Order_D',
    // controller: 'Stockout_Order_DController',
    reference: 'Stockout_Order_D',
    cls: 'Stockout_Order_D',
   
    itemTpl:
            '<div class="content">' +
                '<div class="content2">'+
                    '<div class="content2-sub1"><b>Mã NPL:</b></div>'+
                    '<div class="content2-sub2">{materialCode}</div>' +
                '</div>' +

                '<div class="content1">' +
                    '<div class="content1-sub1"><b>Tên NPL:</b></div>'+
                    '<div class="content1-sub1">{materialName}</div>' +
                    '<div class="content1-sub1"><b>Màu NPL:</b></div>'+
                    '<div class="content1-sub1">{tenMauNPL}</div>' +
                '</div>' +

                '<div class="content2">'+
                    '<div class="content2-sub1"><b>Thẻ kho:</b></div>'+
                    '<div class="content2-sub2">{data_spaces}</div>' +
                '</div>' +

                '<div class="content1">' +
                    '<div class="content1-sub1"><b>Cỡ khổ:</b></div>'+
                    '<div class="content1-sub1">{coKho}</div>' +
                    '<div class="content1-sub1"><b>ĐVT:</b></div>'+
                    '<div class="content1-sub1">{unitName}</div>' +
                '</div>' +

                '<div class="content1">' +
                    '<div class="content1-sub1"><b>SL Y/C (Y):</b></div>'+
                    '<div class="content1-sub1">{totalyds:number("000.00")}</div>' +
                    '<div class="content1-sub1"><b>SL Y/C (M):</b></div>'+
                    '<div class="content1-sub1">{totalmet:number("000.00")}</div>' +
                '</div>' +

                '<div class="content2">'+
                    '<div class="content2-sub1"><b>Cây Y/C:</b></div>'+
                    '<div class="content2-sub2">{totalpackage}</div>' +
                '</div>' +

            '</div>',

    bind: {
        store:'{Stockout_order_d_store}'
    },
});