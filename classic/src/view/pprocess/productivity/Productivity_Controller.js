Ext.define('GSmartApp.view.pprocess.Productivity_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Productivity_Controller',
    init: function () {
        this.onload();
    },
    control: {
        '#Productivity_Personnel': {
            itemclick: 'onPersonnelClick'
        },
        '#btnLuu': {
            click: 'onLuu'
        }
    },
    onload: function () {
        var viewModel = this.getViewModel();
        var workingdate = viewModel.get('date');
        viewModel.set('shifttypeid_link', 1);
        var orgid_link = viewModel.get('record').get('granttoorgid_link');

        var Personnel_Store = viewModel.getStore('Personnel_Store');
        Personnel_Store.loadStore_ForPProcessingProductivity(orgid_link, 1, workingdate);
    },
    onRadioGroupChange: function( rdoGrp, newValue, oldValue, eOpts){
        var viewModel = this.getViewModel();
        viewModel.set('shifttypeid_link', newValue);
        var workingdate = viewModel.get('date');
        var orgid_link = viewModel.get('record').get('granttoorgid_link');
        var shifttypeid_link = newValue;
        // console.log(viewModel.get('record'));

        var Personnel_Store = viewModel.getStore('Personnel_Store');
        Personnel_Store.loadStore_ForPProcessingProductivity(orgid_link, shifttypeid_link, workingdate);
        var PorderSewingCostStore = viewModel.getStore('PorderSewingCostStore');
        PorderSewingCostStore.removeAll();
    },
    onPersonnelClick: function(grid, rec, item, index, e, eOpts){
        // console.log(record);
        var viewModel = this.getViewModel();
        var record = viewModel.get('record');

        var processingdate = viewModel.get('date');
        var shifttypeid_link = viewModel.get('shifttypeid_link');
        var porderid_link = record.get('porderid_link');
        var pordergrantid_link = record.get('pordergrantid_link');
        var personnelid_link = rec.get('id');
        viewModel.set('personnelid_link', personnelid_link);

        var PorderSewingCostStore = viewModel.getStore('PorderSewingCostStore');
        PorderSewingCostStore.loadForPProcessProductivity(
            personnelid_link, processingdate, shifttypeid_link, porderid_link, pordergrantid_link
            );
    },
    onEditAmount: function (editor, context, e) {
        var viewModel = this.getViewModel();
        var PorderSewingCostStore = viewModel.getStore('PorderSewingCostStore');
        var val = context.record.get('amount_complete');
        var orgVal = context.originalValue;
        // console.log(val);
        // console.log(orgVal);

        if(val == null || val == '' || val == orgVal){
            PorderSewingCostStore.rejectChanges();
        }else{
            PorderSewingCostStore.commitChanges();
        }
    },
    onLuu: function(){
        var viewModel = this.getViewModel();
        var record = viewModel.get('record');

        var processingdate = viewModel.get('date');
        var shifttypeid_link = viewModel.get('shifttypeid_link');
        var porderid_link = record.get('porderid_link');
        var pordergrantid_link = record.get('pordergrantid_link');
        var personnelid_link = viewModel.get('personnelid_link');

        var PorderSewingCostStore = viewModel.getStore('PorderSewingCostStore');
        var items = PorderSewingCostStore.getData().items;
        if(items.length == 0) return;

        var data = new Array();
        for(var i = 0; i < items.length; i++){
            var obj = new Object();
            obj.id = items[i].data.id;
            obj.workingprocess_name = items[i].data.workingprocess_name;
            obj.amount_complete = items[i].data.amount_complete;
            data.push(obj);
        }

        var params = new Object();
        params.data = data;
        params.personnelid_link = personnelid_link;
        params.shifttypeid_link = shifttypeid_link;
        params.processingdate = processingdate;
        params.porderid_link = porderid_link;
        params.pordergrantid_link = pordergrantid_link;

        GSmartApp.Ajax.post('/api/v1/porderprocessingns/save', Ext.JSON.encode(params),
        function (success, response, options) {
            var response = Ext.decode(response.responseText);
            if (success) {
                Ext.Msg.show({
                    title: "Thông báo",
                    msg: "Lưu thành công",
                    buttons: Ext.MessageBox.YES,
                    buttonText: {
                        yes: 'Đóng',
                    }
                });
            } else {
                Ext.Msg.show({
                    title: "Thông báo",
                    msg: "Lưu thất bại",
                    buttons: Ext.MessageBox.YES,
                    buttonText: {
                        yes: 'Đóng',
                    }
                });
            }
            PorderSewingCostStore.load();
        })
    },
    temp: function(){
        var viewModel = this.getViewModel();
        var record = viewModel.get('record');

        var processingdate = viewModel.get('date');
        var shifttypeid_link = viewModel.get('shifttypeid_link');
        var porderid_link = record.get('porderid_link');
        var pordergrantid_link = record.get('pordergrantid_link');
        var personnelid_link = viewModel.get('personnelid_link');
    }
})