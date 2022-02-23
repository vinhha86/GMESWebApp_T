Ext.define('GSmartApp.view.cutplan_processing.CutplanProcessing_Edit_D_Controller', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.CutplanProcessing_Edit_D_Controller',
	channel: { cmd: null, dta: null },
	init: function () {
	},
	control: {
		'#CutplanProcessing_Edit_D': {
			childtap: 'onChildTap'
		},
	},

	onChildTap: function ( list, location, eOpts ) {
		// console.log(location);
        var me = this;
        var viewModel = this.getViewModel();
		var cutplanProcessing = viewModel.get('cutplanProcessing');
        var columnIndex = location.columnIndex;
        var record = location.record;

        console.log(record);
        var recordValue = 0;
		var label = '';
        // if(columnIndex == 0 || columnIndex == 1){
        //     return;
        // }
        if(columnIndex == 0){
            // recordValue = record.get('met');
			// label = 'Dài cây';
            return;
        }
        if(columnIndex == 1){
            recordValue = record.get('la_vai');
			label = 'Số lá';
        }
        if(columnIndex == 2){
            recordValue = record.get('tieu_hao');
			label = 'Tiêu hao';
        }
        if(columnIndex == 3){
            recordValue = record.get('con_lai');
			label = 'Đầu tấm';
        }
        if(columnIndex == 4){
            recordValue = record.get('ps');
			label = 'P/S';
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
                xtype: 'CutplanProcessingDAmount',
                viewModel: {
                    data: {
                        value: recordValue,
						label: label,
                    }
                }
            }],
            listeners: {
                
            }
        });
        dialog.show();

        // get event
        dialog.down('#CutplanProcessingDAmount').getController().on('Luu', function (value) {
            
			if(columnIndex == 0){
				record.set('met', value);
			}
			if(columnIndex == 1){
				record.set('la_vai', value);
			}
			if(columnIndex == 2){
				record.set('tieu_hao', value);
			}
			if(columnIndex == 3){
				record.set('con_lai', value);
			}
			if(columnIndex == 4){
				record.set('ps', value);
			}

			// console.log(cutplanProcessing);

            dialog.close();
        });

        dialog.down('#CutplanProcessingDAmount').getController().on('Thoat', function () {
            dialog.close();
        });
    },
})