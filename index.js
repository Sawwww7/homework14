/*Вам необхідно створити конструктор Студента, у якого мають бути властивості:
 ім'я, прізвище, рік народження, оцінки, відвідуваність, курс.
 Кількість оцінок і відвіданих занять залежить від курсу, на якому займається студент.
  Так само у Студента є методи: додати оцінку,  додати відвідування, отримати середню успішність,
   отримати середнє відвідування, отримати кількість пройдених занять, змінити курс 
  (мають оновитися дані про курс), а також отримати всю інформацію про студента.*/
///////////////////////////////////////////////////////////////////////////////////

class Student {
  constructor(studentName, lastName, birthDay, course) {
    this.studentName = studentName; //ім'я
    this.lastName = lastName; //прізвище
    this.birthDay = birthDay; //рік народження
    this.course1 = [course]; // курс
    if (this.course1.includes("javaScript")) {
      this.engage = 18;
    } else if (this.course1.includes("ReactJS")) {
      this.engage = 38;
    }

    this.rating = new Array(this.engage); // оцінки
    this.absenceIndexRating = 0; //кількість поставленних оцінок
    this.absence = new Array(this.engage); // відвідуваність
    this.absenceIndex = 0; //кількість пройдених заннять
  }

  giveAEvaluation(ratingValue) {
    //додати оцінку

    if (this.rating.length > this.absenceIndexRating) {
      this.rating[this.absenceIndexRating] = ratingValue;
      this.absenceIndexRating++;
    }
  }

  absent() {
    //добавити був відсутнім на занняті
    if (this.absence.length > this.absenceIndex) {
      this.absence[this.absenceIndex] = false;
      this.absenceIndex++;
    }
  }

  present() {
    //добавити був на занняті
    if (this.absence.length > this.absenceIndex) {
      this.absence[this.absenceIndex] = true;
      this.absenceIndex++;
    }
  }

  getAnAverageProgress() {
    //отримати середню успішність
    const count =
      this.rating.reduce((acc, num) => acc + num, 0) / this.absenceIndexRating;
    return count;
  }
  getAnAverageVisit() {
    //отримати середнє відвідування
    let count = this.absence.filter(Boolean).length / this.absenceIndex;
    return count.toFixed(2);
  }

  changeCourse(course) {
    //змінити курс
    this.course1.splice(0, 1, course);
  }
  addCourse(course) {
    //додати курс
    this.course1.push(course);
  }
  deleteCurse(course) {
    //видалити курс
    console.log(this.course1);
    let a = this.course1.indexOf(course);
    if (a < 0) {
      console.log(`you don't have a course: ${course}`);
    } else {
      this.course1.splice(a, 1);
    }
  }
  getAllInformation() {
    //отримати всю інформацію про студента
    return `Student name: ${this.studentName}; lastName: ${
      this.lastName
    }; Birth day: ${this.birthDay};
Course: ${this.course1}; Average score: ${this.getAnAverageProgress()};
Average Visit: ${this.getAnAverageVisit()}; rating ${this.getAnAverageProgress()}; the number of classes completed: ${
      this.absenceIndex
    } `;
  }
}

const andrii = new Student("Andrii", "Fedorov", 1989, "javaScript");
andrii.giveAEvaluation(90); // поставити оцінку
andrii.giveAEvaluation(100);
console.log(`${andrii.rating}`); //показати оцінки

andrii.present(); //додати відвідування був
andrii.absent(); //додати відвідування небув
andrii.present();
andrii.present();
andrii.absent();
andrii.present();

console.log(andrii.absence); //показати відвідування

console.log(andrii.getAnAverageProgress()); //отримати середню успішність
console.log(andrii.getAnAverageVisit()); //отримати середнє відвідування
console.log(andrii.absenceIndex); //отримати кількість пройдених занять
andrii.changeCourse("ReactJS"); // змінити курс
console.log(andrii.course1);
console.log(andrii.getAllInformation()); //отримати всю інформацію про студента

console.log(`${andrii.course1}`); //паказати курс
andrii.addCourse("Python"); //додати курс
console.log(andrii.course1[0], andrii.course1[1]);
andrii.deleteCurse("Java"); //видалити курс

////////////////////////////////////////////////////////////////////////////////////
/*Додати Студенту можливість навчатися на кількох курсах з можливістю додавання і видалення курсу.*/
///////////////////////////////////////////////////////////////////////////////////////////////
/*Створити конструктор Група, яка має список студентів і методи для додавання, видалення студентів,
 а також одержання рейтингу студентів за відвідуваністю і успішністю.*/
//////////////////////////////////////////////////////////////////////

class Group {
  constructor() { 
    this.student = [];
    console.log(this.student);
  }

  addStudent(student) {
    this.student.push(student);
  }

  removeStudent(stud) {
    //debugger
    let a = this.student.indexOf(stud);
    if (a < 0) {
      console.log(`you don't have a student: ${stud}`);
    } else {
      this.student.splice(a, 1);
    }
  }




}
let course = new Group();

const mariia = new Student("Mariia", "Skochyjkovska", 2001, "javaScript");
const alyna = new Student("Alyna", "Ovchinikova", 2000, "javaScript");
const mykola = new Student("Mykola", "Zaitsev", 2006, "javaScript");
const andriiF = new Student("Andrii", "Fedorov", 1989, "javaScript");

mykola.present();
mykola.present();
mykola.absent();
mykola.giveAEvaluation(100);
mykola.giveAEvaluation(70);
mykola.giveAEvaluation(60);
console.log(`${mykola.rating}`)

andriiF.present();
andriiF.present();
andriiF.present();
andriiF.giveAEvaluation(90);
andriiF.giveAEvaluation(70);
andriiF.giveAEvaluation(50);
andriiF.giveAEvaluation(100);
console.log(`${andriiF.rating}`)


mariia.present();
mariia.present();
mariia.absent();
mariia.giveAEvaluation(80);
mariia.giveAEvaluation(30);
mariia.giveAEvaluation(40);

alyna.present();
alyna.present();
alyna.present();
alyna.giveAEvaluation(90);
alyna.giveAEvaluation(90);
alyna.giveAEvaluation(90);

course.addStudent(mariia);
course.addStudent(alyna);
course.addStudent(mykola);
course.addStudent(andriiF);

console.log(course.student);
//course.removeStudent(andriiF);
console.log(course.student);
