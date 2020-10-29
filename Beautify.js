// ==UserScript==
// @name         PT-Script-Beautify
// @namespace    http://tampermonkey.net/
// @version      0.0.1
// @author       Lepton
// @updateURL    https://raw.githubusercontent.com/Debuffxb/PT-Script/master/Beautify.js
// @downloadURL  https://raw.githubusercontent.com/Debuffxb/PT-Script/master/Beautify.js
// @homepage     https://github.com/Debuffxb/PT-Script
// @match        https://pthome.net/*
// @match        https://www.beitai.pt/*
// @match        https://pterclub.com/*
// @match        https://hdhome.org/*
// @match        https://ourbits.club/*
// @match        https://pt.btschool.club/*
// @match        https://www.nicept.net/*
// @match        https://leaguehd.com/*
// @match        https://hdstreet.club/*
// @match        https://hdsky.me/*
// @match        https://pt.m-team.cc/*
// @match        https://www.hddolby.com/*
// @match        https://pt.msg.vg/*
// @match        https://tjupt.org/*
// @match        https://www.haidan.video/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';
    //图片地址
    let pic_url = '';
    if(document.getElementsByClassName('mainouter')[0]){
        document.getElementsByClassName('mainouter')[0].style.width = "90%";
        document.getElementsByClassName('mainouter')[0].style.minWidth = "810px";
        document.getElementsByClassName('mainouter')[0].style.backgroundColor = "rgba(0,0,0,0)";
    }

    if(document.getElementsByClassName('head')[0] && window.location.host != 'tjupt.org'){
        document.getElementsByClassName('head')[0].style.width = "90%";
        document.getElementsByClassName('head')[0].style.minWidth = "810px";
    }

    if(document.getElementsByClassName('main')[1]){
        document.getElementsByClassName('main')[1].style.width = "99%";
        document.getElementsByClassName('main')[1].style.minWidth = "800px";
        document.getElementsByClassName('main')[1].style.backgroundColor = "rgba(0,0,0,0)";
    }

    document.getElementsByTagName('body')[0].style.background = `url("${pic_url}") no-repeat center top`;
    document.getElementsByTagName('body')[0].style.backgroundSize = 'cover';
    document.getElementsByTagName('body')[0].style.backgroundAttachment = 'fixed';

    let widthIs940 = document.querySelectorAll('[width="940"]');
    let length = widthIs940.length;
    for(let i = 0; i < length; i++){
        widthIs940[i].removeAttribute('width');
    }

    let widthIsPercent13 = document.querySelectorAll('[width="13%"]');
    length = widthIsPercent13.length;
    for(let i = 0; i < length; i++){
        widthIsPercent13[i].removeAttribute('width');
    }

    let widthIsPercent87 = document.querySelectorAll('[width="87%"]');
    length = widthIsPercent87.length;
    for(let i = 0; i < length; i++){
        widthIsPercent87[i].removeAttribute('width');
    }

    var ul = document.getElementsByTagName('ul');
    for(let item of ul){
        item = item.getElementsByTagName('li');
        for(let li of item){
            li.style.backgroundColor = 'rgba(0,0,0,0)'
        }
    }

    var tagNameList = ['tr', 'table', 'a', 'td'];
    var tagTransparent = [0,0,0,0];
    var classNameList = ['progressseeding', 'progressfinished', 'torrents progresstable', 'torrents-progress', 'colhead', 'torrents', 'outer', 'nav_bg text', 'menu', 'embedded'];
    var classTransparent = [128,255,255,0.4,
                            255,128,191,0.4,
                            255,255,255,0.5,
                            128,255,255,0.4,
                            0,0,0,0,
                            255,255,255,0.5,
                            0,0,0,0,
                            0,0,0,0,
                            0,0,0,0,
                            0,0,0,0,
                            0];

    tagNameList.forEach((item,i) => {
        var nodes = document.getElementsByTagName(item);
        for(let item of nodes){
            item.style.background = 'none';
            item.style.backgroundColor = 'rgba(0,0,0, ' + tagTransparent[i] + ')';
        }
    })

    classNameList.forEach((element,i) => {
        var nodes = document.getElementsByClassName(element);
        for(let item of nodes){
            item.style.background = 'none';
            item.style.backgroundColor = `rgba(${classTransparent[i * 4]},${classTransparent[i * 4 + 1]},${classTransparent[i * 4 + 2]},${classTransparent[i * 4 + 3]}`;
        }
    })

    var a = document.getElementsByTagName('tr');
    //M-Team
    /*
    for(var i = 0; i < a.length; i++){
        if(a[i].children[1]){
            if(a[i].children[1].innerHTML.indexOf('+20%') != -1){
                a[i].parentNode.removeChild(a[i]);
                i--;
                continue;
            }
        }
        if(a[i].children[5]){
            if(a[i].children[5].children[0]){
                if(parseInt(a[i].children[5].children[0].innerHTML) == 0){
                    a[i].parentNode.removeChild(a[i]);
                    i--;
                }
            }
        }
    }
*/




    //HDSky
/*     for(var i = 0; i < a.length; i++){
        if(a[i].children[1] && a[i].classList[0] == 'progresstr'){
            if(a[i].children[1].innerHTML.indexOf('官方') == -1 || a[i].children[1].innerHTML.indexOf('禁转') != -1){
                a[i].parentNode.removeChild(a[i]);
                i--;
                continue;
            }
        }
        if(a[i].children[5]){
            if(a[i].children[5].children[0]){
                if(a[i].children[5].children[0].children[0]){
                    if(parseInt(a[i].children[5].children[0].children[0].innerHTML) <= 2 || parseInt(a[i].children[5].children[0].children[0].innerHTML) > 10){
                        a[i].parentNode.removeChild(a[i]);
                        i--;
                    }
                }
            }
        }
    } */
    // Your code here...
})();
