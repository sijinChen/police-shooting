var map;
// Function to draw your map
var drawMap = function() {
	// Create map and set view
	map = L.map('container').setView([36.6165365,-95.67138], 4);

	// Create an tile layer variable using the appropriate url
	// Add the layer to your map
	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    	attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);

	// Execute your function to get data
  	getData();
}

// Function for getting data
var getData = function() {
	// Execute an AJAX request to get the data in data/response.json
	$.ajax({
		url:'data/response.json',
		type:'get',
		// When your request is successful, call your customBuild function
		success:function(data) {customBuild(data)},
		dataType:'json'
	})
}

// Do something creative with the data here!  
var customBuild = function(data) {
	var all = [];
	var none = [];

	var under_18 = [];
	var over_18 = [];
	data.map(function(d) {
		if (d["Victim's Gender"] == 'Male') {
			var marker = new L.circle([d["lat"], d["lng"]], 200, {color: 'black', opacity: .3});
			var text = "";
			text += '<b>Data:</b> ' + d.Summary;
			marker.bindPopup(text);

			all.push(marker);
		} else {
			var marker = new L.circle([d["lat"], d["lng"]], 200, {color: 'red', opacity: .3});
			var text = "";
			text += '<b>Data:</b> ' + d.Summary;
			marker.bindPopup(text);

			all.push(marker);
		}

		if (d["Victim's Age"] <= 18) {
			var marker = new L.circle([d["lat"], d["lng"]], 200, {color: 'yellow', opacity: .3});
			var text = "";
			text += '<b>Data:</b> ' + d.Summary;
			marker.bindPopup(text);

			under_18.push(marker);
		} else {
			var marker = new L.circle([d["lat"], d["lng"]], 200, {color: 'green', opacity: .3});
			var text = "";
			text += '<b>Data:</b> ' + d.Summary;
			marker.bindPopup(text);

			over_18.push(marker);
		}
		dataType:"json"
	});

	var baseMaps = {
		"All": L.layerGroup(all),
		"None": L.layerGroup(none)
	};

	var overlayMaps = {
		"Under 18": L.layerGroup(under_18),
		"Over 18": L.layerGroup(over_18)
	};
	L.control.layers(baseMaps, overlayMaps).addTo(map);
}


