(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _main_main_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./main/main.component */ "./src/app/main/main.component.ts");
/* harmony import */ var _tournaments_tournaments_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tournaments/tournaments.component */ "./src/app/tournaments/tournaments.component.ts");
/* harmony import */ var _teams_teams_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./teams/teams.component */ "./src/app/teams/teams.component.ts");
/* harmony import */ var _help_help_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./help/help.component */ "./src/app/help/help.component.ts");
/* harmony import */ var _profile_profile_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./profile/profile.component */ "./src/app/profile/profile.component.ts");
/* harmony import */ var _tournament_tournament_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./tournament/tournament.component */ "./src/app/tournament/tournament.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var routes = [
    { path: '', redirectTo: 'main', pathMatch: 'full' },
    { path: 'main', component: _main_main_component__WEBPACK_IMPORTED_MODULE_2__["MainComponent"] },
    { path: 'tournaments', component: _tournaments_tournaments_component__WEBPACK_IMPORTED_MODULE_3__["TournamentsComponent"] },
    { path: 'tournaments/:id', component: _tournament_tournament_component__WEBPACK_IMPORTED_MODULE_7__["TournamentComponent"] },
    { path: 'teams', component: _teams_teams_component__WEBPACK_IMPORTED_MODULE_4__["TeamsComponent"] },
    { path: 'help', component: _help_help_component__WEBPACK_IMPORTED_MODULE_5__["HelpComponent"] },
    { path: 'profile', component: _profile_profile_component__WEBPACK_IMPORTED_MODULE_6__["ProfileComponent"] },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "header .branding {\n    align-items: center;\n}\n\nheader * {\n    -webkit-user-select: none;\n       -moz-user-select: none;\n        -ms-user-select: none;\n            user-select: none;\n}\n\n.content-container {\n    justify-content: center;\n}\n\n/*img {\n    border-radius: 40px;\n    box-shadow: 0 3px 3px rgba(0,0,0,0.25), 0 7px 7px rgba(0,0,0,0.22);\n}\n\n.nav_component {\n    border: 1px solid transparent;\n    padding: 15px 50px;\n    float: left;\n    font: 20px bold;\n    user-select: none;\n;\n    color: #d0cbc8;\n    cursor: default;\n}\n.nav_component:hover {\n    background: linear-gradient(#222426, #444648, #222426);\n    border: 1px solid black;\n    box-shadow: 0 5px 5px rgba(0,0,0,0.25), 0 7px 7px rgba(0,0,0,0.22);\n}\n\n:focus {\n    outline: none;\n}\n\n.nav_component:active {\n    box-shadow: none;\n}\n\nnav {\n    background: #222426;\n    background: linear-gradient(#222426, #333537, #222426);\n    vertical-align: center;\n    height: 52px;\n    overflow: hidden;\n}\n\n#profile_icon {\n    margin: auto;\n    position: absolute;\n    right: 5px;\n    top: 5px;\n    cursor: pointer;\n}\n*/"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<clr-main-container>\n    <header class=\"header-6\">\n        <div class=\"branding\">\n            <clr-icon shape=\"flame\"></clr-icon>\n            <span class=\"title\">{{title}}</span>\n        </div>\n        <div class=\"header-nav\">\n            <a *ngFor=\"let component of nav_components\"\n               routerLink={{component.link}} class=\"nav-link nav-text\">{{component.text}}</a>\n        </div>\n        <div class=\"header-actions\">\n            <form class=\"search\">\n                <label for=\"search_input\">\n                    <input id=\"search_input\" type=\"text\" placeholder=\" Search for keywords...\">\n                </label>\n            </form>\n            <clr-dropdown>\n                <button class=\"nav-icon\" clrDropdownTrigger>\n                    <clr-icon shape=\"user\"></clr-icon>\n                    <clr-icon shape=\"caret down\"></clr-icon>\n                </button>\n                <clr-dropdown-menu *clrIfOpen clrPosition=\"bottom-right\">\n                    <a routerLink=\"/profile\" clrDropdownItem>Profile</a>\n                    <a clrDropdownItem>Preferences</a>\n                    <a clrDropdownItem>Log out</a>\n                </clr-dropdown-menu>\n            </clr-dropdown>\n        </div>\n    </header>\n    <div class=\"content-container\">\n        <div class=\"content-area\">\n            <router-outlet></router-outlet>\n        </div>\n    </div>\n</clr-main-container>"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'Playmaker';
        this.nav_components = [
            {
                text: 'Main',
                link: '/main',
            },
            {
                text: 'Tournaments',
                link: '/tournaments'
            },
            {
                text: 'Teams',
                link: '/teams'
            },
            {
                text: 'Help',
                link: '/help'
            }
        ];
    }
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _main_main_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./main/main.component */ "./src/app/main/main.component.ts");
/* harmony import */ var _tournaments_tournaments_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./tournaments/tournaments.component */ "./src/app/tournaments/tournaments.component.ts");
/* harmony import */ var _teams_teams_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./teams/teams.component */ "./src/app/teams/teams.component.ts");
/* harmony import */ var _help_help_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./help/help.component */ "./src/app/help/help.component.ts");
/* harmony import */ var _profile_profile_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./profile/profile.component */ "./src/app/profile/profile.component.ts");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _clr_angular__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @clr/angular */ "./node_modules/@clr/angular/esm5/clr-angular.js");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./auth.service */ "./src/app/auth.service.ts");
/* harmony import */ var _tournament_tournament_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./tournament/tournament.component */ "./src/app/tournament/tournament.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};














var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"],
                _main_main_component__WEBPACK_IMPORTED_MODULE_4__["MainComponent"],
                _tournaments_tournaments_component__WEBPACK_IMPORTED_MODULE_5__["TournamentsComponent"],
                _teams_teams_component__WEBPACK_IMPORTED_MODULE_6__["TeamsComponent"],
                _help_help_component__WEBPACK_IMPORTED_MODULE_7__["HelpComponent"],
                _profile_profile_component__WEBPACK_IMPORTED_MODULE_8__["ProfileComponent"],
                _tournament_tournament_component__WEBPACK_IMPORTED_MODULE_13__["TournamentComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_10__["HttpClientModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_9__["BrowserAnimationsModule"],
                _clr_angular__WEBPACK_IMPORTED_MODULE_11__["ClarityModule"],
            ],
            providers: [_auth_service__WEBPACK_IMPORTED_MODULE_12__["AuthService"]],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/auth.service.ts":
/*!*********************************!*\
  !*** ./src/app/auth.service.ts ***!
  \*********************************/
/*! exports provided: AuthService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthService", function() { return AuthService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AuthService = /** @class */ (function () {
    function AuthService() {
        this.authed = false;
    }
    AuthService.prototype.isAuthed = function () {
        return this.authed;
    };
    AuthService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], AuthService);
    return AuthService;
}());



/***/ }),

/***/ "./src/app/help/help.component.css":
/*!*****************************************!*\
  !*** ./src/app/help/help.component.css ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/help/help.component.html":
/*!******************************************!*\
  !*** ./src/app/help/help.component.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  help works!\n</p>\n"

/***/ }),

/***/ "./src/app/help/help.component.ts":
/*!****************************************!*\
  !*** ./src/app/help/help.component.ts ***!
  \****************************************/
/*! exports provided: HelpComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HelpComponent", function() { return HelpComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var HelpComponent = /** @class */ (function () {
    function HelpComponent() {
    }
    HelpComponent.prototype.ngOnInit = function () {
    };
    HelpComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-help',
            template: __webpack_require__(/*! ./help.component.html */ "./src/app/help/help.component.html"),
            styles: [__webpack_require__(/*! ./help.component.css */ "./src/app/help/help.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], HelpComponent);
    return HelpComponent;
}());



/***/ }),

/***/ "./src/app/main/main.component.css":
/*!*****************************************!*\
  !*** ./src/app/main/main.component.css ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/main/main.component.html":
/*!******************************************!*\
  !*** ./src/app/main/main.component.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  main works!\n</p>\n"

/***/ }),

/***/ "./src/app/main/main.component.ts":
/*!****************************************!*\
  !*** ./src/app/main/main.component.ts ***!
  \****************************************/
/*! exports provided: MainComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MainComponent", function() { return MainComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var MainComponent = /** @class */ (function () {
    function MainComponent() {
    }
    MainComponent.prototype.ngOnInit = function () {
    };
    MainComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-main',
            template: __webpack_require__(/*! ./main.component.html */ "./src/app/main/main.component.html"),
            styles: [__webpack_require__(/*! ./main.component.css */ "./src/app/main/main.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], MainComponent);
    return MainComponent;
}());



/***/ }),

/***/ "./src/app/profile/profile.component.css":
/*!***********************************************!*\
  !*** ./src/app/profile/profile.component.css ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/profile/profile.component.html":
/*!************************************************!*\
  !*** ./src/app/profile/profile.component.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  profile works!\n</p>\n"

/***/ }),

/***/ "./src/app/profile/profile.component.ts":
/*!**********************************************!*\
  !*** ./src/app/profile/profile.component.ts ***!
  \**********************************************/
/*! exports provided: ProfileComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfileComponent", function() { return ProfileComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ProfileComponent = /** @class */ (function () {
    function ProfileComponent() {
    }
    ProfileComponent.prototype.ngOnInit = function () {
    };
    ProfileComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-profile',
            template: __webpack_require__(/*! ./profile.component.html */ "./src/app/profile/profile.component.html"),
            styles: [__webpack_require__(/*! ./profile.component.css */ "./src/app/profile/profile.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], ProfileComponent);
    return ProfileComponent;
}());



/***/ }),

/***/ "./src/app/teams/teams.component.css":
/*!*******************************************!*\
  !*** ./src/app/teams/teams.component.css ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/teams/teams.component.html":
/*!********************************************!*\
  !*** ./src/app/teams/teams.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  teams works!\n</p>\n"

/***/ }),

/***/ "./src/app/teams/teams.component.ts":
/*!******************************************!*\
  !*** ./src/app/teams/teams.component.ts ***!
  \******************************************/
/*! exports provided: TeamsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TeamsComponent", function() { return TeamsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TeamsComponent = /** @class */ (function () {
    function TeamsComponent() {
    }
    TeamsComponent.prototype.ngOnInit = function () {
    };
    TeamsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-teams',
            template: __webpack_require__(/*! ./teams.component.html */ "./src/app/teams/teams.component.html"),
            styles: [__webpack_require__(/*! ./teams.component.css */ "./src/app/teams/teams.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], TeamsComponent);
    return TeamsComponent;
}());



/***/ }),

/***/ "./src/app/tournament.service.ts":
/*!***************************************!*\
  !*** ./src/app/tournament.service.ts ***!
  \***************************************/
/*! exports provided: TournamentService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TournamentService", function() { return TournamentService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TournamentService = /** @class */ (function () {
    function TournamentService(http) {
        this.http = http;
        this.tournamentsUrl = 'http://localhost:3000/tournaments';
    }
    TournamentService.prototype.getTours = function () {
        return this.http.get(this.tournamentsUrl).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (data) { return data['tournaments']; }));
        // return of(resp);
    };
    TournamentService.prototype.getTour = function (id) {
        console.log('Getting a TOURNAMENT ' + this.tournamentsUrl + '/' + id);
        return this.http.get(this.tournamentsUrl + '/' + id)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (data) { return data['tournament']; }));
    };
    TournamentService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], TournamentService);
    return TournamentService;
}());



/***/ }),

/***/ "./src/app/tournament/tournament.component.css":
/*!*****************************************************!*\
  !*** ./src/app/tournament/tournament.component.css ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#back_btn {\n    -webkit-transform: rotate(-90deg);\n            transform: rotate(-90deg);\n}"

/***/ }),

/***/ "./src/app/tournament/tournament.component.html":
/*!******************************************************!*\
  !*** ./src/app/tournament/tournament.component.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"tour\">\n    <h1>\n        <clr-icon id=\"back_btn\" shape=\"circle-arrow\" class=\"btn btn-link\"\n                  (click)=\"goBack()\"></clr-icon>\n        {{tour.name}}\n    </h1>\n    <h4>\n        Id: {{tour._id}}\n    </h4>\n\n    <h4>\n        Prize pool: {{tour.prize_pool}}\n    </h4>\n\n    <h4>Teams:</h4>\n    <ol>\n        <li *ngFor=\"let team of tour?.teams\">{{team.name}}</li>\n    </ol>\n</div>\n"

/***/ }),

/***/ "./src/app/tournament/tournament.component.ts":
/*!****************************************************!*\
  !*** ./src/app/tournament/tournament.component.ts ***!
  \****************************************************/
/*! exports provided: TournamentComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TournamentComponent", function() { return TournamentComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _tournament_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../tournament.service */ "./src/app/tournament.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TournamentComponent = /** @class */ (function () {
    function TournamentComponent(route, tourService, location) {
        this.route = route;
        this.tourService = tourService;
        this.location = location;
    }
    TournamentComponent.prototype.ngOnInit = function () {
        this.getTour();
    };
    TournamentComponent.prototype.getTour = function () {
        var _this = this;
        var id = this.route.snapshot.paramMap.get('id');
        this.tourService.getTour(id)
            .subscribe(function (tour) {
            _this.tour = tour;
        });
    };
    TournamentComponent.prototype.goBack = function () {
        this.location.back();
    };
    TournamentComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-tournament',
            template: __webpack_require__(/*! ./tournament.component.html */ "./src/app/tournament/tournament.component.html"),
            styles: [__webpack_require__(/*! ./tournament.component.css */ "./src/app/tournament/tournament.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _tournament_service__WEBPACK_IMPORTED_MODULE_2__["TournamentService"],
            _angular_common__WEBPACK_IMPORTED_MODULE_3__["Location"]])
    ], TournamentComponent);
    return TournamentComponent;
}());



/***/ }),

/***/ "./src/app/tournaments/tournaments.component.css":
/*!*******************************************************!*\
  !*** ./src/app/tournaments/tournaments.component.css ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".card, .search {\n    min-width: 300px;\n    max-width: 700px;\n    width: 50%;\n    margin: 0 auto 20px auto;\n}\n\n.subscribe_btn {\n    margin-left: auto;\n}\n\n.card-header {\n    display: -ms-grid;\n    display: grid;\n    -ms-grid-columns: 1fr 2fr;\n        grid-template-columns: 1fr 2fr;\n}\n\n.card-footer {\n    text-align: left;\n}\n\n.search {\n    background: white;\n    padding-top: .3rem;\n}\n\n.search input, .search label {\n    width: 100%;\n    color: black;\n}\n\n"

/***/ }),

/***/ "./src/app/tournaments/tournaments.component.html":
/*!********************************************************!*\
  !*** ./src/app/tournaments/tournaments.component.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<form class=\"search\">\n    <label for=\"search_input\">\n        <input #searchInput id=\"search_input\" (keyup)=\"search(searchInput.value)\" type=\"text\"\n                placeholder=\"Search for keywords...\">\n    </label>\n</form>\n\n<div *ngFor=\"let tour of tours\" class=\"card\">\n    <div class=\"card-header\">\n        <span style=\"align-self: center\">{{tour.name}}</span>\n        <button class=\"btn btn-sm btn-outline subscribe_btn\" [disabled]=\"!auth\">\n            Subscribe\n        </button>\n    </div>\n    <div class=\"card-block\">\n        <div class=\"card-media-block\">\n            <img src=\"../../assets/dlc.jpeg\" class=\"card-media-image\">\n            <div class=\"card-media-description\">\n                        <span class=\"card-media-title\">\n                            Id: {{tour._id}}\n                        </span>\n                <span class=\"card-media-text\">\n                            Owner: John Doe\n                    <!--{{tour.ownerName}}-->\n                        </span>\n            </div>\n        </div>\n        <div class=\"card-text\">\n            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor\n            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud\n            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure\n            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\n            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt\n            mollit anim id est laborum.\n            <!--{{tour.description}}-->\n        </div>\n\n        <!--<p-accordion>-->\n        <!--<p-accordionTab *ngFor=\"let team of tour.teams\"-->\n        <!--header=\"{{team._id}}: {{team.name}}\">-->\n        <!--<p *ngFor=\"let player of team.players\">{{player.nickname}}:-->\n        <!--id={{player.player_id}}</p>-->\n        <!--</p-accordionTab>-->\n        <!--</p-accordion>-->\n    </div>\n    <div class=\"card-footer\">\n        <button class=\"btn btn-link\" routerLink=\"/tournaments/{{tour._id}}\">view page</button>\n    </div>\n</div>\n\n\n<!--PRIMENG-->\n<!--<div id=\"content\">-->\n<!--<div id=\"tour_div\" *ngFor=\"let tour of tours\">-->\n<!--<p-card title={{tour.name}} subtitle=\"tournament_id = {{tour._id}}\">-->\n\n<!--<img src=\"data:image/jpeg;base64,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\">-->\n<!--<p-accordion>-->\n<!--<p-accordionTab *ngFor=\"let team of tour.teams\"-->\n<!--header=\"{{team._id}}: {{team.name}}\">-->\n<!--<p *ngFor=\"let player of team.players\">{{player.nickname}}:-->\n<!--id={{player.player_id}}</p>-->\n<!--</p-accordionTab>-->\n<!--</p-accordion>-->\n<!--</p-card>-->\n<!--</div>-->\n<!--</div>-->"

/***/ }),

/***/ "./src/app/tournaments/tournaments.component.ts":
/*!******************************************************!*\
  !*** ./src/app/tournaments/tournaments.component.ts ***!
  \******************************************************/
/*! exports provided: TournamentsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TournamentsComponent", function() { return TournamentsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _tournament_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../tournament.service */ "./src/app/tournament.service.ts");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../auth.service */ "./src/app/auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TournamentsComponent = /** @class */ (function () {
    function TournamentsComponent(tourService, authService) {
        this.tourService = tourService;
        this.authService = authService;
    }
    TournamentsComponent.prototype.getTours = function () {
        var _this = this;
        this.tourService.getTours()
            .subscribe(function (tours) { return _this.tours = tours; });
    };
    TournamentsComponent.prototype.ngOnInit = function () {
        this.getTours();
        this.auth = this.authService.isAuthed();
    };
    TournamentsComponent.prototype.search = function () {
    };
    TournamentsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-tournaments',
            template: __webpack_require__(/*! ./tournaments.component.html */ "./src/app/tournaments/tournaments.component.html"),
            styles: [__webpack_require__(/*! ./tournaments.component.css */ "./src/app/tournaments/tournaments.component.css")]
        }),
        __metadata("design:paramtypes", [_tournament_service__WEBPACK_IMPORTED_MODULE_1__["TournamentService"], _auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"]])
    ], TournamentsComponent);
    return TournamentsComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/almdudler/Studies/Web/playmaker-web/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map