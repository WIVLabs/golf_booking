from ddict import DotAccessDict
from pprint import pprint
import requests
import sys

def add_course(_json):
    url = 'http://127.0.0.1:8000/api/golf-courses'
    resp = requests.post(url, json=_json)
    if resp:
        return resp.json()
    else:
        print(resp.reason, file=sys.stderr)
        return None


def add_course_mapper(_json):
    url = 'http://127.0.0.1:8000/api/golf-course-mapper'
    resp = requests.post(url, json=_json)
    if resp:
        return resp.json()
    else:
        print(resp.reason, file=sys.stderr)
        print(resp.text, file=sys.stderr)
        return None

def run():
    keys_course = ['region', 'name', 'disp_name', 'address', 'url']
    keys_mapper = ['info_url', 'booking_url', 'pk_in_site']
    with open('xgolf.txt') as f:
        for i, line in enumerate(f, start=1):
            print('{} {}'.format(i, '-'*100))

            data = line.strip().split('\t')
            _json = DotAccessDict(dict(zip(keys_course, data[:5])))
            print(_json)
            course = add_course(_json)
            if course:
                print(course)
                _json = DotAccessDict(dict(zip(keys_mapper, data[4:])))
                _json.golf_course = course['id']
                _json.site = 2
                print(_json)
                print(add_course_mapper(_json))



if __name__ == '__main__':
    # run()
    pass