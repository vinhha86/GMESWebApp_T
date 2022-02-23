Ext.define('GSmartApp.view.TongHopBaoAn.TongHopBaoAnView_InfoDetail.TongHopBaoAnView_Info_DetailController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.TongHopBaoAnView_Info_DetailController',
	init: function () {

	},
	control: {
        '#btnBack':{
            tap: 'onbtnBack',
        },
        '#btnHome':{
            tap: 'onBtnHomeTap',
        },
        '#TongHopBaoAnView_Info_Detail': {
            painted: 'onPainted'
        },
	},
    onBtnHomeTap: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        m.fireEvent('close-gohome');
    },
    onbtnBack:function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        m.fireEvent('close');
    },
    onPainted: function(sender, element, eOpts){
        // console.log('painted');
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var TimeSheetLunchStore = viewModel.getStore('TimeSheetLunchStore');

        var orgid_link = viewModel.get('orgid_link');
        var date = viewModel.get('date');
        var location = viewModel.get('location');

        // console.log(orgid_link);
        // console.log(date);
        // console.log(location);

        // return;

        me.setMasked(true);

        var params = new Object();
        params.orgid_link = orgid_link;
        params.date = date;
        params.timesheet_shift_type_id_link = location.record.get('timesheet_shift_type_id_link');
        params.timesheet_shift_type_org_id_link = location.record.get('timesheet_shift_type_org_id_link');

        // return;

        GSmartApp.Ajax.post('/api/v1/timesheetlunch/getForTimeSheetLunch_Mobile_Detail', Ext.JSON.encode(params),
            function (success, response, options) {
                me.setMasked(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    // console.log(response.data);
                    for(var i=0;i<response.data.length;i++) {
                        if(response.data[i].orgType == 166){
                            response.data[i].onTop = true;
                        }else{
                            response.data[i].onTop = false;
                        }
                    }
                    TimeSheetLunchStore.removeAll();
                    TimeSheetLunchStore.insert(0,response.data);

                    TimeSheetLunchStore.getSorters().add({
                        property: 'onTop',
                        direction: 'DESC'
                    },{
                        property: 'orgType',
                        direction: 'ASC'
                    },{
                        property: 'orgCode',
                        direction: 'ASC'
                    });
                } else {
                    // Ext.toast('Lấy thông tin thất bại', 3000);
                    TimeSheetLunchStore.fireEvent('logout');
                }
            })
    },
    renderSum: function(value ){
        if (null == value) value = 0;
        return Ext.util.Format.number(value, '0,000');    
    },
})