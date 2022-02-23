Ext.define('GSmartApp.view.handover.Handover_kho_tocut_packinglist_detail_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Handover_kho_tocut_packinglist_detail_Controller',
    init: function () {
    },
    control: {
    //   '#packageid': {
    //     specialkey: 'onSpecialkey'
    //   },
    //   '#netweight': {
    //     specialkey: 'onSpecialkey'
    //   },
    //   '#grossweight': {
    //     specialkey: 'onSpecialkey'
    //   },
    //   '#met_origin': {
    //     specialkey: 'onSpecialkey'
    //   },
    // //   '#m3': {
    // //     specialkey: 'onSpecialkey'
    // //   },
    //   '#widthorigin': {
    //     specialkey: 'onSpecialkey'
    //   },
    //   '#btnThemPKL': {
    //     click: 'CreatePackingList'
    //   }
    },
    renderSum: function (value) {
      if (null == value) value = 0;
      return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000.00') + '</div>';
    },
    renderCount: function (value) {
      if (null == value) value = 0;
      return '<div style="font-weight: bold; color:darkred;"> Tổng: ' + value + '</div>';
    },
    onSpecialkey: function (field, e) {
      var me = this.getView();
  
      var store = me.getStore();
      var storeItems = store.getData().items;
  
      var found = storeItems.some(item => item.get('packageid') == me.down('#packageid').getValue());
  
      if (e.getKey() == e.ENTER) {
        if (field.itemId == "packageid") {
          me.down('#netweight').focus();
        }
        else if (field.itemId == "netweight") {
          me.down('#grossweight').focus();
        }
        else if (field.itemId == "grossweight") {
          me.down('#widthorigin').focus();
        }
        // else if (field.itemId == "m3") {
        //   me.down('#width').focus();
        // }
        else if (field.itemId == "widthorigin") {
          me.down('#met_origin').focus();
        }
        else if (field.itemId == "met_origin") {
          // console.log('enter');
          if(me.down('#packageid').getValue() == ''){
            me.down('#packageid').focus();
          }else if(found){
            // console.log('here yet');
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Số đã tồn tại',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                },
                fn: function (btn) {
                  if (btn === 'yes') {
                    me.down('#packageid').focus();
                  }
                }
            });
          }else{
            this.CreatePackingList();
          }
        }
      }
    },
    CreatePackingList: function(){
      var me = this.getView();
      var mes = "";
      var item = "";
      var viewModel = this.getViewModel();
      var stockoutid_link = viewModel.get('packinglist.stockoutid_link');
      var stockoutdid_link = viewModel.get('packinglist.stockoutdid_link');
      var skuid_link = viewModel.get('packinglist.skuid_link');
      var lotnumber = viewModel.get('packinglist.lotnumber');
      var stockoutDRec = viewModel.get('stockoutDRec');
      var colorid_link = stockoutDRec.get('colorid_link');
      var color_name = stockoutDRec.get('color_name');
  
      if(viewModel.get('packinglist.lotnumber') == null || viewModel.get('packinglist.lotnumber') == ''){
        mes = "Bạn chưa chọn số lót";
        Ext.MessageBox.show({
          title: "Thông báo",
          msg: mes,
          buttons: Ext.MessageBox.YES,
          buttonText: {
            yes: 'Đóng',
          }
        });
        return;
      }else if(me.down('#packageid').getValue() == ''){
        me.down('#packageid').focus();
      }else{
        // console.log('here');
        var stockout = viewModel.get('stockout');
        var stockout_d = viewModel.get('stockout.stockout_d');
        var stockoutDRec = viewModel.get('stockoutDRec');
        var packinglist = stockoutDRec.get('stockout_packinglist');
        if(packinglist == null){
          packinglist = new Array();
          stockoutDRec.set('stockout_packinglist', packinglist)
        }
  
        var packinglistObj = new Object();
        packinglistObj.stockoutid_link = stockoutid_link;
        packinglistObj.stockoutdid_link = stockoutdid_link;
        packinglistObj.skuid_link = skuid_link;
        packinglistObj.colorid_link = colorid_link;
        packinglistObj.color_name = color_name;
        packinglistObj.lotnumber = lotnumber;
        packinglistObj.packageid = me.down('#packageid').getValue();
        packinglistObj.met_origin = me.down('#met_origin').getValue() == '' ? 0 : parseFloat(me.down('#met_origin').getValue());
        packinglistObj.met_check = 0;
        packinglistObj.ydsorigin = Ext.Number.roundToPrecision(packinglistObj.met_origin / 0.9144,2);
        packinglistObj.ydscheck = 0;
        // packinglistObj.m3 = me.down('#m3').getValue() == '' ? 0 : parseFloat(me.down('#m3').getValue());
        packinglistObj.netweight = me.down('#netweight').getValue() == '' ? 0 : parseFloat(me.down('#netweight').getValue());
        packinglistObj.grossweight = me.down('#grossweight').getValue() == '' ? 0 : parseFloat(me.down('#grossweight').getValue());
        packinglistObj.widthorigin = me.down('#widthorigin').getValue() == '' ? 0 : parseFloat(me.down('#widthorigin').getValue());
        packinglistObj.widthcheck = 0;
        // packinglistObj.status = -1;
        packinglistObj.status = 0;
        packinglistObj.checked = 0;
  
        packinglist.push(packinglistObj);
  
        packinglistStoreData = new Array();
        for(var i = 0; i < packinglist.length; i++){
          if(packinglist[i].lotnumber == lotnumber){
            packinglistStoreData.push(packinglist[i]);
          }
        } 
  
        me.getStore().loadData(packinglistStoreData);
        me.getStore().commitChanges();
  
        me.down('#packageid').setValue('');
        me.down('#met_origin').setValue('');
        // me.down('#m3').setValue('');
        me.down('#netweight').setValue('');
        me.down('#grossweight').setValue('');
        me.down('#widthorigin').setValue('');
        me.down('#packageid').focus();
      }
      this.reCalculateSkuGrid();
    },
  
    onXoa: function(grid, rowIndex, colIndex){
      var me = this;
      var viewModel = this.getViewModel();
      var invoice = viewModel.get('invoice');
      var invoiceDRec = viewModel.get('invoiceDRec');
      var store = grid.getStore();
      var data = store.getAt(rowIndex);
  
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
                me.Xoa(data, store, rowIndex);
            }
        }
      });
    },
    Xoa: function(data, store, rowIndex){
      var me = this;
      var viewModel = this.getViewModel();
      var stockout = viewModel.get('stockout');
      var stockoutDRec = viewModel.get('stockoutDRec');
  
      var id = data.get('id');
      if(id == 0){
        // xoa tren grid
        store.removeAt(rowIndex);
  
        var packinglist = stockoutDRec.get('stockout_packinglist');
        for(var i = 0; i < packinglist.length; i++){
          if(packinglist[i].idx == data.get('idx')){
            packinglist.splice(i, 1);
            i--;
          }
        }
      }else{
        store.removeAt(rowIndex);
  
        var packinglist = stockoutDRec.get('stockout_packinglist');
        for(var i = 0; i < packinglist.length; i++){
          if(packinglist[i].idx == data.get('idx')){
            packinglist.splice(i, 1);
            i--;
          }
        }
      }
      this.reCalculateSkuGrid();
    },
    onPackingListItemEdit: function(editor, context, eOpts){
      // console.log('onPackingListItemEdit here');
      var m = this;
      var me = this.getView();
      var store = me.getStore();
      var viewModel = this.getViewModel();
      var pkl_data = context.record.data;
  
      if(context.value == "" || context.value == context.originalValue){
        if(
          (
          context.field == 'netweight' ||
          context.field == 'grossweight' ||
          context.field == 'ydsorigin' ||
          context.field == 'ydscheck' ||
          context.field == 'met_origin' ||
          context.field == 'met_check' ||
        //   context.field == 'm3' ||
          context.field == 'widthorigin' ||
          context.field == 'widthcheck'
          ) && isNaN(context.value)
        ){
          store.rejectChanges();
          return;
        }
      }
  
      if(context.field == 'netweight'){
        pkl_data.netweight = parseFloat(pkl_data.netweight);
      }
      if(context.field == 'grossweight'){
        pkl_data.grossweight = parseFloat(pkl_data.grossweight);
      }
      if(context.field == 'ydsorigin'){
        pkl_data.ydsorigin = parseFloat(pkl_data.ydsorigin);
        pkl_data.met_origin = Ext.Number.roundToPrecision(pkl_data.ydsorigin * 0.9144,2);
      }
      if(context.field == 'ydscheck'){
        pkl_data.ydscheck = parseFloat(pkl_data.ydscheck);
        pkl_data.met_check = Ext.Number.roundToPrecision(pkl_data.ydscheck * 0.9144,2);
      }
      if(context.field == 'met_origin'){
        pkl_data.met_origin = parseFloat(pkl_data.met_origin);
        pkl_data.ydsorigin = Ext.Number.roundToPrecision(pkl_data.met_origin / 0.9144,2);
      }
      if(context.field == 'met_check'){
        pkl_data.met_check = parseFloat(pkl_data.met_check);
        pkl_data.ydscheck = Ext.Number.roundToPrecision(pkl_data.met_check / 0.9144,2);
      }
    //   if(context.field == 'm3'){
    //     pkl_data.m3 = parseFloat(pkl_data.m3);
    //   }
      if(context.field == 'widthorigin'){
        pkl_data.widthorigin = parseFloat(pkl_data.widthorigin);
      }
      if(context.field == 'widthcheck'){
        pkl_data.widthcheck = parseFloat(pkl_data.widthcheck);
      }
  
      store.commitChanges();
      this.reCalculateSkuGrid();
    },
    onCheckchange: function(column, rowIndex, checked, record, e, eOpts){
      var m = this;
      var me = this.getView();
      var store = me.getStore();
      var viewModel = this.getViewModel();

      var stockoutDRec = viewModel.get('stockoutDRec');

      if(checked){
        var ydsorigin = record.get('ydsorigin');
        var widthorigin = record.get('widthorigin');
        var met_origin = record.get('met_origin');
        record.set('ydscheck', ydsorigin);
        record.set('met_check', met_origin);
        record.set('widthcheck', widthorigin);
        record.set('status', 0);
      }else{
        record.set('ydscheck', 0);
        record.set('met_check', 0);
        record.set('widthcheck', 0);
        record.set('status', -1);
      }

      // console.log(record);
      // console.log(stockoutDRec);

      store.commitChanges();
      this.reCalculateSkuGrid();
    },
    reCalculateSkuGrid: function(){
      var viewModel = this.getViewModel();
      var stockout = viewModel.get('stockout');
      var stockoutDRec = viewModel.get('stockoutDRec');
  
      // console.log(invoice);
      // console.log(invoiceDRec);
  
      var packinglist = stockoutDRec.get('stockout_packinglist');
      if(packinglist != null){
        var totalpackage = 0;
        // var netweight = 0;
        // var grossweight = 0;
        // var m3 = 0;
        // var yds = 0;
        var ydscheck = 0;
        // var met = 0;
        var metcheck = 0;
        
        for(var i = 0; i < packinglist.length; i++){
          totalpackage++;
        //   netweight+=packinglist[i].netweight;
        //   grossweight+=packinglist[i].grossweight;
        //   m3+=packinglist[i].m3;
          // yds+=packinglist[i].ydsorigin;
          ydscheck+=packinglist[i].ydscheck;
          // met+=packinglist[i].met_origin;
          metcheck+=packinglist[i].met_check;
        }
  
        stockoutDRec.set('totalpackage', totalpackage);
        // stockoutDRec.set('netweight', netweight);
        // stockoutDRec.set('grossweight', grossweight);
        // stockoutDRec.set('m3', m3);
        // stockoutDRec.set('totalydsorigin', yds);
        stockoutDRec.set('totalydscheck', ydscheck);
        // stockoutDRec.set('totalmet_origin', met);
        stockoutDRec.set('totalmet_check', metcheck);
  
        Ext.getCmp('Handover_kho_tocut_Edit_D').getStore().commitChanges();
      }
    }
  })