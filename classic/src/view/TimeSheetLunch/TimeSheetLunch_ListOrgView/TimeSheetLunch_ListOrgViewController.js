Ext.define('GSmartApp.view.TimeSheetLunch.TimeSheetLunch_ListOrgViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TimeSheetLunch_ListOrgViewController',
    init: function () {
        this.onload();
    },
    control: {
        '#TimeSheetLunch_ListOrgView': {
            itemclick: 'onloadDetail'
        }
    },
    onloadDetail: function (grid, record, item, index, e, eOpts) {
        // console.log(record);
        this.fireEvent('SelectOrg', record);
        var viewModel = this.getViewModel();
        var TimeSheetLunchStore = viewModel.getStore('TimeSheetLunchStore');

        var orgtypeid_link = record.get('orgtypeid_link');
        var orgid_link = record.get('id');

        var TimeSheetLunch_MainView = Ext.getCmp('TimeSheetLunch_MainView');
        var date = TimeSheetLunch_MainView.down('#txtdatefield').getValue();

        viewModel.set('orgtypeid_link', orgtypeid_link);
        viewModel.set('orgid_link', orgid_link);

        //load danh sách ca của đơn vị
        var TimesheetShiftTypeOrgStore = viewModel.getStore('TimesheetShiftTypeOrgStore');
        TimesheetShiftTypeOrgStore.getbyorgid_link_caAn(record.get('id'), true);

        //gọi function CreateColumns
        var controler = Ext.getCmp('TimeSheetLunch_ListView').getController();
        controler.CreateColumns(record.get('id'));
        // load danh sách nhân viên và ca
        // var TimeSheetLunch_ListView = Ext.getCmp('TimeSheetLunch_ListView');
        // if(TimeSheetLunch_ListView) TimeSheetLunch_ListView.setLoading(true);
        var TimeSheetLunchStore = viewModel.getStore('TimeSheetLunchStore');
        TimeSheetLunchStore.removeAll();
        TimeSheetLunchStore.loadStore(orgid_link, date);

        // set color
        TimeSheetLunch_MainView.down('#sumCa1').setFieldStyle('background-color: white;');
        TimeSheetLunch_MainView.down('#sumCa2').setFieldStyle('background-color: white;');
        TimeSheetLunch_MainView.down('#sumCa3').setFieldStyle('background-color: white;');
        TimeSheetLunch_MainView.down('#sumCa4').setFieldStyle('background-color: white;');
        TimeSheetLunch_MainView.down('#sumCa5').setFieldStyle('background-color: white;');

        // check status xác nhận của ngày và của đơn vị
        this.setShiftColumnConfirm();

        //
        viewModel.set('selectedRecord_Donvi', record);
    },
    setShiftColumnConfirm: function () {
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var orgid_link = viewModel.get('orgid_link');
        var TimeSheetLunch_MainView = Ext.getCmp('TimeSheetLunch_MainView');
        var date = TimeSheetLunch_MainView.down('#txtdatefield').getValue();

        var params = new Object();
        params.orgid_link = orgid_link;
        params.date = date;

        GSmartApp.Ajax.post('/api/v1/timesheetshifttypeorg/getbyorgid_link_caAn_forConfirm', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    // console.log(response);

                    var data = response.data;
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].name == 'Ca ăn 1') {
                            if (data[i].isConfirm == true) {
                                viewModel.set('isCa1Confirm', true);
                            } else {
                                viewModel.set('isCa1Confirm', false);
                            }
                        }
                        if (data[i].name == 'Ca ăn 2') {
                            if (data[i].isConfirm == true) {
                                viewModel.set('isCa2Confirm', true);
                            } else {
                                viewModel.set('isCa2Confirm', false);
                            }
                        }
                        if (data[i].name == 'Ca ăn 3') {
                            if (data[i].isConfirm == true) {
                                viewModel.set('isCa3Confirm', true);
                            } else {
                                viewModel.set('isCa3Confirm', false);
                            }
                        }
                        if (data[i].name == 'Ca ăn 4') {
                            if (data[i].isConfirm == true) {
                                viewModel.set('isCa4Confirm', true);
                            } else {
                                viewModel.set('isCa4Confirm', false);
                            }
                        }
                        if (data[i].name == 'Ca ăn 5') {
                            if (data[i].isConfirm == true) {
                                viewModel.set('isCa5Confirm', true);
                            } else {
                                viewModel.set('isCa5Confirm', false);
                            }
                        }
                    }

                    if (viewModel.get('isCa1Confirm') == true)
                        TimeSheetLunch_MainView.down('#sumCa1').setFieldStyle('background-color: lightblue;');
                    else
                        TimeSheetLunch_MainView.down('#sumCa1').setFieldStyle('background-color: white;');
                    if (viewModel.get('isCa2Confirm') == true)
                        TimeSheetLunch_MainView.down('#sumCa2').setFieldStyle('background-color: lightblue;');
                    else
                        TimeSheetLunch_MainView.down('#sumCa2').setFieldStyle('background-color: white;');
                    if (viewModel.get('isCa3Confirm') == true)
                        TimeSheetLunch_MainView.down('#sumCa3').setFieldStyle('background-color: lightblue;');
                    else
                        TimeSheetLunch_MainView.down('#sumCa3').setFieldStyle('background-color: white;');
                    if (viewModel.get('isCa4Confirm') == true)
                        TimeSheetLunch_MainView.down('#sumCa4').setFieldStyle('background-color: lightblue;');
                    else
                        TimeSheetLunch_MainView.down('#sumCa4').setFieldStyle('background-color: white;');
                    if (viewModel.get('isCa5Confirm') == true)
                        TimeSheetLunch_MainView.down('#sumCa5').setFieldStyle('background-color: lightblue;');
                    else
                        TimeSheetLunch_MainView.down('#sumCa5').setFieldStyle('background-color: white;');
                }
            })
    },
    // checkStatus: function(orgid_link, date){
    //     var viewModel = this.getViewModel();
    //     var params = new Object();
    //     params.orgid_link = orgid_link;
    //     params.date = date;

    //     GSmartApp.Ajax.post('/api/v1/timesheetlunch/isconfirm', Ext.JSON.encode(params),
    //         function (success, response, options) {
    //             var response = Ext.decode(response.responseText);
    //             if (success) {
    //                 // set hidden and disabled btnConfirm...
    //                 // console.log(response);
    //                 var isConfirm = response.isConfirm;
    //                 if(isConfirm){
    //                     viewModel.set('isBtnConfirmHidden', true);
    //                     viewModel.set('isBtnUnconfirmHidden', false);
    //                     viewModel.set('isConfirm', isConfirm);
    //                 }else{
    //                     viewModel.set('isBtnConfirmHidden', false);
    //                     viewModel.set('isBtnUnconfirmHidden', true);
    //                     viewModel.set('isConfirm', isConfirm);
    //                 }

    //                 var isToday = viewModel.get('isToday');
    //                 if(isToday){
    //                     viewModel.set('isBtnUnconfirmHiddenDisabled', false);
    //                 }else{
    //                     viewModel.set('isBtnUnconfirmHiddenDisabled', true);
    //                 }

    //             } else {
    //                 Ext.MessageBox.show({
    //                     title: "Thông báo",
    //                     msg: 'Lấy status thất bại',
    //                     buttons: Ext.MessageBox.YES,
    //                     buttonText: {
    //                         yes: 'Đóng',
    //                     }
    //                 });
    //             }
    //     })

    // },
    onload: function () {
        var me = this.getView();
        var viewModel = this.getViewModel();
        var OrgStore = viewModel.getStore('OrgStore');
        OrgStore.loadStore();

        this.activeOnlyFilter = Ext.create('Ext.util.Filter', {
            id: 'activeOnlyFilter',
            property: 'status',
            value: 1
        });
        OrgStore.getFilters().add(this.activeOnlyFilter);

        OrgStore.getSorters().add('orgtypeid_link');
        OrgStore.getSorters().add('is_manufacturer');
        OrgStore.getSorters().add('id');
    }
})