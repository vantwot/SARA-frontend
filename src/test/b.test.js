const { sum, subtract, multiply, divide, getCourses } =
    require("./index1");
test("get the courses", () => {
    expect(getCourses([{}, 0, {}, 3])).toEqual(expect.arrayContaining([{grade:0}, {grade:3}]));
    expect(getCourses([{}, 1, {}, 4])).toEqual(expect.arrayContaining([{grade:1}, {grade:4}]));
    expect(getCourses([{}, "4", {}, "2"])).toEqual(expect.arrayContaining([{grade:"4"}, {grade:"2"}]));
    expect(getCourses([{name:"MATEMATICAS"}, "4.7", {name:"DESARROLLO"}, 5]))
            .toEqual(expect.arrayContaining([{name:"MATEMATICAS", grade:"4.7"}, {name:"DESARROLLO", grade:5}]));
    expect(getCourses([{name:"DESARROLLO"}, "3.6", {name:"PROGRAMACION"}, "4.1", {name:"DISCRETAS"}, "2.1"]))
            .toEqual(expect.arrayContaining([{name:"DESARROLLO", grade:"3.6"}, {name:"PROGRAMACION", grade:"4.1"}, {name:"DISCRETAS", grade:"2.1"}]));
});