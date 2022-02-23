Ext.define('GSmartApp.view.cutplan_processing.CutplanProcessing_List_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CutplanProcessing_List_Controller',
    init: function() {
        var me = this.getView();
        var viewModel = this.getViewModel();

        var today = new Date();
		var priorDate = new Date().setDate(today.getDate()-30);
        var laterDate = new Date().setDate(today.getDate()+30);
        priorDate = new Date(priorDate);
        laterDate = new Date(laterDate);
        viewModel.set('fromDate', priorDate);
        viewModel.set('toDate', laterDate);
		// me.down('#fromDate').setValue(new Date(priorDate));
        // this.loadData();
    },
    control: {
        '#btnLapPhieuMoi': {
            click: 'onBtnLapPhieuMoiTap'
        },
        '#btnTimKiemCutPlanProcessing': {
            click: 'onBtnTimKiemCutPlanProcessingTap'
        },
        '#CutplanProcessing_List': {
            // select: 'onCutplanProcessingSelect',
            itemdblclick: 'onCutplanProcessingItemDblCLick'
        },
        '#comboboxSku': {
            select: 'onSKU_Select',
        },
        '#btnTonKho': {
            click: 'onBtnTonKhoTap'
        }
    },
    onDelete(grid, rowIndex, colIndex, item, e, record){
        var m = this;
        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn xóa ?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function (btn) {
                if (btn === 'yes') {
                    m.Delete(grid, rowIndex, record);
                }
            }
        });
    },
    Delete:function(grid, rowIndex, record){
        var me = this.getView();
        var id = record.data.id;
        var viewModel = this.getViewModel();

        var params = new Object();
        params.id = id;

        me.setLoading(true);

        GSmartApp.Ajax.post('/api/v1/cutplan_processing/cutplan_processing_delete', Ext.JSON.encode(params),
            function (success, response, options) {
                me.setLoading(false);
                var response = Ext.decode(response.responseText);
                if(success){
                    if (response.respcode == 200) {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Xoá thành công',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                        var CutplanProcessingStore = grid.getStore();
                        CutplanProcessingStore.removeAt(rowIndex);

                        // reload chart tien do cat
                        var mainView = Ext.getCmp('cutplan_processing');
                        if(mainView){
                            var chartView = Ext.getCmp('CutplanProcessing_Chart_TienDoCat');
                            var chartViewController = chartView.getController();
                            var chart = Ext.getCmp('Chart_TienDoCat');
                            chartViewController.onChartRendered(chart);
                        }

                    }else{
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Xoá thất bại: ' + response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }
                }else{
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Xoá thất bại',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            })
    },
    onCutplanProcessingItemEditClick: function (grid, rowIndex, colIndex, item, e, record) {
        var viewModel = this.getViewModel();
        // set session luu tim kiem
        var porderSearchObj = viewModel.get('porderSearchObj');
        var porder = viewModel.get('porder');
        if(porder != null) porderSearchObj.porderId = porder.get('id');
        GSmartApp.util.State.set('cutplanProcessing_porderSearchObj', porderSearchObj);

        var id = record.data.id;
        this.redirectTo("cutplan_processing/" + id + "/edit");
    },
    onCutplanProcessingItemDblCLick: function (m, record, item, index, e, eOpts) {
        var viewModel = this.getViewModel();
        // set session luu tim kiem
        var porderSearchObj = viewModel.get('porderSearchObj');
        var porder = viewModel.get('porder');
        if(porder != null) porderSearchObj.porderId = porder.get('id');
        GSmartApp.util.State.set('cutplanProcessing_porderSearchObj', porderSearchObj);

        var id = record.data.id;
        this.redirectTo("cutplan_processing/" + id + "/edit");
    },
    onBtnLapPhieuMoiTap: function (){
        var m = this;
        var viewModel = this.getViewModel();
        // set session luu tim kiem
        var porderSearchObj = viewModel.get('porderSearchObj');
        var porder = viewModel.get('porder');
        if(porder != null) porderSearchObj.porderId = porder.get('id');
        GSmartApp.util.State.set('cutplanProcessing_porderSearchObj', porderSearchObj);

        var porder = viewModel.get('porder');
        if(porder!=null){
            // neu chon porder -> luu session de set porder tao moi
            var porderObj = porder.data;
            GSmartApp.util.State.set('porderObj', porderObj);
            m.redirectTo('cutplan_processing/0/edit');
        }else{
            m.redirectTo('cutplan_processing/0/edit');
        }
    },
    onBtnTimKiemCutPlanProcessingTap: function(){
        this.loadData();
    },
    loadData: function(){
        var m = this;
        var viewModel = this.getViewModel();
        var porder = viewModel.get('porder');
        var porderid_link = porder.get('id');
        var maNPL_id = viewModel.get('maNPL_id');
        var fromDate = viewModel.get('fromDate');
        var toDate = viewModel.get('toDate');

        var CutplanProcessingStore = viewModel.getStore('CutplanProcessingStore');
        CutplanProcessingStore.loadStore(fromDate, toDate, 100, 1, porderid_link, maNPL_id);
    },
    onCutplanProcessingSelect: function(e, selected, eOpts) {
        var viewModel = this.getViewModel();
        var CutplanProcessingDStore = viewModel.getStore('CutplanProcessingDStore');
        CutplanProcessingDStore.setData(selected.data.cutplanProcessingD);
        console.log(selected.data.cutplanProcessingD);
    },

    onCutplanProcessing_pordercodeFilterKeyup:function(){
        var grid = this.getView(),
            // Access the field using its "reference" property name.
            filterField = this.lookupReference('cutplanProcessing_pordercodeFilter'),
            store = this.getViewModel().getStore('CutplanProcessingStore'),
            filters = store.getFilters();

        if (filterField.value) {
            this.cutplanProcessing_pordercodeFilter = filters.add({
                id: 'cutplanProcessing_pordercodeFilter',
                property: 'pordercode',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.cutplanProcessing_pordercodeFilter) {
            filters.remove(this.cutplanProcessing_pordercodeFilter);
            this.cutplanProcessing_pordercodeFilter = null;
        }
    },
    onCutplanProcessing_maSPFilterKeyup:function(){
        var grid = this.getView(),
            // Access the field using its "reference" property name.
            filterField = this.lookupReference('cutplanProcessing_maSPFilter'),
            store = this.getViewModel().getStore('CutplanProcessingStore'),
            filters = store.getFilters();

        if (filterField.value) {
            this.cutplanProcessing_maSPFilter = filters.add({
                id: 'cutplanProcessing_maSPFilter',
                property: 'maSP',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.cutplanProcessing_maSPFilter) {
            filters.remove(this.cutplanProcessing_maSPFilter);
            this.cutplanProcessing_maSPFilter = null;
        }
    },
    renderSum: function (value) {
        var viewModel = this.getViewModel();
        var porder = viewModel.get('porder');
        if(porder != null){
            var totalorder_req = porder.get('totalorder_req');
            if(totalorder_req != null){
                if (null == value) value = 0;
		        return '<div style="font-weight: bold; color:darkred;">' 
                    + Ext.util.Format.number(value, '0,000') 
                    + ' / '
                    + Ext.util.Format.number(totalorder_req - value, '0,000') 
                    + ' / '
                    + Ext.util.Format.number(totalorder_req, '0,000') 
                    + '</div>';
            }
        }

		if (null == value) value = 0;
		return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000.00') + '</div>';
	},
    onSKU_Select: function(combo, record, eOpts){ // console.log(record);
        var viewModel = this.getViewModel();
        var porder = viewModel.get('porder');
        var porderid_link = porder.get('id');
        var maNPL_id = record.get('id');
        viewModel.set('maNPL_id', maNPL_id);

        // load ds theo doi cat
        var CutplanProcessingStore = viewModel.getStore('CutplanProcessingStore');
        var fromDate = viewModel.get('fromDate');
        var toDate = viewModel.get('toDate');
        if(CutplanProcessingStore) CutplanProcessingStore.loadStore(fromDate, toDate, 100, 1, porderid_link, maNPL_id);
        console.log(maNPL_id);

        // load chart tien do cat
        var mainView = Ext.getCmp('cutplan_processing');
        if(mainView){
            var chartView = Ext.getCmp('CutplanProcessing_Chart_TienDoCat');
            var chartViewController = chartView.getController();
            var chart = Ext.getCmp('Chart_TienDoCat');
            chartViewController.onChartRendered(chart);
        }
    },
    onBtnTonKhoTap: function(){
        var viewModel = this.getViewModel();
        var maNPL_id = viewModel.get('maNPL_id');

        if(maNPL_id != null && !isNaN(maNPL_id)){
            // popup
            var form = Ext.create('Ext.window.Window', {
                height: 600,
                width: 900,
                closable: true,
                resizable: false,
                modal: true,
                border: false,
                title: 'Danh sách vải tồn',
                closeAction: 'destroy',
                bodyStyle: 'background-color: transparent',
                layout: {
                    type: 'fit', // fit screen for window
                    padding: 5
                },
                items: [{
                    xtype: 'CutplanProcessing_StockList',
                    viewModel: {
                        data: {
                            skuid_link: maNPL_id,
                        }
                    }
                }]
            });
            form.show();

            form.down('#CutplanProcessing_StockList').getController().on('Thoat', function () {
                form.close();
            });
        }else{
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Bạn cần chọn loại vải',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }
    }
});
