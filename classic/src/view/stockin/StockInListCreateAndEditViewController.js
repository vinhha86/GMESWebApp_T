Ext.define('GSmartApp.view.stockin.StockInListCreateAndEditViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.StockInListCreateAndEditViewController',
    channel: {cmd:null, dta:null},
    sendChannel: null,
	packinglist: new Array(),
	stoken: null,
	skus:[],
	funcid:'2',
    init: function() {		
		var devicestore = this.getViewModel().getStore('DeviceInvStore');
		devicestore.loadStore(1);
		var productstore =  this.getViewModel().getStore('SkuStore');
		productstore.loadSkuType(1);
		
    },
	listen: {
        controller: {
            '*': {
                loaddata: 'onLoadData',
				urlBack:'onUrlBack'
            }
        }
	},
	control:{
		'#btnThuGon':{
			click: 'onHidden'
		},
		'#btnMoRong':{
			click: 'onHidden'
		},
		'#btnStart':{
			click: 'onStart'
		},
		'#btnStop':{
			click: 'onStop'
		},
		'#btnLuu':{
			click: 'onSave'
		},
		'#btnQuayLai':{
			click: 'onQuayLai'
		}
	},
	onQuayLai: function(){
		this.redirectTo('stockin_p_main');
	},
	onLoadData:function(id,type){
		var me=this;
		if(type.getId()=='lsnhapkhomoi'||type.getId()=='lsnhaptunhacat'||type.getId()=='lsnhapdieuchuyen'
		||type.getId()=='lsnhaptugiacong'||type.getId()=='lsnhapcapbu'||type.getId()=='lsnhapxavai'){
			
			// Ext.getStore('OrgStore').GetOrgDest('lsnhapdieuchuyen');
			var stockincode = this.lookupReference('stockincode');
			stockincode.setReadOnly(true);
			var view =this.getView();
			var viewModel = view.getViewModel();
			viewModel.set('urlback',type);
			viewModel.set('stockintypeid_link',type.get('type'));
			viewModel.set('isEdit',false);
			viewModel.set('isStart',false);
			viewModel.set('clsbtnStart',"blue-button");
			viewModel.set('clsbtnSkuError',"");
			this.onQrCode(id);
			this.getById(id);
			
			if(type.getId()=='lsnhapkhomoi'){
				viewModel.set('isNhapmoi',true);
			}else{
				viewModel.set('isNhapmoi',false);
			}
			
			//set device
			var device = GSmartApp.util.State.get('device_inv');
			if(!device){
				var store = me.lookupReference('device').getStore();
				var data =store.getAt(0)
				if(data){
					GSmartApp.util.State.set('device_inv', data.data);
					me.lookupReference('device').setValue(data.data.id);
				}
			}else{
				me.lookupReference('device').setValue(device.id);
			}
			//set user
			var session = GSmartApp.util.State.get('session');
			var user;
			if(session){
				user =session.user;
			}
		}
	},
	onUrlBack:function(type){
		var me =this;
		
		if(type.getId()=='lsnhapkhomoi'||type.getId()=='lsnhaptunhacat'||type.getId()=='lsnhapdieuchuyen'
		||type.getId()=='lsnhaptugiacong'||type.getId()=='lsnhapcapbu'||type.getId()=='lsnhapxavai'){
			// Ext.getStore('OrgStore').GetOrgDest('lsnhapdieuchuyen');
			var view =this.getView();
			var viewModel = view.getViewModel();
			var stockincode = this.lookupReference('stockincode');
			// stockincode.setReadOnly(false);
			viewModel.set('urlback',type);
			viewModel.set('stockintypeid_link',type.data.type);
			viewModel.set('isEdit',true);
			viewModel.set('isStart',false);
			viewModel.set('clsbtnStart',"blue-button");
			viewModel.set('clsbtnSkuError',"");
			var formStockin = this.lookupReference('formStockin');
			var gridStockin = viewModel.getStore('StockinDetailStore');
			formStockin.reset(true);
			gridStockin.removeAll();
			
			try{
				view.qrcode._el.getElementsByTagName('img')[0].src="";
			}catch(e){}
			
			if(type.getId()=='lsnhapkhomoi'){
				viewModel.set('isNhapmoi',true);
			}else{
				viewModel.set('isNhapmoi',false);
			}
			viewModel.set('isNhapmoi',false);
			var dataForm = new Object();
			//set device
			var device = GSmartApp.util.State.get('device_inv');
			if(device != null){
				// var store = me.lookupReference('device').getStore();
				// if(store.data.length > 0){
				// 	var data =store.getAt(0).data
				// 	GSmartApp.util.State.set('device_inv', data);
				// }
				// console.log(device);
				// //me.lookupReference('device').setValue(data.id);
				// dataForm.deviceid = device.id;
			}else{
				//me.lookupReference('device').setValue(device.id);
				// dataForm.deviceid = device.id;
			}
			dataForm.stockindate = new Date();
			formStockin.getForm().setValues(dataForm)
			
		}
	},
	onBlack:function(){
		var view =this.getView();
		var viewModel = view.getViewModel();
		var entry = viewModel.get('urlback');
		this.redirectTo(entry.get('id'));
	},
	onDeviceChange:function( combo, newValue, oldValue, eOpts){
		var me=this;
		var txtDevice = me.lookupReference('device');
		var deviceId =txtDevice.getValue();
		var device = txtDevice.getStore().getById(deviceId);
		if(device){
			GSmartApp.util.State.set('device_inv', device.data);
		}
		
	},
	onMenuChildTap: function(menu, location) {
        var record = location.record;
        if (record) {
            this.redirectTo(record.getId());
        }
    },
	sumTongString: function (grid, context) {
        return "Tổng";
    },
	renderSum: function (value) {
        return this.renderSign(value, '0.00');
    },
	onHidden:function(){
		var view =this.getView();
		var viewModel = view.getViewModel();
		var formMaster = this.lookupReference('formStockin');
		var isHidden = formMaster.getHeight() > 0 ? false : true;
		viewModel.set('IsformMaster',!isHidden);
		
		formMaster.setHidden(!isHidden);
	},
	onStart:function(){
		var me = this;
		var viewModel = this.getViewModel();
		var store = viewModel.getStore('StockinDetailStore');

		this.skus = new Array();
		
		var host 		= config.getMqtthost();
		var port 		= config.getMqttport();
        var clientid	= config.getClientid();
		var txtDevice 	= me.lookupReference('device');
		var deviceId 	= viewModel.get('Master').deviceid;
		var device 		= viewModel.getStore('DeviceInvStore').getById(deviceId);

		if(device==null || device.length==0){
			Ext.Msg.show({ 
			  title: GSmartApp.Locales.title_chonthietbi[GSmartApp.Locales.currentLocale],
			  msg: null, 
			  buttons: [{ 
				itemId: 'ok',  
				text: GSmartApp.Locales.btn_dong[GSmartApp.Locales.currentLocale],   
				ui: 'action' 
			  }]
			}) ;
		}
		var orgid_link = GSmartApp.util.State.get('orgid_link');
		var termid 		= config.getTermid();
		/* Generate token */
		me.stoken = Ext.Number.randomInt(100000, 999999);

		me.channel.cmd = 'gsm5/term/'+termid+'/cmd';
		GSmartApp.Mqtt.connect(host, port, clientid, me.channel, function(topic, message) {
			console.log(topic);
			if(topic.includes("cmd")) {
				var jsonObj = Ext.JSON.decode(message);		
				console.log(jsonObj);		
				if(jsonObj.ct==1) {
					if(jsonObj.cid == 'CMD_START_INV') {
						me.channel.dta = 'gsm5/transaction/inv/'+jsonObj.respdata.token;
						GSmartApp.Mqtt.client.subscribe(me.channel.dta);
						console.log('register dta ch:'+me.channel.dta);
						var viewModel = me.getViewModel();
						viewModel.set('clsbtn',"blue-button");
						viewModel.set('clsbtnStart',"");
						viewModel.set('clsbtnStop',"red-button");
						viewModel.set('isStart',true);
						
						GSmartApp.util.State.set('CMD','CMD_STOP_INV');
						GSmartApp.util.State.set('sendChannel',me.sendChannel);
						store.removeAll();
					}
				}
			} else if(topic.includes("transaction")) {
				var jsonObj = Ext.JSON.decode(message);
				console.log(jsonObj);
				for(var x in jsonObj){
					
					var record = store.findRecord('skucode',jsonObj[x].skucode);
					var pkl = new Object();
					pkl.epc = jsonObj[x].epc;
					pkl.skuid_link = jsonObj[x].skuid_link;
					pkl.skucode = jsonObj[x].skucode;
					

					if(!record){
						var newrecord = new Object();
						newrecord.totalpackage =1;
						newrecord.skucode = jsonObj[x].skucode;
						newrecord.packinglist =[];
						
						newrecord.packinglist.push(pkl);

						store.insert(0, newrecord);
						record = newrecord;
					}
					else{
						var checkepc = false;
						for(var i in record.get('packinglist')){
							var data = record.get('packinglist')[i];
							if(data.epc == jsonObj[x].epc){
								checkepc = true;
								break;
							}
						}
						if(!checkepc){
							record.set('totalpackage', record.get('totalpackage') + 1);
							var packinglist = record.get('packinglist');
							packinglist.push(pkl);
							record.set('packinglist', packinglist);
						}
						
					}
				}
			}
		}, function() {
			me.sendChannel = 'gsm5/device/'+device.data.code+'/cmd';
			me.funcid = '2;' + orgid_link;
	   		var cmd = {ct:0,cid:"CMD_START_INV", srcid:termid, reqdata:{timeout:120000,token:me.stoken,funcid:me.funcid}};
	   		console.log("Device channel:"+me.sendChannel);
	   		var message = new Paho.Message(Ext.JSON.encode(cmd));
			message.destinationName = me.sendChannel;
			message.qos = 0;
	   		GSmartApp.Mqtt.client.send(message);
			
		},function(){
			console.log('Loi connect');
			var viewModel = me.getViewModel();
			viewModel.set('clsbtn',"red-button");
			viewModel.set('clsbtnStart',"blue-button");
			viewModel.set('clsbtnStop',"");
			viewModel.set('isStart',false);
		});
		
	},
	onStop:function(){
		var me = this;
		var viewModel = me.getViewModel();
		viewModel.set('clsbtn',"red-button");
		viewModel.set('clsbtnStart',"blue-button");
		viewModel.set('clsbtnStop',"");
		viewModel.set('isStart',false);
		var termid 		= GSmartApp.Ajax.getTermid();
		if (GSmartApp.Mqtt.client) {
	   		var cmd = {ct:0,cid:"CMD_STOP_INV", srcid:termid, reqdata:{token:me.stoken,funcid:me.funcid}};
	   		console.log("Device channel:"+me.sendChannel);
	   		var message = new Paho.Message(Ext.JSON.encode(cmd));
			message.destinationName = me.sendChannel;
			message.qos = 0;
	   		GSmartApp.Mqtt.client.send(message);
   		}
   		me.channel.dta = null;
	   	GSmartApp.Mqtt.onDisconnect();
	},
	
	onSave: function(){
		var me = this;
		var viewModel = this.getViewModel();
		var store = viewModel.getStore('StockinDetailStore');
		var listdata = store.getNewRecords();
		var params = new Object();
		var stockin = new Object();
		stockin = viewModel.get('Master');

		console.log(viewModel.get('Master'));


		var list_stockind = [];
		var list_Stockin = []
		for(var i in listdata){
			//console.log(listdata[i].data);
			delete listdata[i].data.idx;
			delete listdata[i].data.skuname;
			delete listdata[i].data.colorname;
			delete listdata[i].data.unitname;
			delete listdata[i].data.totalyds;
			delete listdata[i].data.ydsorigin;
			delete listdata[i].data.totalpackagecheck;
			delete listdata[i].data.tid;
			delete listdata[i].data.rssi;
			delete listdata[i].data.skuid_link;
			delete listdata[i].data.colorid_link;
			delete listdata[i].data.unitid_link;
			delete listdata[i].data.foc;
			delete listdata[i].data.yds;
		    delete listdata[i].data.id;


			list_stockind.push(listdata[i].data)
		}
	//	console.log(list_stockind);
		stockin.stockind = list_stockind;
		stockin.stockintypeid_link = 4;
		
		list_Stockin.push(stockin);
		params.data = list_Stockin;

		 console.log(params);

		GSmartApp.Ajax.post('/api/v1/stockin/stockin_create',Ext.JSON.encode(params),
		function(success,response,options ) {
			me.getView().setLoading(false);
		})
	}

});
