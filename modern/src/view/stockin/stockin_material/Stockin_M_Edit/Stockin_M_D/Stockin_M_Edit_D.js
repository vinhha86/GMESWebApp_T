Ext.define('GSmartApp.view.stockin.stockin_material.stockin_m_edit.Stockin_M_Edit_D', {
    extend: 'Ext.dataview.DataView',
    xtype: 'Stockin_M_Edit_D',
    itemId: 'Stockin_M_Edit_D',
    // controller: 'Stockin_M_Edit_D_ViewController',
    reference: 'Stockin_M_Edit_D',
    cls: 'Stockin_M_Edit_D',

    itemTpl: new Ext.XTemplate(
        '<tpl for=".">',
            '<div class="content">' +
                '<div class="content1">' +
                    '<div class="content1-sub1"><b>Mã:</b></div>'+
                    '<div class="content1-sub2"><b>{skuCode}</b></div>' +
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
                    '<div class="content1-sub1" style={[this.getDisplayM(values)]}>Dài phiếu:</div>'+ // M
                    '<div class="content1-sub1" style={[this.getDisplayM(values)]}>{totalmet_origin:number("000.00")}</div>' +
                    '<div class="content1-sub1" style={[this.getDisplayM(values)]}>Dài kiểm:</div>'+ // M
                    '<div class="content1-sub1" style={[this.getDisplayM(values)]}>{totalmet_check:number("000.00")}</div>' +
                '</div>' +

                '<div class="content1" style={[this.getDisplayY(values)]}>' +
                    '<div class="content1-sub1" style={[this.getDisplayY(values)]}>Dài phiếu:</div>'+ // Y
                    '<div class="content1-sub1" style={[this.getDisplayY(values)]}>{totalydsorigin:number("000.00")}</div>' +
                    '<div class="content1-sub1" style={[this.getDisplayY(values)]}>Dài kiểm:</div>'+ // Y
                    '<div class="content1-sub1" style={[this.getDisplayY(values)]}>{totalydscheck:number("000.00")}</div>' +
                '</div>' +

                '<div class="content1" style={[this.getDisplayKg(values)]}>' +
                    '<div class="content1-sub1" style={[this.getDisplayKg(values)]}>Cân phiếu:</div>'+ // Y
                    '<div class="content1-sub1" style={[this.getDisplayKg(values)]}>{grossweight:number("000.00")}</div>' +
                    '<div class="content1-sub1" style={[this.getDisplayKg(values)]}>Cân kiểm:</div>'+ // Y
                    '<div class="content1-sub1" style={[this.getDisplayKg(values)]}>{netweight:number("000.00")}</div>' +
                '</div>' +

                '<div class="content1" style={[this.getDisplayLbs(values)]}>' +
                    '<div class="content1-sub1" style={[this.getDisplayLbs(values)]}>Lbs phiếu:</div>'+ // Y
                    '<div class="content1-sub1" style={[this.getDisplayLbs(values)]}>{grossweight_lbs:number("000.00")}</div>' +
                    '<div class="content1-sub1" style={[this.getDisplayLbs(values)]}>Lbs kiểm:</div>'+ // Y
                    '<div class="content1-sub1" style={[this.getDisplayLbs(values)]}>{netweight_lbs:number("000.00")}</div>' +
                '</div>' +

                '<div class="content2">'+
                    '<div class="content2-sub1">Lot:</div>'+
                    '<div class="content2-sub2">{[this.getStockinDLotUpperCase(values)]}</div>' +
                    // '<div class="content2-sub2">{stockinDLot}</div>' +
                '</div>' +
            '</div>',
        '</tpl>'
        , {
            getDisplayM: function (values) {
                if (values.unitid_link != 1) { // không phải met, ẩn
                    return 'display:none;padding-bottom:0px;';
                }
            },
            getDisplayY: function (values) {
                if (values.unitid_link != 3) { // không phải yds, ẩn
                    return 'display:none;padding-bottom:0px;';
                }
            },
            getDisplayKg: function (values) {
                if (values.unitid_link != 4) { // không phải kg, ẩn
                    return 'display:none;padding-bottom:0px;';
                }
            },
            getDisplayLbs: function (values) {
                if (values.unitid_link != 5) { // không phải lbs, ẩn
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
        // store:'{stockin.stockin_d}'
        store:'{Stockin_d_Store}'
    },
});