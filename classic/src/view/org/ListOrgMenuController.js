Ext.define('GSmartApp.view.org.ListOrgMenuController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ListOrgMenuController',
    init: function () {
        this.onloadPage();
    },
    control: {
        '#ListOrgMenu': {
            itemclick: 'onloadDetail'
        },
        '#btnRefresh': {
            click: 'onRefresh'
        }
    },
    onRefresh: function(){
        var viewModel = this.getViewModel();
        var storeMenu = viewModel.getStore('MenuStore');
        storeMenu.load();
    },
    onloadDetail: function (grid, record, item, index, e, eOpts) {
        var viewModel = this.getViewModel();
        // console.log(record.data);
        viewModel.set('currentRec', record.data);
        viewModel.set('id', record.data.id);
        viewModel.set('titleName', record.data.name);
        viewModel.set('parentid_link', record.data.parentid_link);
        //
        viewModel.set('code', record.data.code);
        viewModel.set('name', record.data.name);
        viewModel.set('city', record.data.city);
        viewModel.set('address', record.data.address);
        viewModel.set('contactperson', record.data.contactperson);
        viewModel.set('email', record.data.email);
        viewModel.set('phone', record.data.phone);
        viewModel.set('linecost', record.data.linecost);
        viewModel.set('orgtypeid_link', record.data.orgtypeid_link);
        viewModel.set('colorid_link', record.data.colorid_link);
        viewModel.set('status', record.data.status);
        viewModel.set('costpersec', record.data.costpersec);
        viewModel.set('is_manufacturer', record.data.is_manufacturer);
        //
        viewModel.set('fieldState', true);
    },
    onloadPage: function () {
        var me = this.getView();
        var viewModel = this.getViewModel();
        var storeMenu = viewModel.getStore('MenuStore');
        storeMenu.loadStore();
        var storeColor = viewModel.getStore('ColorStore');
        storeColor.loadStore();
        var storeOrgType = viewModel.getStore('OrgTypeStore');
        storeOrgType.loadStore();

        this.activeOnlyFilter = Ext.create('Ext.util.Filter', {
            id: 'activeOnlyFilter',
            property: 'status',
            value: 1
        });
        storeMenu.getFilters().add(this.activeOnlyFilter);
        // storeMenu.getSorters().add('orgtypeid_link');
        // storeMenu.getSorters().add('is_manufacturer');
        // storeMenu.getSorters().add('code');
        storeMenu.getSorters().add({
            property: 'orgtypeid_link',
            direction: 'ASC'
        }, {
            property: 'id',
            direction: 'ASC'
        });
    },
    onDropOrg: function (node, data, overModel, dropPosition) {
        var start = data.records[0].data;
        var target = overModel.data;
        if (start.orgtypeid_link == 14 && target.orgtypeid_link == 13 && start.parentid_link != target.id) {
            var params = new Object();
            start.parentid_link = target.id;
            params.data = start;

            params.msgtype = "ORG_SAVE";
            params.message = "Lưu org";

            GSmartApp.Ajax.post('/api/v1/orgmenu/createOrg', Ext.JSON.encode(params),
                function (success, response, options) {
                    if (success) {
                        var response = Ext.decode(response.responseText);
                        if (response.respcode == 200) {
                            Ext.Msg.show({
                                title: 'Thông báo',
                                msg: 'Lưu thành công',
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Đóng',
                                }
                            });

                        }
                        else {
                            Ext.Msg.show({
                                title: 'Lưu thất bại',
                                msg: response.message,
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Đóng',
                                }
                            });
                        }
                    } else {
                        Ext.Msg.show({
                            title: 'Lưu thất bại',
                            msg: null,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }
                })
        }
    },
    onBeforeDropOrg: function (node, data, overModel, dropPosition, dropHandlers, eOpts) {
        // console.log(data.records[0].data);
        // console.log(dropHandlers);
        // console.log(overModel.data);
        var start = data.records[0].data;
        var target = overModel.data;

        if (data.records[0].childNodes.length > 0) {
            Ext.MessageBox.show({
                title: "Quản lý đơn vị",
                msg: "Không được di chuyển đơn vị cha",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            dropHandlers.cancelDrop();
            return;
        }
        if (!(start.orgtypeid_link == 14 && target.orgtypeid_link == 13)) {
            if (start.parentid_link != target.parentid_link) {
                Ext.MessageBox.show({
                    title: "Quản lý đơn vị",
                    msg: "Đơn vị di chuyển phải là tổ, đơn vị đích phải là phân xưởng",
                    buttons: Ext.MessageBox.YES,
                    buttonText: {
                        yes: 'Đóng',
                    }
                });
                dropHandlers.cancelDrop();
                return;
            }
        }
        // if(target.orgtypeid_link == 13){
        //     target.leaf = false;
        // }
    },
    onContextMenu: function (tree, record, item, index, e, eOpts) {
        var me = this;
        //Tong cong ty
        if (record.data.orgtypeid_link == 1) {
            var menu_grid = new Ext.menu.Menu({
                items:
                    [
                        {
                            text: 'Thêm Phân xưởng',
                            itemId: 'btnAddFactory_ListOrgMenu',
                            separator: true,
                            // margin: '5 0 0',
                            iconCls: 'x-fa fas fa-industry',
                            handler: function () {
                                console.log(record);
                                // var record = this.parentMenu.record;
                                // me.onPOPriceEdit(record);
                                var viewModel = me.getViewModel();
                                viewInfo = Ext.getCmp('ListOrgDetail');
                                viewInfo.getController().emptyForm();
                                viewModel.set('id', 0);
                                viewModel.set('parentid_link', record.id);
                                //
                                viewModel.set('orgtypeid_link', 13);
                                viewModel.set('status', true);
                                viewModel.set('is_manufacturer', 0);
                                //
                                viewModel.set('fieldState', true);
                                viewModel.set('titleName', record.data.name);
                            },
                        }, {
                            text: 'Thêm Đơn vị gia công',
                            itemId: 'btnAddManufacturer_ListOrgMenu',
                            separator: true,
                            // margin: '5 0 0',
                            iconCls: 'x-fa fas fa-handshake',
                            handler: function () {
                                console.log(record);
                                // var record = this.parentMenu.record;
                                // me.onPOPriceEdit(record);
                                var viewModel = me.getViewModel();
                                viewInfo = Ext.getCmp('ListOrgDetail');
                                viewInfo.getController().emptyForm();
                                viewModel.set('id', 0);
                                viewModel.set('parentid_link', record.id);
                                //
                                viewModel.set('orgtypeid_link', 13);
                                viewModel.set('status', true);
                                viewModel.set('is_manufacturer', 1);
                                //
                                viewModel.set('fieldState', true);
                                viewModel.set('titleName', record.data.name);
                            },
                        },
                    ]
            });
            var position = e.getXY();
            e.stopEvent();
            menu_grid.showAt(position);
        }
        //Phan xuong
        if (record.data.orgtypeid_link == 13) {
            var menu_grid = new Ext.menu.Menu({
                items:
                    [
                        {
                            text: 'Thêm Tổ SX',
                            itemId: 'btnAddLine_ListOrgMenu',
                            separator: true,
                            // margin: '5 0 0',
                            iconCls: 'x-fa fas fa-sliders',
                            handler: function () {
                                console.log(record);
                                me.createproductionline(record.data);
                            },
                        }, {
                            text: 'Thêm Kho thành phẩm',
                            itemId: 'btnAddProductStore_ListOrgMenu',
                            separator: true,
                            // margin: '5 0 0',
                            iconCls: 'x-fa fas fa-home',
                            handler: function () {
                                console.log(record);
                                // var record = this.parentMenu.record;
                                // me.onPOPriceEdit(record);
                                var viewModel = me.getViewModel();
                                viewInfo = Ext.getCmp('ListOrgDetail');
                                viewInfo.getController().emptyForm();
                                viewModel.set('id', 0);
                                viewModel.set('parentid_link', record.id);
                                //
                                viewModel.set('orgtypeid_link', 8);
                                viewModel.set('status', true);
                                viewModel.set('is_manufacturer', 0);
                                //
                                viewModel.set('fieldState', true);
                                viewModel.set('titleName', record.data.name);
                            },
                        }, {
                            text: 'Thêm Kho nguyên liệu',
                            itemId: 'btnAddNPLStore_ListOrgMenu',
                            separator: true,
                            // margin: '5 0 0',
                            iconCls: 'x-fa fas fa-archive',
                            handler: function () {
                                console.log(record);
                                // var record = this.parentMenu.record;
                                // me.onPOPriceEdit(record);
                                var viewModel = me.getViewModel();
                                viewInfo = Ext.getCmp('ListOrgDetail');
                                viewInfo.getController().emptyForm();
                                viewModel.set('id', 0);
                                viewModel.set('parentid_link', record.id);
                                //
                                viewModel.set('orgtypeid_link', 3);
                                viewModel.set('status', true);
                                viewModel.set('is_manufacturer', 0);
                                //
                                viewModel.set('fieldState', true);
                                viewModel.set('titleName', record.data.name);
                            },
                        }, {
                            text: 'Thêm Kho phụ liệu',
                            itemId: 'btnAddPLStore_ListOrgMenu',
                            separator: true,
                            // margin: '5 0 0',
                            iconCls: 'x-fa fas fa-archive',
                            handler: function () {
                                console.log(record);
                                // var record = this.parentMenu.record;
                                // me.onPOPriceEdit(record);
                                var viewModel = me.getViewModel();
                                viewInfo = Ext.getCmp('ListOrgDetail');
                                viewInfo.getController().emptyForm();
                                viewModel.set('id', 0);
                                viewModel.set('parentid_link', record.id);
                                //
                                viewModel.set('orgtypeid_link', 19);
                                viewModel.set('status', true);
                                viewModel.set('is_manufacturer', 0);
                                //
                                viewModel.set('fieldState', true);
                                viewModel.set('titleName', record.data.name);
                            },
                        }, {
                            text: 'Thêm Tổ hoàn thiện',
                            itemId: 'btnAddProductQC_ListOrgMenu',
                            separator: true,
                            // margin: '5 0 0',
                            iconCls: 'x-fa fas fa-check-circle',
                            handler: function () {
                                console.log(record);
                                // var record = this.parentMenu.record;
                                // me.onPOPriceEdit(record);
                                var viewModel = me.getViewModel();
                                viewInfo = Ext.getCmp('ListOrgDetail');
                                viewInfo.getController().emptyForm();
                                viewModel.set('id', 0);
                                viewModel.set('parentid_link', record.id);
                                //
                                viewModel.set('orgtypeid_link', 9);
                                viewModel.set('status', true);
                                viewModel.set('is_manufacturer', 0);
                                //
                                viewModel.set('fieldState', true);
                                viewModel.set('titleName', record.data.name);
                            },
                        }, {
                            text: 'Thêm Tổ giặt là',
                            itemId: 'btnAddWashingLine_ListOrgMenu',
                            separator: true,
                            // margin: '5 0 0',
                            iconCls: 'x-fa fas fa-bath',
                            handler: function () {
                                console.log(record);
                                // var record = this.parentMenu.record;
                                // me.onPOPriceEdit(record);
                                var viewModel = me.getViewModel();
                                viewInfo = Ext.getCmp('ListOrgDetail');
                                viewInfo.getController().emptyForm();
                                viewModel.set('id', 0);
                                viewModel.set('parentid_link', record.id);
                                //
                                viewModel.set('orgtypeid_link', 21);
                                viewModel.set('status', true);
                                viewModel.set('is_manufacturer', 0);
                                //
                                viewModel.set('fieldState', true);
                                viewModel.set('titleName', record.data.name);
                            },
                        }, {
                            text: 'Thêm Tổ cắt',
                            itemId: 'btnAddCutLine_ListOrgMenu',
                            separator: true,
                            // margin: '5 0 0',
                            iconCls: 'x-fa fas fa-scissors',
                            handler: function () {
                                console.log(record);
                                // var record = this.parentMenu.record;
                                // me.onPOPriceEdit(record);
                                var viewModel = me.getViewModel();
                                viewInfo = Ext.getCmp('ListOrgDetail');
                                viewInfo.getController().emptyForm();
                                viewModel.set('id', 0);
                                viewModel.set('parentid_link', record.id);
                                //
                                viewModel.set('orgtypeid_link', 17);
                                viewModel.set('status', true);
                                viewModel.set('is_manufacturer', 0);
                                //
                                viewModel.set('fieldState', true);
                                viewModel.set('titleName', record.data.name);
                            },
                        },
                        //////////////////////////////////////////////////////
                        {
                            text: 'Thêm Tổ cơ điện',
                            itemId: 'btnAddToCoDien_ListOrgMenu',
                            separator: true,
                            // margin: '5 0 0',
                            // iconCls: 'x-fa fas fa-scissors',
                            handler: function () {
                                console.log(record);
                                // var record = this.parentMenu.record;
                                // me.onPOPriceEdit(record);
                                var viewModel = me.getViewModel();
                                viewInfo = Ext.getCmp('ListOrgDetail');
                                viewInfo.getController().emptyForm();
                                viewModel.set('id', 0);
                                viewModel.set('parentid_link', record.id);
                                //
                                viewModel.set('orgtypeid_link', 28);
                                viewModel.set('status', true);
                                viewModel.set('is_manufacturer', 0);
                                //
                                viewModel.set('fieldState', true);
                                viewModel.set('titleName', record.data.name);
                            },
                        },
                        {
                            text: 'Thêm Kho NPL',
                            itemId: 'btnAddKhoNPL_ListOrgMenu',
                            separator: true,
                            // margin: '5 0 0',
                            // iconCls: 'x-fa fas fa-scissors',
                            handler: function () {
                                console.log(record);
                                // var record = this.parentMenu.record;
                                // me.onPOPriceEdit(record);
                                var viewModel = me.getViewModel();
                                viewInfo = Ext.getCmp('ListOrgDetail');
                                viewInfo.getController().emptyForm();
                                viewModel.set('id', 0);
                                viewModel.set('parentid_link', record.id);
                                //
                                viewModel.set('orgtypeid_link', 29);
                                viewModel.set('status', true);
                                viewModel.set('is_manufacturer', 0);
                                //
                                viewModel.set('fieldState', true);
                                viewModel.set('titleName', record.data.name);
                            },
                        }, {
                            text: 'Thêm Tổ kỹ thuật',
                            itemId: 'btnAddToKyThuat_ListOrgMenu',
                            separator: true,
                            // margin: '5 0 0',
                            // iconCls: 'x-fa fas fa-scissors',
                            handler: function () {
                                console.log(record);
                                // var record = this.parentMenu.record;
                                // me.onPOPriceEdit(record);
                                var viewModel = me.getViewModel();
                                viewInfo = Ext.getCmp('ListOrgDetail');
                                viewInfo.getController().emptyForm();
                                viewModel.set('id', 0);
                                viewModel.set('parentid_link', record.id);
                                //
                                viewModel.set('orgtypeid_link', 30);
                                viewModel.set('status', true);
                                viewModel.set('is_manufacturer', 0);
                                //
                                viewModel.set('fieldState', true);
                                viewModel.set('titleName', record.data.name);
                            },
                        }, {
                            text: 'Thêm Tổ vệ sinh',
                            itemId: 'btnAddToVeSinh_ListOrgMenu',
                            separator: true,
                            // margin: '5 0 0',
                            // iconCls: 'x-fa fas fa-scissors',
                            handler: function () {
                                console.log(record);
                                // var record = this.parentMenu.record;
                                // me.onPOPriceEdit(record);
                                var viewModel = me.getViewModel();
                                viewInfo = Ext.getCmp('ListOrgDetail');
                                viewInfo.getController().emptyForm();
                                viewModel.set('id', 0);
                                viewModel.set('parentid_link', record.id);
                                //
                                viewModel.set('orgtypeid_link', 31);
                                viewModel.set('status', true);
                                viewModel.set('is_manufacturer', 0);
                                //
                                viewModel.set('fieldState', true);
                                viewModel.set('titleName', record.data.name);
                            },
                        }, {
                            text: 'Thêm Văn phòng xưởng',
                            itemId: 'btnAddVanPhongXuong_ListOrgMenu',
                            separator: true,
                            // margin: '5 0 0',
                            // iconCls: 'x-fa fas fa-scissors',
                            handler: function () {
                                console.log(record);
                                // var record = this.parentMenu.record;
                                // me.onPOPriceEdit(record);
                                var viewModel = me.getViewModel();
                                viewInfo = Ext.getCmp('ListOrgDetail');
                                viewInfo.getController().emptyForm();
                                viewModel.set('id', 0);
                                viewModel.set('parentid_link', record.id);
                                //
                                viewModel.set('orgtypeid_link', 32);
                                viewModel.set('status', true);
                                viewModel.set('is_manufacturer', 0);
                                //
                                viewModel.set('fieldState', true);
                                viewModel.set('titleName', record.data.name);
                            },
                        }, {
                            text: 'Thêm Tổ cơ động',
                            itemId: 'btnAddToCoDong_ListOrgMenu',
                            separator: true,
                            // margin: '5 0 0',
                            // iconCls: 'x-fa fas fa-scissors',
                            handler: function () {
                                console.log(record);
                                // var record = this.parentMenu.record;
                                // me.onPOPriceEdit(record);
                                var viewModel = me.getViewModel();
                                viewInfo = Ext.getCmp('ListOrgDetail');
                                viewInfo.getController().emptyForm();
                                viewModel.set('id', 0);
                                viewModel.set('parentid_link', record.id);
                                //
                                viewModel.set('orgtypeid_link', 33);
                                viewModel.set('status', true);
                                viewModel.set('is_manufacturer', 0);
                                //
                                viewModel.set('fieldState', true);
                                viewModel.set('titleName', record.data.name);
                            },
                        }, {
                            text: 'Thêm FOB',
                            itemId: 'btnAddFOB_ListOrgMenu',
                            separator: true,
                            // margin: '5 0 0',
                            // iconCls: 'x-fa fas fa-scissors',
                            handler: function () {
                                console.log(record);
                                // var record = this.parentMenu.record;
                                // me.onPOPriceEdit(record);
                                var viewModel = me.getViewModel();
                                viewInfo = Ext.getCmp('ListOrgDetail');
                                viewInfo.getController().emptyForm();
                                viewModel.set('id', 0);
                                viewModel.set('parentid_link', record.id);
                                //
                                viewModel.set('orgtypeid_link', 34);
                                viewModel.set('status', true);
                                viewModel.set('is_manufacturer', 0);
                                //
                                viewModel.set('fieldState', true);
                                viewModel.set('titleName', record.data.name);
                            },
                        }, {
                            text: 'Thêm Đơn vị QA',
                            itemId: 'btnAddQA_ListOrgMenu',
                            separator: true,
                            // margin: '5 0 0',
                            // iconCls: 'x-fa fas fa-scissors',
                            handler: function () {
                                console.log(record);
                                // var record = this.parentMenu.record;
                                // me.onPOPriceEdit(record);
                                var viewModel = me.getViewModel();
                                viewInfo = Ext.getCmp('ListOrgDetail');
                                viewInfo.getController().emptyForm();
                                viewModel.set('id', 0);
                                viewModel.set('parentid_link', record.id);
                                //
                                viewModel.set('orgtypeid_link', 35);
                                viewModel.set('status', true);
                                viewModel.set('is_manufacturer', 0);
                                //
                                viewModel.set('fieldState', true);
                                viewModel.set('titleName', record.data.name);
                            },
                        }, {
                            text: 'Thêm Tổ bảo vệ',
                            itemId: 'btnAddToBaoVe_ListOrgMenu',
                            separator: true,
                            // margin: '5 0 0',
                            // iconCls: 'x-fa fas fa-scissors',
                            handler: function () {
                                console.log(record);
                                // var record = this.parentMenu.record;
                                // me.onPOPriceEdit(record);
                                var viewModel = me.getViewModel();
                                viewInfo = Ext.getCmp('ListOrgDetail');
                                viewInfo.getController().emptyForm();
                                viewModel.set('id', 0);
                                viewModel.set('parentid_link', record.id);
                                //
                                viewModel.set('orgtypeid_link', 36);
                                viewModel.set('status', true);
                                viewModel.set('is_manufacturer', 0);
                                //
                                viewModel.set('fieldState', true);
                                viewModel.set('titleName', record.data.name);
                            },
                        }, {
                            text: 'Thêm KCS',
                            itemId: 'btnAddKCS_ListOrgMenu',
                            separator: true,
                            // margin: '5 0 0',
                            // iconCls: 'x-fa fas fa-scissors',
                            handler: function () {
                                console.log(record);
                                // var record = this.parentMenu.record;
                                // me.onPOPriceEdit(record);
                                var viewModel = me.getViewModel();
                                viewInfo = Ext.getCmp('ListOrgDetail');
                                viewInfo.getController().emptyForm();
                                viewModel.set('id', 0);
                                viewModel.set('parentid_link', record.id);
                                //
                                viewModel.set('orgtypeid_link', 37);
                                viewModel.set('status', true);
                                viewModel.set('is_manufacturer', 0);
                                //
                                viewModel.set('fieldState', true);
                                viewModel.set('titleName', record.data.name);
                            },
                        }, {
                            text: 'Thêm Lái xe',
                            itemId: 'btnAddLaiXe_ListOrgMenu',
                            separator: true,
                            // margin: '5 0 0',
                            // iconCls: 'x-fa fas fa-scissors',
                            handler: function () {
                                console.log(record);
                                // var record = this.parentMenu.record;
                                // me.onPOPriceEdit(record);
                                var viewModel = me.getViewModel();
                                viewInfo = Ext.getCmp('ListOrgDetail');
                                viewInfo.getController().emptyForm();
                                viewModel.set('id', 0);
                                viewModel.set('parentid_link', record.id);
                                //
                                viewModel.set('orgtypeid_link', 38);
                                viewModel.set('status', true);
                                viewModel.set('is_manufacturer', 0);
                                //
                                viewModel.set('fieldState', true);
                                viewModel.set('titleName', record.data.name);
                            },
                        },
                    ]
            });
            var position = e.getXY();
            e.stopEvent();
            menu_grid.showAt(position);
        }
        //To san xuat
        if (record.data.orgtypeid_link == 14) {
            var menu_grid = new Ext.menu.Menu({
                items:
                    [
                        {
                            text: 'Nhân bản',
                            itemId: 'btnDuplicate_ListOrgMenu',
                            separator: true,
                            // margin: '5 0 0',
                            iconCls: 'x-fa fas fa-files-o',
                            handler: function () {
                                me.duplicate(record.data);
                            },
                        },
                        {
                            text: 'Xoá vĩnh viễn',
                            itemId: 'btnDelete_ListOrgMenu',
                            separator: true,
                            // margin: '5 0 0',
                            iconCls: 'x-fa fas fa-trash',
                            handler: function () {
                                me.deleteProductionLine(record.data);
                            },
                        },
                    ]
            });
            var position = e.getXY();
            e.stopEvent();
            menu_grid.showAt(position);
        }
        //Tổ cắt
        if (record.data.orgtypeid_link == 17) {
            var menu_grid = new Ext.menu.Menu({
                items:
                    [
                        {
                            text: 'Thêm Bàn cắt',
                            itemId: 'btnAddBanCat_ListOrgMenu',
                            separator: true,
                            // margin: '5 0 0',
                            iconCls: 'x-fa fas fa-industry',
                            handler: function () {
                                console.log(record);
                                // var record = this.parentMenu.record;
                                // me.onPOPriceEdit(record);
                                var viewModel = me.getViewModel();
                                viewInfo = Ext.getCmp('ListOrgDetail');
                                viewInfo.getController().emptyForm();
                                viewModel.set('id', 0);
                                viewModel.set('parentid_link', record.id);
                                //
                                viewModel.set('orgtypeid_link', 39);
                                viewModel.set('status', true);
                                viewModel.set('is_manufacturer', 0);
                                //
                                viewModel.set('fieldState', true);
                                viewModel.set('titleName', record.data.name);
                            },
                        }
                    ]
            });
            var position = e.getXY();
            e.stopEvent();
            menu_grid.showAt(position);
        }
    },
    duplicate: function (record) {
        var treePanel = Ext.getCmp('ListOrgMenu');
        var viewModel = this.getViewModel();

        console.log(record);
        var params = new Object();
        var data = record;
        // data.prefix = parentRecord.data.code;
        params.data = data;
        params.msgtype = "ORG_DUPLICATE";
        params.message = "Nhân bản org";

        GSmartApp.Ajax.post('/api/v1/orgmenu/duplicate', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Nhân bản thành công',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });

                        var storeMenu = viewModel.getStore('MenuStore');
                        var items = storeMenu.data.items; // items trong tree
                        var isExist = false;
                        var org = response.org;

                        // neu org chua ton tai, neu status = 1, them
                        if (!isExist && org.status == 1) {
                            for (var i = 0; i < items.length; i++) {
                                var parentOrg = items[i].data;
                                // console.log(parentOrg);
                                if (parentOrg.id == org.parentid_link) {
                                    org.children = [];
                                    org.depth = parentOrg.depth + 1;
                                    org.expandable = true;
                                    org.expanded = false;
                                    org.glyph = '';
                                    org.leaf = true;
                                    org.qshowDelay = 0;
                                    org.root = false;
                                    org.selectable = true;
                                    org.visible = true;
                                    var node = storeMenu.getById(parentOrg.id);
                                    node.appendChild(org);
                                    break;
                                }
                            }
                        }

                        treePanel.reconfigure(storeMenu);

                    }
                    else {
                        Ext.Msg.show({
                            title: 'Nhân bản thất bại',
                            msg: response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }
                } else {
                    Ext.Msg.show({
                        title: 'Nhân bản thất bại',
                        msg: null,
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            })
    },
    createproductionline: function (record) {
        console.log(record);
        var treePanel = Ext.getCmp('ListOrgMenu');
        var viewModel = this.getViewModel();

        var params = new Object();
        var data = record;
        // data.prefix = parentRecord.data.code;
        params.data = data;
        params.msgtype = "ORG_PRODUCTIONLINE_CREATE";
        params.message = "Thêm tổ chuyền";

        GSmartApp.Ajax.post('/api/v1/orgmenu/createproductionline', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Thêm tổ chuyền thành công',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });

                        var storeMenu = viewModel.getStore('MenuStore');
                        var items = storeMenu.data.items; // items trong tree
                        var isExist = false;
                        var org = response.org;

                        // neu org chua ton tai, neu status = 1, them
                        if (!isExist && org.status == 1) {
                            for (var i = 0; i < items.length; i++) {
                                var parentOrg = items[i].data;
                                // console.log(parentOrg);
                                if (parentOrg.id == org.parentid_link) {
                                    org.children = [];
                                    org.depth = parentOrg.depth + 1;
                                    org.expandable = true;
                                    org.expanded = false;
                                    org.glyph = '';
                                    org.leaf = true;
                                    org.qshowDelay = 0;
                                    org.root = false;
                                    org.selectable = true;
                                    org.visible = true;
                                    var node = storeMenu.getById(parentOrg.id);
                                    node.appendChild(org);
                                    break;
                                }
                            }
                        }

                        treePanel.reconfigure(storeMenu);

                    }
                    else {
                        Ext.Msg.show({
                            title: 'Thêm tổ chuyền thất bại',
                            msg: response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }
                } else {
                    Ext.Msg.show({
                        title: 'Thêm tổ chuyền thất bại',
                        msg: null,
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            })
    },
    deleteProductionLine: function (record) {
        console.log(record);
        var viewModel = this.getViewModel();
        var storeMenu = viewModel.getStore('MenuStore');
        var params = new Object();
        params.id = record.id;

        params.msgtype = "PRODCTION_LINE_DELETE";
        params.message = "Xoá tổ chuyền";

        GSmartApp.Ajax.post('/api/v1/orgmenu/deleteProductionLine', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });

                        if (response.message == 'Xoá thành công') {
                            var node = storeMenu.getById(record.parentid_link);
                            var node2 = storeMenu.getById(record.id);
                            node.removeChild(node2);
                        }

                    }
                    else {
                        Ext.Msg.show({
                            title: 'Xoá thất bại',
                            msg: response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }
                } else {
                    Ext.Msg.show({
                        title: 'Xoá thất bại',
                        msg: null,
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            })
    },
    onchkboxchange: function (chkbox, newValue, oldValue, eOpts) {
        // console.log(newValue);

        var me = this;
        var view = this.getView();
        if (!newValue) {
            view.getStore().getFilters().add(me.activeOnlyFilter);
        } else {
            view.getStore().getFilters().remove(me.activeOnlyFilter);
        }
    }
})