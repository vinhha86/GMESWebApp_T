Ext.define('GSmartApp.view.invoice.invoice_packinglist_detail_Controller', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.invoice_packinglist_detail_Controller',
  init: function () {
    var viewModel = this.getViewModel();
    var invoiceDRec = viewModel.get('invoiceDRec');
    var size_name = invoiceDRec.get('size_name');
    if(!isNaN(size_name) ){
      viewModel.set('packinglist.width', size_name);
    }

    var PackingListStore = viewModel.getStore('PackingListStore');
    PackingListStore.getSorters().add('packageid');
  },
  control: {
    '#packageid': {
      specialkey: 'onSpecialkey'
    },
    '#netweight': {
      specialkey: 'onSpecialkey'
    },
    '#grossweight': {
      specialkey: 'onSpecialkey'
    },
    '#met_origin': {
      specialkey: 'onSpecialkey'
    },
    '#m3': {
      specialkey: 'onSpecialkey'
    },
    // '#width': {
    //   specialkey: 'onSpecialkey'
    // },
    '#btnThemPKL': {
      click: 'CreatePackingList'
    }
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
    var viewModel = this.getViewModel();

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
        me.down('#m3').focus();
      }
      else if (field.itemId == "m3") {
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
    var invoiceid_link = viewModel.get('packinglist.invoiceid_link');
    var invoicedid_link = viewModel.get('packinglist.invoicedid_link');
    var skuid_link = viewModel.get('packinglist.skuid_link');
    var lotnumber = viewModel.get('packinglist.lotnumber');
    var sizenumber = viewModel.get('packinglist.sizenumber');

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
      var invoice = viewModel.get('invoice');
      var invoiced = viewModel.get('invoice.invoice_d');
      var invoiceDRec = viewModel.get('invoiceDRec');
      var packinglist = invoiceDRec.get('packinglist');
      if(packinglist == null){
        packinglist = new Array();
        invoiceDRec.set('packinglist', packinglist)
      }

      var packinglistObj = new Object();
      packinglistObj.invoiceid_link = invoiceid_link;
      packinglistObj.invoicedid_link = invoicedid_link;
      packinglistObj.skuid_link = skuid_link;
      packinglistObj.lotnumber = lotnumber;
      packinglistObj.sizenumber = sizenumber;
      packinglistObj.packageid = me.down('#packageid').getValue();
      packinglistObj.met_origin = me.down('#met_origin').getValue() == '' ? 0 : parseFloat(me.down('#met_origin').getValue());
      packinglistObj.ydsorigin = Ext.Number.roundToPrecision(packinglistObj.met_origin / 0.9144, 2);
      packinglistObj.m3 = me.down('#m3').getValue() == '' ? 0 : parseFloat(me.down('#m3').getValue());
      packinglistObj.netweight = me.down('#netweight').getValue() == '' ? 0 : parseFloat(me.down('#netweight').getValue());
      packinglistObj.grossweight = me.down('#grossweight').getValue() == '' ? 0 : parseFloat(me.down('#grossweight').getValue());
      packinglistObj.width = me.down('#width').getValue() == '' ? 0 : parseFloat(me.down('#width').getValue());

      packinglist.push(packinglistObj);

      packinglistStoreData = new Array();
      for(var i = 0; i < packinglist.length; i++){
        if(packinglist[i].lotnumber == lotnumber && packinglist[i].sizenumber == sizenumber){
          packinglistStoreData.push(packinglist[i]);
        }
      } 

      me.getStore().loadData(packinglistStoreData);
      me.getStore().commitChanges();

      me.down('#packageid').setValue('');
      me.down('#met_origin').setValue('');
      me.down('#m3').setValue('');
      me.down('#netweight').setValue('');
      me.down('#grossweight').setValue('');
      // me.down('#width').setValue('');
      me.down('#packageid').focus();

      // console.log(invoice);
      // console.log(invoiced);
      // console.log(invoiceDRec);
      // console.log(packinglist);
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

    // console.log(invoice);
    // console.log(invoiceDRec);
    // console.log(data);

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
    var invoice = viewModel.get('invoice');
    var invoiceDRec = viewModel.get('invoiceDRec');

    var id = data.get('id');
    if(id == 0){
      // xoa tren grid
      store.removeAt(rowIndex);

      var packinglist = invoiceDRec.get('packinglist');
      for(var i = 0; i < packinglist.length; i++){
        if(packinglist[i].idx == data.get('idx')){
          packinglist.splice(i, 1);
          i--;
        }
      }
    }else{
      store.removeAt(rowIndex);

      var packinglist = invoiceDRec.get('packinglist');
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

    if(context.value == "" || context.value == context.originalValue || isNaN(context.value)){
        store.rejectChanges();
        return;
    }

    if(context.field == 'netweight'){
      pkl_data.netweight = parseFloat(pkl_data.netweight);
    }
    if(context.field == 'grossweight'){
      pkl_data.grossweight = parseFloat(pkl_data.grossweight);
    }
    if(context.field == 'ydsorigin'){
      pkl_data.ydsorigin = parseFloat(pkl_data.ydsorigin);
      pkl_data.met_origin = Ext.Number.roundToPrecision(pkl_data.ydsorigin * 0.9144, 2);
    }
    if(context.field == 'met_origin'){
      pkl_data.met_origin = parseFloat(pkl_data.met_origin);
      pkl_data.ydsorigin = Ext.Number.roundToPrecision(pkl_data.met_origin / 0.9144, 2);
    }
    if(context.field == 'm3'){
      pkl_data.m3 = parseFloat(pkl_data.m3);
    }
    if(context.field == 'width'){
      pkl_data.width = parseFloat(pkl_data.width);
    }

    store.commitChanges();
    this.reCalculateSkuGrid();
  },
  reCalculateSkuGrid: function(){
    var viewModel = this.getViewModel();
    var invoice = viewModel.get('invoice');
    var invoiceDRec = viewModel.get('invoiceDRec');

    // console.log(invoice);
    // console.log(invoiceDRec);

    var packinglist = invoiceDRec.get('packinglist');
    if(packinglist != null){
      var totalpackage = 0;
      var netweight = 0;
      var grossweight = 0;
      var m3 = 0;
      var met = 0;
      var yds = 0;
      
      for(var i = 0; i < packinglist.length; i++){
        totalpackage++;
        netweight+=packinglist[i].netweight;
        grossweight+=packinglist[i].grossweight;
        m3+=packinglist[i].m3;
        met+=packinglist[i].met_origin;
        yds+=packinglist[i].ydsorigin;
      }

      // invoiceDRec.set('totalpackage', totalpackage);
      invoiceDRec.set('netweight', netweight);
      invoiceDRec.set('grossweight', grossweight);
      invoiceDRec.set('m3', m3);
      invoiceDRec.set('met', met);
      invoiceDRec.set('yds', yds);
      invoiceDRec.set('totalamount', Ext.Number.roundToPrecision(met*invoiceDRec.get('unitprice'), 2));

      Ext.getCmp('InvoiceEdit_D').getStore().commitChanges();
    }
  }
})