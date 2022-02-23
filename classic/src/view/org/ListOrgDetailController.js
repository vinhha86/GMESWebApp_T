Ext.define('GSmartApp.view.org.ListOrgDetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ListOrgDetailController',
    Id: 0,
    init: function () {
    },
    control: {
        '#btnLuu': {
            click: 'onLuu'
        },
        '#btnXoa': {
            click: 'onXoa'
        },
        '#btnThemDonViTrucThuoc': {
            click: 'onThemTrucThuoc'
        }
    },
    emptyForm: function(){
        var viewModel = this.getViewModel();
        viewModel.set('code', null);
        viewModel.set('name', null);
        viewModel.set('city', null);
        viewModel.set('address', null);
        viewModel.set('contactperson', null);
        viewModel.set('email', null);
        viewModel.set('phone', null);
        viewModel.set('linecost', null);
        viewModel.set('orgtypeid_link', null);
        viewModel.set('colorid_link', null);
        viewModel.set('status', null);
        viewModel.set('costpersec', null);
    },
    onThemTrucThuoc: function(){
        // parentid_link
        var viewModel = this.getViewModel();
        viewModel.set('parentid_link',viewModel.get('id'));
        viewModel.set('id',0);
        this.emptyForm();
    },
    onXoa: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var currentRec = viewModel.get('currentRec');
        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn xóa đơn vị "' + currentRec.name + '" ?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function (btn) {
                if (btn === 'yes') {
                    m.Xoa();
                }else{
                    return;
                }
            }
        });
    },
    Xoa: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var currentRec = viewModel.get('currentRec');

        me.setLoading(true);

        var params = new Object();
        params.id = currentRec.id;
        params.msgtype = "ORG_DELETE";
        params.message = "Xoá org";

        GSmartApp.Ajax.post('/api/v1/orgmenu/deleteOrg', Ext.JSON.encode(params),
            function (success, response, options) {
                me.setLoading(false);
                var response = Ext.decode(response.responseText);
                if (success) {
                    if (response.respcode == 200) {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Xoá thành công',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                        // remove from tree
                        m.removeFromTree(currentRec);
                        // reset form
                        m.setDataNull();
                    }
                    else { console.log('up');
                        Ext.Msg.show({
                            title: 'Xoá thất bại',
                            msg: response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }

                } else { console.log('down');
                    Ext.Msg.show({
                        title: 'Xoá thất bại',
                        msg: null,
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
                me.setLoading(false);
            })
    },
    removeFromTree: function(currentRec){
        var viewModel = this.getViewModel();
        var storeMenu = viewModel.getStore('MenuStore');
        var id = currentRec.id;

        var node = storeMenu.findNode('id', id, true, true, false);
        storeMenu.remove(node);
    },
    setDataNull: function() {
        var viewModel = this.getViewModel();
        // console.log(record.data);
        viewModel.set('currentRec', null);
        viewModel.set('id', null);
        viewModel.set('titleName', null);
        viewModel.set('parentid_link', null);
        //
        viewModel.set('code', null);
        viewModel.set('name', null);
        viewModel.set('city', null);
        viewModel.set('address', null);
        viewModel.set('contactperson', null);
        viewModel.set('email', null);
        viewModel.set('phone', null);
        viewModel.set('linecost', null);
        viewModel.set('orgtypeid_link', null);
        viewModel.set('colorid_link', null);
        viewModel.set('status', null);
        viewModel.set('costpersec', null);
        viewModel.set('is_manufacturer', null);
        //
        viewModel.set('fieldState', false);
    },
    onLuu: function () {
        var m = this;
        var me = this.getView();
        var treePanel = Ext.getCmp('ListOrgMenu');
        me.setLoading("Đang lưu dữ liệu");

        var viewModel = this.getViewModel();

        var params = new Object();
        var data = new Object();
        data.id = viewModel.get('id');
        data.parentid_link=viewModel.get('parentid_link');
        data.code = viewModel.get('code');
        data.name = viewModel.get('name');
        data.city = viewModel.get('city');
        data.address = viewModel.get('address');
        data.contactperson = viewModel.get('contactperson');
        data.email = viewModel.get('email');
        data.phone = viewModel.get('phone');
        data.linecost = viewModel.get('linecost');
        data.orgtypeid_link = viewModel.get('orgtypeid_link');
        data.colorid_link = viewModel.get('colorid_link');
        data.costpersec = viewModel.get('costpersec');
        data.status = viewModel.get('status');
        if(data.status==true){
            data.status=1;
        }else{
            data.status=-1;
        }

        if(viewModel.get('orgtypeid_link') == 13){
            data.is_manufacturer = viewModel.get('is_manufacturer');
        }

        params.data = data;
        params.msgtype = "ORG_CREATE";
        params.message = "Tạo org";

        if(data.id == 0){
            m.emptyForm();
            viewModel.set('id',0);
        }

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
                        
                        var storeMenu = viewModel.getStore('MenuStore');
                        var items = storeMenu.data.items; // items trong tree
                        var isExist = false; // Org ton tai hay chua
                        var org = response.org;
                        var parentId = org.parentid_link;

                        if(data.id != 0 && org.status != -1){ // dat lai title cho detail
                            me.setTitle(org.name);
                        }

                        // check ton tai
                        if(storeMenu.getById(org.id) != null){
                            isExist = true;
                            var node = storeMenu.getById(org.id);
                            var nodeData = node.data;
                            node.data.code = org.code;
                            node.data.name = org.name;
                            node.data.city = org.city;
                            node.data.address = org.address;
                            node.data.contactperson = org.contactperson;
                            node.data.email = org.email;
                            node.data.phone = org.phone;
                            node.data.linecost = org.linecost;
                            node.data.orgtypeid_link = org.orgtypeid_link;
                            node.data.colorid_link = org.colorid_link;
                            node.data.costpersec = org.costpersec;
                            node.data.is_manufacturer = org.is_manufacturer;
                            node.data.status = org.status;
                        }

                        // neu da org ton tai, neu status = -1, xoa
                        // if(isExist && org.status == -1){
                        //     if(org.parentid_link == -1){
                        //         me.setLoading(false);
                        //         return;
                        //     }
                        //     var node = storeMenu.getById(org.parentid_link);
                        //     var node2 = storeMenu.getById(org.id);
                        //     node.removeChild(node2);
                        //     m.emptyForm();
                        //     viewModel.set('parentid_link',null);
                        //     viewModel.set('fieldState',false);
                        //     viewModel.set('id',0);

                        // }

                        // neu org chua ton tai, neu status = 1, them
                        if(!isExist){
                            for(var i=0;i<items.length;i++){
                                var parentOrg = items[i].data;
                                // console.log(parentOrg);
                                if(parentOrg.id == org.parentid_link){
                                    org.children = [];
                                    org.depth = parentOrg.depth+1;
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

                        // neu la don vi gia cong, them 1 to chuyen
                        if(!isExist && org.orgtypeid_link == 13 && org.is_manufacturer == 1){
                            console.log('are you even here ?');
                            m.createProductionLineForManufacturer(org);
                        }

                        treePanel.reconfigure(storeMenu);

                        // chay lai filter

                        var ListOrgMenu = Ext.getCmp('ListOrgMenu');
                        var ListOrgMenuController = ListOrgMenu.getController();
                        var chkBoxFilterValue = viewModel.get('isDisplayInactive');

                        if (chkBoxFilterValue) {
                            ListOrgMenu.getStore().getFilters().removeAll();
                        } else {
                            ListOrgMenu.getStore().getFilters().removeAll();
                            ListOrgMenu.getStore().getFilters().add(ListOrgMenuController.activeOnlyFilter);
                        }
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
                me.setLoading(false);
            })
    },
    createProductionLineForManufacturer: function (record) {
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
                        // Ext.Msg.show({
                        //     title: 'Thông báo',
                        //     msg: 'Thêm tổ chuyền thành công',
                        //     buttons: Ext.MessageBox.YES,
                        //     buttonText: {
                        //         yes: 'Đóng',
                        //     }
                        // });

                        var storeMenu = viewModel.getStore('MenuStore');
                        var items = storeMenu.data.items; // items trong tree
                        var isExist = false;
                        var org = response.org;

                        // neu org chua ton tai, neu status = 1, them
                        if(!isExist && org.status == 1){
                            for(var i=0;i<items.length;i++){
                                var parentOrg = items[i].data;
                                // console.log(parentOrg);
                                if(parentOrg.id == org.parentid_link){
                                    org.children = [];
                                    org.depth = parentOrg.depth+1;
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
                }
            })
    },

})