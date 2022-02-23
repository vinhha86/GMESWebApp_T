Ext.define('GSmartApp.view.devicegroup.DeviceGroupMenuController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DeviceGroupMenuController',
    init: function () {
        this.onloadPage();
    },
    control: {
        '#DeviceGroupMenu': {
            itemclick: 'onloadDetail'
        }
    },
    onloadDetail: function( grid, record, item, index, e, eOpts){
        var viewModel = this.getViewModel();
        // console.log(record.data);
        viewModel.set('currentRec', record.data);
        viewModel.set('id', record.data.id);
        viewModel.set('titleName', record.data.name);
        viewModel.set('parentid_link',record.data.parentid_link);
        //
        viewModel.set('code', record.data.code);
        viewModel.set('name', record.data.name);
        //
        viewModel.set('fieldState', true);
    },
    onloadPage: function () {
        var me = this.getView();
        var viewModel = this.getViewModel();
        var storeMenu = viewModel.getStore('DeviceGroupMenuTreeStore');
        storeMenu.loadStore();
    },
    onDropOrg: function(node, data, overModel, dropPosition){
        var start = data.records[0].data;
        var target = overModel.data;
        if(start.parentid_link != -1 && target.parentid_link == -1 && start.parentid_link != target.id){
            var params = new Object();
            start.parentid_link = target.id;
            params.data = start;

            params.msgtype = "DEVICEGROUP_SAVE";
            params.message = "Lưu device group";

            GSmartApp.Ajax.post('/api/v1/devicegroup/createDeviceGroup', Ext.JSON.encode(params),
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
    onBeforeDropOrg:  function( node, data, overModel, dropPosition, dropHandlers, eOpts){
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
        if(!(start.parentid_link != -1 && target.parentid_link == -1)){
            if(start.parentid_link != target.parentid_link){
                Ext.MessageBox.show({
                    title: "Quản lý đơn vị",
                    msg: "Không hợp lệ",
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
    onContextMenu: function(tree, record, item, index, e, eOpts ) {
        var me = this;

        if(record.data.parentid_link == -1){
            var menu_grid = new Ext.menu.Menu({ items:
                [
                    {
                        text: 'Thêm nhóm thiết bị',
                        itemId: 'btnAddDeviceGroup',
                        separator: true,
                        // margin: '5 0 0',
                        iconCls: 'x-fa fas fa-industry',
                        handler: function(){
                            console.log(record);
                            // var record = this.parentMenu.record;
                            // me.onPOPriceEdit(record);
                            var viewModel = me.getViewModel();
                            viewInfo = Ext.getCmp('DeviceGroupDetail');
                            viewInfo.getController().emptyForm();
                            viewModel.set('id', 0);
                            viewModel.set('parentid_link',-1);
                            //
                            viewModel.set('fieldState', true);
                            viewModel.set('titleName', record.data.name);
                        },
                    },{
                        text: 'Thêm nhóm thiết bị con',
                        itemId: 'btnAddDeviceGroupChild',
                        separator: true,
                        // margin: '5 0 0',
                        iconCls: 'x-fa fas fa-sliders',
                        handler: function(){
                            console.log(record);
                            // var record = this.parentMenu.record;
                            // me.onPOPriceEdit(record);
                            var viewModel = me.getViewModel();
                            viewInfo = Ext.getCmp('DeviceGroupDetail');
                            viewInfo.getController().emptyForm();
                            viewModel.set('id', 0);
                            viewModel.set('parentid_link',record.id);
                            //
                            viewModel.set('fieldState', true);
                            viewModel.set('titleName', record.data.name);
                        },
                    },{
                        text: 'Xoá',
                        itemId: 'btnDeleteDeviceGroup',
                        separator: true,
                        // margin: '5 0 0',
                        iconCls: 'x-fa fas fa-trash',
                        handler: function(){
                            me.deleteDeviceGroup(record.data);
                        },
                    }, 
                ]
                });
            var position = e.getXY();
            e.stopEvent();
            menu_grid.showAt(position);
        }else
        if(record.data.parentid_link != -1){
            var menu_grid = new Ext.menu.Menu({ items:
                [
                    {
                        text: 'Xoá',
                        itemId: 'btnDeleteDeviceGroup',
                        separator: true,
                        // margin: '5 0 0',
                        iconCls: 'x-fa fas fa-trash',
                        handler: function(){
                            me.deleteDeviceGroup(record.data);
                        },
                    }, 
                ]
                });
            var position = e.getXY();
            e.stopEvent();
            menu_grid.showAt(position);
        }
    },
    deleteDeviceGroup: function(record){
        // console.log(record);
        var viewModel = this.getViewModel();
        var DeviceGroupMenuTreeStore = viewModel.getStore('DeviceGroupMenuTreeStore');
        var params = new Object();
        params.id = record.id;
        // var data = new Object();
        // data.id = record.id;
        // data.parentid_link = record.parentid_link;
        // data.name = record.name;
        // data.code = record.code;
        // params.data = data;

        params.msgtype = "PRODCTION_LINE_DELETE";
        params.message = "Xoá device group";

        GSmartApp.Ajax.post('/api/v1/devicegroup/deleteDeviceGroup', Ext.JSON.encode(params),
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

                        if(response.message == 'Xoá thành công'){
                            if(record.parentid_link == -1){
                                var root = DeviceGroupMenuTreeStore.getRoot();
                                var node2 = DeviceGroupMenuTreeStore.getById(record.id);
                                root.removeChild(node2);
                            }else{
                                var node = DeviceGroupMenuTreeStore.getById(record.parentid_link);
                                var node2 = DeviceGroupMenuTreeStore.getById(record.id);
                                node.removeChild(node2);
                            }
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
    }
})