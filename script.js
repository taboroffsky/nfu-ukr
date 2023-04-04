
// Mobile Menu

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links li");

hamburger.addEventListener('click', ()=>{
   //Animate Links
    navLinks.classList.toggle("open");
    links.forEach(link => {
        link.classList.toggle("fade");
    });

    //Hamburger Animation
    hamburger.classList.toggle("toggle");
});

// Main site translator

const googleTranslateConfig = {
	/* Original language */
	lang: "uk",

	/* The language we translate into on the first visit*/
	langFirstVisit: 'en',
};

document.addEventListener("DOMContentLoaded", (event) => {

	/* Connecting the google translate widget */
	let script = document.createElement("script");
	script.src = `//translate.google.com/translate_a/element.js?cb=TranslateWidgetIsLoaded`;
	document.getElementsByTagName("head")[0].appendChild(script);
});

function TranslateWidgetIsLoaded() {
	TranslateInit(googleTranslateConfig);
}

function TranslateInit(config) {
	if (config.langFirstVisit && !Cookies.get("googtrans")) {

		/* If the translation language is installed for the first visit and cookies are not assigned */
		TranslateCookieHandler("/auto/" + config.langFirstVisit);
	}

	let code = TranslateGetCode(config);

	TranslateHtmlHandler(code);

	if (code == config.lang) {

		/* If the default language is the same as the language we are translating into, then we clear the cookies */
		TranslateCookieHandler(null, config.domain);
	}


	/* Initialize the widget with the default language */
	new google.translate.TranslateElement({
		pageLanguage: config.lang,
	});

	/* Assigning a handler to the flags */
	TranslateEventHandler("click", "[data-google-lang]", function (e) {
		TranslateCookieHandler(
			"/" + config.lang + "/" + e.getAttribute("data-google-lang"),
			config.domain
		);

		/* Reloading the page */
		window.location.reload();
	});
}

function TranslateGetCode(config) {

	/* If there are no cookies, then we pass the default language */
	let lang =
		Cookies.get("googtrans") != undefined && Cookies.get("googtrans") != "null"
			? Cookies.get("googtrans")
			: config.lang;
	return lang.match(/(?!^\/)[^\/]*$/gm)[0];
}

function TranslateCookieHandler(val, domain) {

	/* Writing down cookies /language_for_translation/the_language_we_are_translating_into */
	Cookies.set("googtrans", val);
	Cookies.set("googtrans", val, {
		domain: "." + document.domain,
	});

	if (domain == "undefined") return;

	/* Writing down cookies for the domain, if it is assigned in the config */
	Cookies.set("googtrans", val, {
		domain: domain,
	});

	Cookies.set("googtrans", val, {
		domain: "." + domain,
	});
}

function TranslateEventHandler(event, selector, handler) {
	document.addEventListener(event, function (e) {
		let el = e.target.closest(selector);
		if (el) handler(el);
	});
}

function TranslateHtmlHandler(code) {

	/* We get the language to which we translate and produce the necessary manipulations with DOM */
	if (document.querySelector('[data-google-lang="' + code + '"]') !== null) {
		document
			.querySelector('[data-google-lang="' + code + '"]')
			.classList.add("language__img_active");
	}
}


// Gallery Card

var popupViews = document.querySelectorAll('.popup-view');
var popupBtns = document.querySelectorAll('.popup-btn');
var closeBtns = document.querySelectorAll('.close-btn');
//quick view button
var popup = function (popupClick) {
	popupViews[popupClick].classList.add('active');
}
popupBtns.forEach((popupBtn, i) => {
	popupBtn.addEventListener("click", () => {
		popup(i);
	});
});
//close button
closeBtns.forEach((closeBtn) => {
	closeBtn.addEventListener("click", () => {
		popupViews.forEach((popupView) => {
			popupView.classList.remove('active');
		});
	});
});





// Neural Connections Background

var w = c.width = window.innerWidth,
	h = c.height = window.innerHeight,
	ctx = c.getContext('2d'),

	opts = {

		range: 250,
		baseConnections: 50,
		addedConnections: 60,
		baseSize: 5,
		minSize: 1,
		dataToConnectionSize: .3,
		sizeMultiplier: .7,
		allowedDist: 60,
		baseDist: 60,
		addedDist: 50,
		connectionAttempts: 150,

		dataToConnections: 3,
		baseSpeed: .0001,
		addedSpeed: .012,
		baseGlowSpeed: .01,
		addedGlowSpeed: .01,

		rotVelX: .0022,
		rotVelY: .0011,

		repaintColor: '#00005b',
		connectionColor: '#883576',
		rootColor: '#00005b',
		endColor: 'FFDE00',
		dataColor: 'FFDE00',

		wireframeWidth: .2,
		wireframeColor: '#88f',

		depth: 250,
		focalLength: 250,
		vanishPoint: {
			x: w / 2,
			y: h / 2
		}
	},

	squareRange = opts.range * opts.range,
	squareAllowed = opts.allowedDist * opts.allowedDist,
	mostDistant = opts.depth + opts.range,
	sinX = sinY = 0,
	cosX = cosY = 0,

	connections = [],
	toDevelop = [],
	data = [],
	all = [],
	tick = 0,
	totalProb = 0,

	animating = false,

	Tau = Math.PI * 2;

ctx.fillStyle = '#222';
ctx.fillRect(0, 0, w, h);
ctx.fillStyle = '#ccc';
ctx.font = '50px Verdana';
ctx.fillText('Calculating Nodes', w / 2 - ctx.measureText('Calculating Nodes').width / 2, h / 2 - 15);

window.setTimeout(init, 4); // to render the loading screen

function init() {

	connections.length = 0;
	data.length = 0;
	all.length = 0;
	toDevelop.length = 0;

	var connection = new Connection(0, 0, 0, opts.baseSize);
	connection.step = Connection.rootStep;
	connections.push(connection);
	all.push(connection);
	connection.link();

	while (toDevelop.length > 0) {

		toDevelop[0].link();
		toDevelop.shift();
	}

	if (!animating) {
		animating = true;
		anim();
	}
}
function Connection(x, y, z, size) {

	this.x = x;
	this.y = y;
	this.z = z;
	this.size = size;

	this.screen = {};

	this.links = [];
	this.probabilities = [];
	this.isEnd = false;

	this.glowSpeed = opts.baseGlowSpeed + opts.addedGlowSpeed * Math.random();
}
Connection.prototype.link = function () {

	if (this.size < opts.minSize)
		return this.isEnd = true;

	var links = [],
		connectionsNum = opts.baseConnections + Math.random() * opts.addedConnections | 0,
		attempt = opts.connectionAttempts,

		alpha, beta, len,
		cosA, sinA, cosB, sinB,
		pos = {},
		passedExisting, passedBuffered;

	while (links.length < connectionsNum && --attempt > 0) {

		alpha = Math.random() * Math.PI;
		beta = Math.random() * Tau;
		len = opts.baseDist + opts.addedDist * Math.random();

		cosA = Math.cos(alpha);
		sinA = Math.sin(alpha);
		cosB = Math.cos(beta);
		sinB = Math.sin(beta);

		pos.x = this.x + len * cosA * sinB;
		pos.y = this.y + len * sinA * sinB;
		pos.z = this.z + len * cosB;

		if (pos.x * pos.x + pos.y * pos.y + pos.z * pos.z < squareRange) {

			passedExisting = true;
			passedBuffered = true;
			for (var i = 0; i < connections.length; ++i)
				if (squareDist(pos, connections[i]) < squareAllowed)
					passedExisting = false;

			if (passedExisting)
				for (var i = 0; i < links.length; ++i)
					if (squareDist(pos, links[i]) < squareAllowed)
						passedBuffered = false;

			if (passedExisting && passedBuffered)
				links.push({ x: pos.x, y: pos.y, z: pos.z });
		}
	}

	if (links.length === 0)
		this.isEnd = true;
	else {
		for (var i = 0; i < links.length; ++i) {

			var pos = links[i],
				connection = new Connection(pos.x, pos.y, pos.z, this.size * opts.sizeMultiplier);

			this.links[i] = connection;
			all.push(connection);
			connections.push(connection);
		}
		for (var i = 0; i < this.links.length; ++i)
			toDevelop.push(this.links[i]);
	}
}
Connection.prototype.step = function () {

	this.setScreen();
	this.screen.color = (this.isEnd ? opts.endColor : opts.connectionColor).replace('light', 30 + ((tick * this.glowSpeed) % 30)).replace('alp', .2 + (1 - this.screen.z / mostDistant) * .8);

	for (var i = 0; i < this.links.length; ++i) {
		ctx.moveTo(this.screen.x, this.screen.y);
		ctx.lineTo(this.links[i].screen.x, this.links[i].screen.y);
	}
}
Connection.rootStep = function () {
	this.setScreen();
	this.screen.color = opts.rootColor.replace('light', 30 + ((tick * this.glowSpeed) % 30)).replace('alp', (1 - this.screen.z / mostDistant) * .8);

	for (var i = 0; i < this.links.length; ++i) {
		ctx.moveTo(this.screen.x, this.screen.y);
		ctx.lineTo(this.links[i].screen.x, this.links[i].screen.y);
	}
}
Connection.prototype.draw = function () {
	ctx.fillStyle = this.screen.color;
	ctx.beginPath();
	ctx.arc(this.screen.x, this.screen.y, this.screen.scale * this.size, 0, Tau);
	ctx.fill();
}
function Data(connection) {

	this.glowSpeed = opts.baseGlowSpeed + opts.addedGlowSpeed * Math.random();
	this.speed = opts.baseSpeed + opts.addedSpeed * Math.random();

	this.screen = {};

	this.setConnection(connection);
}
Data.prototype.reset = function () {

	this.setConnection(connections[0]);
	this.ended = 2;
}
Data.prototype.step = function () {

	this.proportion += this.speed;

	if (this.proportion < 1) {
		this.x = this.ox + this.dx * this.proportion;
		this.y = this.oy + this.dy * this.proportion;
		this.z = this.oz + this.dz * this.proportion;
		this.size = (this.os + this.ds * this.proportion) * opts.dataToConnectionSize;
	} else
		this.setConnection(this.nextConnection);

	this.screen.lastX = this.screen.x;
	this.screen.lastY = this.screen.y;
	this.setScreen();
	this.screen.color = opts.dataColor.replace('light', 40 + ((tick * this.glowSpeed) % 50)).replace('alp', .2 + (1 - this.screen.z / mostDistant) * .6);

}
Data.prototype.draw = function () {

	if (this.ended)
		return --this.ended; // not sre why the thing lasts 2 frames, but it does

	ctx.beginPath();
	ctx.strokeStyle = this.screen.color;
	ctx.lineWidth = this.size * this.screen.scale;
	ctx.moveTo(this.screen.lastX, this.screen.lastY);
	ctx.lineTo(this.screen.x, this.screen.y);
	ctx.stroke();
}
Data.prototype.setConnection = function (connection) {

	if (connection.isEnd)
		this.reset();

	else {

		this.connection = connection;
		this.nextConnection = connection.links[connection.links.length * Math.random() | 0];

		this.ox = connection.x; // original coordinates
		this.oy = connection.y;
		this.oz = connection.z;
		this.os = connection.size; // base size

		this.nx = this.nextConnection.x; // new
		this.ny = this.nextConnection.y;
		this.nz = this.nextConnection.z;
		this.ns = this.nextConnection.size;

		this.dx = this.nx - this.ox; // delta
		this.dy = this.ny - this.oy;
		this.dz = this.nz - this.oz;
		this.ds = this.ns - this.os;

		this.proportion = 0;
	}
}
Connection.prototype.setScreen = Data.prototype.setScreen = function () {

	var x = this.x,
		y = this.y,
		z = this.z;

	// apply rotation on X axis
	var Y = y;
	y = y * cosX - z * sinX;
	z = z * cosX + Y * sinX;

	// rot on Y
	var Z = z;
	z = z * cosY - x * sinY;
	x = x * cosY + Z * sinY;

	this.screen.z = z;

	// translate on Z
	z += opts.depth;

	this.screen.scale = opts.focalLength / z;
	this.screen.x = opts.vanishPoint.x + x * this.screen.scale;
	this.screen.y = opts.vanishPoint.y + y * this.screen.scale;

}
function squareDist(a, b) {

	var x = b.x - a.x,
		y = b.y - a.y,
		z = b.z - a.z;

	return x * x + y * y + z * z;
}

function anim() {

	window.requestAnimationFrame(anim);

	ctx.globalCompositeOperation = 'source-over';
	ctx.fillStyle = opts.repaintColor;
	ctx.fillRect(0, 0, w, h);

	++tick;

	var rotX = tick * opts.rotVelX,
		rotY = tick * opts.rotVelY;

	cosX = Math.cos(rotX);
	sinX = Math.sin(rotX);
	cosY = Math.cos(rotY);
	sinY = Math.sin(rotY);

	if (data.length < connections.length * opts.dataToConnections) {
		var datum = new Data(connections[0]);
		data.push(datum);
		all.push(datum);
	}

	ctx.globalCompositeOperation = 'lighter';
	ctx.beginPath();
	ctx.lineWidth = opts.wireframeWidth;
	ctx.strokeStyle = opts.wireframeColor;
	all.map(function (item) { item.step(); });
	ctx.stroke();
	ctx.globalCompositeOperation = 'source-over';
	all.sort(function (a, b) { return b.screen.z - a.screen.z });
	all.map(function (item) { item.draw(); });

	/*ctx.beginPath();
	ctx.strokeStyle = 'red';
	ctx.arc( opts.vanishPoint.x, opts.vanishPoint.y, opts.range * opts.focalLength / opts.depth, 0, Tau );
	ctx.stroke();*/
}

window.addEventListener('resize', function () {

	opts.vanishPoint.x = (w = c.width = window.innerWidth) / 2;
	opts.vanishPoint.y = (h = c.height = window.innerHeight) / 2;
	ctx.fillRect(0, 0, w, h);
});
window.addEventListener('click', init);


// Cookies



