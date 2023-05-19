export const getDates = (courses) => {
    let appointments = [];
    let appointment = {};
    let appointment_last_week = {};
    let course = {};
    let startHour = 0;
    let endHour = 0;
    let counter = 0;

    const today = new Date();
    const week = {
        "lunes": 1 + today.getDate() - today.getDay(),
        "martes": 2 + today.getDate() - today.getDay(),
        "miercoles": 3 + today.getDate() - today.getDay(),
        "jueves": 4 + today.getDate() - today.getDay(),
        "viernes": 5 + today.getDate() - today.getDay(),
        "sabado": 6 + today.getDate() - today.getDay(),
        "domingo": 7 + today.getDate() - today.getDay(),
    }

    for (let i = 0; i < courses.length; i++) {
        //console.log(courses[i]);
        course = courses[i];
        for (let j = 0; j < course.horario.date.length; j++) {
            startHour = course.horario.time[j].split("-")[0];
            endHour = course.horario.time[j].split("-")[1];

            appointment = {
                id: counter,
                title: course.name,
                startDate: new Date(today.getFullYear(), today.getMonth(), week[course.horario.date[j]], startHour.split(":")[0], startHour.split(":")[1]), //new Date(2021, 4, 10, 10, 0),
                endDate: new Date(today.getFullYear(), today.getMonth(), week[course.horario.date[j]], endHour.split(":")[0], endHour.split(":")[1]), //new Date(2021, 4, 10, 12, 0),
                location: course.horario.place[j],
            };

            appointment_last_week = {
                id: counter+1,
                title: course.name,
                startDate: new Date(today.getFullYear(), today.getMonth(), week[course.horario.date[j]]-7, startHour.split(":")[0], startHour.split(":")[1]), //new Date(2021, 4, 10, 10, 0),
                endDate: new Date(today.getFullYear(), today.getMonth(), week[course.horario.date[j]]-7, endHour.split(":")[0], endHour.split(":")[1]), //new Date(2021, 4, 10, 12, 0),
                location: course.horario.place[j],
            };

            appointments.push(appointment);
            appointments.push(appointment_last_week);
            counter+=2;
        }
    }
    return appointments;
}

export const getCourses = (courses) => {
    let currentCourse = {};
    var coursesList = [];
    for (let i = 0; i < courses.length; i+=2) {
        currentCourse = courses[i];
        currentCourse.grade = courses[i+1];
        coursesList.push(currentCourse);
    }
    return coursesList;
}
