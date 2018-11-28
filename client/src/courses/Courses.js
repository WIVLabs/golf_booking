import React from "react";
import CourseList from "../components/CourseList";


class Courses extends React.Component {

    constructor() {
        super();
    }

    render() {
        let params = new URLSearchParams(window.location.search);

        return (
            <div>
                <h4>검색</h4>

                {/*TODO shine 검색창 추가*/}

                <h4>골프장부킹가능목록</h4>
                <CourseList />
            </div>
    )};
}


export default Courses;