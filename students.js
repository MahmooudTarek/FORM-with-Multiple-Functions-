window.addEventListener("load", function () {
    //     1- Complete the Student form demo to achieve the following 
    // requirements.
    // All validations should be with error messages not alerts
    // 1- StudentName should not be empty, should not be repeated in 
    // table and always added to the table with first letter capitalized. 
    // 2- StudentGrade should be between 0:100
    let studentName = document.querySelector("input[name=studentName]")
    let nameError = document.querySelector("#nameError")

    let studentGrade = document.querySelector("input[name=studentGrade]")
    let gardeError = document.querySelector("#gardeError")

    let capitaize = function (word) {
        let old = word
        let nWord = old.split()
        nWord[0] = nWord[0].toUpperCase
        nWord.join()
        return nWord
    }


    //validate Name
    studentName.addEventListener("blur", function () {
        if (this.value == '') {
            nameError.classList.remove("hide")

        } else {
            nameError.classList.add("hide")
        }
    })

    //validate Grade
    studentGrade.addEventListener("blur", function () {
        if (100 < this.value || this.value < 0) {
            gardeError.classList.remove("hide")
        } else {
            gardeError.classList.add("hide")
        }
    })

    // create table     
    let tableGrade = document.createElement("table")
    tableGrade.classList.add("tableGrade")
    document.querySelector("form").appendChild(tableGrade)

    let add = document.querySelector("input[type=button ]")
    ArrayStudent = []

    let AddRow = function (name, grade) {
        let studentrow = document.createElement("tr")
        tableGrade.appendChild(studentrow)

        let studentDetails = document.createElement("td")
        studentDetails.innerText = name
        studentrow.append(studentDetails)

        studentDetails = document.createElement("td")
        studentDetails.innerText = grade
        studentDetails.classList.add("studentGrade")
        studentrow.append(studentDetails)

        studentDetails = document.createElement("td")
        let deletButton = document.createElement("button")
        deletButton.innerText = "delete"
        studentDetails.append(deletButton)
        studentrow.append(studentDetails)
    }
    //push array 
    add.addEventListener("click", function () {
        let isExist = false

        for (i in ArrayStudent) {
            if (ArrayStudent[i].Name == studentName.value) {
                isExist = true
                break;
            }
        }

        if (isExist == false) {
            ArrayStudent.push({
                Name: studentName.value,
                Grade: studentGrade.value
            })
            //append Rows 
            AddRow(studentName.value, studentGrade.value)
        } else {
            console.log("repeted name");
        }

    })

    //fillter
    let filter = document.querySelector("select[name=filterStudents]")

    filter.addEventListener("change", function () {

        let grades = document.querySelectorAll(".tableGrade tr .studentGrade")

        if (this.value == "success") {
            for (item of grades) {
                item.parentElement.classList.remove("hide")
                if (item.innerHTML <= 60) {
                    item.parentElement.classList.add("hide")
                }
            }
        }
       
        else if (this.value == "fail") {
            for (item of grades) {
                item.parentElement.classList.remove("hide")
                if (item.innerHTML > 60) {
                    item.parentElement.classList.add("hide")
                }
            }
        } else {
            for (item of grades) {
                item.parentElement.classList.remove("hide")
            }
        }

    })

    //sort
    let sort = document.querySelector("select[name=sortStudents]")

    sort.addEventListener("change", function () {

        if (sort.value == "Grade") {
            ArrayStudent.sort((a, b) => {
                return parseInt(a.Grade) - parseInt(b.Grade)
            })
            tableGrade.innerHTML = ""

            for (i in ArrayStudent) {

                AddRow(ArrayStudent[i].Name, ArrayStudent[i].Grade)
            }
        }
        else if(sort.value=="Name"){
            ArrayStudent.sort((a, b) => {
                return parseInt(a.Name[0]) - parseInt(b.Name[0])
            })
            tableGrade.innerHTML = ""

            for (i in ArrayStudent) {

                AddRow(ArrayStudent[i].Name, ArrayStudent[i].Grade)
            }
        }
    })

})