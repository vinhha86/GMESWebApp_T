Ext.define('GSmartApp.view.TimeSheetInOut.TimeSheetInOutViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TimeSheetInOutViewController',
    init: function (view) {
        var me = this;
        var viewmodel = view.getViewModel();

        var ListOrgStore = viewmodel.getStore('ListOrgStore');
        ListOrgStore.loadOrg_ByOrgType(13);

        //gán giá trị mặc định cho lọc từ ngày - đến ngày

        var todate = new Date();
        viewmodel.set('timesheetinout.todate', todate);
        var fromdate = new Date(todate.getFullYear(), todate.getMonth(), todate.getDate() - 1);
        viewmodel.set('timesheetinout.fromdate', fromdate);

        var session = GSmartApp.util.State.get('session');
        if (session.orgid_link != 1) {
            viewmodel.set('timesheetinout.orgid_link', session.orgid_link);

            me.onSearch();
        }


    },
    control: {
        '#btnSearch': {
            click: 'onSearch'
        }
    },
    onSearch: function () {
        var viewmodel = this.getViewModel();

        //từ ngày
        var to_hour = new Date(viewmodel.get('timesheetinout.to_hour'));
        var tohour = to_hour.getHours();
        var tominute = to_hour.getMinutes();
        var todate = new Date(viewmodel.get('timesheetinout.todate'));

        //giờ - từ ngày để trống 
        if (to_hour.getFullYear() == 1970) {
            tohour = "00";
            tominute = "00"
        }
        var todate_hour = todate.toDateString() + " " + tohour + ":" + tominute + ":00";
        var dateto = new Date(todate_hour);

        //đến ngày
        var from_hour = new Date(viewmodel.get('timesheetinout.from_hour'));
        var fromhour = from_hour.getHours();
        var fromminute = from_hour.getMinutes();
        var fromdate = new Date(viewmodel.get('timesheetinout.fromdate'));

        //giờ - đến ngày để trống 
        if (from_hour.getFullYear() == 1970) {
            fromhour = "00";
            fromminute = "00"
        }
        var fromdate_hour = fromdate.toDateString() + " " + fromhour + ":" + fromminute + ":00";
        var datefrom = new Date(fromdate_hour);

        var number_space = Ext.Date.diff(datefrom, dateto, 'd');

        //kiểm tra "đến ngày " không được nhỏ hơn "từ ngày"
        if (number_space < 0) {
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: 'Thời gian tìm kiếm không hợp lệ !',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }


        //nếu khoảng thời gia tìm kiếm quá 1 tháng thì thông báo lỗi - chỉ được tìm kiếm trong khoảng 1 tháng
        if (number_space > 31) {
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: 'Thời gian tìm kiếm chỉ trong 1 tháng!',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }

        var orgid_link = viewmodel.get('timesheetinout.orgid_link');
        if (orgid_link == null || orgid_link == 0) {
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: 'Bạn chưa chọn đơn vị!',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
        }
        else {
            var TimeSheetInoutStore = viewmodel.getStore('TimeSheetInoutStore');
            var s_datefrom = Ext.Date.format(datefrom, "Y-m-d H:i:s");
            var s_dateto = Ext.Date.format(dateto, "Y-m-d H:i:s");

            TimeSheetInoutStore.loadStore(s_dateto, s_datefrom, viewmodel.get('timesheetinout.orgid_link'), orgid_link);
        }

    },
    //lọc - filter
    onCodeFilter: function () {
        let filterField = this.lookupReference('CodeFilter'),
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
    onNameFilter: function () {
        let filterField = this.lookupReference('NameFilter'),
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