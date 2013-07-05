define([
  // These are path alias that we configured in our bootstrap

	'jquery',
	'underscore',
	'backbone',
	'localStorage',
	'router'

	], function( $, _, Backbone, LocalStorage, Router ){

		var initialize = function(){
			Router.initialize();

		};

		return{

			initialize : initialize

		};

	});