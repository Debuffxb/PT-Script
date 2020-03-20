// ==UserScript==
// @name         PT-Script-Info-Generator
// @namespace    http://tampermonkey.net/
// @version      0.0.1
// @author       Lepton
// @updateURL    https://raw.githubusercontent.com/Debuffxb/PT-Script/master/InfoGenerator.js
// @downloadURL  https://raw.githubusercontent.com/Debuffxb/PT-Script/master/InfoGenerator.js
// @homepage     https://github.com/Debuffxb/PT-Script
// @match        https://moecat.best/upload*
// @match        https://pthome.net/upload*
// @match        https://www.beitai.pt/upload*
// @match        https://pterclub.com/upload*
// @match        http://hdhome.org/upload*
// @match        http://ourbits.club/upload*
// @match        https://pt.btschool.club/upload*
// @match        https://www.nicept.net/upload*
// @match        https://leaguehd.com/upload*
// @grant        none
// ==/UserScript==


(function() {
    'use strict';
    var father = document.createElement('div');
    var child = document.createElement('div');
    var css = document.createElement('style');
    css.type = 'text/css';
    var str = '\
.tzui-text{\
    position: relative;\
    margin:0 auto;\
    padding-top: 2rem;\
    padding-bottom: 2rem;\
}\
.tzui-text-label,\
.tzui-text-input {\
    color:black;\
    display: block;\
    font-size: 1rem;\
    position: absolute;\
    outline: none;\
    cursor: text;\
    border: 0;\
    top:1rem;\
    text-align: left;\
    width: 100%;\
}\
\
.tzui-text-input{\
    border-bottom: .125rem solid gray;\
}\
.tzui-text-input::placeholder{\
    transition: inherit;\
    opacity: 0;\
}\
\
.tzui-text-label{\
    padding-right: 0.5rem;\
}\
\
.tzui-text-label,\
.tzui-text-input:focus,\
.tzui-text-input:focus+.tzui-text-label{\
    transition-duration: .5s;\
    -webkit-transition-duration: .5s;\
}\
\
.tzui-text-input:not(:placeholder-shown)+.tzui-text-label,\
.tzui-text-input:focus+.tzui-text-label{\
    animation: label-amp 0.5s;\
    top:.125rem;\
    font-size: 0.5rem;\
}\
.tzui-text-input:focus{\
    border-bottom: .125rem solid lightcoral;\
}\
\
@keyframes label-amp {\
    0%{\
        font-size: 1rem;\
        top:1rem;\
    }\
    100%{\
        font-size: 0.5rem;\
        top:.125rem;\
    }\
}\
\
.tzui-btn{;\
    position: relative;\
    padding: 0.5rem 0.8rem;\
    border:1px solid lightseagreen;\
    display:block;\
    font-size: 1rem;\
    font-family: Monaco,monospace;\
    cursor: pointer;\
    text-align: center;\
    color: black;\
    overflow: hidden;\
    outline: none;\
    transition-duration: .5s;\
    -webkit-transition-duration: .5s;\
}\
\
.tzui-btn:hover {\
    box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);\
}\
\
.tzui-btn-ripple::after{\
    transition-duration: .5s;\
    -webkit-transition-duration: .5s;\
}\
\
.tzui-btn-ripple::after{\
    content: "";\
    background-color: lightskyblue;\
    border-radius: 4em;\
    display: block;\
    position: absolute;\
    width: 100%;\
    top:0;\
    height: 100%;\
    left: 0;\
    opacity:0;\
}\
\
.tzui-btn-ripple:active::after{\
    left: 50%;\
    width: 0;\
    height: 0;\
    top:50%;\
    transition: 0s;\
    opacity:1;\
}\
';
    css.innerHTML = str;
    document.getElementsByTagName('head')[0].append(css);
    father.style.width = '100%';
    father.style.position = 'fixed';
    father.style.top = '10px';
    document.getElementsByTagName('body')[0].append(father);
    father.append(child);
    var text = document.createElement('div');
    var link = document.createElement('div');
    link.style = 'width: 40%; max-width: 30rem; min-width: 10rem; background: lightpink; margin:0 auto';
    text.className = 'tzui-text';
    var input = document.createElement('input');
    input.className = 'tzui-text-input';
    input.style = 'background: lightpink;';
    input.id = 'link';
    input.placeholder = "Link";
    var label = document.createElement('label');
    label.className = 'tzui-text-label';
    label.setAttribute('for', 'link')
    label.innerHTML = 'Link';
    child.append(link);
    link.append(text);
    text.append(input);
    text.append(label);
    text.style = 'width: 80%; max-width: 20rem; min-width: 10rem; background: lightpink;';
    var btn_f = document.createElement('div');
    btn_f.style = 'width: 10em; margin:0 auto;'
    var btn = document.createElement('div');
    btn.className = 'tzui-btn tzui-btn-ripple';
    btn.style = 'height:100%, width: 100%;background: lightcyan'
    btn.innerHTML = '查询';
    link.append(btn_f);
    btn_f.append(btn);
    btn.addEventListener('click', function (){
        if(!input.value){
            return;
        }
        var url = 'https://api.nas.ink/infogen?url=' + encodeURI(input.value);
        jQuery.ajax({
            type: 'get',
            url: url,
			withCredentials: true,
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                if(!data.hasOwnProperty('format')){
                    return btn.innerHTML = '链接有误';
                }
                document.getElementsByClassName('bbcode')[0].innerHTML = data.format;
                document.getElementsByName('url')[0].value = data.imdb_link;
                document.getElementsByName('douban_url')[0].value = data.douban_link;
            },
            error: function(xhr,state,errorThrown){
                alert(state);
            }
        });
    });
    // Your code here...
})();
