class Student {
    constructor(studentName, lastName, birthDay, course) {
        this.studentName = studentName; // ім'я
        this.lastName = lastName; // прізвище
        this.birthDay = birthDay; // рік народження
        this.courses = {}; // курси з рейтингом та відвідуваністю

        this.addCourse(course);
    }

    initializeCourseData(course) {
        // ініціалізувати рейтинги та відвідуваність курсу
        let engage;
        if (course === "javaScript") {
            engage = 18;
        } else if (course === "ReactJS") {
            engage = 38;
        } else {
            engage = 0;
        }
        this.courses[course] = {
            engage: engage,
            ratings: new Array(engage).fill(0),
            absence: new Array(engage).fill(false),
            absenceIndexRating: 0,
            absenceIndex: 0,
        };
    }

    giveAEvaluation(course, ratingValue) {
        // додати оцінку
        if (this.courses[course]) {
            const courseData = this.courses[course];
            if (courseData.ratings.length > courseData.absenceIndexRating) {
                courseData.ratings[courseData.absenceIndexRating] = ratingValue;
                courseData.absenceIndexRating++;
            }
        }
    }

    absent(course) {
        // добавити був відсутнім на занятті
        if (this.courses[course]) {
            const courseData = this.courses[course];
            if (courseData.absence.length > courseData.absenceIndex) {
                courseData.absence[courseData.absenceIndex] = false;
                courseData.absenceIndex++;
            }
        }
    }

    present(course) {
        // добавити був на занятті
        if (this.courses[course]) {
            const courseData = this.courses[course];
            if (courseData.absence.length > courseData.absenceIndex) {
                courseData.absence[courseData.absenceIndex] = true;
                courseData.absenceIndex++;
            }
        }
    }

    getAnAverageProgress(course) {
        // отримати середню успішність
        if (this.courses[course]) {
            const courseData = this.courses[course];
            if (courseData.absenceIndexRating === 0) return 0;
            const count = courseData.ratings.reduce((acc, num) => acc + num, 0) / courseData.absenceIndexRating;
            return count || 0;
        }
        return 0;
    }

    getAnAverageVisit(course) {
        // отримати середнє відвідування
        if (this.courses[course]) {
            const courseData = this.courses[course];
            if (courseData.absenceIndex === 0) return "0.00";
            let count = courseData.absence.filter(Boolean).length / courseData.absenceIndex;
            return count.toFixed(2) || "0.00";
        }
        return "0.00";
    }

    changeCourse(oldCourse, newCourse) {
        // змінити курс (заміна одного курсу на інший)
        if (this.courses[oldCourse]) {
            delete this.courses[oldCourse];
            this.addCourse(newCourse);
        } else {
            console.log(`Course ${oldCourse} not found.`);
        }
    }

    addCourse(course) {
        // додати курс
        if (!this.courses[course]) {
            this.initializeCourseData(course);
        }
    }

    deleteCourse(course) {
        // видалити курс
        if (this.courses[course]) {
            delete this.courses[course];
        } else {
            console.log(`You don't have a course: ${course}`);
        }
    }

    getAllInformation() {
        // отримати всю інформацію про студента
        const courseInfo = Object.keys(this.courses).map(course => {
            return `Course: ${course}; Average score: ${this.getAnAverageProgress(course)};
Average Visit: ${this.getAnAverageVisit(course)}; Rating ${this.getAnAverageProgress(course)};
Number of classes completed: ${this.courses[course].absenceIndex}`;
        }).join("\n");

        return `Student name: ${this.studentName}; lastName: ${this.lastName}; Birth day: ${this.birthDay};\n${courseInfo}`;
    }
}

class Group {
    constructor() {
        this.students = [];
    }

    addStudent(student) {
        this.students.push(student);
    }

    removeStudent(studentName, lastName) {
        const index = this.students.findIndex(
            student => student.studentName === studentName && student.lastName === lastName
        );
        if (index < 0) {
            console.log(`You don't have a student: ${studentName} ${lastName}`);
        } else {
            this.students.splice(index, 1);
        }
    }

    getStudentsProgressRating() {
        // отримати рейтинг студентів за успішністю
        const sortedByProgress = this.students.map(student => {
            return {
                studentName: student.studentName,
                lastName: student.lastName,
                courses: Object.keys(student.courses).map(course => ({
                    course,
                    averageProgress: student.getAnAverageProgress(course),
                    averageVisit: student.getAnAverageVisit(course)
                }))
            };
        }).sort((a, b) => {
            const aAvgProgress = a.courses.reduce((sum, c) => sum + c.averageProgress, 0) / a.courses.length;
            const bAvgProgress = b.courses.reduce((sum, c) => sum + c.averageProgress, 0) / b.courses.length;
            return bAvgProgress - aAvgProgress;
        });

        sortedByProgress.forEach((student, index) => {
            console.log(`На ${index + 1}-му місці по успішності студент: ${student.studentName} ${student.lastName} з рейтингом ${student.courses[0].averageProgress}`);
        });

        return sortedByProgress;
    }

    getStudentsAttendanceRating() {
        // отримати рейтинг студентів за відвідуваністю
        const sortedByAttendance = this.students.map(student => {
            return {
                studentName: student.studentName,
                lastName: student.lastName,
                courses: Object.keys(student.courses).map(course => ({
                    course,
                    averageProgress: student.getAnAverageProgress(course),
                    averageVisit: student.getAnAverageVisit(course)
                }))
            };
        }).sort((a, b) => {
            const aAvgVisit = a.courses.reduce((sum, c) => sum + parseFloat(c.averageVisit), 0) / a.courses.length;
            const bAvgVisit = b.courses.reduce((sum, c) => sum + parseFloat(c.averageVisit), 0) / b.courses.length;
            return bAvgVisit - aAvgVisit;
        });

        sortedByAttendance.forEach((student, index) => {
            console.log(`На ${index + 1}-му місці по відвідуваності студент: ${student.studentName} ${student.lastName} з відвідуваністю ${student.courses[0].averageVisit}`);
        });

        return sortedByAttendance;
    }
}

const course = new Group();

const mariia = new Student("Mariia", "Skochyjkovska", 2001, "javaScript");
const alyna = new Student("Alyna", "Ovchinikova", 2000, "javaScript");
const mykola = new Student("Mykola", "Zaitsev", 2006, "javaScript");
const andrii = new Student("Andrii", "Fedorov", 1989, "javaScript");

mykola.present("javaScript");
mykola.present("javaScript");
mykola.absent("javaScript");
mykola.giveAEvaluation("javaScript", 100);
mykola.giveAEvaluation("javaScript", 70);
mykola.giveAEvaluation("javaScript", 70);

andrii.present("javaScript");
andrii.present("javaScript");
andrii.present("javaScript");
andrii.giveAEvaluation("javaScript", 90);
andrii.giveAEvaluation("javaScript", 70);
andrii.giveAEvaluation("javaScript", 50);
andrii.giveAEvaluation("javaScript", 100);

mariia.present("javaScript");
mariia.present("javaScript");
mariia.absent("javaScript");
mariia.giveAEvaluation("javaScript", 80);
mariia.giveAEvaluation("javaScript", 30);
mariia.giveAEvaluation("javaScript", 40);

alyna.present("javaScript");
alyna.present("javaScript");
alyna.present("javaScript");
alyna.giveAEvaluation("javaScript", 90);
alyna.giveAEvaluation("javaScript", 90);
alyna.giveAEvaluation("javaScript", 90);

course.addStudent(mariia);
course.addStudent(alyna);
course.addStudent(mykola);
course.addStudent(andrii);

console.log(course.students);
 //course.removeStudent("Mariia", "Skochyjkovska");

console.log(course.getStudentsProgressRating());
console.log(course.getStudentsAttendanceRating());
console.log(andrii.getAllInformation());