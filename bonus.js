// ==UserScript==
// @name         PT-Bonus-A
// @namespace    http://tampermonkey.net/
// @version      0.0.1
// @author       Lepton
// @updateURL    https://raw.githubusercontent.com/Debuffxb/PT-Bonus-A/master/bonus.js
// @downloadURL  https://raw.githubusercontent.com/Debuffxb/PT-Bonus-A/master/bonus.js
// @homepage     https://github.com/Debuffxb/PT-Bonus-A
// @match        https://moecat.best/torrents*
// @match        https://pthome.net/torrents*
// @match        https://www.beitai.pt/torrents*
// @match        https://pterclub.com/torrents*
// @match        http://hdhome.org/torrents*
// @match        http://ourbits.club/torrents*
// @match        https://pt.btschool.club/torrents*
// @match        https://www.nicept.net/torrents*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var host = window.location.host;
    var i;
    var t0;
    var n0;
    var rs = document.getElementsByClassName("torrents")[0].rows;
    var len = rs.length;
    var head = rs[0];
    var pre = document.createElement("td");
    pre.className = "colhead";
    pre.setAttribute('align', 'center');
    pre.innerHTML = "A 值";
    var after = document.createElement("td");
    after.className = "colhead";
    after.setAttribute('align', 'center');
    after.innerHTML = "Seeder+1 后 A 值";

    // match sites start
    if (host == 'moecat.best'){
        t0 = 15;
        n0 = 7;
        pre.setAttribute('rowspan', 2);
        after.setAttribute('rowspan', 2);
        i = 2;
    } else if (host == 'pterclub.com'){
        t0 = 26;
        n0 = 7;
        i = 1;
    } else if (host == 'pthome.net') {
        i = 1;
        t0=4;
        n0=7;
    } else if (host == 'www.beitai.pt') {
        i = 1;
        t0=4;
        n0=7;
    } else if (host == 'hdhome.org') {
        i = 1;
        t0=4;
        n0=7;
    } else if (host == 'pt.btschool.club') {
        i = 1;
        t0=200;
        n0=7;
    } else if (host == 'www.nicept.net') {
        i = 1;
        t0=4;
        n0=7;
    } else if (host == 'ourbits.club') {
        i = 1;
        t0=4;
        n0=7;
    }
    // match sites stop


    head.appendChild(pre);
    head.appendChild(after);
    for (; i < len; i++){
        var tr = rs[i];
        var seeder;
        var ti;
        var si;
        pre = document.createElement("td");
        pre.className = "rowfollow";
        pre.setAttribute('align', 'center');
        after = document.createElement("td");
        after.className = "rowfollow";
        after.setAttribute('align', 'center');
        // match sites start
        if (host == 'moecat.best'){
            pre.setAttribute('rowspan', 2);
            after.setAttribute('rowspan', 2);
            seeder = tr.children[2];
            ti = rs[i + 1].children[1].children[0].title;
            si = rs[i + 1].children[2].innerHTML;
            i++;
        } else {
            seeder = tr.children[5];
            ti = tr.children[3].children[0].title;
            si = tr.children[4].innerHTML;
        }
        // match sites stop
        tr.appendChild(pre);
        tr.appendChild(after);
        var ni;
        if (seeder.children[0].children[0]){
            if (seeder.children[0].children[0].children[0]){
                ni = parseInt(seeder.children[0].children[0].children[0].innerHTML);
            }else {
                ni = parseInt(seeder.children[0].children[0].innerHTML);
            }
        } else {
            ni = parseInt(seeder.children[0].innerHTML);
        }
        if (si.indexOf('KB') != -1) {
            si = parseFloat(si) / 1024 /1024;
        } else if (si.indexOf('MB') != -1) {
            si = parseFloat(si) / 1024;
        } else if (si.indexOf('GB') != -1) {
            si = parseFloat(si);
        } else if (si.indexOf('TB') != -1) {
            si = parseFloat(si) * 1024;
        }
        ti = ti.replace(/-/g,"/");
        ti = new Date(ti).getTime();
        ti = new Date().getTime() - ti;
        ti = ti / 3600.0 / 24.0 / 7.0 / 1000.0;
        var temp = 1 - Math.pow(10, - (ti / t0))
        var pre_res = temp * si * ( 1 + Math.sqrt(2) * Math.pow(10, - ( ni - 1 ) / ( n0 - 1 )));
        var aft_res = temp * si * ( 1 + Math.sqrt(2) * Math.pow(10, - ( ni ) / ( n0 - 1 )));
        pre.innerHTML = parseInt(pre_res);
        after.innerHTML = parseInt(aft_res);
    }
})();
