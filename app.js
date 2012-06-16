var _prefix = "http://maps.googleapis.com/maps/api/staticmap?sensor=true"

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
  params["maptype"] = $("#cfg_maptype").val();
  params["language"] = $("#cfg_language").val();
  params["markers"] = $("#cfg_markers").val();
  params["size"] = $("#cfg_size").val();
  styles = []
  $.each($(".input_style"), function(i, el){
    styles.push("style=" + el.value)
  })
  
  url = _prefix + "&" + $.param(params) + "&" + styles.join("&");
  
  lazy_load_img(url, function(url) {
    $("#loading").show();
    $("#map_preview").animate({opacity: 0.5}, 200);
  }, function(url) {      
    $("#map_preview").attr("src", url)
    $("#loading").fadeOut();
    $("#map_preview").animate({opacity: 1}, 200);
  })
  
}

function serialize_style() {
  feature = $("#sel_feature").val();
  element = $("#sel_element").val();
  rule = $("#sel_rule").val();
  value = $("#txt_value").val();
  return ["feature:" + feature, "element:"+element, rule + ":"+ value].join("|")
}

$(function() {
  $("#btn_generate").click(draw_map)
  $("#btn_add_style").click(function(){
    $("#styles").append("<div class='style_wrap'><input type='text' class='input_style' value='"+serialize_style()+"'/><button class='del_style'>Del</button></div>")
  })
  $(document).on("click", ".del_style", function(el) {
    $(this).parent().remove();
  })
})
















