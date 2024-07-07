// @ts-ignore
import './m3u8-parser';

export function checkContent(content: string) {
    console.log('content', content);
    if (content.trim().startsWith("#EXTM3U")) {
        return true;
    }

    return false;
}

export function observeResponse() {
    const _r_text = window.Response.prototype.text;
    console.log(_r_text, '_r_text')
    window.Response.prototype.text = function () {
        return new Promise((resolve, reject) => {
            _r_text.call(this).then((text) => {
                resolve(text);
                if (checkContent(text)) parseM3UVideo({ url: this.url, content: text });
            }).catch(reject);
        });
    }

    const _open = window.XMLHttpRequest.prototype.open;
    // @ts-ignore
    window.XMLHttpRequest.prototype.xxx = 'hh';
    window.XMLHttpRequest.prototype.open = function (...args) {
        this.addEventListener("load", () => {
            try {
                let content = this.responseText;
                if (checkContent(content)) parseM3UVideo({ url: args[1], content });
            } catch { }
        });
        // checkUrl(args[1]);
        return _open.apply(this, args);
    }
}

export async function parseM3UVideo({ url, content }) {
    url = new URL(url);

    // 解析 m3u
    content = content || await(await fetch(url)).text();

    const parser = new window.m3u8Parser.Parser();
    parser.push(content);
    parser.end();
    const manifest = parser.manifest;

    console.log('manifest', manifest);
}