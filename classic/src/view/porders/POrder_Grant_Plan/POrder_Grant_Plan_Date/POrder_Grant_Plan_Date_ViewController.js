Ext.define('GSmartApp.view.porders.POrder_Grant_Plan.POrder_Grant_Plan_Date_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.POrder_Grant_Plan_Date_ViewController',
    init: function () {
        
    },
    listen: {

    },
    control: {
        '#POrder_Grant_Plan_Date_View': {
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
    onSelect: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var DateStore = viewModel.getStore('DateStore');
        var select = me.getSelectionModel().getSelection();
        if (select.length == 0) {
            Ext.Msg.show({
                title: "Thông báo",
                msg: "Bạn phải chọn ít nhất một ngày",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }else{
            m.selectDate(select);
        }
    },
    selectDate: function(select){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var pordergrant = viewModel.get('pordergrant');
        var pordergrantid_link = pordergrant.get('id');
        
        // console.log(select);
        // console.log(pordergrant);
        // return;

        this.fireEvent('createStockoutOrder_popup', select, pordergrantid_link);
    },
    onAfterrender: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        
        var pordergrant = viewModel.get('pordergrant');
        var porder_grantid_link = pordergrant.get('id');
        // console.log(pordergrant);

        // porder_grantid_link
        me.setLoading(true);
        var params = new Object();
        params.porder_grantid_link = porder_grantid_link;

        GSmartApp.Ajax.post('/api/v1/porder_grant_sku_plan/getDateFor_KeHoachVaoChuyen_ChuaYeuCau', Ext.JSON.encode(params),
            function (success, response, options) {
                me.setLoading(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        var data = new Array();
                        // console.log(response);
                        for(var i = 0; i<response.data.length; i++){
                            var dateObj = new Object();
                            dateObj.date = response.data[i];
                            data.push(dateObj);
                        }
                        var DateStore = viewModel.getStore('DateStore');
                        DateStore.insert(0,data);
                    }
                }
            })
    },
    onDelete:function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var PackingListStore = viewModel.getStore('PackingListStore');
        var select = me.getSelectionModel().getSelection();
        if (select.length == 0) {
            Ext.Msg.show({
                title: "Thông báo",
                msg: "Phải chọn ít nhất một cây vải",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }else{
            Ext.Msg.show({
                title: "Thông báo",
                msg: "Bạn có chắc chắn xóa?",
                buttons: Ext.MessageBox.YESNO,
                buttonText: {
                    yes: 'Có',
                    no: 'Không'
                },
                fn: function (btn) {
                    if (btn === 'yes') {
                        m.delete(select);
                    }
                }
            });
        }
        // console.log(select);
        // this.fireEvent("ThemNPL", select, pcontractid_link, productid_link);
        // this.onThoat();
    },
    delete: function(select){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var PackingListStore = viewModel.getStore('PackingListStore');
        var stockout = viewModel.get('stockout');

        PackingListStore.remove(select);
        
        var stockout_d = stockout.stockout_d;
        for(var i=0; i<stockout_d.length; i++){
            var stockout_packinglist = stockout_d[i].stockout_packinglist;
            for(var j=0; j<select.length; j++){
                for(var k=0; k<stockout_packinglist.length; k++){
                    if(stockout_packinglist[k].epc == select[j].get('epc')){
                        // remove from stockout
                        stockout_packinglist.splice(k, 1);
                        k--;
                    }
                }
            }
        }

        stockout = m.recalculate(stockout);
        viewModel.set('stockout', stockout);
        this.fireEvent('DeletePkl', stockout);

        // console.log(select);
        // console.log(stockout);
    },
})