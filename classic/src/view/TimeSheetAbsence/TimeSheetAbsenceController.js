Ext.define('GSmartApp.view.TimeSheetAbsence.TimeSheetAbsenceController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TimeSheetAbsenceController',
    init: function () {
        var me = this.getView();
        var session = GSmartApp.util.State.get('session');
        if (session.orgid_link != 1) {
            me.down('#orgFactoryList').setValue(session.orgid_link);
        }
        var viewModel = this.getViewModel();
        var orgFactory = me.down('#orgFactoryList').getValue();
        var personnelCode = me.down('#personnelCode').getValue();
        var personnelName = me.down('#personnelName').getValue();
        var timeSheetAbsenceType = me.down('#timeSheetAbsenceTypeList').getValue();

        if (page == null) {
            page = 1;
        }
        if (orgFactory == null) {
            orgFactory = 0;
        }
        if (personnelCode == null) {
            personnelCode = "";
        }
        if (personnelName == null) {
            personnelName = "";
        }
        if (timeSheetAbsenceType == null) {
            timeSheetAbsenceType = 0;
        }
        // this.onloadPage();
        var date = new Date();
        viewModel.set('timesheetabsence.fromdate', date);
        viewModel.set('timesheetabsence.todate', date);
        var datefrom = viewModel.get('timesheetabsence.fromdate');
        var dateto = viewModel.get('timesheetabsence.todate');
        //lấy từ 00:00 cửa ngày từ
        var fromdate_hour = datefrom.toDateString() + " 00:00";
        var datefrom_hour = new Date(fromdate_hour);
        //var TimeSheetAbsenceStore = viewModel.getStore('TimeSheetAbsenceStore');

        //lấy 23:59 của ngày đến
        var todate_hour = dateto.toDateString() + " 23:59";
        var dateto_hour = new Date(todate_hour);
        var TimeSheetAbsenceStore = viewModel.getStore('TimeSheetAbsenceStore');
        TimeSheetAbsenceStore.setGroupField("personnelOrgname");

        TimeSheetAbsenceStore.loadStore_ByPage(25, page,
            orgFactory, personnelCode, personnelName, datefrom_hour, dateto_hour, timeSheetAbsenceType);

        var page = TimeSheetAbsenceStore.currentPage;
        if (page == null) {
            page = 1;
        }
        //lấy danh sách đơn vị theo user quản lý
        var ListOrgStore = viewModel.getStore('ListOrgStore');
        ListOrgStore.loadOrg_ByOrgType(13);
        var TimeSheetAbsenceTypeStore = viewModel.getStore('TimeSheetAbsenceTypeStore');
        TimeSheetAbsenceTypeStore.loadStore();
    },
    control: {
        '#btnThemMoi': {
            click: 'onThemMoi'
        },
        '#btnTimKiem': {
            click: 'onloadPage'
        },
        '#TimeSheetAbsence': {
            itemdblclick: 'onCapNhatdbl'
        }
    },
    renderSum: function (value, summaryData, dataIndex) {
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';
    },
    onXoa: function (grid, rowIndex, colIndex) {
        var me = this;
        var rec = grid.getStore().getAt(rowIndex);
        var id = rec.get('id');
        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn xóa đăng ký nghỉ này ?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function (btn) {
                if (btn === 'yes') {
                    me.Xoa(id);
                }
            }
        });
    },
    Xoa: function (id) {
        var me = this.getView();
        me.setLoading("Đang xóa dữ liệu");
        var params = new Object();
        params.id = id;

        GSmartApp.Ajax.post('/api/v1/timesheetabsence/delete', Ext.JSON.encode(params),
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

                    var store = me.getStore();
                    store.load();
                } else {
                    Ext.Msg.show({
                        title: "Thông báo",
                        msg: "Xóa thất bại",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
                me.setLoading(false);
            })
    },
    onloadPage: function () {
        var me = this.getView();

        var viewModel = this.getViewModel();
        var TimeSheetAbsenceStore = viewModel.getStore('TimeSheetAbsenceStore');

        var limit = 25;
        var orgFactory = me.down('#orgFactoryList').getValue();
        var personnelCode = me.down('#personnelCode').getValue();
        var personnelName = me.down('#personnelName').getValue();
        var datefrom = me.down('#datefrom').getValue();
        var dateto = me.down('#dateto').getValue();

        if (dateto - datefrom < 0) {
            Ext.Msg.show({
                title: "Thông báo",
                msg: "Ngày đến không hợp lệ!",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }
        var timeSheetAbsenceType = me.down('#timeSheetAbsenceTypeList').getValue();

        var page = TimeSheetAbsenceStore.currentPage;

        if (limit == null) {
            limit = 25;
        }

        if (page == null) {
            page = 1;
        }

        if (orgFactory == null) {
            orgFactory = 0;
        }

        if (personnelCode == null) {
            personnelCode = "";
        }

        if (personnelName == null) {
            personnelName = "";
        }

        if (datefrom == null) {
            datefrom = null;
        }

        if (dateto == null) {
            dateto = null;
        }

        if (timeSheetAbsenceType == null) {
            timeSheetAbsenceType = 0;
        }
        if (datefrom == null || dateto == null) {
            Ext.Msg.show({
                title: "Thông báo",
                msg: "Ngày tìm kiếm không được để trống!",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }
        //lấy từ 00:00 cửa ngày từ
        var fromdate_hour = datefrom.toDateString() + " 00:00";
        var datefrom_hour = new Date(fromdate_hour);


        //lấy 23:59 của ngày đến
        var todate_hour = dateto.toDateString() + " 23:59";
        var dateto_hour = new Date(todate_hour);
        var TimeSheetAbsenceStore = viewModel.getStore('TimeSheetAbsenceStore');
        TimeSheetAbsenceStore.loadStore_ByPage(limit, page,
            orgFactory, personnelCode, personnelName, datefrom_hour, dateto_hour, timeSheetAbsenceType
        );

    },
    onThemMoi: function () {
        var viewModel = this.getViewModel();
        var me = this.getView();
        var form = Ext.create('Ext.window.Window', {
            height: 400,
            width: 700,
            closable: true,
            title: 'Đăng ký nghỉ, vắng mặt',
            resizable: false,
            modal: true,
            border: false,
            closeAction: 'destroy',
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                border: false,
                xtype: 'TimeSheetAbsenceDetail',
                viewModel: {
                    type: 'TimeSheetAbsenceDetailViewModel',
                    data: {
                        id: 0
                    }
                }
            }]
        });
        form.show();
    },
    onCapNhatdbl: function (m, record, item, index, e, eOpts) {
        var id = record.data.id;
        var form = Ext.create('Ext.window.Window', {
            height: 400,
            width: 700,
            closable: true,
            title: 'Chi tiết nghỉ, vắng mặt',
            resizable: false,
            modal: true,
            border: false,
            closeAction: 'destroy',
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                border: false,
                xtype: 'TimeSheetAbsenceDetail',
                viewModel: {
                    type: 'TimeSheetAbsenceDetailViewModel',
                    data: {
                        id: id,
                        isBtnConfirmHidden: false,
                        isEdit: true,
                    }
                }
            }]
        });
        form.show();
    },
    onCapNhat: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        var id = rec.get('id');
        var form = Ext.create('Ext.window.Window', {
            height: 400,
            width: 700,
            closable: true,
            title: 'Chi tiết nghỉ, vắng mặt',
            resizable: false,
            modal: true,
            border: false,
            closeAction: 'destroy',
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                border: false,
                xtype: 'TimeSheetAbsenceDetail',
                viewModel: {
                    type: 'TimeSheetAbsenceDetailViewModel',
                    data: {
                        id: id,
                        isEdit: true,
                    }
                }
            }]
        });
        form.show();
    },
})