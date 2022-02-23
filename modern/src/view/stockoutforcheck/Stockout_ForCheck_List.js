Ext.define('GSmartApp.view.stockoutforcheck.Stockout_ForCheck_List', {
    extend: 'Ext.dataview.DataView',
    xtype: 'Stockout_ForCheck_List',
    id: 'Stockout_ForCheck_List',
    controller: 'Stockout_ForCheck_List_ViewController',
    reference: 'Stockout_ForCheck_List',
   
    itemTpl:
            '<div class="content">' +

                '<div class="content1">' +
                    '<div class="content1-sub1"><b>Lệnh cấp:</b></div>'+
                    '<div class="content1-sub1">{stockout_order_code}</div>' +
                    '<div class="content1-sub1"><b>Ngày y/cầu:</b></div>'+
                    '<div class="content1-sub1">{date_xuat_yc:date("d/m/y")}</div>' +
                '</div>' +

                '<div class="content1">' +
                    '<div class="content1-sub1"><b>Nơi xuất:</b></div>'+
                    '<div class="content1-sub1">{org_from_name}</div>' +
                    '<div class="content1-sub1"><b>Nơi nhận:</b></div>'+
                    '<div class="content1-sub1">{org_to_name}</div>' +
                '</div>' +

                // '<div class="content2">'+
                //     '<div class="content2-sub1"><b>Loại nhập:</b></div>'+
                //     '<div class="content2-sub2">{stockintype_name}</div>' +
                // '</div>' +

                '<div class="content2">'+
                    '<div class="content2-sub1"><b>S/phẩm:</b></div>'+
                    '<div class="content2-sub2">{porder_product_buyercode}</div>' +
                '</div>' +

                '<div class="content2">'+
                    '<div class="content2-sub1"><b>Mã vải:</b></div>'+
                    '<div class="content2-sub2">{skuCode}</div>' +
                '</div>' +

                // '<div class="content2">'+
                //     '<div class="content2-sub1"><b>S/phẩm:</b></div>'+
                //     '<div class="content2-sub2">{stockinProductString}</div>' +
                // '</div>' +

            '</div>',

    bind: {
        store:'{Stockout_order_Store}'
    },
});
