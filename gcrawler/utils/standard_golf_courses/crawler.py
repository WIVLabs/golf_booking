import time
import json
from random import randint
from pprint import pprint
from gcrawler.utils.downloader import Downloader

DEBUG = False


def process():
    areas = [
        (2, 'R1'),
        (1, 'R2'),
        (4, 'R3'),
        (3, 'R4'),
        (5, 'R5'),
        (6, 'R6'),
        (7, 'R7'),
    ]
    for i, (map_area, code) in enumerate(areas, start=1):
        with open('{}.json'.format(code), 'w') as f:
            for j, golf_course in enumerate(iter_golf_courses(map_area), start=1):
                print('-' * 100)
                print(i, j, golf_course)
                time.sleep(randint(1, 4))

                info = get_info(golf_course['code'])
                pprint(info)

                golf_course['info'] = info
                golf_course['info_dict'] = {k: v for k, v in info}
                f.write('{}\n'.format(json.dumps(golf_course)))


def iter_golf_courses(map_area):
    uri = 'http://golfhankook.hankooki.com/05_course/search.php?map_area={}'.format(map_area)
    soup_obj = Downloader(uri, 'list.html', debug=DEBUG, encoding='euc-kr').soup
    for tag in soup_obj.select('dl.list_area > dd > a'):
        code = tag.attrs['onclick'].split("'")[1]
        name = tag.string.strip()
        if name.find('(P)') >= 0: continue

        yield {
            'code': code,
            'name': name.split('(', 1)[0].strip()
        }


def get_info(code):
    info = []
    uri = 'http://ace.hankooki.com/join/golf/green_info.php?code={}'.format(code)
    soup_obj = Downloader(uri, 'detail.html', debug=DEBUG, encoding='euc-kr').soup
    for tag in soup_obj.select('table > tr'):
        key_tag = tag.select_one('th > img')
        if key_tag:
            key = key_tag.attrs['alt']
            value = tag.select_one('td').string
            if value:
                info.append((key, value.strip()))
    return info


if __name__ == '__main__':
    process()
