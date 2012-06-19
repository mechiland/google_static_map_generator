var _prefix = "http://maps.googleapis.com/maps/api/staticmap?"

function _check_img_load(img, callback) {
  if (img.complete) {
    callback(img.src)
  } else {
    setTimeout(function(){ _check_img_load(img, callback) }, 50);
  }
}


function lazy_load_img(url, loading_func, loaded_func) {
  loading_func(url);
  var img = new Image();
  img.src = url;
  _check_img_load(img, loaded_func);
}

function draw_map() {
  params = {}
  params["center"] = $("#cfg_center").val();
  // params["zoom"] = $("#txt_zoom").val();
  params["maptype"] = $("#cfg_maptype").val();
  params["language"] = $("#cfg_language").val();
  params["size"] = $("#cfg_width").val() + "x" + $("#cfg_height").val();
	params["scale"] = $("#cfg_scale").val();
	params["zoom"] = $("#cfg_zoom").val();
  params["sensor"] = $("#sel_sensor").val();
	
  styles = []
  $.each($(".input_style"), function(i, el){
    styles.push("style=" + el.value);
  })
	markers = []
	$.each($(".input_marker"), function(i, el) {
		markers.push("markers=" + el.value);
	})
  url = _prefix + "&" + $.param(params) + "&" + styles.join("&") + markers.join("&");
  
  lazy_load_img(url, function(url) {
    $("#loading").show();
    $("#map_preview").animate({opacity: 0.5}, 200);
  }, function(url) { 
    $("#map_url").html(url);   
    $("#map_preview").attr("src", url)
    $("#loading").fadeOut();
    $("#map_preview").animate({opacity: 1}, 200);
  })
  
}
function set_default_feature() {
	rule = $("#sel_rule").val().split(' ')
	switch(rule[0]) {
		case "gamma":
		value = "1";
		break
		case "hue":
		value = "0xFF0000";
		break
		case "invert_lightness":
		value = "false";
		break
		case "lightness":
		value = "0";
		break
		case "saturation":
		value = "0";
		break
		case "visibility":
		value = "on";
		break		
	}	
	$("#txt_value").attr("value", value);
}

function serialize_style() {
  feature = $("#sel_feature").val();
  element = $("#sel_element").val();
  rule = $("#sel_rule").val().split(' ');
  value = $("#txt_value").val();
  return ["feature:" + feature, "element:"+element, rule[0] + ":"+ value].join("|")
}

function serialize_marker() {
	city = $("#mker_city").val();
	color = $("#mker_color").val();
	size = $("#mker_size").val();
	return ["color:" + color, "size:" + size, city].join("|");
}

$(function() {
  $("#btn_generate").click(draw_map);
  $("#btn_add_style").click(function(){
    $("#styles").append("<div class='style_wrap'><input type='text' class='input_style' value='" + serialize_style()+"'/><button class='del_style'>X</button></div>")
  });
	$("#btn_add_marker").click(function() {
		$("#markers").append("<div class='marker_wrap'><input type='text' class='input_marker' value='" + serialize_marker() + "'/><button class='del_marker'>X</button></div>")
	});
  $(document).on("click", ".del_style", function(el) {
    $(this).parent().remove();
  });
  $(document).on("click", ".del_marker", function(el) {
    $(this).parent().remove();
  })

})
















