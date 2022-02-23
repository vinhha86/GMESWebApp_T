Ext.define('GSmartApp.view.stockin.stockin_material.Stockin_M_List', {
    extend: 'Ext.dataview.DataView',
    xtype: 'Stockin_M_List',
    id: 'Stockin_M_List',
    controller: 'Stockin_M_List_ViewController',
    reference: 'Stockin_M_List',
   
    // itemTpl:
    //         '<div class="content" style={[this.getDisplayStatus(values)]}>' +
    //             // '<div class="content1">' +
    //             //     '<div class="content1-sub1"><b>Số phiếu:</b></div>'+
    //             //     '<div class="content1-sub1"><b>{stockincode}</b></div>' +
    //             //     '<div class="content1-sub1"><b>Ngày nhập:</b></div>'+
    //             //     '<div class="content1-sub1">{stockindate:date("d/m/y")}</div>' +
    //             // '</div>' +

    //             '<div class="content1">' +
    //                 '<div class="content1-sub1"><b>Số invoice:</b></div>'+
    //                 '<div class="content1-sub1">{invoice_number}</div>' +
    //                 '<div class="content1-sub1"><b>Ngày invoice:</b></div>'+
    //                 '<div class="content1-sub1">{invoice_date:date("d/m/y")}</div>' +
    //             '</div>' +

    //             // '<div class="content1">' +
    //             // '<div class="content1-sub1"><b>Số Invoice:</b> {invoice_number}</div>' +
    //             // '<div class="content1-sub2"><b>Ngày Invoice:</b> {invoice_date:date("m/d/Y")}</div>' +
    //             // '</div>' +

    //             '<div class="content1">'+
    //                 '<div class="content1-sub1"><b>Loại nhập:</b></div>'+
    //                 '<div class="content1-sub1">{stockintype_name}</div>' +
    //                 '<div class="content1-sub1"><b>Tổng số kiện:</b></div>'+
    //                 '<div class="content1-sub1">{totalpackage}</div>' +
    //             '</div>' +

    //             '<div class="content2">'+
    //                 '<div class="content2-sub1"><b>Nơi xuất:</b></div>'+
    //                 '<div class="content2-sub2">{orgfrom_name}</div>' +
    //             '</div>' +

    //             '<div class="content2">'+
    //                 '<div class="content2-sub1"><b>S/phẩm:</b></div>'+
    //                 '<div class="content2-sub2">{stockinProductString}</div>' +
    //             '</div>' +

    //             '<div class="content2">'+
    //                 '<div class="content2-sub1"><b>Lý do nhập:</b></div>'+
    //                 '<div class="content2-sub2">{reason}</div>' +
    //             '</div>' +

    //             '<div class="content2">'+
    //                 '<div class="content2-sub1"><b>Người lập:</b></div>'+
    //                 '<div class="content2-sub2">{usercreate_name}</div>' +
    //             '</div>' +

    //             // '<div class="content2"><b>Nơi xuất:</b> {orgfrom_name}</div>' +
    //         '</div>',

    itemTpl: new Ext.XTemplate(
        '<tpl for=".">',
            '<div class="content" style={[this.getDisplayStatus(values)]}>' +
                // '<div class="content1">' +
                //     '<div class="content1-sub1"><b>Số phiếu:</b></div>'+
                //     '<div class="content1-sub1"><b>{stockincode}</b></div>' +
                //     '<div class="content1-sub1"><b>Ngày nhập:</b></div>'+
                //     '<div class="content1-sub1">{stockindate:date("d/m/y")}</div>' +
                // '</div>' +

                '<div class="content2">'+
                    '<div class="content2-sub1"><b>Số phiếu:</b></div>'+
                    '<div class="content2-sub2">{stockincode}</div>' +
                '</div>' +

                '<div class="content1">' +
                    '<div class="content1-sub1"><b>Số invoice:</b></div>'+
                    '<div class="content1-sub1">{invoice_number}</div>' +
                    '<div class="content1-sub1"><b>Ngày invoice:</b></div>'+
                    '<div class="content1-sub1">{invoice_date:date("d/m/y")}</div>' +
                '</div>' +

                // '<div class="content1">' +
                // '<div class="content1-sub1"><b>Số Invoice:</b> {invoice_number}</div>' +
                // '<div class="content1-sub2"><b>Ngày Invoice:</b> {invoice_date:date("m/d/Y")}</div>' +
                // '</div>' +

                '<div class="content1">'+
                    '<div class="content1-sub1"><b>Loại nhập:</b></div>'+
                    '<div class="content1-sub1">{stockintype_name}</div>' +
                    '<div class="content1-sub1"><b>Tổng số kiện:</b></div>'+
                    '<div class="content1-sub1">{totalpackage}</div>' +
                '</div>' +

                '<div class="content2">'+
                    '<div class="content2-sub1"><b>Nơi xuất:</b></div>'+
                    '<div class="content2-sub2">{orgfrom_name}</div>' +
                '</div>' +

                '<div class="content2">'+
                    '<div class="content2-sub1"><b>S/phẩm:</b></div>'+
                    '<div class="content2-sub2">{stockinProductString}</div>' +
                '</div>' +

                '<div class="content2">'+
                    '<div class="content2-sub1"><b>Lý do nhập:</b></div>'+
                    '<div class="content2-sub2">{reason}</div>' +
                '</div>' +

                // '<div class="content2">'+
                //     '<div class="content2-sub1"><b>Người lập:</b></div>'+
                //     '<div class="content2-sub2">{usercreate_name}</div>' +
                // '</div>' +

                '<div class="content1">'+
                    '<div class="content1-sub1"><b>Người lập:</b></div>'+
                    '<div class="content1-sub1">{usercreate_name}</div>' +
                    '<div class="content1-sub1"><b>Trạng thái:</b></div>'+
                    '<div class="content1-sub1">{statusString}</div>' +
                '</div>' +

                // '<div class="content2"><b>Nơi xuất:</b> {orgfrom_name}</div>' +
            '</div>',
        '</tpl>'
        , {
            getDisplayStatus: function (values) {
                if (values.status == -1) { // Chưa kiểm tra
                    return 'background-color:yellow;';
                }else if(values.status == 0) { // Đang kiểm tra
                    return 'background-color:white;';
                }
            }
        }
    ),

    bind: {
        store:'{StockinStore}'
    },
});
