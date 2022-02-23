Ext.define('GSmartApp.view.porders.POrderImageController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.porderimage',
    onActivate: function(){
        var viewModel = this.getViewModel();
        var store_porderimage = Ext.data.StoreManager.lookup('store_porderimage'); 
        store_porderimage.loadImage(viewModel.get('ordercode'));
    },
    onCloseButton: function() {
        var mywin = Ext.WindowManager.getActive();
        if (mywin) {
            mywin.close();
        }
    },
    onImageItemClick: function(record, item, index, e, eOpts){
        // console.log(item.get('image_uri'));
        // var viewModel = this.getViewModel();
        // viewModel.set('viewimg',item.get('image_uri'));
        var imgviewdetail = this.lookupReference('imgviewdetail');
        imgviewdetail.setSrc(item.get('image_uri'));
    }
});