(this["webpackJsonptext-to-speech"]=this["webpackJsonptext-to-speech"]||[]).push([[0],{74:function(e,t,n){},75:function(e,t,n){},79:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),r=n(23),o=n.n(r),u=(n(74),n(35)),s=n.n(u),i=n(43),l=n(38),d=function(){var e=Object(i.a)(s.a.mark((function e(t,n,a){var c,r,o,u;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(c=new Headers).append("apikey","s6GopJmGpsTiGyHiUYm252RsgH960r8Y"),c.append("Content-Type","application/x-www-form-urlencoded"),(r=new URLSearchParams).append("input",'"'.concat(t,'"')),r.append("speaker_id","".concat(n)),r.append("speed","".concat(a)),o={method:"POST",headers:c,body:r,redirect:"follow"},u={error_code:-1,data:{url:""}},e.next=11,fetch("https://api.zalo.ai/v1/tts/synthesize",o).then((function(e){return e.json()})).then((function(e){u=e})).catch((function(e){return console.log("error",e)}));case 11:return e.abrupt("return",u);case 12:case"end":return e.stop()}}),e)})));return function(t,n,a){return e.apply(this,arguments)}}(),p=[["N\u1eef mi\u1ec1n B\u1eafc",1],["N\u1eef mi\u1ec1n Nam",2],["Nam mi\u1ec1n B\u1eafc",3],["Nam mi\u1ec1n Nam",4]],j=[.8,1,1.2],f=n(85),b=n(83),h=n(68),m=n(86),O=n(87),v=(n(75),n(17)),x=f.a.TextArea,g=b.a.Option,y=function(){var e,t=Object(a.useState)(""),n=Object(l.a)(t,2),c=n[0],r=n[1],o=Object(a.useState)(20),u=Object(l.a)(o,1)[0],f=Object(a.useState)(0),y=Object(l.a)(f,2),w=y[0],N=y[1],C=Object(a.useState)(1),S=Object(l.a)(C,2),k=S[0],T=S[1],F=Object(a.useState)(""),P=Object(l.a)(F,2),R=P[0],z=P[1],B=Object(a.useRef)(null),D=function(){var e=Object(i.a)(s.a.mark((function e(){var t,n;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("comm-- ",c,w,k),e.next=3,d(c,w,k);case 3:t=e.sent,console.log("res",t),t&&0===(null===t||void 0===t?void 0:t.error_code)&&(z(t.data.url),null===(n=B.current)||void 0===n||n.play());case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(v.jsxs)("div",{className:"main-container",children:[Object(v.jsx)(x,{value:c,onPaste:function(e){document.execCommand("paste"),r(c+e.clipboardData.getData("Text"))},onChange:function(e){return function(e){var t=e.target.value;t.split(" ").length>u||r(t)}(e)},placeholder:"Controlled autosize",autoSize:{maxRows:7,minRows:7},rows:7}),Object(v.jsxs)("div",{className:"button-group",children:[Object(v.jsx)(b.a,{defaultValue:p[0][0],className:"select-style",onChange:function(e){return function(e){N(parseFloat(e))}(e.toString())},children:p.map((function(e){return Object(v.jsx)(g,{value:e[1],children:e[0]},e[0])}))}),Object(v.jsx)(b.a,{defaultValue:j[1],className:"select-style",onChange:function(e){return function(e){T(e)}(e)},children:j.map((function(e){return Object(v.jsx)(g,{value:e,children:e},e)}))}),Object(v.jsx)(h.a,{className:"button-style",icon:Object(v.jsx)(m.a,{}),type:"ghost",disabled:0===R.length,onClick:function(){return function(){var e,t,n;(null===(e=B.current)||void 0===e?void 0:e.paused)?null===(t=B.current)||void 0===t||t.play():null===(n=B.current)||void 0===n||n.pause()}()},children:(null===(e=B.current)||void 0===e?void 0:e.paused)?"D\u1eebng":"Ti\u1ebfp t\u1ee5c"}),Object(v.jsx)(h.a,{className:"button-style",type:"primary",icon:Object(v.jsx)(O.a,{}),disabled:0===c.length,onClick:function(){return D()},children:"\u0110\u1ecdc"})]}),Object(v.jsx)("audio",{ref:B,id:"audio",src:R})]})},w=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,88)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,r=t.getLCP,o=t.getTTFB;n(e),a(e),c(e),r(e),o(e)}))};o.a.render(Object(v.jsx)(c.a.StrictMode,{children:Object(v.jsx)(y,{})}),document.getElementById("root")),w()}},[[79,1,2]]]);
//# sourceMappingURL=main.b673635f.chunk.js.map