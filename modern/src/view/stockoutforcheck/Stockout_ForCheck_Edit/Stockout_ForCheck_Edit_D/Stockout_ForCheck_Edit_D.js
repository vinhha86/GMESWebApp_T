Ext.define('GSmartApp.view.stockoutforcheck.Stockout_ForCheck_Edit_D', {
    extend: 'Ext.dataview.DataView',
    xtype: 'Stockout_ForCheck_Edit_D',
    itemId: 'Stockout_ForCheck_Edit_D',
    // controller: 'Stockin_M_Edit_D_ViewController',
    reference: 'Stockout_ForCheck_Edit_D',
    cls: 'Stockout_ForCheck_Edit_D',

    itemTpl: new Ext.XTemplate(
        '<tpl for=".">',
            '<div class="content">' +
                '<div class="content1">' +
                    '<div class="content1-sub1"><b>Mã:</b></div>'+
                    '<div class="content1-sub2"><b>{skucode}</b></div>' +
                    // '<div class="content1-sub1">'+
                    //     '<button class="button" type="button">C.tiết</button>'+
                    // '</div>' +
                '</div>' +

                '<div class="content2">'+
                    '<div class="content2-sub1">Màu:</div>'+
                    '<div class="content2-sub2">{sku_product_color}</div>' +
                '</div>' +

                '<div class="content2">'+
                    '<div class="content2-sub1">Mô tả:</div>'+
                    '<div class="content2-sub2">{sku_product_desc}</div>' +
                '</div>' +

                '<div class="content1" style={[this.getDisplayM(values)]}>' +
                    '<div class="content1-sub1" style={[this.getDisplayM(values)]}>Dài y/cầu:</div>'+ // M
                    '<div class="content1-sub1" style={[this.getDisplayM(values)]}>{totalmet:number("000.00")}</div>' +
                    '<div class="content1-sub1" style={[this.getDisplayM(values)]}>Dài kiểm:</div>'+ // M
                    '<div class="content1-sub1" style={[this.getDisplayM(values)]}>{totalmetcheck:number("000.00")}</div>' +
                '</div>' +

                '<div class="content1" style={[this.getDisplayY(values)]}>' +
                    '<div class="content1-sub1" style={[this.getDisplayY(values)]}>Dài y/cầu:</div>'+ // Y
                    '<div class="content1-sub1" style={[this.getDisplayY(values)]}>{totalyds:number("000.00")}</div>' +
                    '<div class="content1-sub1" style={[this.getDisplayY(values)]}>Dài kiểm:</div>'+ // Y
                    '<div class="content1-sub1" style={[this.getDisplayY(values)]}>{totalydscheck:number("000.00")}</div>' +
                '</div>' +

                '<div class="content1" style={[this.getDisplayM(values)]}>' +
                    '<div class="content1-sub1">Cây y/cầu:</div>'+ // M
                    '<div class="content1-sub1">{totalpackage}</div>' +
                    '<div class="content1-sub1">Cây kiểm:</div>'+ // M
                    '<div class="content1-sub1">{totalpackagecheck}</div>' +
                '</div>' +

                '<div class="content2">'+
                    '<div class="content2-sub1">Thẻ kho:</div>'+
                    '<div class="content2-sub2">{data_spaces}</div>' +
                '</div>' +

            '</div>',
        '</tpl>'
        , {
            getDisplayM: function (values) {
                if (values.unitid_link != 1 && values.unitid_link != null) { // không phải met, ẩn
                    return 'display:none;padding-bottom:0px;';
                }
            },
            getDisplayY: function (values) {
                if (values.unitid_link != 3) { // không phải yds, ẩn
                    return 'display:none;padding-bottom:0px;';
                }
            },
            getStockinDLotUpperCase: function (values) {
                var result = values.stockinDLot == null ? '' : values.stockinDLot.toUpperCase();
                return result;
            },
        }
    ),

    bind: {
        store:'{Stockout_order_d_store}'
    },
});