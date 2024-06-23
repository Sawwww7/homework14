/*Вам необхідно створити конструктор Студента, у якого мають бути властивості:
 ім'я, прізвище, рік народження, оцінки, відвідуваність, курс.
 Кількість оцінок і відвіданих занять залежить від курсу, на якому займається студент.
  Так само у Студента є методи: додати оцінку,  додати відвідування, отримати середню успішність,
   отримати середнє відвідування, отримати кількість пройдених занять, змінити курс 
  (мають оновитися дані про курс), а також отримати всю інформацію про студента.*/
///////////////////////////////////////////////////////////////////////////////////



class Studens {
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

  giveARating(ratingValue) {
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

const Andrii = new Studens("Andrii", "Fedorov", 1989, "javaScript");
Andrii.giveARating(90); // поставити оцінку
Andrii.giveARating(100);
console.log(`${Andrii.rating}`); //показати оцінки

Andrii.present(); //додати відвідування був
Andrii.absent(); //додати відвідування небув
Andrii.present();
Andrii.present();
Andrii.absent();
Andrii.present();

console.log(Andrii.absence); //показати відвідування

console.log(Andrii.getAnAverageProgress()); //отримати середню успішність
console.log(Andrii.getAnAverageVisit()); //отримати середнє відвідування
console.log(Andrii.absenceIndex); //отримати кількість пройдених занять
Andrii.changeCourse("ReactJS"); // змінити курс
console.log(Andrii.course1);
console.log(Andrii.getAllInformation()); //отримати всю інформацію про студента

console.log(`${Andrii.course1}`); //паказати курс
Andrii.addCourse("Payton"); //додати курс
console.log(Andrii.course1[0], Andrii.course1[1]);
Andrii.deleteCurse("Java"); //видалити курс

////////////////////////////////////////////////////////////////////////////////////
/*Додати Студенту можливість навчатися на кількох курсах з можливістю додавання і видалення курсу.*/
///////////////////////////////////////////////////////////////////////////////////////////////
/*Створити конструктор Група, яка має список студентів і методи для додавання, видалення студентів,
 а також одержання рейтингу студентів за відвідуваністю і успішністю.*/


