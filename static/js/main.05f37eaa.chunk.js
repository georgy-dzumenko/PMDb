(this.webpackJsonpwatchlist=this.webpackJsonpwatchlist||[]).push([[0],{22:function(e,t,c){},31:function(e,t,c){},32:function(e,t,c){},44:function(e,t,c){"use strict";c.r(t);var n=c(1),i=c.n(n),s=c(23),a=c.n(s),r=(c(31),c(4)),o=(c(32),c(22),c(0)),l=c(12),j=function(e){var t=e.text,c=Object(n.useState)(!1),i=Object(r.a)(c,2),s=i[0],a=i[1];return Object(o.jsx)(o.Fragment,{children:Object(o.jsxs)("div",{className:l("navigation__dropdown",{"navigation__dropdown--active":s}),onClick:function(){return a(!s)},onMouseLeave:function(){return a(!1)},children:[Object(o.jsx)("div",{className:"navigation__link-text",children:t}),Object(o.jsxs)("div",{className:l("navigation__dropdown-options-block",{"navigation__dropdown-options-block--active":!s}),children:[Object(o.jsx)("div",{className:"navigation__dropdown-option",children:Object(o.jsx)("div",{className:"navigation__link-text",children:"aasfadfsdfsa"})}),Object(o.jsx)("div",{className:"navigation__dropdown-option",children:Object(o.jsx)("div",{className:"navigation__link-text",children:"aasfadfsdfsa"})})]})]})})},d=c(10),m=c(11),b=c(17),u=c.n(b),h="https://api.themoviedb.org/3/",v="a1cacae9e097c731c0046cf30fa3b749",_=function(e){return fetch("".concat(h,"discover/movie?year=").concat(e,"&api_key=").concat(v)).then((function(e){return e.json()})).then((function(e){return e.results}))},O=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return"https://image.tmdb.org/t/p/".concat(t?"w500":"original","/").concat(e)},p=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return"https://image.tmdb.org/t/p/".concat(t?"w500":"original","/").concat(e)},x=c(5),g=c(12),f=function(){var e=Object(n.useState)(!1),t=Object(r.a)(e,2),c=t[0],i=t[1],s=Object(n.useState)([]),a=Object(r.a)(s,2),l=a[0],j=a[1],b=Object(n.useState)(""),_=Object(r.a)(b,2),p=_[0],f=_[1],N=Object(n.useRef)(null),k=Object(n.useCallback)(u()((function(e){(function(e){return fetch("".concat(h,"search/movie?query=").concat(e,"&api_key=").concat(v)).then((function(e){return e.json()})).then((function(e){return e.results}))})(e).then((function(e){return j((e||[]).slice(0,7))}))}),500),[]);return Object(o.jsx)(o.Fragment,{children:Object(o.jsxs)("div",{className:"navigation__search",children:[Object(o.jsx)("input",{ref:N,value:p,onChange:function(e){f(e.target.value),k(e.target.value),console.log("a")},onBlur:function(){return i(!1)},className:g("navigation__search-input",{"navigation__search-input--active":c})}),Object(o.jsx)("div",{onClick:function(){!1===c?(i(!0),N.current.focus()):i(!1)},className:g("navigation__search-icon",{"navigation__search-icon--active":c}),children:Object(o.jsx)(d.a,{icon:m.d})}),Object(o.jsx)("ul",{className:g("navigation__search-results-block",{"navigation__search-results-block--active":p&&c}),children:Object(o.jsxs)(o.Fragment,{children:[l.map((function(e){return Object(o.jsx)("li",{children:Object(o.jsxs)(x.b,{to:"/movies/".concat(e.id),className:"navigation__search-result",children:[Object(o.jsx)("img",{src:O(e.poster_path,!0),alt:"",className:"navigation__search-result-img"}),Object(o.jsx)("h2",{className:"navigation__search-result-title",children:e.title})]})},e.id)})),l.length>0?Object(o.jsx)("li",{className:"navigation__search-more-results",children:"more results..."},"end"):Object(o.jsx)("li",{className:"navigation__search-no-results",children:"no results"},"end")]})})]})})},N=c(14),k=function(){return Object(o.jsx)("div",{className:"navigation",children:Object(o.jsxs)("div",{className:"navigation__content",children:[Object(o.jsx)(N.a,{scroll:function(e){return e.scrollIntoView()},className:"navigation__menu",to:"#menu",children:Object(o.jsx)(d.a,{icon:m.a})}),Object(o.jsx)(x.b,{to:"/",className:"navigation__logo",children:"PMDb"}),Object(o.jsxs)("div",{className:"navigation__main",children:[Object(o.jsx)(j,{text:"film catalogue"}),Object(o.jsx)("a",{href:"#",className:"navigation__link",children:Object(o.jsx)("div",{className:"navigation__link-text",children:"watchlist"})}),Object(o.jsx)(x.b,{to:"/info",className:"navigation__link",children:Object(o.jsx)("div",{className:"navigation__link-text",children:"Info"})})]}),Object(o.jsx)(f,{})]})})},w=c(3),I=c(12),y=function(){var e=Object(w.e)();return Object(o.jsxs)("div",{id:"menu",className:I("menu",{"menu--active":"#menu"===e.hash}),children:[Object(o.jsx)("div",{className:"navigation",children:Object(o.jsx)("div",{className:"navigation__content",children:Object(o.jsx)(N.a,{smooth:!0,to:"#",className:"menu__close-button",children:Object(o.jsx)(d.a,{icon:m.b})})})}),Object(o.jsxs)("div",{className:"container",children:[Object(o.jsx)("h1",{className:"menu__title",children:"Menu"}),Object(o.jsxs)("ul",{className:"menu__main",children:[Object(o.jsx)("li",{className:"menu__main-item",children:Object(o.jsx)(N.a,{className:"menu__link",to:"/",children:"home"})}),Object(o.jsx)("li",{className:"menu__main-item",children:Object(o.jsx)(N.a,{className:"menu__link",to:"/info",children:"info"})}),Object(o.jsx)("li",{className:"menu__main-item",children:Object(o.jsx)("a",{className:"menu__link",href:"#info",children:"adsadfs"})})]})]})]})},S=c(12),C=function(e){var t,c=e.last,i=void 0!==c&&c,s=e.movie,a=Object(n.useState)([]),l=Object(r.a)(a,2),j=l[0],d=l[1];return Object(n.useEffect)((function(){fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=".concat(v)).then((function(e){return e.json()})).then((function(e){return d(e.genres)}))}),[]),Object(o.jsxs)(x.b,{to:"/movies/".concat(s.id),className:S("movie-card",{"movie-card--last":i}),children:[Object(o.jsx)("img",{src:O(null===s||void 0===s?void 0:s.poster_path,!0),alt:"",className:"movie-card__img"}),Object(o.jsxs)("div",{className:"movie-card__description",children:[Object(o.jsx)("img",{className:"movie-card__description-img",src:O(s.backdrop_path,!0),alt:""}),Object(o.jsxs)("div",{className:"movie-card__description-content",children:[Object(o.jsx)("h1",{className:"movie-card__description-title",children:null===s||void 0===s?void 0:s.title}),Object(o.jsx)("ul",{className:"movie-card__description-ganres-list",children:null===(t=s.genre_ids)||void 0===t?void 0:t.map((function(e){var t;return Object(o.jsx)("li",{className:"movie-card__description-ganre",children:null===j||void 0===j||null===(t=j.find((function(t){var c=t.id;return e===c})))||void 0===t?void 0:t.name})}))})]})]})]})},L=c(12),E=function(e){var t=e.person;return Object(o.jsxs)(x.b,{to:"/people/".concat(t.id),className:L("person-card"),children:[Object(o.jsx)("img",{src:O(t.profile_path,!0),alt:"",className:"person-card__img"}),Object(o.jsx)("div",{className:"person-card__job",children:t.job||t.character}),Object(o.jsx)("div",{className:"person-card__name",children:t.name})]})},F=function(e){var t=e.moviesList,c=void 0===t?null:t,i=e.peopleList,s=void 0===i?[]:i,a=Object(n.useRef)(null);return Object(o.jsxs)("div",{className:"movies-slider",children:[Object(o.jsx)("div",{onClick:function(){a.current.scrollTo({left:-1*a.current.clientWidth*.9,behavior:"smooth"})},className:"movies-slider__scroll-button movies-slider__scroll-button--left",children:Object(o.jsx)(d.a,{icon:m.b})}),Object(o.jsx)("div",{ref:a,className:"movies-slider__tape",children:Object(o.jsxs)("div",{className:"movies-slider__content",children:[s.map((function(e){return Object(o.jsx)("div",{children:Object(o.jsx)(E,{person:e})})})),c?null===c||void 0===c?void 0:c.map((function(e,t){return Object(o.jsx)("div",{children:Object(o.jsx)(C,{last:0===t,movie:e})})})):""]})}),Object(o.jsx)("div",{onClick:function(){a.current.scrollBy({left:.9*a.current.clientWidth,behavior:"smooth"})},className:"movies-slider__scroll-button movies-slider__scroll-button--right",children:Object(o.jsx)(d.a,{icon:m.c})})]})},B=(c(12),function(e){e.id;var t,c=Object(w.f)("/movies/:movieId"),i=Object(n.useState)([]),s=Object(r.a)(i,2),a=s[0],l=s[1],j=Object(n.useState)([]),d=Object(r.a)(j,2),m=d[0],b=d[1],u=Object(n.useState)({}),_=Object(r.a)(u,2),p=_[0],g=_[1],f=Object(n.useState)([]),N=Object(r.a)(f,2),k=N[0],I=N[1],y=Object(w.e)();return console.log(a),Object(n.useEffect)((function(){(function(e){return fetch("https://api.themoviedb.org/3/movie/".concat(e,"/credits?api_key=").concat(v)).then((function(e){return e.json()})).then((function(e){return e.crew}))})(c.params.movieId).then((function(e){b(e.reverse())})),function(e){return fetch("https://api.themoviedb.org/3/movie/".concat(e,"/credits?api_key=").concat(v)).then((function(e){return e.json()})).then((function(e){return e.cast}))}(c.params.movieId).then((function(e){l(e.reverse())})),function(e){return fetch("".concat(h,"movie/").concat(e,"?api_key=").concat(v)).then((function(e){return e.json()}))}(c.params.movieId).then((function(e){g(e)})),function(e){return fetch("https://api.themoviedb.org/3/movie/".concat(e,"/similar?api_key=").concat(v)).then((function(e){return e.json()})).then((function(e){return e.results}))}(c.params.movieId).then((function(e){I(e)}))}),[y]),Object(o.jsx)("div",{className:"page",children:Object(o.jsx)("div",{className:"container",children:Object(o.jsxs)("div",{className:"movie-page",children:[Object(o.jsxs)("section",{className:"page__section grid",children:[Object(o.jsx)("div",{className:"movie-page__poster grid__item--1-4",children:Object(o.jsx)("img",{src:O(p.poster_path),alt:"",className:"movie-page__poster-img appear"})}),Object(o.jsxs)("div",{className:"movie-page__description grid grid__item--5-12",children:[Object(o.jsx)("div",{className:"grid__item--1-12 page__title movie-page__title slideRight",children:null===p||void 0===p?void 0:p.title}),Object(o.jsx)("div",{className:"movie-page__overview grid__item--1-12 slideRight",children:p.overview}),Object(o.jsx)("div",{className:"movie-page__genres-list grid__item-1-12 slideRight",children:null===(t=p.genres)||void 0===t?void 0:t.map((function(e){var t=e.name;return Object(o.jsx)("div",{className:"movie-page__genre",children:t})}))}),p.belongs_to_collection&&Object(o.jsxs)("div",{className:"grid__item--1-12",children:["collection:",Object(o.jsx)(x.b,{to:"/collections/".concat(p.belongs_to_collection.id),children:p.belongs_to_collection.name})]})]})]}),Object(o.jsxs)("section",{className:"page__section",children:[Object(o.jsx)("div",{className:"page__title",children:"Cast"}),Object(o.jsx)(F,{peopleList:a}),Object(o.jsx)("div",{className:"page__title",children:"Crew"}),Object(o.jsx)(F,{peopleList:m})]}),Object(o.jsxs)("section",{className:"page__section",children:[Object(o.jsx)("div",{className:"page__title",children:"Similar"}),Object(o.jsx)(F,{moviesList:k})]})]})})})}),R=function(){return Object(o.jsx)("div",{className:"info page",children:Object(o.jsx)("div",{className:"container",children:Object(o.jsxs)("div",{className:"info__param",children:[Object(o.jsx)("h1",{className:"info__title",children:"API:"}),Object(o.jsx)("a",{href:"https://www.themoviedb.org/",children:Object(o.jsx)("div",{className:"info__api"})})]})})})},M=c(12),P=function(e){var t,c,i=e.moviesList,s=Object(n.useState)(!1),a=Object(r.a)(s,2),l=a[0],j=a[1],b=Object(n.useState)(0),h=Object(r.a)(b,2),v=h[0],_=h[1],O=new Image(1180,590);O.src="https://image.tmdb.org/t/p/original/".concat(null===(t=i[v])||void 0===t?void 0:t.backdrop_path),O.onload=function(){return setTimeout((function(){return j(!0)}),1e3)},O.onloadstart=function(){return j(!1)};var p=function(){v!==i.length-1?_(v+1):_(0)},x=Object(n.useCallback)(u()(p,1e4),[v]);return Object(n.useEffect)((function(){return x(),x.cancel}),[v]),Object(o.jsxs)("div",{className:"poster",children:[Object(o.jsx)("div",{onClick:function(){_(0!==v?v-1:i.length-1)},className:"poster__arrow poster__arrow--left",children:Object(o.jsx)(d.a,{icon:m.b})}),Object(o.jsx)("img",{src:O.src,className:M("poster__img",{"poster__img--active":l})}),Object(o.jsx)("h1",{className:"poster__title",children:null===(c=i[v])||void 0===c?void 0:c.title}),Object(o.jsx)("div",{className:M("poster__timer",{})}),Object(o.jsx)("div",{onClick:p,className:"poster__arrow poster__arrow--right",children:Object(o.jsx)(d.a,{icon:m.c})})]})},T=function(){var e=Object(n.useState)([]),t=Object(r.a)(e,2),c=t[0],i=t[1];return Object(n.useEffect)((function(){_(2021).then((function(e){return i(e.reverse()||[{}])}))}),[]),Object(o.jsx)("div",{className:"page home",children:Object(o.jsxs)("div",{className:"container",children:[Object(o.jsx)("h1",{className:"page__title",children:"Home"}),Object(o.jsx)("section",{className:"page__section",children:Object(o.jsx)(P,{moviesList:c})}),Object(o.jsx)("section",{className:"page__section",children:Object(o.jsx)(F,{moviesList:c})}),Object(o.jsx)("section",{className:"page__section",children:Object(o.jsx)(F,{moviesList:c})})]})})},A=function(){var e=Object(w.f)("/collections/:collectionId"),t=Object(n.useState)({}),c=Object(r.a)(t,2),i=c[0],s=c[1];return Object(n.useEffect)((function(){var t;(t=e.params.collectionId,fetch("".concat(h,"collection/").concat(t,"?api_key=").concat(v)).then((function(e){return e.json()}))).then((function(e){return s(e)}))}),[]),Object(o.jsx)("div",{className:"page",children:Object(o.jsx)("div",{className:"container",children:Object(o.jsxs)("div",{className:"collections-page grid",children:[Object(o.jsx)("div",{className:"collections-page__poster grid__item--1-2",children:Object(o.jsx)("img",{src:O(i.poster_path,!0),className:"collections-page__poster-img"})}),Object(o.jsx)("div",{className:"page__title grid__item--3-12",children:i.name})]})})})},D=c(18),J=c(26),W=(c(12),function(e){e.id;var t,c=Object(w.f)("/people/:personId"),i=Object(n.useState)([]),s=Object(r.a)(i,2),a=s[0],l=s[1],j=Object(n.useState)({}),d=Object(r.a)(j,2),m=d[0],b=d[1],u=Object(w.e)();return Object(n.useEffect)((function(){(function(e){return fetch("https://api.themoviedb.org/3/person/".concat(e,"?api_key=").concat(v)).then((function(e){return e.json()}))})(c.params.personId).then((function(e){return b(e)})),function(e){return fetch("https://api.themoviedb.org/3/person/".concat(e,"/credits?api_key=").concat(v)).then((function(e){return e.json()})).then((function(e){return e}))}(c.params.personId).then((function(e){return l(e)}))}),[u]),Object(o.jsx)("div",{className:"page",children:Object(o.jsx)("div",{className:"container",children:Object(o.jsxs)("div",{className:"person-page grid",children:[Object(o.jsx)("div",{className:"person-page__poster grid__item--1-4",children:Object(o.jsx)("img",{src:p(m.profile_path),className:"person-page__poster-img"})}),Object(o.jsxs)("div",{className:"grid__item--5-12",children:[Object(o.jsx)("h1",{className:"person-page__name",children:m.name}),Object(o.jsxs)("div",{className:"person-page__params",children:[Object(o.jsxs)("div",{className:"person-page__param",children:[Object(o.jsx)("div",{children:"known for"}),Object(o.jsx)("div",{}),Object(o.jsx)("div",{children:m.known_for_department})]}),Object(o.jsxs)("div",{className:"person-page__param",children:[Object(o.jsx)("div",{children:"born"}),Object(o.jsx)("div",{}),Object(o.jsx)("div",{children:m.birthday})]}),m.deathday&&Object(o.jsxs)("div",{className:"person-page__param",children:[Object(o.jsx)("div",{children:"died"}),Object(o.jsx)("div",{}),Object(o.jsx)("div",{children:m.deathday})]})]})]}),Object(o.jsxs)("div",{className:"person-page__biography grid__item--1-12",children:[Object(o.jsx)("h2",{className:"person-page__section-title",children:"Biography"}),Object(o.jsx)("div",{className:"person-page__biography-main",children:m.biography})]}),Object(o.jsxs)("div",{className:"grid__item--1-12",children:[Object(o.jsx)("h2",{className:"person-page__section-title",children:"Acting"}),Object(o.jsx)("div",{children:Object(o.jsx)(F,{moviesList:a.cast})})]}),Object.entries((null===(t=a.crew)||void 0===t?void 0:t.reduce((function(e,t){return{filtered:Object(J.a)(Object(D.a)({},t.job,e.full.filter((function(e){return e.job===t.job}))),e.filtered),full:e.full.filter((function(e){return e.job!==t.job}))}}),{full:a.crew}).filtered)||{}).map((function(e){return Object(o.jsxs)("div",{className:"grid__item--1-12",children:[Object(o.jsx)("h2",{className:"person-page__section-title",children:e[0]}),Object(o.jsx)("div",{children:Object(o.jsx)(F,{moviesList:e[1]})})]})}))]})})})});var q=function(){var e,t,c=Object(w.f)("/movie/:movieId"),i=Object(n.useState)([]),s=Object(r.a)(i,2),a=(s[0],s[1]);return Object(n.useEffect)((function(){_("2021").then((function(e){return a(e)}))}),[]),Object(o.jsxs)("div",{className:"App",children:[Object(o.jsx)(k,{}),Object(o.jsx)(w.a,{path:"/",exact:!0,children:Object(o.jsx)(T,{})}),Object(o.jsx)(w.a,{path:"/info",children:Object(o.jsx)(R,{})}),Object(o.jsx)(w.a,{path:"/movies/:movieId",exact:!0,children:Object(o.jsx)(B,{id:null===c||void 0===c||null===(e=c.params)||void 0===e?void 0:e.movieId})}),Object(o.jsx)(w.a,{path:"/people/:personId",exact:!0,children:Object(o.jsx)(W,{id:null===c||void 0===c||null===(t=c.params)||void 0===t?void 0:t.personId})}),Object(o.jsx)(w.a,{path:"/collections/:collectionId",exact:!0,children:Object(o.jsx)(A,{})}),Object(o.jsx)(y,{})]})},H=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,45)).then((function(t){var c=t.getCLS,n=t.getFID,i=t.getFCP,s=t.getLCP,a=t.getTTFB;c(e),n(e),i(e),s(e),a(e)}))};a.a.render(Object(o.jsx)(i.a.StrictMode,{children:Object(o.jsx)(x.a,{basename:"/watchlist/",children:Object(o.jsx)(q,{})})}),document.getElementById("root")),H()}},[[44,1,2]]]);
//# sourceMappingURL=main.05f37eaa.chunk.js.map