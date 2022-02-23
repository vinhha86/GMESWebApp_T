Ext.define('GSmartApp.view.devices.ThietBiViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ThietBiViewController',

    init: function () {

    },
    control: {
        '#ThietBiView': {
            itemclick: 'onThietBiClick'
        }
    },

    onMenu: function (grid, rowIndex, colIndex, item, e, record) {
        //var rec =grid.getStore().getAt(rowIndex);
        var me = this;
        var menu_grid;
        if (record.data.status == 3) {
            //tạo menu có 2 items(khóa - download) để chọn
            menu_grid = new Ext.menu.Menu({
                items: [
                    {
                        text: 'Mở khóa',
                        iconCls: 'x-fa fa-unlock',
                        handler: function () {
                            me.onMoKhoaThietBi(record);
                        }
                    }, {
                        text: 'DownLoadLog',
                        iconCls: 'x-fa fa-cloud-download',
                    }, {
                        text: 'Xóa',
                        iconCls: 'x-fa fa-trash',
                        handler: function () {
                            me.onXoaThietBi(record);
                        }
                    }]

            })
        } else {
            menu_grid = new Ext.menu.Menu({
                items: [
                    {
                        text: 'Khóa',
                        iconCls: 'x-fa fa-lock',
                        handler: function () {
                            me.onKhoaThietBi(record);
                        }
                    }, {
                        text: 'DownLoadLog',
                        iconCls: 'x-fa fa-cloud-download',
                    }, {
                        text: 'Xóa',
                        iconCls: 'x-fa fa-trash',
                        handler: function () {
                            me.onXoaThietBi(record);
                        }
                    }
                ]
            })
        }
        var position = e.getXY();
        e.stopEvent();
        menu_grid.showAt(position);
    },
    onXoaThietBi: function (record) {
        var viewmodel = this.getViewModel();
        var ds_thietbi_tore = viewmodel.getStore('ds_thietbi_store');
        if (record.data.status == 1) {
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Không được xóa thiết bị đang hoạt động !',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng'
                }
            })
        } else {
            var params = new Object();
            params.id = record.id
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Bạn có muốn xóa không?',
                buttons: Ext.MessageBox.YESNO,
                icon: Ext.Msg.QUESTION,
                fn: function (btn) {
                    if (btn === 'yes') {
                        GSmartApp.Ajax.postJitin('/api/v1/device/xoathietbi', Ext.JSON.encode(params),
                            function (success, response, options) {
                                if (success) {
                                    var response = Ext.decode(response.responseText);
                                    if (response.respcode == 200) {
                                        //load lai 
                                        Ext.Msg.show({
                                            title: 'Thông báo',
                                            msg: 'Xóa thành công !',
                                            buttons: Ext.MessageBox.YES,
                                            buttonText: {
                                                yes: 'Đóng'
                                            }
                                        })
                                        //giữ giá trị hiển thị vừa tìm kiếm sau khi sửa 
                                        var params = new Object();
                                        params.org_governid_link = viewmodel.get('timkiem.org_governid_link') == "" ? null : viewmodel.get('timkiem.org_governid_link');
                                        params.search = viewmodel.get('timkiem.name_code') == "" ? null : viewmodel.get('timkiem.name_code');
                                        params.type = viewmodel.get('timkiem.type');
                                        ds_thietbi_tore.load_device_active(params);
                                        //xóa thông tin chi tiêt

                                        viewmodel.set('thongtin_chitiet.code', null);
                                        viewmodel.set('thongtin_chitiet.name', null);
                                        viewmodel.set('thongtin_chitiet.type', null);
                                        viewmodel.set('thongtin_chitiet.id', null);
                                        viewmodel.set('thongtin_chitiet.org_governid_link', null);
                                        viewmodel.set('thongtin_chitiet.status', null);

                                    }
                                }
                            })
                    }
                }
            })
        }

    },

    //gán status =3 => khóa
    onKhoaThietBi: function (params) {
        var viewmodel = this.getViewModel();
        GSmartApp.Ajax.postJitin('/api/v1/device/device_lock', '{"id": ' + params.getId() + '}',
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Khóa thành công',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        })
                        var ds_thietbi_tore = viewmodel.getStore('ds_thietbi_store');
                        //giữ giá trị hiển thị vừa tìm kiếm sau khi sửa 
                        var params = new Object();
                        params.org_governid_link = viewmodel.get('timkiem.org_governid_link') == "" ? null : viewmodel.get('timkiem.org_governid_link');
                        params.search = viewmodel.get('timkiem.name_code') == "" ? null : viewmodel.get('timkiem.name_code');
                        params.type = viewmodel.get('timkiem.type');
                        ds_thietbi_tore.load_device_active(params);

                    }

                    //	formDevice.getForm().reset(); 
                } else {
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Khóa thất bại',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng'
                        }
                    })

                }
            })
    },

    onMoKhoaThietBi: function (params) {
        var viewmodel = this.getViewModel();

        GSmartApp.Ajax.post('/api/v1/device/device_unlock', '{"id": ' + params.getId() + '}',
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Mở khóa thành công',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        })
                        var ds_thietbi_tore = viewmodel.getStore('ds_thietbi_store');
                        //giữ giá trị hiển thị vừa tìm kiếm sau khi sửa 
                        var params = new Object();
                        params.org_governid_link = viewmodel.get('timkiem.org_governid_link') == "" ? null : viewmodel.get('timkiem.org_governid_link');
                        params.search = viewmodel.get('timkiem.name_code') == "" ? null : viewmodel.get('timkiem.name_code');
                        params.type = viewmodel.get('timkiem.type');
                        ds_thietbi_tore.load_device_active(params);

                    }
                } else {
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Mở khóa thất bại',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng'
                        }
                    })
                }
            })
    },

    search: function () {
        var viewmodel = this.getViewModel();
        var ds_thietbi_tore = viewmodel.getStore('ds_thietbi_store');
        //lấy giá trị từ form tìm kiếm 
        var params = new Object();
        //nếu giá trị bằng "" thì gán bằng null, còn không vẫn giữ nguyên giá trị
        params.org_governid_link = viewmodel.get('timkiem.org_governid_link') == "" ? null : viewmodel.get('timkiem.org_governid_link');
        params.search = viewmodel.get('timkiem.name_code') == "" ? null : viewmodel.get('timkiem.name_code');
        params.type = viewmodel.get('timkiem.type');

        ds_thietbi_tore.load_device_active(params);

    },
    //lấy thông tin thiết bị để hiển thị chi tiết
    onThietBiClick: function (grid, record, item, index, e, eOpts) {
        var viewmodel = this.getViewModel();

        viewmodel.set('code_old', record.data.code);

        viewmodel.set('thongtin_chitiet.code', record.data.code);
        viewmodel.set('thongtin_chitiet.name', record.data.name);
        viewmodel.set('thongtin_chitiet.type', record.data.type);
        viewmodel.set('thongtin_chitiet.org_governid_link', record.data.org_governid_link);
        viewmodel.set('thongtin_chitiet.id', record.data.id);
        viewmodel.set('thongtin_chitiet.status', record.data.status);
    },
})