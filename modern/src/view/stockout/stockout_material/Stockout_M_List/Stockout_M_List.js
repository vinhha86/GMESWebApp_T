Ext.define('GSmartApp.view.stockout.stockout_material.stockout_m_list.Stockout_M_List', {
    extend: 'Ext.dataview.DataView',
    xtype: 'Stockout_M_List',
    itemId: 'Stockout_M_List',
    controller: 'Stockout_M_ListController',
    reference: 'Stockout_M_List',
    cls: 'Stockout_M_List',
   
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
                    '<div class="content1-sub1">{stockoutcode}</div>' +
                    '<div class="content1-sub1"><b>Ngày xuất:</b></div>'+
                    '<div class="content1-sub1">{stockoutdate:date("d/m/y")}</div>' +
                '</div>' +

                // '<div class="content1">' +
                // '<div class="content1-sub1"><b>Số Invoice:</b> {invoice_number}</div>' +
                // '<div class="content1-sub2"><b>Ngày Invoice:</b> {invoice_date:date("m/d/Y")}</div>' +
                // '</div>' +

                '<div class="content2">'+
                    '<div class="content2-sub1"><b>Số YCX:</b></div>'+
                    '<div class="content2-sub2">{stockout_order_code}</div>' +
                '</div>' +

                '<div class="content2">'+
                    '<div class="content2-sub1"><b>S/phẩm:</b></div>'+
                    '<div class="content2-sub2">{porder_product_buyercode}</div>' +
                '</div>' +

                '<div class="content1">' +
                    '<div class="content1-sub1"><b>Loại xuất kho:</b></div>'+
                    '<div class="content1-sub1">{stockouttype_name}</div>' +
                    '<div class="content1-sub1"><b>Nơi nhận:</b></div>'+
                    '<div class="content1-sub1">{org_to_name}</div>' +
                '</div>' +


                '<div class="content2">'+
                    '<div class="content2-sub1"><b>Trạng thái:</b></div>'+
                    '<div class="content2-sub2">{statusString}</div>' +
                '</div>' +

                // '<div class="content2"><b>Nơi xuất:</b> {orgfrom_name}</div>' +
            '</div>',

    bind: {
        store:'{Stockout}'
    },
});