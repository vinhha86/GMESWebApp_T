Ext.define('GSmartApp.view.Schedule.Plan.ScheduleItemInfo.ScheduleItemInfoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ScheduleItemInfoController',
    init: function () {
        var viewModel = this.getViewModel();
        var eventRecord = viewModel.get('eventRecord');
        viewModel.set('record', eventRecord.data);
        var record = viewModel.get('record');
        console.log(record);
        this.getShipDate(record.pcontract_poid_link);
    },
    control: {

    },
    getShipDate: function(pcontract_poid_link){
        // console.log('pcontract_poid_link : ' + pcontract_poid_link);
        var viewModel = this.getViewModel();
        var params = new Object();
        params.id = pcontract_poid_link;

        GSmartApp.Ajax.post('/api/v1/pcontract_po/getone', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    data = response.data;

                    // log
                    console.log('function getShipDate: success');
                    // console.log(data);
                    // console.log(data.shipdate);

                    // format date (khong thi khong hien ra)
                    var shipdate = Ext.Date.parse(data.shipdate, 'c');
                    if (null == shipdate) shipdate = new Date(data.shipdate);
                    
                    viewModel.set('pcontract_po', data);
                    viewModel.set('shipdate', shipdate);
                }else{
                    console.log('function getShipDate: failed');
                }
            })
    }
})