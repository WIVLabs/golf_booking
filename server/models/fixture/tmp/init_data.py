from pprint import pprint
import json

o_list = []
with open('init_data.txt') as f:
    for line in f:
        data = line.strip().split('\t')
        d = {
            "model": "server.golfcourse",
            "pk": int(data[0]),
            "fields": {
              "name": data[1],
              "disp_name": data[2],
              "address": data[3],
              "region": data[4],
              "url": data[5],
              "status": data[6],
              "created_at": '{}T{}.000'.format(data[7].split(' ')[0], data[7].split(' ')[1]),
              "updated_at": '{}T{}.000'.format(data[8].split(' ')[0], data[8].split(' ')[1]),
            }
          }
        o_list.append(d)
        pprint(d)

import json
with open('golfcourse.json', 'w') as fo:
    json.dump(sorted(o_list, key=lambda x: x['pk']), fo)

