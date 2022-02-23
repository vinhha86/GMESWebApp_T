Ext.define('GSmartApp.view.stockout.stockout_material.stockout_order.Stockout_Order', {
    extend: 'Ext.dataview.DataView',
    xtype: 'Stockout_Order',
    itemId: 'Stockout_Order',
    controller: 'Stockout_OrderController',
    reference: 'Stockout_Order',
    cls: 'Stockout_Order',
   
    itemTpl:
            '<div class="content">' +
                // '<div class="content1">' +
                //     '<div class="content1-sub1"><b>Số phiếu:</b></div>'+
                //     '<div class="content1-sub1"><b>{stockincode}</b></div>' +
                //     '<div class="content1-sub1"><b>Ngày nhập:</b></div>'+
                //     '<div class="content1-sub1">{stockindate:date("d/m/y")}</div>' +
                // '</div>' +

                '<div class="content1">' +
                    '<div class="content1-sub1"><b>Số phiếu:</b></div>'+
                    '<div class="content1-sub1">{stockout_order_code}</div>' +
                    '<div class="content1-sub1"><b>Ngày xuất:</b></div>'+
                    '<div class="content1-sub1">{orderdate:date("d/m/y")}</div>' +
                '</div>' +

                '<div class="content2">'+
                    '<div class="content2-sub1"><b>S/phẩm:</b></div>'+
                    '<div class="content2-sub2">{porder_product_buyercode}</div>' +
                '</div>' +

                '<div class="content2">'+
                    '<div class="content2-sub1"><b>Lệnh SX:</b></div>'+
                    '<div class="content2-sub2">{porder_code}</div>' +
                '</div>' +

                '<div class="content1">' +
                    '<div class="content1-sub1"><b>Loại phiếu:</b></div>'+
                    '<div class="content1-sub1">{typename}</div>' +
                    '<div class="content1-sub1"><b>Nơi nhận:</b></div>'+
                    '<div class="content1-sub1">{org_to_name}</div>' +
                '</div>' +

                '<div class="content2">'+
                    '<div class="content2-sub1"><b>Trạng thái:</b></div>'+
                    '<div class="content2-sub2">{statusName}</div>' +
                '</div>' +

                // '<div class="content2"><b>Nơi xuất:</b> {orgfrom_name}</div>' +
            '</div>',

    bind: {
        store:'{Stockout_order_Store}'
    },
});