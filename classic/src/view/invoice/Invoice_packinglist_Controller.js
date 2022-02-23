Ext.define('GSmartApp.view.invoice.Invoice_packinglist_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Invoice_packinglist_Controller',
	init: function() {
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('LotStore');
        var invoicedid_link = viewmodel.get('packinglist.invoicedid_link');

        // console.log('viewmodel packinglist:');
        // console.log(viewmodel.get('packinglist'));

        this.setLotStore();

        if(isNaN(invoicedid_link)){
            // not existed in db

        }else{
            // existed in db
            // store.loadStore(viewmodel.get('packinglist.invoicedid_link'));
        }
    },
    control: {
        '#btnThoat': {
            click: 'onExit'
        }
    },
    onExit: function(){
        this.getView().up('window').close();
    },
    setLotStore: function(){
        var viewModel = this.getViewModel();

        var invoice = viewModel.get('invoice');
        var invoiceDRec = viewModel.get('invoiceDRec');

        // console.log(invoice);
        // console.log(invoiceDRec);

        var lotStoreArray = new Array();

        var pklist = invoiceDRec.get('packinglist');
        // console.log(pklist);

        // loop qua pklist de tao danh sach lot, size
        if(pklist != null){
            for(var i=0; i<pklist.length; i++){
                // console.log(pklist[i]);
                var pkl = pklist[i];
                var lotnumber = pkl.lotnumber;
                var sizenumber = pkl.sizenumber;

                var LotStore = viewModel.getStore('LotStore');

                var found = lotStoreArray.some(item => item.lotnumber === lotnumber && item.sizenumber === sizenumber);
                if(!found){
                    var data = new Object();
                    data.lotnumber = lotnumber;
                    data.sizenumber = sizenumber;
                    lotStoreArray.push(data);
                }
                LotStore.setData(lotStoreArray);
            }
        }
    }
})