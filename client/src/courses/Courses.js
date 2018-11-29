import React from "react";
import BookingList from "./components/BookingList";
import CourseSearch from "./components/CourseSearch";


class Courses extends React.Component {

    constructor() {
        super();
    }

    render() {
        let params = new URLSearchParams(window.location.search);

        return (
            <div>
                <CourseSearch/>

                {/*TODO shine 검색창 추가*/}

                <h4>골프장부킹가능목록</h4>
                <BookingList />
            </div>
    )};
}


export default Courses;