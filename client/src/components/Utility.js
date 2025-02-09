import moment from 'moment';

// 객체 유틸리티
const ObjectUtility = {
    isEmpty : (obj) => {
        return !(obj != undefined && obj != null);
    },
    isNotEmpty : (obj) => {
        return !ObjectUtility.isEmpty(obj);
    }
};

// List, Map등 유틸리티
const CollectionUtility = {
    groupBy : (list, getKeyFunc) => {
        const map = new Map();
        list.forEach((item) => {
            const key = getKeyFunc(item);
            const collection = map.get(key);
            if (ObjectUtility.isEmpty(collection)) {
                map.set(key, [item]);
            }
            else {
                collection.push(item);
            }
        });
        return map;
    },
    isEmpty: (obj) => {
        if (ObjectUtility.isEmpty(obj)) return true;
        if (obj.length < 1) return true;

        return false;
    },
    length: (obj) => {
        if (ObjectUtility.isEmpty(obj)) return 0;

        return obj.length;
    }
}


moment.locale('ko');

// 날짜 유틸리티
const DateUtility = {
    DF_DATE : "YYYYMMDD", // 날짜기본포멧
    now: () => {
        return moment({}).format('YYYY-MM-DD HH:mm');
    },
    convert: (obj, sourceFormat, targetFormat) => {
        if (StringUtility.isEmpty(obj)) {
            console.log('대상 객체가 없습니다.');
            return '';
        }
        if (StringUtility.isEmpty(sourceFormat)) {
            sourceFormat = DateUtility.DF_DATE;
        }
        if (StringUtility.isEmpty(targetFormat)) {
            console.log('대상 포멧이 없습니다.');
            return obj;
        }

        return moment(obj, sourceFormat).format(targetFormat);
    },
    getWeekdayCode : (dateStr, format=DateUtility.DF_DATE) => {
        return moment(dateStr, format).day();
    },
    isSaturday: (weekdayCode) => {
        return weekdayCode == 6;
    },
    isSunday: (weekdayCode) => {
        return  weekdayCode == 0;
    },
    isSaturdayByDate: (dateStr, format=DateUtility.DF_DATE) => {
        return DateUtility.isSaturday(DateUtility.getWeekdayCode(dateStr, format));
    },
    isSundayByDate: (dateStr, format=DateUtility.DF_DATE) => {
        return DateUtility.isSunday(DateUtility.getWeekdayCode(dateStr, format));
    }
};

// 문자열 유틸리티
const StringUtility = {
    trim : (obj) => {
        if (obj === undefined || obj == null) return '';

        return obj.trim();
    },
    isEmpty : (obj) => {
        return obj === undefined || obj == null || obj.length < 1;
    },
    withComma : (str) => {
        if (StringUtility.isEmpty(str)) return '';

        return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
};

export {
    CollectionUtility,
    ObjectUtility,
    DateUtility,
    StringUtility
}