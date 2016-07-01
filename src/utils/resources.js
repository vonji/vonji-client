//Vue.http.options.root = 'http://localhost:1618/';//TODO make this work

import Vue from 'vue';
import { router } from '../main'

export default {
	user: new Resource('users'),
	request: new Resource('requests'),
	response: new Resource('responses')
};

function Resource(resourceName) {
	"use strict";

	this.options = {};

//  let resource = Vue.resource(resourceName + '{/id}'); // does not work because Vue is not intialized when the object is exported
	let resourceUrl = 'http://localhost:1618/' + resourceName + '/';

	let success = (response) => {
		if (this.options.reload && this.options.redirect) {
			console.error('Can not reload and redirect after ajax request');
			return;
		}
		if (this.options.successMessage)
			Vue.alert('info', this.options.successMessage);
		if (this.options.success)
			this.options.success(response);
		if (this.options.reload)
			window.location.reload(true);
		if (this.options.redirect)
			router.go(this.options.redirect);
		if (response.data)
			return JSON.parse(response.data)
	};

	let error = (response) => {
		alert('thiscallbackoesnotworkforsomereasons');
		if (this.options.error)
			this.options.error(response);
		Vue.alert('error', response);//TODO does not work
	};

	this.get = (o) => {
		this.options = o = (o || {});
		return Vue.http.get(resourceUrl + (o.id || '')).then(success, (response) => alert('failure'));
	};
	this.post = (o) => {
		this.options = o = (o || {});
		return Vue.http.post(resourceUrl, o.data).then(success, error);
	};
	this.put = (o) => {
		this.options = o = (o || {});
		return Vue.http.put(resourceUrl, o.data).then(success, error);
	};
	this.delete = (o) => {
		this.options = o = (o || {});
		return Vue.http.delete(resourceUrl + o.id).then(success, error);
	};
}