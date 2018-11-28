import React from "react";

class CourseList extends React.Component {
    render() {
        let lastedRefreshDateTime = "2018/11/28 15:00:01"
        return (
            <div className="container-fluid">
                <div className="table-responsive">
                    <div className="align-right">최종 조회 시간 {lastedRefreshDateTime}</div>
                    <table className="table table-striped table-sm">
                        <thead>
                        <tr>
                            <th>골프장</th>
                            <th>2018.12.01(토)</th>
                            <th>2018.12.02(일)</th>
                            <th>2018.12.03(월)</th>
                            <th>2018.12.04(화)</th></tr></thead>
                        <tbody>
                        <tr>
                            <td>88</td>
                            <td>08:07<a href="http://golf.sbs.co.kr"><img src="http://golf.sbs.co.kr/favicon.ico" /></a> 08:14<img src="http://golf.sbs.co.kr/favicon.ico" /></td>
                            <td>08:07<a href="http://golf.sbs.co.kr"><img src="http://golf.sbs.co.kr/favicon.ico" /></a> 08:14<img src="http://golf.sbs.co.kr/favicon.ico" /></td>
                            <td>08:07<a href="http://golf.sbs.co.kr"><img src="http://golf.sbs.co.kr/favicon.ico" /></a> 08:14<img src="http://golf.sbs.co.kr/favicon.ico" /></td>
                            <td>08:07<a href="http://golf.sbs.co.kr"><img src="http://golf.sbs.co.kr/favicon.ico" /></a> 08:14<img src="http://golf.sbs.co.kr/favicon.ico" /></td>
                        </tr>
                        <tr>
                            <td>99</td>
                            <td>08:07<img src="http://golf.sbs.co.kr/favicon.ico" /> 08:14<img src="http://golf.sbs.co.kr/favicon.ico" /></td>
                            <td>08:07<img src="http://golf.sbs.co.kr/favicon.ico" /> 08:14<img src="http://golf.sbs.co.kr/favicon.ico" /></td>
                            <td>08:07<img src="http://golf.sbs.co.kr/favicon.ico" /> 08:14<img src="http://golf.sbs.co.kr/favicon.ico" /></td>
                            <td>08:07<img src="http://golf.sbs.co.kr/favicon.ico" /> 08:14<img src="http://golf.sbs.co.kr/favicon.ico" /></td>
                        </tr>
                        <tr>
                            <td>오라CC</td>
                            <td>08:07<img src="http://golf.sbs.co.kr/favicon.ico" /> 08:14<img src="http://golf.sbs.co.kr/favicon.ico" /></td>
                            <td>08:07<img src="http://golf.sbs.co.kr/favicon.ico" /> 08:14<img src="http://golf.sbs.co.kr/favicon.ico" /></td>
                            <td>08:07<img src="http://golf.sbs.co.kr/favicon.ico" /> 08:14<img src="http://golf.sbs.co.kr/favicon.ico" /></td>
                            <td>08:07<img src="http://golf.sbs.co.kr/favicon.ico" /> 08:14<img src="http://golf.sbs.co.kr/favicon.ico" /></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>)
    };
}



export default CourseList;