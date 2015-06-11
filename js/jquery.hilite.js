/*
 * jQuery.hiLite
 * @author Stefan Gruber
 * 
 * Highlightet einen String in einem Text und ermöglicht die Ergebnisse durchzuschalten
 * Funktioniert auch zeitgleich in seperaten Containern (Markierung des aktuellen Ergebnisses bleiben erhalten)
 * 
 * ToDos:
 * Vom Ende zum Anfang springen mit options.loop abfangen
 * Über fast Link Ergebnisse überspringen
 * Optional immer zur scrollTop des Ergebnisses springen
 */
$.fn.hilite = function(options){
    options = $.extend({
        term: 'lorem',
        source: $(this).html(),
        mark: '<span class="mark">$1</span>',
        pattern: '/(\s+)/,"(<[^>]+>)*$1(<[^>]+>)*"',
        regMode: 'gi',
        color: '',
        reload: '#reload',
        cross: '#cross',
        next: '#next',
        prev: '#prev',
        fast: '#reload',
        loop: true,
        multiple: true,
        multiples: '.multi'
    }, options);
    
    var expression;

    
    options.term = options.term.replace(options.pattern);
    var expression = new RegExp('(' + options.term + ')', 'gi');

    options.source = options.source.replace(expression, options.mark);
//    options.source = options.source.replace(/(<mark>[^<>]*)((<[^>]+>)+)([^<>]*<\/mark>)/,"$1</mark>$2<mark>$4");

    $(this).html(options.source);

    $(options.reload).click(function() {
    	event.preventDefault();
    	firstTreffer();
    });
    
    $(options.cross).click(function() {
    	event.preventDefault();
    	unsetTreffer();
    });
    
    $(options.prev).click(function() {
    	event.preventDefault();
    	prevTreffer();
    });
    
    $(options.next).click(function() {
    	event.preventDefault();
    	nextTreffer();
    });
    
    $(options.fast).click(function() {
    	event.preventDefault();
    	nextTreffer();
    });
    
    if (options.multiple === true) {
    	$(options.multiples).click(function() {
    		var container = $(this);
    		entryMultiContainer(container);
    	});
    }
    
    
    
    
    function nextTreffer() {
    	var next = $('.activeContainer span.mark.now').next();
    	if (next.length == 0) {
    		console.log('last in this container');
    		firstTreffer();
    	} else {
    		$('.activeContainer span.mark.now').removeClass('now').next().addClass('now');
    	}
    	
    }
    
    function prevTreffer() {
    	var prev = $('.activeContainer span.mark.now').prev();
    	if (prev.length == 0) {
    		lastTreffer();
    	} else {
    		$('.activeContainer span.mark.now').removeClass('now').prev().addClass('now');
    	}
    }
    
    function firstTreffer() {
    	$('.activeContainer span.mark').removeClass('now');
    	$('.activeContainer span.mark').first().addClass('now');
    }
    
    function lastTreffer() {
    	$('.activeContainer span.mark').removeClass('now');
    	$('.activeContainer span.mark').last().addClass('now');	
    }
    
    function unsetTreffer() {
    	$('span.mark').removeClass('now');
    	$('span.mark').css('background', 'inherit');
    }
    
    function entryMultiContainer(container) {
    	
    	if (container.hasClass('activeContainer')) {
    		console.log('container schon aktiv');
    	} else {
    		setActiveContainer(container);
//        	$('.activeContainer').find('span.mark').removeClass('now');

    	}
    	
    	var somoneThere = $('.activeContainer').find('.mark.now')
    	
    	if (somoneThere.length == 0) {
    		console.log('nothing here, set first');
        	$('.activeContainer').find('span.mark').first().addClass('now');
    	} else {
    		console.log('already');
    	}
    
    	
    }
    
    function setActiveContainer(container) {
    	$('*').removeClass('activeContainer');
    	$(container).addClass('activeContainer');
    }

}