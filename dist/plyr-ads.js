!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define("PlyrAds",t):e.PlyrAds=t()}(this,function(){"use strict";var e={adTagUrl:"",skipButton:{enabled:!0,text:"Skip ad",delay:10}},t=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e},n={getStartEvents:function(){var e=["click"];return(navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)||navigator.userAgent.match(/Android/i))&&(e=["touchstart","touchend","touchmove"]),e},mergeConfig:function(e,n){return t({},e,n)}},i=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),a=function(){function t(i,a){if(function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),this.config=n.mergeConfig(e,a),this.config.adTagUrl||!this.config.debug){if(window.google)this.plyr=i,this.startEvents=n.getStartEvents(),this.adDisplayContainer,this.adDisplayElement,this.adsManager,this.adsLoader,this.videoElement=document.createElement("video"),this._setupAdDisplayContainer(),this._setupIMA(),this._setupListeners();else if(this.config.debug)throw new Error("The Google IMA3 SDK is not loaded.")}else if(this.config.debug)throw new Error("No adTagUrl provided.")}return i(t,[{key:"_setupIMA",value:function(){var e=this,t=this.plyr.elements.container;this.adsLoader=new google.ima.AdsLoader(this.adDisplayContainer,this.videoElement),this.adsLoader.getSettings().setAutoPlayAdBreaks(!1),this.adsLoader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,function(t){return e._onAdsManagerLoaded(t)},!1),this.adsLoader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR,function(t){return e._onAdError(t)},!1);var n=new google.ima.AdsRequest;n.adTagUrl=this.config.adTagUrl,n.linearAdSlotWidth=t.offsetWidth,n.linearAdSlotHeight=t.offsetHeight,n.nonLinearAdSlotWidth=t.offsetWidth,n.nonLinearAdSlotHeight=t.offsetHeight,this.adsLoader.requestAds(n)}},{key:"_onAdsManagerLoaded",value:function(e){var t=this,n=this.videoElement,i=new google.ima.AdsRenderingSettings;i.restoreCustomPlaybackStateOnAdBreakComplete=!0,this.adsManager=e.getAdsManager(n,i),this.adsManager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR,function(e){return t._onAdError(e)}),this.adsManager.addEventListener(google.ima.AdEvent.Type.ALL_ADS_COMPLETED,function(e){return t._onAdEvent(e)}),this.adsManager.addEventListener(google.ima.AdEvent.Type.AD_BREAK_READY,function(e){t.plyr.pause(),t.adsManager.start()}),this.adsManager.addEventListener(google.ima.AdEvent.Type.LOADED,function(e){return t._onAdEvent(e)}),this.adsManager.addEventListener(google.ima.AdEvent.Type.STARTED,function(e){return t._onAdEvent(e)}),this.adsManager.addEventListener(google.ima.AdEvent.Type.COMPLETE,function(e){return t._onAdEvent(e)})}},{key:"_onAdEvent",value:function(e){var t=this.plyr.elements.container,n=e.getAd();switch(e.type){case google.ima.AdEvent.Type.LOADED:console.log("LOADED"),this.adDisplayElement.style.display="block",n.isLinear()||(n.width=t.offsetWidth,n.height=t.offsetHeight);break;case google.ima.AdEvent.Type.STARTED:console.log("STARTED");break;case google.ima.AdEvent.Type.COMPLETE:this.adDisplayElement.style.display="none",this.plyr.currentTime<this.plyr.duration&&this.plyr.play();break;case google.ima.AdEvent.Type.ALL_ADS_COMPLETED:this._emitEvent("ALL_ADS_COMPLETED"),this.plyr.stop()}}},{key:"_onAdError",value:function(e){if(this.adDisplayElement.remove(),this.adsManager&&this.adsManager.destroy(),this.config.debug)throw new Error(e)}},{key:"_onContentPauseRequested",value:function(){this.plyr.pause()}},{key:"_onContentResumeRequested",value:function(){this.plyr.play()}},{key:"_setupAdDisplayContainer",value:function(){var e=this.plyr.elements.container;this.adDisplayContainer=new google.ima.AdDisplayContainer(e),this.adDisplayElement=e.firstChild,this.adDisplayElement.removeAttribute("style"),this.adDisplayElement.setAttribute("class","plyr-ads"),this._setOnClickHandler(this.adDisplayElement,this._playAds)}},{key:"_playAds",value:function(){var e=this.plyr.elements.container;this.adDisplayContainer.initialize();try{this.adsManager.init(e.offsetWidth,e.offsetHeight,google.ima.ViewMode.NORMAL),this.adsManager.start()}catch(e){if(this.plyr.play(),this.adDisplayElement.remove(),this.config.debug)throw new Error(e)}}},{key:"_setupListeners",value:function(){var e=this,t=this.plyr.elements.container;this.plyr.on("ended",function(t){e.adsLoader.contentComplete()}),this.plyr.on("timeupdate",function(t){var n=t.detail.plyr.currentTime;e.videoElement.currentTime=Math.ceil(n)}),this.plyr.on("seeked",function(t){for(var n=t.detail.plyr.currentTime,i=e.adsManager.getCuePoints(),a=0,r=0;r<i.length;r++){var o=i[r];o<n&&-1!==o&&0!==o&&a++}for(var s=0;s<a;s++)e.adsManager.discardAdBreak()}),window.addEventListener("resize",function(){e.adsManager.resize(t.offsetWidth,t.offsetHeight,google.ima.ViewMode.NORMAL)})}},{key:"_setOnClickHandler",value:function(e,t){var n=this,i=function(i){e.addEventListener(i,function(e){("touchend"===e.type&&"touchend"===i||"click"===e.type)&&t.call(n)},{once:!0})},a=!0,r=!1,o=void 0;try{for(var s,d=this.startEvents[Symbol.iterator]();!(a=(s=d.next()).done);a=!0){i(s.value)}}catch(e){r=!0,o=e}finally{try{!a&&d.return&&d.return()}finally{if(r)throw o}}}},{key:"on",value:function(e,t){return n.on(this.elements.container,e,t),this}}]),t}();return{init:function(e,t){return new a(e,t)}}});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGx5ci1hZHMuanMiLCJzb3VyY2VzIjpbInNyYy9qcy9kZWZhdWx0cy5qcyIsInNyYy9qcy91dGlscy5qcyIsInNyYy9qcy9wbHlyLWFkcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcbmNvbnN0IGRlZmF1bHRzID0ge1xuICAgIGFkVGFnVXJsOiAnJyxcbiAgICBza2lwQnV0dG9uOiB7XG4gICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICAgIHRleHQ6ICdTa2lwIGFkJyxcbiAgICAgICAgZGVsYXk6IDEwXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBkZWZhdWx0czsiLCJcblxuZXhwb3J0IGNvbnN0IHV0aWxzID0ge1xuXG4gICAgLy8gRXZlbnRzIGFyZSBkaWZmZXJlbnQgb24gdmFyaW91cyBkZXZpY2VzLiBXZSBkZXQgdGhlIGNvcnJlY3QgZXZlbnRzLCBiYXNlZCBvbiB1c2VyQWdlbnQuXG4gICAgZ2V0U3RhcnRFdmVudHM6ICgpID0+IHtcbiAgICAgICAgbGV0IHN0YXJ0RXZlbnRzID0gWydjbGljayddO1xuICAgICAgICBcbiAgICAgICAgLy8gRm9yIG1vYmlsZSB1c2VycyB0aGUgc3RhcnQgZXZlbnQgd2lsbCBiZSBvbmUgb2ZcbiAgICAgICAgLy8gdG91Y2hzdGFydCwgdG91Y2hlbmQgYW5kIHRvdWNobW92ZS5cbiAgICAgICAgaWYgKG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL2lQaG9uZS9pKSB8fFxuICAgICAgICAgICAgbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvaVBhZC9pKSB8fFxuICAgICAgICAgICAgbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvQW5kcm9pZC9pKSkge1xuICAgICAgICAgICAgc3RhcnRFdmVudHMgPSBbJ3RvdWNoc3RhcnQnLCAndG91Y2hlbmQnLCAndG91Y2htb3ZlJ107XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0YXJ0RXZlbnRzO1xuICAgIH0sXG5cbiAgICAvLyBNZXJnZSBkZWZhdWx0cyBhbmQgb3B0aW9ucy5cbiAgICBtZXJnZUNvbmZpZzogKGRlZmF1bHRzLCBvcHRpb25zKSA9PiB7XG4gICAgICAgIHJldHVybiB7Li4uZGVmYXVsdHMsIC4uLm9wdGlvbnN9O1xuICAgIH1cbn07IiwiIFxuLyoqXG4gKiBUT0RPXG4gKiAtIFdoZW4gc2Vla2luZyBtaWQgcm9sbHMgc3RhcnQgcGxheWluZyBhZnRlciBzZWVrZWQuXG4gKiAgIFBvc3NpYmxlIHNvbHV0aW9uOiBJbnZva2UgZGlzY2FyZEFkQnJlYWsgZm9yIGV2ZXJ5IHNraXBwZWQgbWlkLXJvbGwuXG4gKi9cblxuXG5pbXBvcnQgZGVmYXVsdHMgZnJvbSAnLi9kZWZhdWx0cyc7XG5pbXBvcnQgeyB1dGlscyB9IGZyb20gJy4vdXRpbHMnO1xuXG5jbGFzcyBQbHlyQWRzIHtcblxuICBjb25zdHJ1Y3Rvcih0YXJnZXQsIG9wdGlvbnMpIHtcbiAgICBcbiAgICAvLyBTZXQgY29uZmlnXG4gICAgdGhpcy5jb25maWcgPSB1dGlscy5tZXJnZUNvbmZpZyhkZWZhdWx0cywgb3B0aW9ucyk7XG5cbiAgICAvLyBDaGVjayBpZiBhIGFkVGFnVXJsIHVzIHByb3ZpZGVkLlxuICAgIGlmICghdGhpcy5jb25maWcuYWRUYWdVcmwgJiYgdGhpcy5jb25maWcuZGVidWcpIHtcbiAgICAgIGlmICh0aGlzLmNvbmZpZy5kZWJ1Zykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGFkVGFnVXJsIHByb3ZpZGVkLicpO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIENoZWNrIGlmIHRoZSBHb29nbGUgSU1BMyBTREsgaXMgbG9hZGVkLlxuICAgIGlmICghd2luZG93Lmdvb2dsZSkge1xuICAgICAgaWYgKHRoaXMuY29uZmlnLmRlYnVnKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIEdvb2dsZSBJTUEzIFNESyBpcyBub3QgbG9hZGVkLicpO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBcbiAgICB0aGlzLnBseXIgPSB0YXJnZXQ7XG4gICAgdGhpcy5zdGFydEV2ZW50cyA9IHV0aWxzLmdldFN0YXJ0RXZlbnRzKCk7XG4gICAgdGhpcy5hZERpc3BsYXlDb250YWluZXI7XG4gICAgdGhpcy5hZERpc3BsYXlFbGVtZW50O1xuICAgIHRoaXMuYWRzTWFuYWdlcjtcbiAgICB0aGlzLmFkc0xvYWRlcjtcbiAgICB0aGlzLnZpZGVvRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJyk7XG5cbiAgICAvLyBTZXR1cCB0aGUgYWQgZGlzcGxheSBjb250YWluZXIuXG4gICAgdGhpcy5fc2V0dXBBZERpc3BsYXlDb250YWluZXIoKTtcbiAgICBcbiAgICAvLyBTZXR1cCB0aGUgSU1BIFNESy5cbiAgICB0aGlzLl9zZXR1cElNQSgpO1xuICBcbiAgICAvLyBTZXQgbGlzdGVuZXJzIG9uIHRoZSBQbHlyIGluc3RhbmNlLlxuICAgIHRoaXMuX3NldHVwTGlzdGVuZXJzKCk7XG4gIH1cblxuICBfc2V0dXBJTUEoKSB7XG4gICAgY29uc3QgeyBjb250YWluZXIgfSA9IHRoaXMucGx5ci5lbGVtZW50cztcblxuICAgIC8vIENyZWF0ZSBhZHMgbG9hZGVyLlxuICAgIHRoaXMuYWRzTG9hZGVyID0gbmV3IGdvb2dsZS5pbWEuQWRzTG9hZGVyKHRoaXMuYWREaXNwbGF5Q29udGFpbmVyLCB0aGlzLnZpZGVvRWxlbWVudCk7XG5cbiAgICAvLyBUZWxsIHRoZSBhZHNMb2FkZXIgd2UgYXJlIGhhbmRsaW5nIGFkIGJyZWFrcyBtYW51YWxseS5cbiAgICB0aGlzLmFkc0xvYWRlci5nZXRTZXR0aW5ncygpLnNldEF1dG9QbGF5QWRCcmVha3MoZmFsc2UpO1xuXG4gICAgLy8gTGlzdGVuIGFuZCByZXNwb25kIHRvIGFkcyBsb2FkZWQgYW5kIGVycm9yIGV2ZW50cy5cbiAgICB0aGlzLmFkc0xvYWRlci5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICBnb29nbGUuaW1hLkFkc01hbmFnZXJMb2FkZWRFdmVudC5UeXBlLkFEU19NQU5BR0VSX0xPQURFRCxcbiAgICAgICAgYWRFdmVudCA9PiB0aGlzLl9vbkFkc01hbmFnZXJMb2FkZWQoYWRFdmVudCksXG4gICAgICAgIGZhbHNlKTtcbiAgICB0aGlzLmFkc0xvYWRlci5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICBnb29nbGUuaW1hLkFkRXJyb3JFdmVudC5UeXBlLkFEX0VSUk9SLFxuICAgICAgICBhZEVycm9yID0+IHRoaXMuX29uQWRFcnJvcihhZEVycm9yKSxcbiAgICAgICAgZmFsc2UpO1xuXG4gICAgLy8gUmVxdWVzdCB2aWRlbyBhZHMuXG4gICAgY29uc3QgYWRzUmVxdWVzdCA9IG5ldyBnb29nbGUuaW1hLkFkc1JlcXVlc3QoKTtcbiAgICBhZHNSZXF1ZXN0LmFkVGFnVXJsID0gdGhpcy5jb25maWcuYWRUYWdVcmw7XG5cbiAgICAvLyBTcGVjaWZ5IHRoZSBsaW5lYXIgYW5kIG5vbmxpbmVhciBzbG90IHNpemVzLiBUaGlzIGhlbHBzIHRoZSBTREsgdG9cbiAgICAvLyBzZWxlY3QgdGhlIGNvcnJlY3QgY3JlYXRpdmUgaWYgbXVsdGlwbGUgYXJlIHJldHVybmVkLlxuICAgIGFkc1JlcXVlc3QubGluZWFyQWRTbG90V2lkdGggPSBjb250YWluZXIub2Zmc2V0V2lkdGg7XG4gICAgYWRzUmVxdWVzdC5saW5lYXJBZFNsb3RIZWlnaHQgPSBjb250YWluZXIub2Zmc2V0SGVpZ2h0O1xuICAgIGFkc1JlcXVlc3Qubm9uTGluZWFyQWRTbG90V2lkdGggPSBjb250YWluZXIub2Zmc2V0V2lkdGg7XG4gICAgYWRzUmVxdWVzdC5ub25MaW5lYXJBZFNsb3RIZWlnaHQgPSBjb250YWluZXIub2Zmc2V0SGVpZ2h0O1xuXG4gICAgdGhpcy5hZHNMb2FkZXIucmVxdWVzdEFkcyhhZHNSZXF1ZXN0KTtcbiAgfVxuXG4gIF9vbkFkc01hbmFnZXJMb2FkZWQoYWRzTWFuYWdlckxvYWRlZEV2ZW50KSB7XG4gICAgY29uc3QgeyB2aWRlb0VsZW1lbnQgfSA9IHRoaXM7XG5cbiAgICAvLyBHZXQgdGhlIGFkcyBtYW5hZ2VyLlxuICAgIGNvbnN0IGFkc1JlbmRlcmluZ1NldHRpbmdzID0gbmV3IGdvb2dsZS5pbWEuQWRzUmVuZGVyaW5nU2V0dGluZ3MoKTtcbiAgICBhZHNSZW5kZXJpbmdTZXR0aW5ncy5yZXN0b3JlQ3VzdG9tUGxheWJhY2tTdGF0ZU9uQWRCcmVha0NvbXBsZXRlID0gdHJ1ZTtcblxuICAgIC8vIFRoZSBTREsgaXMgcG9sbGluZyBjdXJyZW50VGltZSBvbiB0aGUgY29udGVudFBsYXliYWNrLiBBbmQgbmVlZHMgYSBkdXJhdGlvblxuICAgIC8vIHNvIGl0IGNhbiBkZXRlcm1pbmUgd2hlbiB0byBzdGFydCB0aGUgbWlkLSBhbmQgcG9zdC1yb2xsLlxuICAgIHRoaXMuYWRzTWFuYWdlciA9IGFkc01hbmFnZXJMb2FkZWRFdmVudC5nZXRBZHNNYW5hZ2VyKFxuICAgICAgdmlkZW9FbGVtZW50LCBhZHNSZW5kZXJpbmdTZXR0aW5ncyk7XG5cbiAgICAvLyBBZGQgbGlzdGVuZXJzIHRvIHRoZSByZXF1aXJlZCBldmVudHMuXG4gICAgdGhpcy5hZHNNYW5hZ2VyLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgIGdvb2dsZS5pbWEuQWRFcnJvckV2ZW50LlR5cGUuQURfRVJST1IsXG4gICAgICAgIGFkRXJyb3IgPT4gdGhpcy5fb25BZEVycm9yKGFkRXJyb3IpKTtcbiAgICAvLyB0aGlzLmFkc01hbmFnZXIuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAvLyAgICAgZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuQ09OVEVOVF9QQVVTRV9SRVFVRVNURUQsXG4gICAgLy8gICAgIGFkRXZlbnQgPT4gdGhpcy5fb25Db250ZW50UGF1c2VSZXF1ZXN0ZWQoYWRFdmVudCkpO1xuICAgIC8vIHRoaXMuYWRzTWFuYWdlci5hZGRFdmVudExpc3RlbmVyKFxuICAgIC8vICAgICBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5DT05URU5UX1JFU1VNRV9SRVFVRVNURUQsXG4gICAgLy8gICAgIGFkRXZlbnQgPT4gdGhpcy5fb25Db250ZW50UmVzdW1lUmVxdWVzdGVkKGFkRXZlbnQpKTtcbiAgICB0aGlzLmFkc01hbmFnZXIuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuQUxMX0FEU19DT01QTEVURUQsXG4gICAgICAgIGFkRXZlbnQgPT4gdGhpcy5fb25BZEV2ZW50KGFkRXZlbnQpKTtcbiAgICB0aGlzLmFkc01hbmFnZXIuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuQURfQlJFQUtfUkVBRFksXG4gICAgICAgIGFkRXZlbnQgPT4ge1xuICAgICAgICAgIHRoaXMucGx5ci5wYXVzZSgpO1xuICAgICAgICAgIHRoaXMuYWRzTWFuYWdlci5zdGFydCgpO1xuICAgICAgICB9KTtcblxuICAgIC8vIExpc3RlbiB0byBhbnkgYWRkaXRpb25hbCBldmVudHMsIGlmIG5lY2Vzc2FyeS5cbiAgICB0aGlzLmFkc01hbmFnZXIuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuTE9BREVELFxuICAgICAgICBhZEV2ZW50ID0+IHRoaXMuX29uQWRFdmVudChhZEV2ZW50KSk7XG4gICAgdGhpcy5hZHNNYW5hZ2VyLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgIGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLlNUQVJURUQsXG4gICAgICAgIGFkRXZlbnQgPT4gdGhpcy5fb25BZEV2ZW50KGFkRXZlbnQpKTtcbiAgICB0aGlzLmFkc01hbmFnZXIuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuQ09NUExFVEUsXG4gICAgICAgIGFkRXZlbnQgPT4gdGhpcy5fb25BZEV2ZW50KGFkRXZlbnQpICk7XG4gIH1cblxuICBfb25BZEV2ZW50KGFkRXZlbnQpIHtcbiAgICBcbiAgICBjb25zdCB7IGNvbnRhaW5lciB9ID0gdGhpcy5wbHlyLmVsZW1lbnRzO1xuXG4gICAgLy8gUmV0cmlldmUgdGhlIGFkIGZyb20gdGhlIGV2ZW50LiBTb21lIGV2ZW50cyAoZS5nLiBBTExfQURTX0NPTVBMRVRFRClcbiAgICAvLyBkb24ndCBoYXZlIGFkIG9iamVjdCBhc3NvY2lhdGVkLlxuICAgIGNvbnN0IGFkID0gYWRFdmVudC5nZXRBZCgpO1xuXG4gICAgLy8gbGV0IGludGVydmFsVGltZXI7XG4gICAgXG4gICAgc3dpdGNoIChhZEV2ZW50LnR5cGUpIHtcbiAgICAgIGNhc2UgZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuTE9BREVEOlxuICAgICAgICBjb25zb2xlLmxvZygnTE9BREVEJyk7XG4gICAgICAgIHRoaXMuYWREaXNwbGF5RWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgLy8gVGhpcyBpcyB0aGUgZmlyc3QgZXZlbnQgc2VudCBmb3IgYW4gYWQgLSBpdCBpcyBwb3NzaWJsZSB0b1xuICAgICAgICAvLyBkZXRlcm1pbmUgd2hldGhlciB0aGUgYWQgaXMgYSB2aWRlbyBhZCBvciBhbiBvdmVybGF5LlxuICAgICAgICBpZiAoIWFkLmlzTGluZWFyKCkpIHtcbiAgICAgICAgICBcbiAgICAgICAgICAvLyBQb3NpdGlvbiBBZERpc3BsYXlDb250YWluZXIgY29ycmVjdGx5IGZvciBvdmVybGF5LlxuICAgICAgICAgIGFkLndpZHRoID0gY29udGFpbmVyLm9mZnNldFdpZHRoO1xuICAgICAgICAgIGFkLmhlaWdodCA9IGNvbnRhaW5lci5vZmZzZXRIZWlnaHQ7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLlNUQVJURUQ6XG4gICAgICAgIGNvbnNvbGUubG9nKCdTVEFSVEVEJyk7XG4gICAgICAgIC8vIFNob3cgdGhlIGFkIGRpc3BsYXkgZWxlbWVudC5cbiAgICAgICAgLy8gVGhpcyBldmVudCBpbmRpY2F0ZXMgdGhlIGFkIGhhcyBzdGFydGVkIC0gdGhlIHZpZGVvIHBsYXllclxuICAgICAgICAvLyBjYW4gYWRqdXN0IHRoZSBVSSwgZm9yIGV4YW1wbGUgZGlzcGxheSBhIHBhdXNlIGJ1dHRvbiBhbmRcbiAgICAgICAgLy8gcmVtYWluaW5nIHRpbWUuXG4gICAgICAgIC8vIGlmIChhZC5pc0xpbmVhcigpKSB7XG4gICAgICAgICAgLy8gRm9yIGEgbGluZWFyIGFkLCBhIHRpbWVyIGNhbiBiZSBzdGFydGVkIHRvIHBvbGwgZm9yXG4gICAgICAgICAgLy8gdGhlIHJlbWFpbmluZyB0aW1lLlxuICAgICAgICAgIC8vIGludGVydmFsVGltZXIgPSBzZXRJbnRlcnZhbChcbiAgICAgICAgICAvLyAgICAgKCkgPT4ge1xuICAgICAgICAgIC8vICAgICAgIGxldCByZW1haW5pbmdUaW1lID0gdGhpcy5hZHNNYW5hZ2VyLmdldFJlbWFpbmluZ1RpbWUoKTtcbiAgICAgICAgICAvLyAgICAgICBjb25zb2xlLmxvZyhyZW1haW5pbmdUaW1lKTtcbiAgICAgICAgICAvLyAgICAgfSxcbiAgICAgICAgICAvLyAgICAgMzAwKTsgLy8gZXZlcnkgMzAwbXNcbiAgICAgICAgLy8gfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuQ09NUExFVEU6XG4gICAgICAgIC8vIFRoaXMgZXZlbnQgaW5kaWNhdGVzIHRoZSBhZCBoYXMgZmluaXNoZWQgLSB0aGUgdmlkZW8gcGxheWVyXG4gICAgICAgIC8vIGNhbiBwZXJmb3JtIGFwcHJvcHJpYXRlIFVJIGFjdGlvbnMsIHN1Y2ggYXMgcmVtb3ZpbmcgdGhlIHRpbWVyIGZvclxuICAgICAgICAvLyByZW1haW5pbmcgdGltZSBkZXRlY3Rpb24uXG4gICAgICAgIC8vIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxUaW1lcik7XG5cbiAgICAgICAgdGhpcy5hZERpc3BsYXlFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIGlmICh0aGlzLnBseXIuY3VycmVudFRpbWUgPCB0aGlzLnBseXIuZHVyYXRpb24pIHtcbiAgICAgICAgICB0aGlzLnBseXIucGxheSgpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5BTExfQURTX0NPTVBMRVRFRDpcbiAgICAgICAgdGhpcy5fZW1pdEV2ZW50KCdBTExfQURTX0NPTVBMRVRFRCcpO1xuICAgICAgICB0aGlzLnBseXIuc3RvcCgpO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgX29uQWRFcnJvcihhZEVycm9yRXZlbnQpIHtcbiAgICBcbiAgICAvLyBIYW5kbGUgdGhlIGVycm9yIGxvZ2dpbmcuXG4gICAgdGhpcy5hZERpc3BsYXlFbGVtZW50LnJlbW92ZSgpO1xuXG4gICAgaWYgKHRoaXMuYWRzTWFuYWdlcikge1xuICAgICAgdGhpcy5hZHNNYW5hZ2VyLmRlc3Ryb3koKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jb25maWcuZGVidWcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihhZEVycm9yRXZlbnQpO1xuICAgIH1cbiAgfVxuICBcbiAgLyoqXG4gICAqIFRoaXMgZnVuY3Rpb24gaXMgd2hlcmUgeW91IHNob3VsZCBzZXR1cCBVSSBmb3Igc2hvd2luZyBhZHMgKGUuZy5cbiAgICogZGlzcGxheSBhZCB0aW1lciBjb3VudGRvd24sIGRpc2FibGUgc2Vla2luZyBldGMuKVxuICAgKi9cbiAgX29uQ29udGVudFBhdXNlUmVxdWVzdGVkKCkge1xuXG4gICAgLy8gUGF1c2UgdGhlIHBsYXllci5cbiAgICB0aGlzLnBseXIucGF1c2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIGZ1bmN0aW9uIGlzIHdoZXJlIHlvdSBzaG91bGQgZW5zdXJlIHRoYXQgeW91ciBVSSBpcyByZWFkeVxuICAgKiB0byBwbGF5IGNvbnRlbnQuIEl0IGlzIHRoZSByZXNwb25zaWJpbGl0eSBvZiB0aGUgUHVibGlzaGVyIHRvXG4gICAqIGltcGxlbWVudCB0aGlzIGZ1bmN0aW9uIHdoZW4gbmVjZXNzYXJ5LlxuICAgKi9cbiAgX29uQ29udGVudFJlc3VtZVJlcXVlc3RlZCgpIHtcblxuICAgIC8vIFJlc3VtZSB0aGUgcGxheWVyLlxuICAgIHRoaXMucGx5ci5wbGF5KCk7XG4gIH1cblxuICBfc2V0dXBBZERpc3BsYXlDb250YWluZXIoKSB7XG4gICAgY29uc3QgeyBjb250YWluZXIsIG9yaWdpbmFsIH0gPSB0aGlzLnBseXIuZWxlbWVudHM7XG4gICAgICBcbiAgICAvLyBXZSBhc3N1bWUgdGhlIGFkQ29udGFpbmVyIGlzIHRoZSB2aWRlbyBjb250YWluZXIgb2YgdGhlIHBseXIgZWxlbWVudFxuICAgIC8vIHRoYXQgd2lsbCBob3VzZSB0aGUgYWRzLlxuICAgIHRoaXMuYWREaXNwbGF5Q29udGFpbmVyID0gbmV3IGdvb2dsZS5pbWEuQWREaXNwbGF5Q29udGFpbmVyKGNvbnRhaW5lcik7XG5cbiAgICB0aGlzLmFkRGlzcGxheUVsZW1lbnQgPSBjb250YWluZXIuZmlyc3RDaGlsZDtcblxuICAgIC8vIFRoZSBBZERpc3BsYXlDb250YWluZXIgY2FsbCBmcm9tIGdvb2dsZSBJTUEgc2V0cyB0aGUgc3R5bGUgYXR0cmlidXRlXG4gICAgLy8gYnkgZGVmYXVsdC4gV2UgcmVtb3ZlIHRoZSBpbmxpbmUgc3R5bGUgYW5kIHNldCBpdCB0aHJvdWdoIHRoZSBzdHlsZXNoZWV0LlxuICAgIHRoaXMuYWREaXNwbGF5RWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7XG4gICAgXG4gICAgLy8gU2V0IGNsYXNzIG5hbWUgb24gdGhlIGFkRGlzcGxheUNvbnRhaW5lciBlbGVtZW50LlxuICAgIHRoaXMuYWREaXNwbGF5RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3BseXItYWRzJyk7XG5cbiAgICAvLyBQbGF5IGFkcyB3aGVuIGNsaWNrZWQuXG4gICAgdGhpcy5fc2V0T25DbGlja0hhbmRsZXIodGhpcy5hZERpc3BsYXlFbGVtZW50LCB0aGlzLl9wbGF5QWRzKTtcbiAgfVxuXG4gIF9wbGF5QWRzKCkge1xuICAgIGNvbnN0IHsgY29udGFpbmVyIH0gPSB0aGlzLnBseXIuZWxlbWVudHM7XG5cbiAgICAvLyBJbml0aWFsaXplIHRoZSBjb250YWluZXIuIE11c3QgYmUgZG9uZSB2aWEgYSB1c2VyIGFjdGlvbiBvbiBtb2JpbGUgZGV2aWNlcy5cbiAgICB0aGlzLmFkRGlzcGxheUNvbnRhaW5lci5pbml0aWFsaXplKCk7XG5cbiAgICB0cnkgeyBcbiAgICAgIFxuICAgICAgLy8gSW5pdGlhbGl6ZSB0aGUgYWRzIG1hbmFnZXIuIEFkIHJ1bGVzIHBsYXlsaXN0IHdpbGwgc3RhcnQgYXQgdGhpcyB0aW1lLlxuICAgICAgdGhpcy5hZHNNYW5hZ2VyLmluaXQoXG4gICAgICAgIGNvbnRhaW5lci5vZmZzZXRXaWR0aCxcbiAgICAgICAgY29udGFpbmVyLm9mZnNldEhlaWdodCxcbiAgICAgICAgZ29vZ2xlLmltYS5WaWV3TW9kZS5OT1JNQUxcbiAgICAgICk7XG5cbiAgICAgIC8vIENhbGwgcGxheSB0byBzdGFydCBzaG93aW5nIHRoZSBhZC4gU2luZ2xlIHZpZGVvIGFuZCBvdmVybGF5IGFkcyB3aWxsXG4gICAgICAvLyBzdGFydCBhdCB0aGlzIHRpbWU7IHRoZSBjYWxsIHdpbGwgYmUgaWdub3JlZCBmb3IgYWQgcnVsZXMuXG4gICAgICB0aGlzLmFkc01hbmFnZXIuc3RhcnQoKTtcblxuICAgIH0gY2F0Y2ggKGFkRXJyb3IpIHtcblxuICAgICAgLy8gQW4gZXJyb3IgbWF5IGJlIHRocm93biBpZiB0aGVyZSB3YXMgYSBwcm9ibGVtIHdpdGggdGhlIFZBU1QgcmVzcG9uc2UuXG4gICAgICB0aGlzLnBseXIucGxheSgpO1xuICAgICAgdGhpcy5hZERpc3BsYXlFbGVtZW50LnJlbW92ZSgpO1xuXG4gICAgICBpZiAodGhpcy5jb25maWcuZGVidWcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGFkRXJyb3IpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXR1cCBob29rcyBmb3IgUGx5ciBhbmQgd2luZG93IGV2ZW50cy4gVGhpcyBlbnN1cmVzXG4gICAqIHRoZSBtaWQtIGFuZCBwb3N0LXJvbGwgbGF1bmNoIGF0IHRoZSBjb3JyZWN0IHRpbWUuIEFuZFxuICAgKiByZXNpemUgdGhlIGFkdmVydGlzZW1lbnQgd2hlbiB0aGUgcGxheWVyIHJlc2l6ZXMuXG4gICAqL1xuICBfc2V0dXBMaXN0ZW5lcnMoKSB7XG4gICAgY29uc3QgeyBjb250YWluZXIgfSA9IHRoaXMucGx5ci5lbGVtZW50cztcblxuICAgIC8vIEFkZCBsaXN0ZW5lcnMgdG8gdGhlIHJlcXVpcmVkIGV2ZW50cy5cbiAgICB0aGlzLnBseXIub24oJ2VuZGVkJywgZXZlbnQgPT4ge1xuICAgICAgdGhpcy5hZHNMb2FkZXIuY29udGVudENvbXBsZXRlKCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnBseXIub24oJ3RpbWV1cGRhdGUnLCBldmVudCA9PiB7XG4gICAgICBjb25zdCB7IGN1cnJlbnRUaW1lIH0gPSBldmVudC5kZXRhaWwucGx5cjtcbiAgICAgIHRoaXMudmlkZW9FbGVtZW50LmN1cnJlbnRUaW1lID0gTWF0aC5jZWlsKGN1cnJlbnRUaW1lKTtcbiAgICB9KTtcbiAgICBcbiAgICB0aGlzLnBseXIub24oJ3NlZWtlZCcsIGV2ZW50ID0+IHtcbiAgICAgIGNvbnN0IHsgY3VycmVudFRpbWUgfSA9IGV2ZW50LmRldGFpbC5wbHlyO1xuICAgICAgY29uc3QgY3VlUG9pbnRzID0gdGhpcy5hZHNNYW5hZ2VyLmdldEN1ZVBvaW50cygpO1xuXG4gICAgICBsZXQgYWRzU2tpcHBlZCA9IDA7XG5cbiAgICAgIC8vIENvdW50IHRoZSBhbW91bnQgb2YgbWlkLXJvbGxzIHdoaWNoIHdpbGwgYmVcbiAgICAgIC8vIHNraXBwZWQuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGN1ZVBvaW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBjdWVQb2ludCA9IGN1ZVBvaW50c1tpXTtcbiAgICAgICAgaWYgKGN1ZVBvaW50IDwgY3VycmVudFRpbWUgJiYgY3VlUG9pbnQgIT09IC0xICYmIGN1ZVBvaW50ICE9PSAwKSB7XG4gICAgICAgICAgYWRzU2tpcHBlZCsrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIERpc2NhcmQgYWQgYnJlYWtzIGZvciBldmVyeSBtaWQtcm9sbCBza2lwcGVkLlxuICAgICAgLy8gVGhpcyBlbnN1cmVzIHRoZSBtaWQtcm9sbHMgZG9uJ3Qgc3RhcnQgcnVubmluZyB3aGVuIHRoZSBcbiAgICAgIC8vIHZpZGVvIGlzIHNlZWtlZCBwYXN0IGEgbWlkLXJvbGwuXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGFkc1NraXBwZWQ7IGorKykge1xuICAgICAgICB0aGlzLmFkc01hbmFnZXIuZGlzY2FyZEFkQnJlYWsoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIExpc3RlbiB0byB0aGUgcmVzaXppbmcgb2YgdGhlIHdpbmRvdy4gQW5kIHJlc2l6ZSBhZCBhY2NvcmRpbmdseS5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCkgPT4ge1xuICAgICAgdGhpcy5hZHNNYW5hZ2VyLnJlc2l6ZShcbiAgICAgICAgY29udGFpbmVyLm9mZnNldFdpZHRoLFxuICAgICAgICBjb250YWluZXIub2Zmc2V0SGVpZ2h0LFxuICAgICAgICBnb29nbGUuaW1hLlZpZXdNb2RlLk5PUk1BTFxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgc3RhcnQgZXZlbnQgbGlzdGVuZXIgb24gYSBET00gZWxlbWVudCBhbmQgdHJpZ2dlcnMgdGhlXG4gICAqIGNhbGxiYWNrIHdoZW4gY2xpY2tlZC5cbiAgICogQHBhcmFtIHtIdG1sRWxtZW50fSBlbGVtZW50IC0gVGhlIGVsZW1lbnQgb24gd2hpY2ggdG8gc2V0IHRoZSBsaXN0ZW5lciBcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBUaGUgY2FsbGJhY2sgd2hpY2ggd2lsbCBiZSBpbnZva2VkIG9uY2UgdHJpZ2dlcmVkLlxuICAgKi8gXG4gIF9zZXRPbkNsaWNrSGFuZGxlcihlbGVtZW50LCBjYWxsYmFjaykge1xuICAgIGZvciAobGV0IHN0YXJ0RXZlbnQgb2YgdGhpcy5zdGFydEV2ZW50cykge1xuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKHN0YXJ0RXZlbnQsIChldmVudCkgPT4ge1xuICAgICAgICBpZiAoZXZlbnQudHlwZSA9PT0gJ3RvdWNoZW5kJyAmJlxuICAgICAgICAgICAgc3RhcnRFdmVudCA9PT0gJ3RvdWNoZW5kJyB8fFxuICAgICAgICAgICAgZXZlbnQudHlwZSA9PT0gJ2NsaWNrJykge1xuICAgICAgICAgIGNhbGxiYWNrLmNhbGwodGhpcyk7XG4gICAgICAgIH1cbiAgICAgIH0sIHtvbmNlOiB0cnVlfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBldmVudCBsaXN0ZW5lcnNcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50IC0gRXZlbnQgdHlwZVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayAtIENhbGxiYWNrIGZvciB3aGVuIGV2ZW50IG9jY3Vyc1xuICAgKi9cbiAgb24oZXZlbnQsIGNhbGxiYWNrKSB7XG4gICAgdXRpbHMub24odGhpcy5lbGVtZW50cy5jb250YWluZXIsIGV2ZW50LCBjYWxsYmFjayk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBpbml0OiAodGFyZ2V0LCBvcHRpb25zKSA9PiBuZXcgUGx5ckFkcyh0YXJnZXQsIG9wdGlvbnMpXG59O1xuIl0sIm5hbWVzIjpbImRlZmF1bHRzIiwidXRpbHMiLCJzdGFydEV2ZW50cyIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsIm1hdGNoIiwib3B0aW9ucyIsIlBseXJBZHMiLCJ0YXJnZXQiLCJjb25maWciLCJtZXJnZUNvbmZpZyIsInRoaXMiLCJhZFRhZ1VybCIsImRlYnVnIiwid2luZG93IiwiZ29vZ2xlIiwicGx5ciIsImdldFN0YXJ0RXZlbnRzIiwiYWREaXNwbGF5Q29udGFpbmVyIiwiYWREaXNwbGF5RWxlbWVudCIsImFkc01hbmFnZXIiLCJhZHNMb2FkZXIiLCJ2aWRlb0VsZW1lbnQiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJfc2V0dXBBZERpc3BsYXlDb250YWluZXIiLCJfc2V0dXBJTUEiLCJfc2V0dXBMaXN0ZW5lcnMiLCJFcnJvciIsImNvbnRhaW5lciIsImVsZW1lbnRzIiwiaW1hIiwiQWRzTG9hZGVyIiwiZ2V0U2V0dGluZ3MiLCJzZXRBdXRvUGxheUFkQnJlYWtzIiwiYWRkRXZlbnRMaXN0ZW5lciIsIkFkc01hbmFnZXJMb2FkZWRFdmVudCIsIlR5cGUiLCJBRFNfTUFOQUdFUl9MT0FERUQiLCJfdGhpcyIsIl9vbkFkc01hbmFnZXJMb2FkZWQiLCJhZEV2ZW50IiwiQWRFcnJvckV2ZW50IiwiQURfRVJST1IiLCJfb25BZEVycm9yIiwiYWRFcnJvciIsImFkc1JlcXVlc3QiLCJBZHNSZXF1ZXN0IiwibGluZWFyQWRTbG90V2lkdGgiLCJvZmZzZXRXaWR0aCIsImxpbmVhckFkU2xvdEhlaWdodCIsIm9mZnNldEhlaWdodCIsIm5vbkxpbmVhckFkU2xvdFdpZHRoIiwibm9uTGluZWFyQWRTbG90SGVpZ2h0IiwicmVxdWVzdEFkcyIsImFkc01hbmFnZXJMb2FkZWRFdmVudCIsImFkc1JlbmRlcmluZ1NldHRpbmdzIiwiQWRzUmVuZGVyaW5nU2V0dGluZ3MiLCJyZXN0b3JlQ3VzdG9tUGxheWJhY2tTdGF0ZU9uQWRCcmVha0NvbXBsZXRlIiwiZ2V0QWRzTWFuYWdlciIsIl90aGlzMiIsIkFkRXZlbnQiLCJBTExfQURTX0NPTVBMRVRFRCIsIl9vbkFkRXZlbnQiLCJBRF9CUkVBS19SRUFEWSIsInBhdXNlIiwic3RhcnQiLCJMT0FERUQiLCJTVEFSVEVEIiwiQ09NUExFVEUiLCJhZCIsImdldEFkIiwidHlwZSIsImxvZyIsInN0eWxlIiwiZGlzcGxheSIsImlzTGluZWFyIiwid2lkdGgiLCJoZWlnaHQiLCJjdXJyZW50VGltZSIsImR1cmF0aW9uIiwicGxheSIsIl9lbWl0RXZlbnQiLCJzdG9wIiwiYWRFcnJvckV2ZW50IiwicmVtb3ZlIiwiZGVzdHJveSIsIkFkRGlzcGxheUNvbnRhaW5lciIsImZpcnN0Q2hpbGQiLCJyZW1vdmVBdHRyaWJ1dGUiLCJzZXRBdHRyaWJ1dGUiLCJfc2V0T25DbGlja0hhbmRsZXIiLCJfcGxheUFkcyIsImluaXRpYWxpemUiLCJpbml0IiwiVmlld01vZGUiLCJOT1JNQUwiLCJvbiIsImNvbnRlbnRDb21wbGV0ZSIsImV2ZW50IiwiZGV0YWlsIiwiTWF0aCIsImNlaWwiLCJjdWVQb2ludHMiLCJfdGhpczMiLCJnZXRDdWVQb2ludHMiLCJhZHNTa2lwcGVkIiwiaSIsImxlbmd0aCIsImN1ZVBvaW50IiwiaiIsImRpc2NhcmRBZEJyZWFrIiwicmVzaXplIiwiZWxlbWVudCIsImNhbGxiYWNrIiwic3RhcnRFdmVudCIsImNhbGwiLCJvbmNlIl0sIm1hcHBpbmdzIjoiNkxBQ0EsSUFBTUEsWUFDUSx3QkFFRyxPQUNILGdCQUNDLHlLQ0pGQyxrQkFHTyxlQUNSQyxHQUFlLGdCQUlmQyxVQUFVQyxVQUFVQyxNQUFNLFlBQzFCRixVQUFVQyxVQUFVQyxNQUFNLFVBQzFCRixVQUFVQyxVQUFVQyxNQUFNLGtCQUNYLGFBQWMsV0FBWSxjQUV0Q0gsZUFJRSxTQUFDRixFQUFVTSxlQUNUTixFQUFhTSwwUENUMUJDLHdCQUVRQyxFQUFRRixnSEFHYkcsT0FBU1IsRUFBTVMsWUFBWVYsRUFBVU0sR0FHckNLLEtBQUtGLE9BQU9HLFdBQVlELEtBQUtGLE9BQU9JLFVBUXBDQyxPQUFPQyxZQU9QQyxLQUFPUixPQUNQTixZQUFjRCxFQUFNZ0Isc0JBQ3BCQyx3QkFDQUMsc0JBQ0FDLGdCQUNBQyxlQUNBQyxhQUFlQyxTQUFTQyxjQUFjLGNBR3RDQyxnQ0FHQUMsaUJBR0FDLDBCQXJCQ2hCLEtBQUtGLE9BQU9JLFlBQ1IsSUFB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
