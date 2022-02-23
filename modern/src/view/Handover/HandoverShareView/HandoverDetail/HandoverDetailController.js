Ext.define('GSmartApp.view.handover.HandoverShareView.HandoverDetail.HandoverDetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.HandoverDetailController',
    init: function() {
        
    },
    control: {
        '#handover_cut_toline_detail': {
            childtap: 'onChildTapDetail'
        },
        '#handover_line_fromcut_detail': {
            childtap: 'onChildTapDetail'
        },
        '#handover_line_topack_detail': {
            childtap: 'onChildTapDetail'
        },
        '#handover_pack_fromline_detail': {
            childtap: 'onChildTapDetail'
        },
        '#handover_cut_toprint_detail': {
            childtap: 'onChildTapDetail'
        },
        '#handover_line_toprint_detail': {
            childtap: 'onChildTapDetail'
        }
    },
    onChildTapDetail: function ( list, location, eOpts ) {
        var me = this;
        var viewModel = this.getViewModel();
        var viewId = viewModel.get('viewId');
        var columnIndex = location.columnIndex;
        var record = location.record;

        var currentRec = viewModel.get('currentRec');

        // console.log(record);
        var recordTotalpackage = 0;
        if(columnIndex == 0 || columnIndex == 1){
            return;
        }
        if(columnIndex == 2){
            if(
                viewId != 'handover_cut_toline_edit' && 
                viewId != 'handover_line_topack_edit' &&
                viewId != 'handover_line_toprint_edit' &&
                viewId != 'handover_cut_toprint_edit'
            ){
                return;
            }
            recordTotalpackage = record.get('totalpackage');
        }
        if(columnIndex == 3){
            if(viewId != 'handover_line_fromcut_edit' && viewId != 'handover_pack_fromline_edit'){
                return;
            }
            recordTotalpackage = record.get('totalpackagecheck');
        }

        var dialog = Ext.create({
            xtype: 'dialog',
            itemId: 'dialog',
            // title: 'Số lượng',
            header: false,
            closable: true,
            closeAction: 'destroy',
            maximizable: false,
            maskTapHandler: function(){
                if(dialog){
                    dialog.close();
                }
            },
            bodyPadding: '10 20 10 20',
            maxWidth: 300,
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                border: false,
                xtype: 'HandoverSkuAmount',
                viewModel: {
                    data: {
                        totalpackage: recordTotalpackage
                    }
                }
            }],
            listeners: {
                
            }
        });
        dialog.show();

        // get event
        dialog.down('#HandoverSkuAmount').getController().on('Luu', function (recordTotalpackage) {
            var handoverProduct = viewModel.get('handoverProduct');  
            // console.log(handoverProduct);
            if(recordTotalpackage == null){
                recordTotalpackage == 0
            }
            if(columnIndex == 2){
                record.set('totalpackage', recordTotalpackage);
                // if(currentRec.status == 0){
                //     record.set('totalpackagecheck', recordTotalpackage);
                // }
            }
            if(columnIndex == 3){
                record.set('totalpackagecheck', recordTotalpackage);
            }
            if(handoverProduct){
                var handoverProductTotalPackage = 0;
                var handoverProductTotalPackagecheck = 0;
                var handoverSKUs = handoverProduct.handoverSKUs;
                // console.log(handoverProduct);
                // console.log(handoverSKUs);

                if(handoverSKUs || handoverSKUs.length > 0){
                    for(var i = 0; i < handoverSKUs.length; i++){
                        var handoverSKU = handoverSKUs[i];
                        var handoverSKUTotalPackage = handoverSKU.totalpackage;
                        var handoverSKUTotalPackagecheck = handoverSKU.totalpackagecheck;
                        if(handoverSKUTotalPackage == null){
                            handoverSKUTotalPackage = 0;
                        }
                        if(handoverSKUTotalPackagecheck == null){
                            handoverSKUTotalPackagecheck = 0;
                        }
                        handoverProductTotalPackage+=handoverSKUTotalPackage;
                        handoverProductTotalPackagecheck+=handoverSKUTotalPackagecheck;
                    }
                }
                // handoverProduct.totalpackage = null;
                // handoverProduct.totalpackage = handoverProductTotalPackage;
                // if(columnIndex == 2){
                    viewModel.set('handoverProduct.totalpackage', handoverProductTotalPackage);
                // }
                // if(columnIndex == 3){
                    viewModel.set('handoverProduct.totalpackagecheck', handoverProductTotalPackagecheck);
                // }
                // console.log(handoverProductTotalPackage);
                // console.log(handoverProductTotalPackagecheck);
            }
            
            dialog.close();
        });

        dialog.down('#HandoverSkuAmount').getController().on('Thoat', function () {
            dialog.close();
        });
    },

});
