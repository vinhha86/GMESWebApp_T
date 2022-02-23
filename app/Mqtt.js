Ext.define('GSmartApp.Mqtt', {
	extend: 'Ext.Base',

	mixins: ['Ext.mixin.Mashup'],

	requiredScripts: ['lib/mqttws31.js'],

	singleton: true,
	deviceid_link: 0,
	connect: function(host, port, clientId, topic, deviceid_link, onMessageArrived, onConnectOk,onConnectLost) {
		if (!this.client) {
			this.client = new Paho.Client(host, Number(port), clientId);  //hosted HiveMQ config

			this.topic = topic;
			this.onMsgArrivedcallback = onMessageArrived;
			this.onEventConnectOk = onConnectOk;
			this.client.onConnectionLost = onConnectLost;
			this.client.onConnectionLost = this.onConnectionLost;
			this.client.onMessageArrived = this.onMessageArrived;
			this.client.onMessageDelivered = this.onMessageDelivered;
			this.deviceid_link = deviceid_link;

			console.log(this.client);
			this.client.connect({
				onSuccess:this.onConnect,
				//reconnect: true,
				invocationContext: this,
				mqttVersion: 3
			});
		}else{
			console.log('already connected!');
		}
	},

	onConnect: function() {
	  	console.log("onConnect");

	  	var me = this.invocationContext;
	  	console.log("reqSubForCMD:" + me.topic.cmd);
	  	me.client.subscribe(me.topic.cmd, {
	    	// timeout: 10,
	    	onSuccess: me.onSubSuccess,
	    	onFailure: me.onSubFailure,
	    	invocationContext: me
	  	});

	  	if(me.topic.dta != null) {
	  		console.log("reqSubForDTA:" + me.topic.dta);
		  	me.client.subscribe(me.topic.dta, {
		    onSuccess: me.onSubSuccess,
		    onFailure: me.onSubFailure,
		    invocationContext: me
		  	});
		}

		me.onEventConnectOk();
	},
	onDisconnect:function() {
		var CMD = GSmartApp.util.State.get('CMD');
		var sendChannel = GSmartApp.util.State.get('sendChannel');
		var termid = config.getTermid();
		if (this.client) {
			
			if(CMD!=''&& CMD!=null){
				var cmd = {ct:0,cid:CMD, srcid:termid, reqdata:{}};
				var message = new Paho.Message(Ext.JSON.encode(cmd));
				message.destinationName = sendChannel;
				message.qos = 0;
				GSmartApp.Mqtt.client.send(message);
				GSmartApp.util.State.set('CMD','');
				GSmartApp.util.State.set('sendChannel','');
			}
			
			console.log('disconnect on termid:' + termid);
			this.client.disconnect();
		}
	},
	onSubSuccess: function() {
	  console.log('subscribe: onSuccess');
	  return true;
	},

	onSubFailure: function() {
	  console.log('subscribe: onFailure');
	},

	onMessageDelivered: function() {
	  console.log('onMessageDelivered');
	},

	// called when the client loses its connection
	onConnectionLost: function(responseObject) {
	  if (responseObject.errorCode !== 0) {
	   console.log("onConnectionLost:"+responseObject.errorMessage);
	  }
		var me = this.connectOptions.invocationContext;
		me.client = null;
		
		return true;
	},

	// called when a message arrives
	onMessageArrived: function(message) {
		var me = this.connectOptions.invocationContext;
		me.onMsgArrivedcallback(message.destinationName,message.payloadString, me.controller);
	}
});