import requests
from bs4 import BeautifulSoup as BS
from urllib.parse import urlparse
from gcrawler.utils.timer import timeit
from json import load, dump
from ddict import DotAccessDict
# import xmltojson
import xmltodict


class Downloader:
    def __init__(self, url, fname=None, debug=False, encoding=None):
        self.url = url
        self.fname = fname
        self.debug = debug
        self.encoding = encoding

    @property
    def soup(self):
        _page = self.page
        return _page and BS(_page, 'html.parser') or None

    @property
    @timeit
    def page(self):
        if self.debug:
            with open(self.fname) as f:
                return f.read()
        else:
            print('download: {}'.format(self.url))
            resp = requests.get(self.url, headers=self.make_headers())
            text = resp.ok \
                   and (self.encoding and str(resp.content, self.encoding, 'replace') or resp.text) \
                   or ''
            if self.fname:
                with open(self.fname, 'w') as f:
                    f.write(text)
            return text

    @property
    @timeit
    def json(self):
        if self.debug:
            with open(self.fname) as f:
                _json = load(f)
                return isinstance(_json, dict) and DotAccessDict(_json) or _json
        else:
            print('download: {}'.format(self.url))
            resp = requests.get(self.url, headers=self.make_headers())
            _json = resp.ok and resp.json() or {}
            if self.fname:
                with open(self.fname, 'w') as f:
                    dump(_json, f)
            return isinstance(_json, dict) and DotAccessDict(_json) or _json

    @property
    @timeit
    def xml_to_json(self):
        if self.debug:
            with open(self.fname, encoding='utf8') as f:
                text = f.read()
                return text and DotAccessDict(xmltodict.parse(text)) or None
        else:
            print('download: {}'.format(self.url))
            resp = requests.get(self.url, headers=self.make_headers())
            text = resp.ok \
                   and (self.encoding and str(resp.content, self.encoding, 'replace') or resp.text) \
                   or ''
            if self.fname:
                with open(self.fname, 'w') as f:
                    f.write(text)
            return text and DotAccessDict(xmltodict.parse(text)) or None

    def make_headers(self):
        def get_ua():
            return 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36'

        def get_referer():
            _parsed = urlparse(self.url)
            return '{}://{}'.format(_parsed.scheme and _parsed.scheme or 'http', _parsed.netloc)

        return {
            'User-Agent': get_ua(),
            'Referer': get_referer()
        }
