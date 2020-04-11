// ==UserScript==
// @name         [niconico video] Add the "Add My List" button to search result page
// @name:ja      [ニコニコ動画] 検索結果ページからマイリストするボタンを追加
// @description  Add the "Add My List" button to niconico video search result page
// @description:ja 検索結果ページページからマイリストするボタンを追加
// @namespace    masshiro.blog
// @version      20200411
// @author       masshiro
// @match        http://www.nicovideo.jp/search/*
// @match        https://www.nicovideo.jp/search/*
// @match        http://www.nicovideo.jp/tag/*
// @match        https://www.nicovideo.jp/tag/*
// @grant        MIT
// ==/UserScript==
(function () {
    'use strict';

    var span = document.createElement('span');
    span.className = 'value';
    span.style='color:#F00;text-decoration:underline;cursor:pointer';
    span.innerHTML='追加';

    var li = document.createElement('li');
    li.appendChild(span);
    li.className = 'count';

    li.addEventListener('click',function () {
        window.open('http://www.nicovideo.jp/mylist_add/video/' + encodeURIComponent(document.querySelectorAll('li[data-video-item]')[0].getAttribute('data-video-id')), 'nicomylistadd', 'width=500, height=400, menubar=no, scrollbars=no');
    },false);

    Array.prototype.forEach.call(document.querySelectorAll('li[data-video-item] div.itemContent div.itemData ul.list'), function(item,i) {
        var lis = li.cloneNode(true);
        lis.addEventListener('click',function () {
            window.open('http://www.nicovideo.jp/mylist_add/video/' + encodeURIComponent(document.querySelectorAll('li[data-video-item]')[i].getAttribute('data-video-id')), 'nicomylistadd', 'width=500, height=400, menubar=no, scrollbars=no');
        },false);
        item.appendChild(lis);
    });

    document.body.addEventListener('AutoPagerize_DOMNodeInserted',function(evt){
        Array.prototype.forEach.call(evt.target.querySelectorAll('li[data-video-item] div.itemContent div.itemData ul.list'), function(item,i) {
            var lis = li.cloneNode(true);
            lis.addEventListener('click', function () {
                window.open('http://www.nicovideo.jp/mylist_add/video/' + encodeURIComponent(evt.target.querySelectorAll('li[data-video-item]')[i].getAttribute('data-video-id')), 'nicomylistadd', 'width=500, height=400, menubar=no, scrollbars=no');
            },false);
            item.appendChild(lis);
        });
    }, false);
})();