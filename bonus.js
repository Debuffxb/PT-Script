// ==UserScript==
//
// @name         PT-Script-Bonus-A
// @namespace    http://tampermonkey.net/
// @version      0.0.3
// @author       Lepton
// @updateURL    https://raw.githubusercontent.com/Debuffxb/PT-Script/master/bonus.js
// @downloadURL  https://raw.githubusercontent.com/Debuffxb/PT-Script/master/bonus.js
// @homepage     https://github.com/Debuffxb/PT-Script
// @match        http*://moecat.best/torrents*
// @match        http*://pthome.net/torrents*
// @match        http*://www.beitai.pt/torrents*
// @match        http*://pterclub.com/torrents*
// @match        http*://hdhome.org/torrents*
// @match        http*://ourbits.club/torrents*
// @match        http*://pt.btschool.club/torrents*
// @match        http*://www.nicept.net/torrents*
// @match        http*://tjupt.org/torrents.php*
// @match        http*://pt.m-team.cc/movie.php*
// @match        http*://pt.m-team.cc/torrents.php*
// @match        http*://pt.m-team.cc/music.php*
// @match        http*://pt.m-team.cc/adult.php*
// @match        http*://pt.m-team.cc/adult.php*
// @match        http*://hdsky.me/torrents.php*
// @match        http*://leaguehd.com/torrents.php*
// @match        http*://www.hddolby.com/torrents.php*
// @match        http*://hdstreet.club/torrents*
// @run-at       document-end
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

    i = 1;
    t0=4;
    n0=7;
    // match sites start
    if (host == 'moecat.best'){
        t0 = 15;
        n0 = 7;
        pre.setAttribute('rowspan', 2);
        after.setAttribute('rowspan', 2);
        i = 2;
    }

    if (host == 'pterclub.com'){
        t0 = 26;
        n0 = 7;
        i = 1;
    }

    if (host == 'pt.btschool.club') {
        i = 1;
        t0=200;
        n0=7;
    }
    if (host == 'hdstreet.club') {
        t0 = 4;
        n0 = 7;
        pre.setAttribute('rowspan', 2);
        after.setAttribute('rowspan', 2);
        i = 2;
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
        if (host == 'moecat.best' || host == 'hdstreet.club' ){
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
        } else if (si.indexOf('KiB') != -1) {
            si = parseFloat(si) / 1000 /1000;
        } else if (si.indexOf('MiB') != -1) {
            si = parseFloat(si) / 1000;
        } else if (si.indexOf('GiB') != -1) {
            si = parseFloat(si);
        } else if (si.indexOf('TiB') != -1) {
            si = parseFloat(si) * 1000;
        }
        ti = ti.replace(/-/g,"/");
        ti = new Date(ti).getTime();
        ti = new Date().getTime() - ti;
        ti = ti / 3600.0 / 24.0 / 7.0 / 1000.0;
        var temp = 1 - Math.pow(10, - (ti / t0))
        var pre_res = temp * si * ( 1 + Math.sqrt(2) * Math.pow(10, - ( ni - 1 ) / ( n0 - 1 )));
        var aft_res = temp * si * ( 1 + Math.sqrt(2) * Math.pow(10, - ( ni ) / ( n0 - 1 )));
        if (host == 'hdsky.me'){
            pre_res = pre_res * 5 / ni;
            aft_res = aft_res * 5 / (ni + 1);
        }
        if (host == 'leaguehd.com'){
            pre_res = pre_res / ni;
            aft_res = aft_res / (ni + 1);
        }
        pre.innerHTML = parseInt(pre_res);
        after.innerHTML = parseInt(aft_res);
    }

    var a = document.getElementsByTagName('tr');
    //M-Team
    //去除本页面内所有做种数为0的种子，即断种；并且去除所有加成为20%的官种，避免拖低官种加成(最大为25%)
    /*
    for(i = 0; i < a.length; i++){
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
    //去除本页面内所有做种人数小于min或者大于max的种子以及非官种种子
    /*
    var min = 2;
    var max = 10;
    for(i = 0; i < a.length; i++){
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
                    if(parseInt(a[i].children[5].children[0].children[0].innerHTML) <= min || parseInt(a[i].children[5].children[0].children[0].innerHTML) > max){
                        a[i].parentNode.removeChild(a[i]);
                        i--;
                    }
                }
            }
        }
    }
    */

})();
