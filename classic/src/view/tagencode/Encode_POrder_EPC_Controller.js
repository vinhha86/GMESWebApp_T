Ext.define('GSmartApp.view.tagencode.Encode_POrder_EPC_Controller', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.Encode_POrder_EPC_Controller',
	channel: { cmd: null, dta: null },
	do_alert: null,
	init: function () {
		var viewModel = this.getViewModel();
		var listidtype = "8,9,11,12";
		var orgStore = viewModel.getStore('OrgStore');
		orgStore.loadStore_allchildren_byorg(listidtype);

		var deviceStore = viewModel.getStore('DeviceEncodeStore');
		deviceStore.loadStore(2);

		var userStore = this.getViewModel().getStore('UserStore');
		userStore.loadStore();
	},
	control: {
		'#device': {
			change: 'onDeviceChange'
		},
		'#btnStart': {
			click: 'onStart'
		}
	},
	renderSum: function (value) {
		if (null == value) value = 0;
		return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';
	},
	onDeviceChange: function () {
		var me = this.getView();
		var txtDevice = me.down('#device');
		var deviceId = txtDevice.getValue();
		var device = txtDevice.getStore().getById(deviceId);
		if (device) {
			GSmartApp.util.State.set('device_encode', device.data);
		}
	},
	CheckValidate_Start: function () {
		var mes = "";
		var viewModel = this.getViewModel();

		if (viewModel.get('encode.deviceid_link') == 0 || viewModel.get('encode.deviceid_link') == null) {
			mes = "Bạn chưa chọn thiết bị!";
			return mes;
		}

		if (viewModel.get('encode.orgencodeid_link') == 0 || viewModel.get('encode.orgencodeid_link') == null) {
			mes = "Bạn chưa chọn đơn vị mã hóa!";
			return mes;
		}

		if (viewModel.get('encode.encode_amount') == 0) {
			mes = "Bạn chưa nhập số lượng cần mã hóa!";
			return mes;
		}

		if (viewModel.get('skucode') == 0) {
			mes = "Bạn chưa chọn mã vạch cần in!";
			return mes;
		}

		return mes;
	},
	CheckSession_UsingDevice: function () {
		var me = this;
		var viewModel = this.getViewModel();
		var encode = viewModel.get('encode');
		var params = new Object();
		params.data = encode;

		GSmartApp.Ajax.post('/api/v1/encodeporder/encode_porder_create', Ext.JSON.encode(params),
			function (success, resp, options) {
				if (success) {
					var resp = Ext.decode(resp.responseText);
					if (resp.respcode == 200) {
						if (resp.id > 0) {
							viewModel.set('encode.id', resp.id);
							me.Start(resp.id);
						}
						else {
							Ext.MessageBox.show({
								title: "Thông báo",
								msg: "Máy in đang được sử dụng trong 1 phiên khác! Vui lòng thử lại sau",
								buttons: Ext.MessageBox.YES,
								buttonText: {
									yes: 'Đóng',
								}
							});
						}
					}
					else {
						Ext.MessageBox.show({
							title: "Thông báo",
							msg: "Có lỗi trong quá trình khởi động! Vui lòng thử lại sau",
							buttons: Ext.MessageBox.YES,
							buttonText: {
								yes: 'Đóng',
							}
						});
					}
				}
			})
	},
	Start: function (stoken) {
		var me = this;
		var grid = this.getView();

		while (stoken.toString().length < 6) {
			stoken = "0" + stoken;
		}

		var viewModel = this.getViewModel();
		var session = GSmartApp.util.State.get('session');

		var host = config.getMqtthost();
		var port = config.getMqttport();
		var clientid = config.getClientid();

		var txtDevice = grid.down('#device');
		var deviceId = txtDevice.getValue();
		var device = viewModel.getStore('DeviceEncodeStore').getById(deviceId);

		var orgid_link = session.orgid_link;
		var termid = config.getTermid();
		me.channel.cmd = 'gsm5/term/' + termid + '/cmd';
		GSmartApp.Mqtt.connect(host, port, clientid, me.channel, deviceId, function (topic, message) {
			console.log(topic);
			grid.setLoading(false);
			clearTimeout(me.do_alert);
			if (topic.includes("cmd")) {
				var jsonObj = Ext.JSON.decode(message);
				console.log(jsonObj);
				if (jsonObj.ct == 1) {
					if (jsonObj.cid == 'CMD_START_PRINT') {
						me.channel.dta = 'gsm5/transaction/prt/' + jsonObj.respdata.token;
						GSmartApp.Mqtt.client.subscribe(me.channel.dta);
						console.log('register dta ch:' + me.channel.dta);

						viewModel.set('clsbtn', "blue-button");
						viewModel.set('clsbtnStart', "");
						viewModel.set('clsbtnStop', "red-button");
						viewModel.set('isStart', true);


						Ext.getCmp('Encode_POrder').setLoading('Đang mã hóa');
						var store_epc = viewModel.getStore('Encode_epc_Store');
						store_epc.removeAll();
					}
				}

				//Khi het time out tu dong goi nut Stop
				if (jsonObj.ct == 2 && jsonObj.cid == 'NTF_ON_STOP') {
					Ext.MessageBox.show({
						title: "Thông báo",
						msg: "Đã in thành công",
						buttons: Ext.MessageBox.YES,
						buttonText: {
							yes: 'Đóng',
						},
						fn: function (btn) {
							if (btn === 'yes') {
								me.onStop();
								Ext.getCmp('Encode_POrder').setLoading(false);
							}
						}
					});
				}
			} else if (topic.includes("transaction")) {
				var jsonObj = Ext.JSON.decode(message);
				console.log(jsonObj);
				var store_epc = viewModel.getStore('Encode_epc_Store');
				var obj = new Object();
				obj.epc = jsonObj.epc;
				obj.skucode = jsonObj.skucode;
				obj.tid = jsonObj.tid;
				store_epc.insert(0, obj)
			}
		}, function () {
			me.sendChannel = 'gsm5/device/' + device.data.code + '/cmd';
			me.funcid = '2;' + orgid_link;
			var color = viewModel.get('color_name');
			var size = viewModel.get('size_name');
			var qty = viewModel.get('encode.encode_amount');
			var sku = viewModel.get('skucode');
			var year = viewModel.get('porderyear');
			var userid_link = session.id;
			var material = "material";
			var cmd = {
				ct: 0, cid: "CMD_START_PRINT", srcid: termid, reqdata: {
					timeout: '12000',
					token: stoken,
					funcid: me.funcid,
					color: color,
					size: size,
					material: material,
					year: year,
					qty: qty,
					sku: sku,
					userid_link: userid_link
				}
			};
			console.log("Device channel:" + me.sendChannel);
			var message = new Paho.Message(Ext.JSON.encode(cmd));
			message.destinationName = me.sendChannel;
			message.qos = 0;
			GSmartApp.Mqtt.client.send(message);
			grid.setLoading("Đang kết nối tới máy in");
			me.do_alert  = setTimeout(function(){
				me.show_alert();
			}, 12000);

		}, function () {
			console.log('Loi connect');
			me.onStop();
		});
	},
	show_alert: function(){
		var grid = this.getView();
		var me = this;
		grid.setLoading(false);
		me.onStop();
		Ext.MessageBox.show({
			title: "Thông báo",
			msg: "Không kết nối được đến máy in",
			buttons: Ext.MessageBox.YES,
			buttonText: {
				yes: 'Đóng'
			}
		});
	},
	onStart: function () {
		var me = this;
		var mes = me.CheckValidate_Start();

		if (mes != "") {
			Ext.MessageBox.show({
				title: "Thông báo",
				msg: mes,
				buttons: Ext.MessageBox.YES,
				buttonText: {
					yes: 'Đóng',
				}
			});
		}
		else {
			me.CheckSession_UsingDevice();
		}
	},
	onStop: function () {
		var me = this;
        var viewModel = me.getViewModel();
        var params = new Object();
        params.encodeid_link = viewModel.get('encode.id');

        viewModel.set('clsbtnStart', "blue-button");
        viewModel.set('clsbtnStop', "");
        viewModel.set('isStart', false);
        GSmartApp.Mqtt.onDisconnect();

        GSmartApp.Ajax.post('/api/v1/encodeporder/encode_porder_update_epc', Ext.JSON.encode(params),
            function (success, resp, options) {
                if (success) {
                    var resp = Ext.decode(resp.responseText);
                    if (resp.respcode == 200) {
                        me.channel.dta = null;
                        var store_sku = viewModel.getStore('Porder_SKU_Store');
                        // var store_epc = viewModel.getStore('Encode_epc_Store');
						// store_epc.setData(resp.data.listepc);
						var rec = store_sku.findRecord('skucode', viewModel.get('skucode'));
						rec.set('pquantity_encode', rec.get('pquantity_encode') + resp.data.amount_encoded);

						store_sku.commitChanges();
						Ext.getCmp('Encode_POrder').setLoading(false);

						if(viewModel.get('isEdit')){
							this.redirectTo("porder_encode/" + resp.data.id + "/edit");
						}
					}
					else {
						Ext.MessageBox.show({
							title: "Thông báo",
							msg: "Có lỗi trong quá trình kết thúc phiên! Vui lòng thử lại sau",
							buttons: Ext.MessageBox.YES,
							buttonText: {
								yes: 'Đóng',
							}
						});
					}
				}
			})


	}
});
