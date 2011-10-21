jQuery(function($){
	
	$.createInteractiveProductVideo = function (mediaElement, domObject) {
		var mytablets;
		var lastProduct;
		var path = $(domObject).attr('data-productsjson');
		var productInfo = $( $(domObject).attr('data-for') );
		
		if(path && productInfo[0]){
			$.ajax({
				url: path,
				dataType:'json',
				success: function(jsondaten){
					mytablets = jsondaten.products.tablet;
				}
			});
			
			mediaElement.addEventListener('timeupdate', function(e) {
				 
				var showproduct = "";
				
				if(mytablets){
					
					$.each(mytablets, function(i){
						if (this.timecode <= mediaElement.currentTime) {
							showproduct = this;
						}
					});
					
					if (showproduct) {
						if(lastProduct !== showproduct){
							if(!lastProduct){
								productInfo.stop(true, true).fadeIn();
							}
							lastProduct = showproduct;
							$('dd.product-name', productInfo).text(showproduct.name + " " + showproduct.version);
							// 'daten/img/' ist im vom "CMS" produzierten JSON besser aufgehoben ein Prototyp kennt nie die Pfade
							$('dd.product-image', productInfo).attr('src', 'daten/img/'+showproduct.image);
							$('dd.product-url a', productInfo).attr('href', showproduct.url);
							$('dd.product-price', productInfo).text(showproduct.price);
						}
					} else if(lastProduct){
						productInfo.stop(true, true).fadeOut();
						lastProduct = false;
					}
					
				}
			
			}, false);
		}
	};
	
	$('video,audio').mediaelementplayer({
		success: function (mediaElement, domObject) {
			$.createInteractiveProductVideo(mediaElement, domObject);
		}
	});
		
});