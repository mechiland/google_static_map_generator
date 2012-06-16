var _prefix = "http://maps.googleapis.com/maps/api/staticmap?sensor=true&size=600x300"

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

$(function() {
  $("#btn_generate").click(function(){
    params = {}
    params["center"] = $("#cfg_center").val();
    params["maptype"] = $("#cfg_maptype").val();
    
    url = _prefix + "&" + $.param(params);
    
    lazy_load_img(url, function(url) {
      $("#loading").show();
      $("#map_preview").animate({opacity: 0.5}, 100);
    }, function(url) {      
      $("#map_preview").attr("src", url)
      $("#loading").fadeOut();
      $("#map_preview").animate({opacity: 1}, 100);
    })
    
  })
})