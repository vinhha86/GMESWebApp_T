Ext.define('GSmartApp.view.devicegroup.DeviceGroupDetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DeviceGroupDetailController',
    Id: 0,
    init: function () {
    },
    control: {
        '#btnLuu': {
            click: 'onLuu'
        },
        '#btnThemDonViTrucThuoc': {
            click: 'onThemTrucThuoc'
        }
    },
    emptyForm: function(){
        var viewModel = this.getViewModel();
        viewModel.set('code', null);
        viewModel.set('name', null);
    },
    onThemTrucThuoc: function(){
        // parentid_link
        var viewModel = this.getViewModel();
        viewModel.set('parentid_link',viewModel.get('id'));
        viewModel.set('id',0);
        this.emptyForm();
    },
    onLuu: function () {
        var m = this;
        var me = this.getView();
        var treePanel = Ext.getCmp('DeviceGroupMenu');
        me.setLoading("Đang lưu dữ liệu");

        var viewModel = this.getViewModel();

        var params = new Object();
        var data = new Object();
        data.id = viewModel.get('id');
        data.parentid_link=viewModel.get('parentid_link');
        data.code = viewModel.get('code');
        data.name = viewModel.get('name');

        params.data = data;
        params.msgtype = "DEVICEGROUP_CREATE";
        params.message = "Tạo device group";

        if(data.id == 0){
            m.emptyForm();
            viewModel.set('id',0);
        }

        GSmartApp.Ajax.post('/api/v1/devicegroup/createDeviceGroup', Ext.JSON.encode(params), //////////////
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
                        
                        var DeviceGroupMenuTreeStore = viewModel.getStore('DeviceGroupMenuTreeStore');
                        var items = DeviceGroupMenuTreeStore.data.items; // items trong tree
                        var isExist = false; // Org ton tai hay chua
                        var devicegroup = response.devicegroup;
                        var parentId = devicegroup.parentid_link;

                        if(data.id != 0){ // dat lai title cho detail
                            me.setTitle(devicegroup.name);
                        }

                        // check ton tai
                        if(DeviceGroupMenuTreeStore.getById(devicegroup.id) != null){
                            isExist = true;
                            var node = DeviceGroupMenuTreeStore.getById(devicegroup.id);
                            var nodeData = node.data;
                            node.data.code = devicegroup.code;
                            node.data.name = devicegroup.name;
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
                                var parentDeviceGroup = items[i].data;
                                // console.log(parentOrg);
                                if(parentDeviceGroup.id == devicegroup.parentid_link){
                                    devicegroup.children = [];
                                    devicegroup.depth = parentDeviceGroup.depth+1;
                                    devicegroup.expandable = true;
                                    devicegroup.expanded = false;
                                    devicegroup.glyph = '';
                                    devicegroup.leaf = true;
                                    devicegroup.qshowDelay = 0;
                                    devicegroup.root = false;
                                    devicegroup.selectable = true;
                                    devicegroup.visible = true;
                                    var node = DeviceGroupMenuTreeStore.getById(parentDeviceGroup.id);
                                    node.appendChild(devicegroup);
                                    break;
                                }
                            }
                            if(devicegroup.parentid_link == -1){
                                devicegroup.children = [];
                                devicegroup.expandable = true;
                                devicegroup.expanded = false;
                                devicegroup.glyph = '';
                                devicegroup.leaf = false;
                                devicegroup.qshowDelay = 0;
                                devicegroup.root = false;
                                devicegroup.selectable = true;
                                devicegroup.visible = true;
                                var root = DeviceGroupMenuTreeStore.getRoot();
                                root.appendChild(devicegroup);
                            }
                        }

                        treePanel.reconfigure(DeviceGroupMenuTreeStore);

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
})