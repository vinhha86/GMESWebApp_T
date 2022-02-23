Ext.define('GSmartApp.view.personel.Personnel_history_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Personnel_history_ViewController',
    init: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('PersonnelHis_Store');
        store.loadStore_by_person(viewmodel.get('personnel.id'));
    },
    control: {
        '#btn_position': {
            click: 'onEditPos'
        },
        '#btn_level': {
            click: 'onEditLevel'
        },
        '#btn_department': {
            click: 'onEditDep'
        },
        '#btn_salary': {
            click: 'onEditSalary'
        },
    },
    getTitle: function (id, itype) {
        var name = "", type = "";
        if (id == null)
            name = "Thêm mới ";
        else
            name = "Cập nhật ";

        switch (itype) {
            case 1:
                type = "chức vụ";
                break;
            case 2:
                type = "cấp bậc";
                break;
            case 3:
                type = "phòng ban";
                break;
            case 4:
                type = "ngạch, bậc lương";
                break;
            default:
                "";
        }

        return name + type;
    },
    onEdit: function (grid, rowIndex) {
        var me = this;
        var viewmodel = this.getViewModel();

        var rec = grid.getStore().getAt(rowIndex);
        var isPos = false, isLevel = false, isOrg = false, isSalary = false;
        if (rec.get('type') == 1)
            isPos = true;
        else if (rec.get('type') == 2)
            isLevel = true
        else if (rec.get('type') == 3)
            isOrg = true;
        else
            isSalary = true;
        me.OpenShowDetail(isPos, isLevel, isOrg, isSalary, rec.get('type'), viewmodel.get('personnel.id'), rec.get('id'),
            rec.get('positionid_link'), rec.get('levelid_link'), rec.get('orgid_link'), rec.get('decision_number'), rec.get('decision_date'));
    },
    OpenShowDetail: function (isPosition, isLevel, isOrg, isSalary, type, personnelid_link, id, positionid_link, levelid_link, orgid_link, decision_number, decision_date) {
        var me = this;

        var viewmodel = this.getViewModel();
        var form = Ext.create('Ext.window.Window', {
            closable: false,
            resizable: false,
            modal: true,
            border: false,
            title: me.getTitle(id, type),
            closeAction: 'destroy',
            height: 300,
            width: 400,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'Personnel_his_detail',
                viewModel: {
                    data: {
                        isPosition: isPosition,
                        isLevel: isLevel,
                        isOrg: isOrg,
                        isSalary: isSalary,
                        his: {
                            type: type,
                            personnelid_link: personnelid_link,
                            positionid_link: positionid_link,
                            levelid_link: levelid_link,
                            orgid_link: orgid_link,
                            decision_date: decision_date,
                            decision_number: decision_number,
                            id: id
                        },
                        orgmanagerid_link: viewmodel.get('personnel.orgmanagerid_link')
                    }
                }
            }]
        });
        form.show();

        form.down('#Personnel_his_detail').getController().on('Thoat', function (his) {
            var store = viewmodel.getStore('PersonnelHis_Store');
            store.load();


            if (his.orgid_link != null) {
                viewmodel.set('personnel.orgid_link', his.orgid_link);
            }
            if (his.positionid_link != null) {
                viewmodel.set('personnel.positionid_link', his.positionid_link);
            }
            if (his.levelid_link != null) {
                viewmodel.set('personnel.levelid_link', his.levelid_link);
            }
            form.close();
        })
    },

    onEditPos: function () {
        var me = this;
        var viewmodel = this.getViewModel();

        if (viewmodel.get('personnel.id') == null) {
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: "Bạn phải lưu thông tin nhân viên trước khi cập nhật chức vụ",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });

            return;
        }

        me.OpenShowDetail(true, false, false, false, 1, viewmodel.get('personnel.id'), null, null, null, null, null, null);
    },
    onEditLevel: function () {
        var me = this;
        var viewmodel = this.getViewModel();

        if (viewmodel.get('personnel.id') == null) {
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: "Bạn phải lưu thông tin nhân viên trước khi cập nhật cấp bậc",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });

            return;
        }

        me.OpenShowDetail(false, true, false, false, 2, viewmodel.get('personnel.id'), null, null, null, null, null, null);
    },
    onEditDep: function () {
        var me = this;
        var viewmodel = this.getViewModel();

        if (viewmodel.get('personnel.id') == null) {
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: "Bạn phải lưu thông tin nhân viên trước khi cập nhật phòng ban",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });

            return;
        }

        me.OpenShowDetail(false, false, true, false, 3, viewmodel.get('personnel.id'), null, null, null, null, null, null);
    },
    onEditSalary: function () {
        var me = this;
        var viewmodel = this.getViewModel();

        if (viewmodel.get('personnel.id') == null) {
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: "Bạn phải lưu thông tin nhân viên trước khi cập nhật lương",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });

            return;
        }

        me.OpenShowDetail(false, false, false, true, 4, viewmodel.get('personnel.id'), null, null, null, null, null, null);
    },

    onDelete: function (grid, rowIndex, colIndex) {
        var viewmodel = this.getViewModel();

        var rec = grid.getStore().getAt(rowIndex);

        var params = new Object();
        params.personnelid_link = viewmodel.get('personnel.id');
        params.id = rec.get('id');

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
                   

                    GSmartApp.Ajax.post('/api/v1/personnel/delete_his_person', Ext.JSON.encode(params),
                        function (success, response, options) {
                            if (success) {
                                var response = Ext.decode(response.responseText);
                                if (response.respcode == 200) {
                                    var store = viewmodel.getStore('PersonnelHis_Store');
                                    store.load();

                                    if (rec.get('type') == 3) {
                                        viewmodel.set('personnel.orgid_link', response.orgid_link);
                                    }
                                    if (rec.get('type') == 1) {
                                        viewmodel.set('personnel.positionid_link', response.positionid_link);
                                    }
                                    if (rec.get('type') == 2) {
                                        viewmodel.set('personnel.levelid_link', response.levelid_link);
                                    }
                                }
                            }
                            else {
                                Ext.MessageBox.show({
                                    title: "Thông báo",
                                    msg: "Có lỗi trong quá trình xóa dữ liệu",
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

    }
})