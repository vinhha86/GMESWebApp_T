Ext.define('GSmartApp.view.tagencode.Encode_Edit_D_Controller', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.Encode_Edit_D_Controller',
	channelEncode: { cmd: null, dta: null },
	init: function () {
		var viewModel = this.getViewModel();
		var listidtype = "8,9,11,12";
		var orgStore = viewModel.getStore('OrgStore');
		// orgStore.loadStore_allchildren_byorg(listidtype);
		orgStore.loadStore_byRoot(listidtype);

		var deviceStore = viewModel.getStore('DeviceEncodeStore');
		deviceStore.loadStore(1);

		var userStore = this.getViewModel().getStore('UserStore');
		userStore.loadStore();
	},
	listen: {
		controller: {
			'*': {
				encodePush: 'onEncodePush',
			}
		}
	},
	onDeviceChange: function () {
		var me = this;
		var txtDevice = me.lookupReference('device');
		var deviceId = txtDevice.getValue();
		var device = txtDevice.getStore().getById(deviceId);
		if (device) {
			GSmartApp.util.State.set('device_encode', device.data);
		}
	},
	onStart: function () {
		var me = this;
		var view = me.getView();
		var viewModel = this.getViewModel();
		var session = GSmartApp.util.State.get('session');
		if (session) {
			user = session.user;
		}
		var store = viewModel.getStore('Encode_d_Store');

		var params = new Object();
		var host = config.getMqtthost();
		var port = config.getMqttport();
		var txtDevice = me.lookupReference('device');
		var deviceId = viewModel.get('warehouse_encode.deviceid_link');
		var device = txtDevice.lastSelection[0].data;
		console.log(device);
		if (deviceId == null || deviceId == 0) {
			Ext.Msg.show({
				title: GSmartApp.Locales.title_chonthietbi[GSmartApp.Locales.currentLocale],
				msg: null,
				buttons: [{
					itemId: 'ok',
					text: GSmartApp.Locales.btn_dong[GSmartApp.Locales.currentLocale],
					ui: 'action'
				}]
			});
		}
		var clientid = config.getClientid();//'test#123';//GSmartApp.Ajax.getClientid();

		var termid = config.getTermid();//'11222';//GSmartApp.Ajax.getTermid();
		console.log('ClientId:' + clientid + ' Termid:' + termid);
		var orgid_link = session.orgid_link;//GSmartApp.util.State.get('orgid_link');
		/* Generate token */
		me.stoken = Ext.Number.randomInt(100000, 999999);
		me.channelEncode.cmd = 'gsm5/term/' + termid + '/cmd';
		GSmartApp.Mqtt.connect(host, port, clientid, me.channelEncode, deviceId, function (topic, message) {
			console.log('data-msg:' + message);
			if (topic.includes("cmd")) {
				var jsonObj = Ext.JSON.decode(message);
				console.log(jsonObj);
				if (jsonObj.ct == 1) {
					if (jsonObj.cid == 'CMD_START_ENCODE') {
						me.channelEncode.dta = 'gsm5/transaction/enc/' + jsonObj.respdata.token;
						console.log('channelEncode.dta: ' + me.channelEncode.dta);
						GSmartApp.Mqtt.client.subscribe(me.channelEncode.dta);
						viewModel.set('clsbtnStart', "");
						viewModel.set('clsbtnStop', "red-button");
						viewModel.set('isStart', true);
					}
				}
			} else if (topic.includes("transaction")) {
				// console.log('trans-msg-data:' + message);
				var jsonObj = Ext.JSON.decode(message);
				console.log(jsonObj)
				if (jsonObj.skuname != 'Unknown') {
					me.onEncodePush(jsonObj);
				}
				else {
					Ext.Msg.alert(GSmartApp.Locales.title_thongbao[GSmartApp.Locales.currentLocale], 'SKU:' + jsonObj.skucode + ' không tồn tại!');
				}
			}

		},
		function () {
				if (null!=device){
					var sendChannel = 'gsm5/device/' + device.code + '/cmd';
					console.log('send cmd: ' + sendChannel);
						var cmd = { ct: 0, cid: "CMD_START_ENCODE", srcid: termid, reqdata: { timeout: 20000, token: "", funcid: me.funcid, orgid_link: orgid_link } };
						var message = new Paho.Message(Ext.JSON.encode(cmd));
						message.destinationName = sendChannel;
						message.qos = 0;
						GSmartApp.Mqtt.client.send(message);
				} else {
					Ext.Msg.alert('Mã hóa chíp','Bạn chưa chọn thiết bị RFID');
				}
			}, 
		function () {
				viewModel.set('clsbtnStart', "blue-button");
				viewModel.set('clsbtnStop', "");
				viewModel.set('isStart', false);
			});
	},
	onEncodePush: function (data) {
		var me = this;
		var viewModel = me.getViewModel();
		var warehouse_encode = viewModel.get('warehouse_encode');

		var txtDevice = this.lookupReference('device');
		var deviceId = txtDevice.getValue();
		var record = new Object();
		record.epc = data.epc;
		record.oldepc = data.oldepc
		record.sku = data.skucode;
		record.tid = data.tid;
		record.deviceid_link = deviceId;
		var params = new Object();

		params.msgtype = "STOCKIN_CREATE";
		params.message = "Tạo hóa đơn";
		params.data = record;
		params.warehouse_encodeid_link = warehouse_encode.id;
		console.log(params);
		GSmartApp.Ajax.post('/api/v1/encode/encode_push', Ext.JSON.encode(params),
			function (success, response, options) {
				if (success) {
					var response = Ext.decode(response.responseText);

					var store = viewModel.getStore('Encode_store');
					store.loadByID(response.warehouse_encodeid_link);
					store.load({
						scope: this,
						callback: function(records, operation, success) {
							if(!success){
								 // this.fireEvent('logout');
							} 
							else {
								if (records.length > 0){
									viewModel.set('warehouse_encode', records[0].data);
								}
							}
						}
					}); 
				}
			})
	},
	onStop: function () {
		var me = this;
		var viewModel = me.getViewModel();
		viewModel.set('clsbtnStart', "blue-button");
		viewModel.set('clsbtnStop', "");
		viewModel.set('isStart', false);
		GSmartApp.Mqtt.onDisconnect();
		this.channelEncode.dta = null;
	}
});
