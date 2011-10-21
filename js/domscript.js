jQuery(function($){
	
	$.createInteractiveProductVideo = function (mediaElement, domObject) {
		var mytablets;
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
					
					if (showproduct != "" && productInfo.hasClass(showproduct.id) == false) {
						productInfo.removeClass().addClass(showproduct.id).show();
						$('dd.product-name', productInfo).text(showproduct.name + " " + showproduct.version);
						// 'daten/img/' ist im vom "CMS" produzierten JSON besser aufgehoben ein Prototyp kennt nie die Pfade
						$('dd.product-image', productInfo).attr('src', 'daten/img/'+showproduct.image);
						$('dd.product-url a', productInfo).attr('href', showproduct.url);
						$('dd.product-price', productInfo).text(showproduct.price);
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