import moment from 'moment';

moment.locale('ko');

// 날짜 유틸리티
const DateUtility = {
    now : () => {
        return moment({}).format('YYYY-MM-DD HH:mm');
    },
    convert : (obj, sourceFormat, targetFormat) => {
        if (StringUtility.isEmpty(obj)) { console.log('대상 객체가 없습니다.'); return '';}
        if (StringUtility.isEmpty(sourceFormat)) { console.log('원본 포멧이 없습니다'); return obj;}
        if (StringUtility.isEmpty(targetFormat)) { console.log('대상 포멧이 없습니다.'); return obj;}

        return moment(obj, sourceFormat).format(targetFormat);
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
    }
};

export {
    DateUtility,
    StringUtility
}