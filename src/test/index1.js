function getCourses(courses) {
    let currentCourse = {};
    var coursesList = [];
    for (let i = 0; i < courses.length; i+=2) {
        currentCourse = courses[i];
        currentCourse.grade = courses[i+1];
        coursesList.push(currentCourse);
    }
    return coursesList;
}

module.exports = {
    getCourses
};