Ext.define('GSmartApp.view.stockout_material.stockout_m_edit.stockout_m_edit_pkl_rip.stockout_m_edit_pkl_rip_select.Stockout_M_Edit_Pkl_Rip_Select', {
    extend: 'Ext.dataview.List',
    xtype: 'Stockout_M_Edit_Pkl_Rip_Select',
    itemId: 'Stockout_M_Edit_Pkl_Rip_Select',
    controller: 'Stockout_M_Edit_Pkl_Rip_Select_Controller',
    viewModel: 'Stockout_M_Edit_Pkl_Rip_Select_ViewModel',
    cls: 'Stockout_M_Edit_Pkl_Rip_Select',

    // height: 400,
    width: 400,
    // loadingHeight: 400,
    // itemTpl: '{epc}',

    itemTpl: new Ext.XTemplate(
        '<tpl for=".">',
            '<div class="content">' +
                '<div class="content1">' +
                    '<div class="content1-sub1"><b>Invoice:</b></div>'+
                    '<div class="content1-sub2"><b>{invoice}</b></div>' +
                    // '<div class="content1-sub2">{invoice}</div>' +
                '</div>' +

                '<div class="content1">' +
                    '<div class="content1-sub1"><b>Ngày nhập:</b></div>'+
                    // '<div class="content1-sub2"><b>{timecreate:date("d/m/y")}</b></div>' +
                    '<div class="content1-sub2">{ngayNhapKho:date("d/m/y")}</div>' +
                '</div>' +

                // '<div class="content2">'+
                //     '<div class="content2-sub1">Màu:</div>'+
                //     '<div class="content2-sub2">{sku_product_color}</div>' +
                // '</div>' +

                '<div class="content1">' +
                    '<div class="content1-sub1"><b>Số Lot:</b></div>'+
                    // '<div class="content1-sub1"><b>{lotnumber}</b></div>' +
                    '<div class="content1-sub1">{lotnumber}</div>' +
                    '<div class="content1-sub1"><b>Số cây:</b></div>'+
                    // '<div class="content1-sub1"><b>{packageid}</b></div>' +
                    '<div class="content1-sub1">{packageid}</div>' +
                '</div>' +
                '<div class="content1">' +
                    '<div class="content1-sub1"><b>Met:</b></div>'+
                    // '<div class="content1-sub1"><b>{met}</b></div>' +
                    '<div class="content1-sub1">{met_check}</div>' +
                    '<div class="content1-sub1"><b>Khổ(cm):</b></div>'+
                    // '<div class="content1-sub1"><b>{width_met*100}</b></div>' +
                    '<div class="content1-sub1">{widthcheck*100}</div>' +
                '</div>' +
            '</div>',
        '</tpl>'
    ),

    grouped: false,
    bind: {
        store: '{listValue}'
    }
});