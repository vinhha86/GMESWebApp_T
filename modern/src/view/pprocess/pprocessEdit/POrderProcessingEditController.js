Ext.define('GSmartApp.view.pprocess.POrderProcessingEditController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.POrderProcessingEditController',
    Id: 0,
    init: function() {
        // console.log(new Date(new Date().getFullYear(),new Date().getMonth() , new Date().getDate()));
    },
    listen: {
        controller: {
            '*': {
                loaddata: 'onLoadData'
            }
        }
    },
    onLoadData: function (id, type) {
        var me = this;
        me.Id = id;
        this.loadData(id);
    },
    onBackBtn:function(){
        Ext.util.History.back();
        // var view = this.getView();
        // view.destroy();
    },
    loadData: function(id){
        var viewmodel = this.getViewModel();
        var POrderProcessingStore = viewmodel.get('POrderProcessingStore');
        POrderProcessingStore.loadById(id);
		POrderProcessingStore.load({
			scope: this,
			callback: function(records, operation, success) {
				if(!success){
					 // this.fireEvent('logout');
				} else {
                    // set data cho view
                    if (records.length > 0){
                        // console.log(records[0].data);
                        viewmodel.set('record', records[0].data);
                        viewmodel.set('grantamount', records[0].data.grantamount);
                        viewmodel.set('pordercode', records[0].data.pordercode);
                        viewmodel.set('amountinput', records[0].data.amountinput);
                        viewmodel.set('amountinputsum', records[0].data.amountinputsum);
                        viewmodel.set('amountoutput', records[0].data.amountoutput);
                        viewmodel.set('amountoutputsum', records[0].data.amountoutputsum);
                        viewmodel.set('amountkcs', records[0].data.amountkcs);
                        viewmodel.set('amountkcssum', records[0].data.amountkcssum);
                        viewmodel.set('amounterror', records[0].data.amounterror);
                        viewmodel.set('amounterrorsum', records[0].data.amounterrorsum);
                        viewmodel.set('amountkcscomplete', records[0].data.amountkcssum - records[0].data.amounterrorsum);
                        viewmodel.set('amountstocked', records[0].data.amountstocked);
                        viewmodel.set('amountstockedsum', records[0].data.amountstockedsum);
                        viewmodel.set('amountpacked', records[0].data.amountpacked);
                        viewmodel.set('amountpackedsum', records[0].data.amountpackedsum);
                        viewmodel.set('amounttarget', records[0].data.amounttarget);
                        viewmodel.set('amountkcsreg', records[0].data.amountkcsreg);
                    }
                }
			}
		});
    },
    // Input output
    onInputTap: function(btn, e, eOpts){
        var me = this;
        var view = this.getView();
        var viewmodel = this.getViewModel();
        var field = view.lookupReference('io_amountinput');
        var textValue = btn.getText();
        var temp = field.getValue();

        viewmodel.set('isbtnDisabled', true);

        if(temp == null){
            field.setValue(0);
            temp = 0;
        }

        switch(textValue){
            case '+1':
                temp+=1;
                break;
            case '+10':
                temp+=10;
                break;
            case '-1':
                temp+=-1;
                break;
            case '-10':
                temp+=-10;
                break;
        }
        if(temp < 0){
            temp = 0;
        }

        var amountinputsumprev = viewmodel.get('record').amountinputsumprev;
        if(amountinputsumprev == null) amountinputsumprev = 0;
        var grantamount = viewmodel.get('record').grantamount;
        if(grantamount == null) grantamount = 0;

        if ((temp + amountinputsumprev) > grantamount) {
            Ext.Msg.alert('Tiến độ', 'Số vào chuyền không được lớn hơn Số tổng');
            viewmodel.set('isbtnDisabled', false);
            return false;
        }else{
            // field.setValue(temp);
            me.onProcessingItemEdit_Single(temp, 'amountinput');
        }
    },
    onOutputTap: function(btn, e, eOpts){
        var me = this;
        var view = this.getView();
        var viewmodel = this.getViewModel();
        var field = view.lookupReference('io_amountoutput');
        var textValue = btn.getText();
        var temp = field.getValue();

        viewmodel.set('isbtnDisabled', true);

        if(temp == null){
            field.setValue(0);
            temp = 0;
        }

        switch(textValue){
            case '+1':
                temp+=1;
                break;
            case '+10':
                temp+=10;
                break;
            case '-1':
                temp+=-1;
                break;
            case '-10':
                temp+=-10;
                break;
        }
        if(temp < 0){
            temp = 0;
        }

        var amountoutputsumprev = viewmodel.get('record').amountoutputsumprev;
        if(amountoutputsumprev == null) amountoutputsumprev = 0;
        var amountinputsum = viewmodel.get('record').amountinputsum;
        if(amountinputsum == null) amountinputsum = 0;

        if ((temp + amountoutputsumprev) > amountinputsum) {
            Ext.Msg.alert('Tiến độ', 'Số ra chuyền không được lớn hơn Số vào chuyền');
            viewmodel.set('isbtnDisabled', false);
            return false;
        }else{
            me.onProcessingItemEdit_Single(temp, 'amountoutput');
        }
    },
    // QC
    onQCTap: function(btn, e, eOpts){
        var me = this;
        var view = this.getView();
        var viewmodel = this.getViewModel();
        var field = view.lookupReference('qc_amountkcs');
        var textValue = btn.getText();
        var temp = field.getValue();

        viewmodel.set('isbtnDisabled', true);

        if(temp == null){
            field.setValue(0);
            temp = 0;
        }

        switch(textValue){
            case '+1':
                temp+=1;
                break;
            case '+10':
                temp+=10;
                break;
            case '-1':
                temp+=-1;
                break;
            case '-10':
                temp+=-10;
                break;
        }
        if(temp < 0){
            temp = 0;
        }

        me.onProcessingItemEdit_Single(temp, 'amountkcs');
    },
    onErrorTap: function(btn, e, eOpts){
        var me = this;
        var view = this.getView();
        var viewmodel = this.getViewModel();
        var field = view.lookupReference('qc_amounterror');
        var textValue = btn.getText();
        var temp = field.getValue();

        viewmodel.set('isbtnDisabled', true);

        if(temp == null){
            field.setValue(0);
            temp = 0;
        }

        switch(textValue){
            case '+1':
                temp+=1;
                break;
            case '+10':
                temp+=10;
                break;
            case '-1':
                temp+=-1;
                break;
            case '-10':
                temp+=-10;
                break;
        }
        if(temp < 0){
            temp = 0;
        }

        me.onProcessingItemEdit_Single(temp, 'amounterror');
    },
    // Packing
    onStockingTap: function(btn, e, eOpts){
        var me = this;
        var view = this.getView();
        var viewmodel = this.getViewModel();
        var field = view.lookupReference('p_amountstocked');
        var textValue = btn.getText();
        var temp = field.getValue();

        viewmodel.set('isbtnDisabled', true);

        if(temp == null){
            field.setValue(0);
            temp = 0;
        }

        switch(textValue){
            case '+1':
                temp+=1;
                break;
            case '+10':
                temp+=10;
                break;
            case '-1':
                temp+=-1;
                break;
            case '-10':
                temp+=-10;
                break;
        }
        if(temp < 0){
            temp = 0;
        }

        var amountstockedsumprev = viewmodel.get('record').amountstockedsumprev;
        if(amountstockedsumprev == null) amountstockedsumprev = 0;
        var amountoutputsum = viewmodel.get('record').amountoutputsum;
        if(amountoutputsum == null) amountoutputsum = 0;

        if ((temp + amountstockedsumprev) > amountoutputsum) {
            Ext.Msg.alert('Tiến độ', 'Số nhập kho không được lớn hơn Số ra chuyền');
            viewmodel.set('isbtnDisabled', false);
            return false;
        }else{
            me.onProcessingItemEdit_Single(temp, 'amountstocked');
        }
    },
    onPackingTap: function(btn, e, eOpts){
        var me = this;
        var view = this.getView();
        var viewmodel = this.getViewModel();
        var field = view.lookupReference('p_amountpacked');
        var textValue = btn.getText();
        var temp = field.getValue();

        viewmodel.set('isbtnDisabled', true);

        if(temp == null){
            field.setValue(0);
            temp = 0;
        }

        switch(textValue){
            case '+1':
                temp+=1;
                break;
            case '+10':
                temp+=10;
                break;
            case '-1':
                temp+=-1;
                break;
            case '-10':
                temp+=-10;
                break;
        }
        if(temp < 0){
            temp = 0;
        }

        var amountpackedsumprev = viewmodel.get('record').amountpackedsumprev;
        if(amountpackedsumprev == null) amountpackedsumprev = 0;
        var amountoutputsum = viewmodel.get('record').amountoutputsum;
        if(amountoutputsum == null) amountoutputsum = 0;

        if ((temp + amountpackedsumprev) > amountoutputsum) {
            Ext.Msg.alert('Tiến độ', 'Số đóng gói không được lớn hơn Số ra chuyền');
            viewmodel.set('isbtnDisabled', false);
            return false;
        }else{
            me.onProcessingItemEdit_Single(temp, 'amountpacked');
        }
    },
    // Output target, QC reg
    onOutputTargetTap: function(btn, e, eOpts){
        var me = this;
        var view = this.getView();
        var viewmodel = this.getViewModel();
        var field = view.lookupReference('ot_amounttarget');
        var textValue = btn.getText();
        var temp = field.getValue();

        viewmodel.set('isbtnDisabled', true);

        if(temp == null){
            field.setValue(0);
            temp = 0;
        }

        switch(textValue){
            case '+1':
                temp+=1;
                break;
            case '+10':
                temp+=10;
                break;
            case '-1':
                temp+=-1;
                break;
            case '-10':
                temp+=-10;
                break;
        }
        if(temp < 0){
            temp = 0;
        }

        me.onProcessingItemEdit_Single(temp, 'amounttarget');
    },
    onQCRegTap: function(btn, e, eOpts){
        var me = this;
        var view = this.getView();
        var viewmodel = this.getViewModel();
        var field = view.lookupReference('ot_amountkcsreg');
        var textValue = btn.getText();
        var temp = field.getValue();

        viewmodel.set('isbtnDisabled', true);

        if(temp == null){
            field.setValue(0);
            temp = 0;
        }

        switch(textValue){
            case '+1':
                temp+=1;
                break;
            case '+10':
                temp+=10;
                break;
            case '-1':
                temp+=-1;
                break;
            case '-10':
                temp+=-10;
                break;
        }
        if(temp < 0){
            temp = 0;
        }

        me.onProcessingItemEdit_Single(temp, 'amountkcsreg');
    },

    // update
    onProcessingItemEdit_Single: function(value, dataIndex){

        //Neu du lieu OK --> Update new value vao record data
        var me = this;
        var view = this.getView();
        var viewmodel = this.getViewModel();
        var record = viewmodel.get('record');

        record[dataIndex] = value;

        var params=new Object();

        params.processingdate = new Date(new Date().getFullYear(),new Date().getMonth() , new Date().getDate());
        params.dataIndex = dataIndex;
        params.data = record;

        // console.log(params);
        
        GSmartApp.Ajax.post('/api/v1/pprocess/update_single', Ext.JSON.encode(params),
        function (success, response, options) {
            var response = Ext.decode(response.responseText);
            if (success) {
                viewmodel.set(dataIndex, value);

                if(response.amountcutsum != null) {
                    viewmodel.set('amountcutsum',response.amountcutsum);
                    record.amountcutsum = response.amountcutsum;
                }
                if(response.amountinputsum != null) {
                    viewmodel.set('amountinputsum',response.amountinputsum);
                    record.amountinputsum = response.amountinputsum;
                }
                if(response.amountoutputsum != null) {
                    viewmodel.set('amountoutputsum',response.amountoutputsum);
                    record.amountoutputsum = response.amountoutputsum;
                }
                if(response.amounterrorsum != null) {
                    viewmodel.set('amounterrorsum',response.amounterrorsum);
                    viewmodel.set('amountkcscomplete', viewmodel.get('amountkcssum') - viewmodel.get('amounterrorsum'));
                    record.amounterrorsum = response.amounterrorsum;
                }
                if(response.amountkcssum != null) {
                    viewmodel.set('amountkcssum',response.amountkcssum);
                    viewmodel.set('amountkcscomplete', viewmodel.get('amountkcssum') - viewmodel.get('amounterrorsum'));
                    record.amountkcssum = response.amountkcssum;
                }
                if(response.amountpackedsum != null) {
                    viewmodel.set('amountpackedsum',response.amountpackedsum);
                    record.amountpackedsum = response.amountpackedsum;
                }
                if(response.amountstockedsum != null) {
                    viewmodel.set('amountstockedsum',response.amountstockedsum);
                    record.amountstockedsum = response.amountstockedsum;
                }
                if(response.amountpackstockedsum != null) {
                    viewmodel.set('amountpackstockedsum',response.amountpackstockedsum);
                    record.amountpackstockedsum = response.amountpackstockedsum;
                }
                if(response.status != null) {
                    viewmodel.set('status',response.status);
                }
            } else {
                Ext.Msg.alert('Tiến độ', response.message);
            }
            viewmodel.set('isbtnDisabled', false);
        });
    },
});
