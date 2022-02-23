Ext.define('GSmartApp.view.dm_loaithietbi.DeviceType_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DeviceType_ViewController',

    init: function (view) {
        var viewmodel = view.getViewModel();
        var device_typeStore = viewmodel.getStore('devices_store');
        device_typeStore.loadStore();
    },
    control: {
        '#btnThemMoi': {
            click: 'ThemMoi',
        },
        '#Change':{
            checkchange:'Checkchange'
        }
    },
    //thay đổi checkbox
    Checkchange:function(a, rowIndex, checked, record, e, eOpts){
        var me = this;
        var params = new Object();
        params.data = record.data;

        if(record.previousValues.is_rfid != checked){
            me.Them_CapNhat(params);
        }
    },

    onEdit: function (editor, context, e) {
        var me = this;
        var params = new Object();
        params.data = context.record.data;

              //kiểm tra nếu dữ liệu khác lúc ban đầu thì thêm
            if (context.value != context.originalValue  ) {
                //kiểm tra xem sửa ở trường nào để gán lại
                if (context.field == "code") {
                    params.data.code = context.value;       
                } else {
                    if (context.field == "name") params.data.name = context.value;
                }
                 //kiểm tra nếu trùng thì không được sửa 
                 var kt = me.CheckValidate(context.value,context.record.data.id);
                 if (kt) {
                     me.Them_CapNhat(params);
                 }
            }
      
    },
    onXoa: function (grid, rowIndex) {
        var viewmodel = this.getViewModel();
        console.log(rec);
        var rec = grid.getStore().getAt(rowIndex);
        var params = new Object();
        params.data = rec.data;

        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn xóa thiết bị  "' + rec.data.name + '" ?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            //chọn button có
            fn: function (btn) {
                if (btn === 'yes') {

                    GSmartApp.Ajax.post('/api/v1/devices_type/delete_devices_type', Ext.JSON.encode(params),
                        function (success, response, options) {
                            if (success) {
                                Ext.MessageBox.show({
                                    title: "Thông báo",
                                    msg: "Xóa thành công",
                                    buttons: Ext.MessageBox.YES,
                                    buttonText: {
                                        yes: 'Đóng',
                                    }
                                });

                                //load lại trang
                                var device_typeStore = viewmodel.getStore('devices_store');
                                device_typeStore.loadStore();
                            } else {
                                Ext.Msg.show({
                                    title: 'Thông báo',
                                    msg: 'Xóa thất bại',
                                    buttons: Ext.MessageBox.YES,
                                    buttonText: {
                                        yes: 'Đóng',
                                    }
                                });
                            }
                        })

                }
            }
        })
    },

    ThemMoi: function () {
        var me = this;
        var viewmodel = this.getViewModel();
        var params = new Object();
        var device = new Object();
        device.name = viewmodel.get('device.name');
        device.code = viewmodel.get('device.code');
        device.is_rfid = viewmodel.get('device.check') == null ? false : viewmodel.get('device.check');
      
       
        params.data = device;
        if (device.name == null ||device.name.trim() == ''|| device.code == null||device.code.trim() == '') {
            viewmodel.set('device.name', null);
            viewmodel.set('device.code', null);
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: "Thông tin thiết bị phải điền đấy đủ",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                },

            })
        } else {
            //kiểm tra tên thiết bị đã tồn tại chưa nếu đúng thì được thêm 
            var kt = me.CheckValidate(device.code,"");
            if (kt) {
                this.Them_CapNhat(params);
            }

        }
    },
    Them_CapNhat(params) {
        var viewmodel = this.getViewModel();
        GSmartApp.Ajax.post('/api/v1/devices_type/add_devices_type', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        Ext.MessageBox.show({
                            title: "Thông báo",
                            msg: "Lưu thành công",
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            },

                        })
                        viewmodel.set('device.name', null);
                        viewmodel.set('device.code', null);
                        viewmodel.set('device.check', null);

                        //load
                        var device_typeStore = viewmodel.getStore('devices_store');
                        device_typeStore.loadStore();
                    }
                } else {
                    Ext.MessageBox.show({
                        title: "Thông báo",
                        msg: "Lưu thất bại",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }

            })
    },
    //kiểm tra mã thiết bị đã tồn tại chưa nếu có rồi thì trả về false
    CheckValidate: function (code,id) {
        var store = this.getViewModel().getStore('devices_store');
        
        for (var i = 0; i < store.data.length; i++) {
            var data = store.data.items[i].data;
            //kiểm tra mã thiết bị không chứ id truyền vào
            if (data.code == code && data.id!=id) {
                Ext.MessageBox.show({
                    title: "Thông báo",
                    msg: "Mã thiết bị :" + code + " đã tồn tại ở dòng " + (i + 1),
                    buttons: Ext.MessageBox.YES,
                    buttonText: {
                        yes: 'Đóng',
                    }
                });
                return false;
            }
        }
        return true;
    },
    //lọc - filter
    onDevices_TypeCodeFilter: function () {
        let filterField = this.lookupReference('Devices_TypeCodeFilter'),
            filters = this.getView().store.getFilters();

        if (filterField.value) {
            this.codeFilter = filters.add({
                id: 'codeFilter',
                property: 'code',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.codeFilter) {
            filters.remove(this.codeFilter);
            this.codeFilter = null;
        }
    },
    onDevices_TypeNameFilter: function () {
        let filterField = this.lookupReference('Devices_TypeNameFilter'),
            filters = this.getView().store.getFilters();

        if (filterField.value) {
            this.nameFilter = filters.add({
                id: 'nameFilter',
                property: 'name',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.nameFilter) {
            filters.remove(this.nameFilter);
            this.nameFilter = null;
        }
    },

})