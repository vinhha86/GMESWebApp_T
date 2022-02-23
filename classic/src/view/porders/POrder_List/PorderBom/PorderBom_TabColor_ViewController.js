Ext.define('GSmartApp.view.porders.POrder_List.PorderBom.PorderBom_TabColor_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PorderBom_TabColor_ViewController',
    init: function () {
    },
    control: {
        '#PorderBom_TabColor': {
            tabchange: 'onTabChange'
        },
        '#btnDongBo': {
            click: 'onDongBo'
        }
    },
    onDongBo: function () {
        var me = this;
        var grid = this.getView();
        var viewmodel = this.getViewModel();
        grid.setLoading('Đang đồng bộ');

        var params = new Object();
        params.porderid_link = viewmodel.get('porder.id');

        GSmartApp.Ajax.post('/api/v1/porderbom/sync', Ext.JSON.encode(params),
            function (success, response, options) {
                var mes = "Đồng bộ thành công";
                grid.setLoading(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode != 200) {
                        mes = "Đồng bộ thất bại";
                    }
                    else {
                        me.createTab();
                    }
                } else {
                    mes = "Đồng bộ thất bại";
                }
                Ext.Msg.show({
                    title: "Thông báo",
                    msg: mes,
                    buttons: Ext.MessageBox.YES,
                    buttonText: {
                        yes: 'Đóng'
                    }
                });
            })
    },
    onTabChange: function (tabPanel, newCard, oldCard, eOpts) {
        var viewmodel = this.getViewModel();
        var storeBOM = viewmodel.getStore('POrderBomColorStore');

        var porderid_link = viewmodel.get('porder.id');
        var colorid_link = newCard.colorid_link;
        storeBOM.removeAll();
        storeBOM.loadStoreColor(porderid_link, colorid_link);
        var gridsize = Ext.getCmp(tabPanel.getActiveTab().id).getController();
        gridsize.CreateColumns();
    },
    createTab: function () {
        newActiveItem = this.getView();
        var grid = this.getView();
        var viewmodel = this.getViewModel();
        var porderid_link = viewmodel.get('porder.id');

        //kiem tra mau co trong sku khong thi moi sinh tab 
        var params = new Object();
        params.pcontractid_link = viewmodel.get('porder.pcontractid_link');
        params.productid_link = viewmodel.get('porder.productid_link');

        GSmartApp.Ajax.post('/api/v1/pcontractsku/getbypcontract_product', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    var listtitle = [];
                    var listid = [];
                    for (var i = 0; i < response.data.length; i++) {
                        var data = response.data[i];
                        if (!listid.includes(data.color_id)) {
                            listid.push(data.color_id);
                            listtitle.push(data.mauSanPham);
                        }
                    }
                    newActiveItem.removeAll();
                    for (var i = 0; i < listtitle.length; i++) {
                        newActiveItem.add({
                            title: listtitle[i],
                            xtype: 'PorderBom_Color_View',
                            id: 'PorderBom_Color_View_' + porderid_link + "_" + i,
                            colorid_link: listid[i]
                        });
                    }
                    newActiveItem.setActiveTab(0);
                }
            })
    }
})