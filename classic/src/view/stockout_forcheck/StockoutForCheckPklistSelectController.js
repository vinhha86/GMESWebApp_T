Ext.define('GSmartApp.view.pprocess.StockoutForCheckPklistSelectController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.stockoutforcheckpklistselect',

    onActivate: function(){
        var store_stockout_pklist_select = Ext.data.StoreManager.lookup('store_stockout_pklist_select');
        if (store_stockout_pklist_select){
            Ext.Array.each(this.getViewModel().get('foundrecords').items, function(rc) {
                store_stockout_pklist_select.insert(0,rc);
            });
            console.log(store_stockout_pklist_select);
        }
    },
    onCloseButton: function() {
        var mywin = Ext.WindowManager.getActive();
        if (mywin) {
            mywin.close();
        }
    },
    onSelectButton: function(button){
        var access_token = App.Ajax.access_token();
        var grid_stockoutforcheckpklistselect = this.getView().items.get('grid_stockoutforcheckpklistselect');
        var records = grid_stockoutforcheckpklistselect.getSelection();
        if (records.length > 0){
            var record = records[0];
            record.beginedit;
            record.set('ydsorigin', this.getViewModel().get('ydsorigin'));
            record.set('widthorigin', this.getViewModel().get('widthorigin'));
            record.endedit            
            var access_token = App.Ajax.access_token();
                  
            var params=new Object();
            params.msgtype = 'stockout_updatepklist';
            params.message = '';
            params.token = '';
            params.data = records[0].data;
            //console.log(Ext.JSON.encode(params));
    
            Ext.Ajax.request({
                 url: App.Utils.url+'/ivyadmin/api/v1/stockoutpklist/update',
                 method:'POST',
                 cors: true,
                 headers :{
                    'Accept': "application/json", 
                    'Content-Type':"application/json",
                    'authorization': 'Bearer ' + access_token
                 },
                 useDefaultXhrHeader: false,
                 params: Ext.JSON.encode(params),
                 success : function(response,options ) {
                    var response = Ext.decode(response.responseText);
                    //console.log(response);
    
                    if(response!=null && response!=''){
                        if (response.respcode == 200){
                            var store_stockout_pklist_forcheck = Ext.data.StoreManager.lookup('store_stockout_pklist_forcheck');
                            if (store_stockout_pklist_forcheck) store_stockout_pklist_forcheck.reload();
    
                            var mywin = Ext.WindowManager.getActive();
                            if (mywin) {
                                mywin.close();
                            }
                        }
                        else {
                            //console.log('update fail');
                            Ext.Msg.alert("Kiểm vải", response.message);
                        }
    
                    }
                 },
                 failure :function(response,options){
                    console.log(response.responseText);
                    console.log(response);
                 }
             });             
        }

    },
    renderSummary: function(value, record) {
        if (null == value) value = 0;
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000.00') + '</div>';
    },
    renderCell: function(value, record) {
        if (null == value) value = 0;
        return '<div style="font-size: 11px;">' + Ext.util.Format.number(value, '0,000.00') + '</div>';
    },    
});
