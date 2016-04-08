window.addEventListener("load", function() {
    var listElement = document.getElementById("personList");
    document.getElementById("addTip").addEventListener("click", function(){
        var newElement = listElement.getElementsByTagName("li")[0].cloneNode(true);
        listElement.appendChild(newElement);
        var removeButton = document.createElement("input");
        removeButton.setAttribute("type", "button");
        removeButton.setAttribute("value", "Remove");
        newElement.appendChild(removeButton);
        removeButton.addEventListener("click", function() {
            listElement.removeChild(newElement);
        });
    });
    document.getElementById("calculateButton").addEventListener("click", function() {
        var outputElem = document.getElementById("outputDiv");
        //Array of Person Object
        var result = [];
        var personElements  = listElement.getElementsByTagName("li");
        // Parse Elements and Calculate
        console.log("number of persons : " + personElements.length);
        var totalAge = 0;
        for(i=0; i < personElements.length; i++)
        {
            var inutElements = personElements[i].getElementsByTagName("input");
            var person = new Person();
            console.log("number of Attributes : " + inutElements.length);
            for(j=0; j < inutElements.length; j++)
            {
                if(inutElements[j].name == "name"){
                    person.name = inutElements[j].value;
                    console.log("Person Name: " + person.name);
                }
                 if(inutElements[j].name == "age"){
                    person.age = inutElements[j].value;
                    totalAge = totalAge + parseInt(person.age);
                    console.log("Person Age: " + person.age);
                }
            }
            result.push(person);
        }
        
        var billValue = parseFloat(document.getElementById("billTotal").value);
        var tipPercent = parseFloat(document.getElementById("tipPercent").value);
        var totalBill = billValue + (billValue * (tipPercent / 100));
        console.log(totalBill + " :: " + totalAge);
        var partialBill = totalBill / totalAge;
         for(i=0; i < result.length; i++)
         {
             result[i].bill = partialBill * result[i].age;
         }
         function Person() {
            this.name = "";
            this.age = 1;
            this.bill = "0";
        }
        Person.prototype.toString = function () {
            var billString = this.bill.toString();
            return this.name + "[" + this.age + "] Pays " + billString;
        };
         outputElem.innerHTML = result.join("<br>");
    });
});