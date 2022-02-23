Ext.define('GSmartApp.view.TimeSheetLunch.TimeSheetLunch_MainViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TimeSheetLunch_MainViewController',
    init: function () {

    },
    onChange: function (datefield, newValue, oldValue, eOpts) {
        // console.log(newValue);
        var viewModel = this.getViewModel();

        var orgtypeid_link = viewModel.get('orgtypeid_link');
        var orgid_link = viewModel.get('orgid_link');
        // if(orgtypeid_link == 1 || orgtypeid_link == 13){
        //     return;
        // }

        var TimeSheetLunchStore = viewModel.getStore('TimeSheetLunchStore');
        TimeSheetLunchStore.removeAll();
        TimeSheetLunchStore.loadStore(orgid_link, newValue);

        var today = new Date();
        if (newValue.toDateString() == today.toDateString() || newValue > today) {
            viewModel.set('isToday', true);
        } else {
            viewModel.set('isToday', false);
        }

        // console.log(newValue);
        // console.log(today);
        // console.log(newValue > today);
        if (orgid_link != null)
            this.checkStatus(orgid_link, newValue);
    },
    checkStatus: function (orgid_link, date) {
        var viewModel = this.getViewModel();
        var params = new Object();
        params.orgid_link = orgid_link;
        params.date = date;

        GSmartApp.Ajax.post('/api/v1/timesheetlunch/isconfirm', Ext.JSON.encode(params),
            function (success, response, options) {
                var response = Ext.decode(response.responseText);
                if (success) {
                    // set hidden and disabled btnConfirm...
                    // console.log(response);
                    var isConfirm = response.isConfirm;
                    viewModel.set('isConfirm', isConfirm);
                    if (isConfirm) {
                        viewModel.set('isBtnConfirmHidden', true);
                        viewModel.set('isBtnUnconfirmHidden', false);
                    } else {
                        viewModel.set('isBtnConfirmHidden', false);
                        viewModel.set('isBtnUnconfirmHidden', true);
                    }

                    var isToday = viewModel.get('isToday');
                    if (isToday) {
                        viewModel.set('isBtnUnconfirmHiddenDisabled', false);
                    } else {
                        viewModel.set('isBtnUnconfirmHiddenDisabled', true);
                    }

                } else {
                    Ext.MessageBox.show({
                        title: "Thông báo",
                        msg: 'Lấy status thất bại',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            })

    },
})