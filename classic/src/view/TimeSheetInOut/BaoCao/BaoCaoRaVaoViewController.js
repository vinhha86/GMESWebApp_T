Ext.define('GSmartApp.view.TimeSheetInOut.BaoCao.BaoCaoRaVaoViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.BaoCaoRaVaoViewController',
    init: function (view) {
        var me = this;
        var viewmodel = this.getViewModel();
        var ListOrgStore = viewmodel.getStore('ListOrgStore');
        ListOrgStore.loadOrg_ByOrgType(13);

        var session = GSmartApp.util.State.get('session');
        if (session.orgid_link != 1) {
            viewmodel.set('timesheetdaily.orgid_link', session.orgid_link);
            var grantStore = viewmodel.getStore('GrantStore');
            grantStore.getbyParent(session.orgid_link);
            // me.Search();
        }

    },
    control: {
        '#cmbDonVi': {
            select: 'onSelectDonVi'
        }
    },
    listen: {
        store: {
            'TimeSheetDailyStore': {
                'loadStore_done': 'onloadStore_done'
            }
        }
    },
    onSelectDonVi: function (cmb, rec, e) {
        var viewmodel = this.getViewModel();
        var grantStore = viewmodel.getStore('GrantStore');
        grantStore.getbyParent(rec.get('id'));
    },
    onloadStore_done: function (records) {
        var me = this.getView();
        me.setLoading(false);
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('TimeSheetDailyStore');
        var count = 1;
        for (var i = 0; i < store.data.length; i++) {
            var data = store.data.items[i];
            if (data.get('sortvalue') == 0) {
                data.set('stt', count);
                count++;
            }
        }
        store.commitChanges();
    },
    Search: function () {
        var me = this.getView();
        me.setLoading("Đang tải dữ liệu");
        var viewmodel = this.getViewModel();
        var month = viewmodel.get('timesheetdaily.month');
        var year = viewmodel.get('timesheetdaily.year');
        var orgid_link = viewmodel.get('timesheetdaily.orgid_link');
        var grantid_link = viewmodel.get('timesheetdaily.grantid_link');

        var store = viewmodel.getStore('TimeSheetDailyStore');
        store.loadStore(month, year, orgid_link, grantid_link);
    },
    onCodeFilter: function () {
        var filterField = this.lookupReference('CodeFilter'),
            filters = this.getView().store.getFilters();

        if (filterField.value) {
            this.codeFilter = filters.add({
                id: 'codeFilter',
                property: 'personnel_code',
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
    onNameFilter: function () {
        var filterField = this.lookupReference('NameFilter'),
            filters = this.getView().store.getFilters();

        if (filterField.value) {
            this.NameFilter = filters.add({
                id: 'NameFilter',
                property: 'fullname',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.NameFilter) {
            filters.remove(this.NameFilter);
            this.NameFilter = null;
        }
    },
    onExport: function () {
        var viewmodel = this.getViewModel();
        var grid = this.getView();

        var month = viewmodel.get('timesheetdaily.month');
        var year = viewmodel.get('timesheetdaily.year');
        var donvi = grid.down('#cmbDonVi').getRawValue();
        var bophan = grid.down('#cmbBoPhan').getRawValue();

        var cfg = Ext.merge({
            title: donvi + "-" + bophan + " Tháng " + month + " năm " + year,
            fileName: donvi + "-" + bophan + " Tháng " + month + " năm " + year + '.' + "xlsx"
        }, {
            type: 'excel07',
            ext: 'xlsx',
            includeGroups: false,
            includeSummary: false
        });

        grid.saveDocumentAs(cfg);
    },
    onExport_Excel: function () {
        var viewmodel = this.getViewModel();
        var me = this;
        var grid = this.getView();
        
        var params = new Object();
        params.month = viewmodel.get('timesheetdaily.month');
        params.year = viewmodel.get('timesheetdaily.year');
        params.orgid_link = viewmodel.get('timesheetdaily.orgid_link');
        params.grantid_link = viewmodel.get('timesheetdaily.grantid_link');

        if (null != params.grantid_link){
            grid.setLoading("Đang tính dữ liệu");

            var fileName = "Bangcong_T" + params.month + "_" + params.year + "_" + params.orgid_link + ".xlsx";

            GSmartApp.Ajax.post('/api/v1/timesheet_report/daily', Ext.JSON.encode(params),
            function (success, response, options) {
                grid.setLoading(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        me.saveByteArray(fileName, response.data);
                    }
                    else {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Lưu thất bại',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }

                } else {
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Lưu thất bại',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            })
        } else {
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: 'File Excel chỉ được tải cho từng bộ phận',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
        }
    },
    onCalculate: function () {
        var me = this;
        var grid = this.getView();
        var viewmodel = this.getViewModel();
        var orgid_link = viewmodel.get('timesheetdaily.orgid_link');
        if (orgid_link == 0 || orgid_link == null) {
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: 'Bạn chưa chọn đơn vị',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }

        grid.setLoading("Đang tính dữ liệu");
        var params = new Object();
        params.orgid_link = orgid_link;

        GSmartApp.Ajax.post('/api/v1/timesheetinout/calculate_daily', Ext.JSON.encode(params),
            function (success, response, options) {
                grid.setLoading(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    var store = viewmodel.getStore('TimeSheetLunchKhachStore');
                    if (response.respcode == 200) {
                        me.Search();
                    }
                    else {
                        Ext.MessageBox.show({
                            title: "Thông báo",
                            msg: 'Cập nhật thất bại',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }
                } else {
                    Ext.MessageBox.show({
                        title: "Thông báo",
                        msg: 'Cập nhật thất bại',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            }, 120000)
    },
    saveByteArray: function (reportName, byte) {
        var me = this;
        byte = this.base64ToArrayBuffer(byte);
        
        var blob = new Blob([byte], {type: "application/xlsx"});
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        var fileName = reportName;
        link.download = fileName;
        link.click();
    },
    base64ToArrayBuffer: function (base64) {
        var binaryString = window.atob(base64);
        var binaryLen = binaryString.length;
        var bytes = new Uint8Array(binaryLen);
        for (var i = 0; i < binaryLen; i++) {
           var ascii = binaryString.charCodeAt(i);
           bytes[i] = ascii;
        }
        return bytes;
    }
})