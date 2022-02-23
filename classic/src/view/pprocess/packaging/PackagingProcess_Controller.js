Ext.define('GSmartApp.view.pprocess.PackagingProcess_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PackagingProcess_Controller',
    init: function() {
        var viewmodel = this.getViewModel();
        var FactoryStore = viewmodel.get('FactoryStore');
        var cbProcessingDate = this.lookupReference('processingdate');
        var POrderProcessingStore = viewmodel.get('POrderProcessingStore');
        var factoryCombo = this.lookupReference('factorycombo');
        var ProductionLineStore = viewmodel.get('ProductionLineStore');
        
        // FactoryStore.loadStore_Async(13, null);
        FactoryStore.loadStore_allchildren_byorg_async('13',false);
		FactoryStore.load({
			scope: this,
			callback: function(records, operation, success) {
				if(!success){
					 // this.fireEvent('logout');
				} else {
                    //Tai du lieu tien do cua phan xuong dau tien trong danh sach Factory
                    if (records.length > 0){
                        // factoryCombo.setValue(records[0].data.id);
                        // POrderProcessingStore.loadByDate(cbProcessingDate.getValue(),records[0].data.id);
                        // ProductionLineStore.loadToSX(records[0].data.id);
                    }
                }
			}
		});
    },
    onProcessingItemEdit_Single: function(editor, e){
        if (e.originalValue != e.value){
            // console.log(editor.context.column.dataIndex);
            switch(editor.context.column.dataIndex) {
                case "amountinput":
                    if ((e.value + e.record.get('amountinputsumprev')) > e.record.get('grantamount')) {
                        e.cancel = true;
                        Ext.MessageBox.show({
                            title: "Tiến độ",
                            msg: 'Số vào chuyền không được lớn hơn Số lượng đơn hàng',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                        return false;
                    }
                    break;	  
                case "amountoutput":
                    if ((e.value + e.record.get('amountoutputsumprev')) > e.record.get('amountinputsum')) {
                        e.cancel = true;
                        Ext.MessageBox.show({
                            title: "Tiến độ",
                            msg: 'Số ra chuyền không được lớn hơn Số vào chuyền',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                        return false;
                    }
                    break;	  
                case "amountstocked":
                    if ((e.value + e.record.get('amountstockedsumprev')) > e.record.get('amountoutputsum')) {
                        e.cancel = true;
                        Ext.MessageBox.show({
                            title: "Tiến độ",
                            msg: 'Số nhập kho không được lớn hơn Số ra chuyền',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                        return false;
                    }
                    break;	                    
                case "amountpacked":
                    if ((e.value + e.record.get('amountpackedsumprev')) > e.record.get('amountoutputsum')) {
                        e.cancel = true;
                        Ext.MessageBox.show({
                            title: "Tiến độ",
                            msg: 'Số đóng gói không được lớn hơn Số ra chuyền',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                        return false;
                    }
                    break;	
            }

            //Neu du lieu OK --> Update new value vao record data
            e.record.data[e.field] = e.value;

            var cbProcessingDate = this.lookupReference('processingdate');
            var params=new Object();
            params.processingdate = cbProcessingDate.getValue();
            // params.id = e.record.data.id;
            // params.porderid_link = e.record.data.porderid_link;
            // params.pordergrantid_link = e.record.data.pordergrantid_link;
            params.dataIndex = editor.context.column.dataIndex;
            params.data = e.record.data;
            // params.newValue = e.value;
            // params.newSumValue = 0;
            
            GSmartApp.Ajax.post('/api/v1/pprocess/update_single', Ext.JSON.encode(params),
			function (success, response, options) {
                var response = Ext.decode(response.responseText);
				if (success) {
                    e.record.beginedit;
                    e.record.set('amountcutsum',response.amountcutsum);
                    e.record.set('amountinputsum',response.amountinputsum);
                    e.record.set('amountoutputsum',response.amountoutputsum);
                    e.record.set('amounterrorsum',response.amounterrorsum);
                    e.record.set('amountkcssum',response.amountkcssum);
                    e.record.set('amountpackedsum',response.amountpackedsum);
                    e.record.set('amountstockedsum',response.amountstockedsum);
                    e.record.set('amountpackstockedsum',response.amountpackstockedsum);
                    e.record.set('status',response.status);
                    e.record.endedit;
                    e.record.commit();
                    return true;
				} else {
                    Ext.MessageBox.show({
                        title: "Tiến độ",
                        msg: response.message,
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                    return true;
                }
            });            
        }
    },
    onMenu_POrderProcessingList: function (grid, rowIndex, colIndex, item, e, record) {
        var me = this;
        var menu_grid = new Ext.menu.Menu({
            xtype: 'menu',
            anchor: true,
            //padding: 10,
            minWidth: 150,
            viewModel: {},
            items: [
                {
                    text: 'Xuất TP --> Kho',
                    reference: 'pprocess_productivity',
                    separator: true,
                    margin: '10 0 0',
                    iconCls: 'x-fa fas fa-balance-scale greenIcon',
                    handler: function() {
                        // var record = this.parentMenu.record;
                        // me.porderGrantBalance(record);
                    }
                },                 
        ]
        });
          // HERE IS THE MAIN CHANGE
          var position = [e.getX()-10, e.getY()-10];
          e.stopEvent();
          menu_grid.record = record;
          menu_grid.showAt(position);
    },
    renderSum: function(value, summaryData, dataIndex) {
        if (null == value) value = 0;
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';    
    } ,
    onCelldblclick: function(a, td, cellIndex, record, tr, rowIndex, e, eOpts){
        if (cellIndex == 1){
            var form = Ext.create('Ext.window.Window', {
                height: 550,
                width: 900,
                closable: true,
                title: 'Tiến độ',
                resizable: false,
                modal: true,
                border: false,
                closeAction: 'destroy',

                bodyStyle: 'background-color: transparent',
                layout: {
                    type: 'fit', // fit screen for window
                    padding: 5
                },
                items: [{
                    border: false,
                    xtype: 'POrderProcessingLineChart',
                    POrderId: record.get('porderid_link')
                }]
            });
            form.show();              
        }
    } ,
});
