Ext.define('GSmartApp.view.TimeSheetLunch.Shift_List.Shift_List_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Shift_List_ViewController',
    isActivate: false,
    init: function () {
        
    },
	listen: {
        controller: {

        }
    },    
    control: {
        '#Shift_List_View': {
            afterrender: 'onAfterrender'
        },
        '#btnThoat': {
            click: 'onThoat'
        },
        '#btnSelect': {
            click: 'onSelect'
        },
    },
    onThoat: function(){
        this.fireEvent('Thoat');
    },
    onAfterrender: function(){
        var m = this;
        var me= this.getView();
        var viewModel = this.getViewModel();
        var orgid_link = viewModel.get('orgid_link');
        var date = viewModel.get('date');

        // console.log('onAfterrender');
        // console.log(orgid_link);

        if(!orgid_link){
            return;
        }

        var action = viewModel.get('action');
        if(action == 'confirm'){
            var TimesheetShiftTypeOrgStore = viewModel.getStore('TimesheetShiftTypeOrgStore');
            TimesheetShiftTypeOrgStore.getbyorgid_link_caAn_forConfirm_async(orgid_link, date);
            TimesheetShiftTypeOrgStore.load({
                scope: TimesheetShiftTypeOrgStore,
                callback: function(records, operation, success) {
                    if(!success){
                        // this.fireEvent('logout');
                    } else {
                        // dựa vào thông tin response để đánh dấu checkbox
                        var data = TimesheetShiftTypeOrgStore.getData().items;
                        var selectionModel = me.getSelectionModel();
                        // var select = me.getSelectionModel().getSelection();
                        // console.log(data);
                        var toSelected = new Array();
                        for(var i = 0; i < data.length; i++){
                            if(data[i].get('isConfirm') == true){
                                // selectionModel.select(data[i]);
                                toSelected.push(data[i]);
                            }
                        }
                        selectionModel.select(toSelected);
                    }
                }
            });
        }
        if(action == 'autoGetInfo'){
            var TimesheetShiftTypeOrgStore = viewModel.getStore('TimesheetShiftTypeOrgStore');
            TimesheetShiftTypeOrgStore.getbyorgid_link_caAn(orgid_link);
        }
    },
    onSelect: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var action = viewModel.get('action');
        if(action == 'confirm'){
            m.onSelectConfirm();
        }
        if(action == 'autoGetInfo'){
            m.onSelectAutoGetInfo();
        }
    },
    onSelectConfirm: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var TimesheetShiftTypeOrgStore = viewModel.getStore('TimesheetShiftTypeOrgStore');
        var select = me.getSelectionModel().getSelection();
        var data = TimesheetShiftTypeOrgStore.getData().items;

        // console.log(select);
        // console.log(data);

        var unselect = new Array();
        for(var i = 0; i < data.length; i++){
            var isSelect = false;
            for(var j = 0; j < select.length; j++){
                if(data[i].get('id') == select[j].get('id')){
                    isSelect = true;
                    break;
                }
            }
            if(!isSelect){
                unselect.push(data[i]);
            }
        }
        // console.log(select);
        // console.log(unselect);

        m.fireEvent('SelectConfirm', select, unselect);
    },
    onSelectAutoGetInfo: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var date = viewModel.get('date');
        var orgid_link = viewModel.get('orgid_link');
        var TimesheetShiftTypeOrgStore = viewModel.getStore('TimesheetShiftTypeOrgStore');
        var select = me.getSelectionModel().getSelection();
        if (select.length == 0) {
            Ext.Msg.show({
                title: "Thông báo",
                msg: "Bạn phải chọn ít nhất một ca",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }else{
            // console.log(select);
            // console.log(date);
            // console.log(orgid_link);

            var listCa = new Array();
            for(var i = 0; i < select.length; i++){
                listCa.push(select[i].data);
            }

            var params = new Object();
            params.date = date;
            params.orgid_link = orgid_link;
            params.listCa = listCa;

            GSmartApp.Ajax.post('/api/v1/timesheetlunch/getListCheckCaAnAuto', Ext.JSON.encode(params),
            function (success, response, options) {
                var response = Ext.decode(response.responseText);
                if (success) {
                    // console.log(response.data);
                    m.fireEvent('Select', listCa, response.data);
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Lấy thông tin thành công',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                } else {
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Lấy thông tin thất bại',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            })
        }
    },
})