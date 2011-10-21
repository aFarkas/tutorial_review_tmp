$(function(){

	$('#area-productinfo').hide();

	$('video,audio').mediaelementplayer({
		success: function (mediaElement, domObject) { 
			mediaElement.addEventListener('timeupdate', function(e) {
			
				showproduct = "";
				
				$(mytablets).each(function(i){
					if (this.timecode <= mediaElement.currentTime) {
						showproduct = this;
					}
				});
				
				if (showproduct != "" && $('#area-productinfo').hasClass(showproduct.id) == false) {
					$('#area-productinfo').removeClass().addClass(showproduct.id).show();
					$('#product-name').text(showproduct.name + " " + showproduct.version);
					$('#product-image').attr('src', 'daten/img/'+showproduct.image);
					$('#product-url a').attr('href', showproduct.url);
					$('#product-price').text(showproduct.price);
				}
			
			}, false);
		}
	});
	
	$.ajax({
		url:'daten/products.json',
		dataType:'json',
		success: function(jsondaten){
			mytablets = jsondaten.products.tablet;
		}
	});
	
		
});