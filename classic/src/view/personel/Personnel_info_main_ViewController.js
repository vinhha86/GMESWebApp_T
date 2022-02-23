Ext.define('GSmartApp.view.personel.Personnel_info_main_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Personnel_info_main_ViewController',
    init: function () {

    },
    control: {
        '#btnThoat': {
            click: 'onThoat'
        },
        '#btnLuu': {
            click: 'onSave'
        },
        '#btnXoa': {
            click: 'onXoa'
        }
    },
    onThoat: function () {
        this.fireEvent('Thoat');
    },
    onXoa: function () {
        var me = this;
        var viewmodel = this.getViewModel();
        if (viewmodel.get('personnel.code') == null) {
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: "Không có gì để xóa !",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                },
            });
            return;
        }
        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn xóa ?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            //chọn button có
            fn: function (btn) {
                if (btn === 'yes') {
                    me.Xoa_DB();
                }
            }
        })
    },
    Xoa_DB: function () {
        var me =this;
        var viewmodel = this.getViewModel();
        var form = Ext.create('Ext.window.Window', {
            height: 150,
            width: 200,
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Nhập mã nhân viên',
            closeAction: 'destroy',
            width: 300,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'Personnel_info_Delete_CodeView',

            }]
        });
        form.show();
        form.down('#Personnel_info_Delete_codeView').on('chon', function (code) {
            if (code != viewmodel.get('personnel.code')) {
                Ext.MessageBox.show({
                    title: "Thông báo",
                    msg: "Mã nhân viên không đúng!",
                    buttons: Ext.MessageBox.YES,
                    buttonText: {
                        yes: 'Đóng',
                    },
                });
                return;
            } else {
                form.close();
                var params = new Object();
                params.data = viewmodel.get('personnel');
                console.log(params.data);
                GSmartApp.Ajax.post('/api/v1/personnel/delete', Ext.JSON.encode(params),
                    function (success, response, options) {
                        if (success) {
                            var response = Ext.decode(response.responseText);
                            if (response.respcode == 200) {

                                Ext.MessageBox.show({
                                    title: "Thông báo",
                                    msg: "Xóa thành công !",
                                    buttons: Ext.MessageBox.YES,
                                    buttonText: {
                                        yes: 'Đóng',
                                    },
                                });
                                me.fireEvent('Thoat');
                            }
                        }
                    })
            }
        })
    },
    onSave: function () {
        var me = this.getView();
        var viewmodel = this.getViewModel();
        //check các trường không được để trống
        var personnel_code = viewmodel.get('personnel.code');
        var personnel_fullname = viewmodel.get('personnel.fullname');
        var personnel_idnumber = viewmodel.get('personnel.idnumber');
        var personnel_provinceid_link = viewmodel.get('personnel.provinceid_link');
        var personnel_districtid_link = viewmodel.get('personnel.districtid_link');
        var personnel_communeid_link = viewmodel.get('personnel.communeid_link');
        var personnel_village = viewmodel.get('personnel.village');
        var personnel_orgmanagerid_link = viewmodel.get('personnel.orgmanagerid_link');
        var personnel_typeid_link = viewmodel.get('personnel.personnel_typeid_link');
        if (!personnel_code || !personnel_code.trim()) {
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: "Mã nhân viên không được để trống!",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                },
            });
            return;
        }
        if (!personnel_fullname || !personnel_fullname.trim()) {
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: "Họ và tên nhân viên không được để trống!",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                },
            });
            return;
        }
        if (viewmodel.get('personnel.gender') != 0 && viewmodel.get('personnel.gender') != 1) {
            console.log(viewmodel.get('personnel.gender'))
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: "Giới tính không được để trống!",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                },
            });
            return;
        }
        if (!personnel_idnumber || !personnel_idnumber.trim()) {
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: "Số CMT không được để trống!",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                },
            });
            return;
        }
        if (!personnel_provinceid_link) {
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: "Tỉnh, TP không được để trống!",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                },
            });
            return;
        }
        if (!personnel_districtid_link) {
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: "Huyện không được để trống!",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                },
            });
            return;
        }
        if (!personnel_communeid_link) {
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: "Xã không được để trống!",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                },
            });
            return;
        }
        if (!personnel_village || !personnel_village.trim()) {
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: "Thôn không được để trống!",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                },
            });
            return;
        }
        if (!personnel_orgmanagerid_link) {
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: "ĐV quản lý không được để trống!",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                },
            });
            return;
        }
        if (!personnel_typeid_link) {
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: "Loại NV không được để trống!",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                },
            });
            return;
        }
        if (viewmodel.get('personnel.status') != 0 && viewmodel.get('personnel.status') != 1) {
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: "Trạng thái không được để trống!",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                },
            });
            return;
        }

        //check trạng thái : nghỉ việc
        if (viewmodel.get('personnel.status') == 1) {
            console.log(viewmodel.get('personnel.date_endworking'));
            if (viewmodel.get('personnel.date_endworking') == null || viewmodel.get('personnel.date_endworking') == "") {
                Ext.MessageBox.show({
                    title: "Thông báo",
                    msg: "Ngày nghỉ việc không được để trống",
                    buttons: Ext.MessageBox.YES,
                    buttonText: {
                        yes: 'Đóng',
                    }
                })
                return;
            }

        }


        me.setLoading("Đang lưu dữ liệu");

        var params = new Object();
        params.data = viewmodel.get('personnel');

        GSmartApp.Ajax.post('/api/v1/personnel/create', Ext.JSON.encode(params),
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
                            fn: function () {
                                viewmodel.set('personnel.id', response.id);
                                viewmodel.set('personnel.bike_number', response.bike_number);
                            }
                        });
                    }
                    else {
                        Ext.MessageBox.show({
                            title: "Thông báo",
                            msg: response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            },
                            fn: function () {
                                var viewInfo = me.down('#Personnel_info');
                                viewInfo.down('#code').focus();
                            }
                        });

                    }

                } else {
                    var response = Ext.decode(response.responseText);
                    Ext.MessageBox.show({
                        title: "Thông báo",
                        msg: response.message,
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        },
                        fn: function () {
                            var viewInfo = me.down('#Personnel_info');
                            viewInfo.down('#code').focus();
                        }
                    });
                }
                me.setLoading(false);
            })
    }
})