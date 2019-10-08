var dogRepository = (function() {
    var newdogRepository = [
        { breed: "Basenji", name: "Baxter", age: "6 months" },
        { breed: "Doberman", name: "Pokemon", age: "1 yr" },
        { breed: "Maltese", name: "Lucy", age: "4 yrs" },
        { breed: "German Shepherd", name: "Cesar", age: "5 yrs" },
        { breed: "Spaniel", name: "Candy", age: "3 yrs" },
        { breed: "Akita", name: "Lucky", age: "11 months" }
    ];
    return {
        getAll: function() {
            return newdogRepository;
        },
        add: function(item) {
            newdogRepository.push({ name: item.name, age: item.age, breed: item.breed });
        },
        addListItem: function(dog) {
            var listItem = document.createElement('li');
            var dogButton = document.createElement('button');

            // create the button
            dogButton.innerText = dog.breed;
            dogButton.classList.add('dog-button');
            dogButton.addEventListener('click', function(event) {
                this.showDetails(dog);
            }.bind(this));

            // create the list item and add it to the DOM
            listItem.append(dogButton);
            dogListElement.append(listItem);
        },
        showDetails: function(dog) {
            console.log(dog);
        }
    };
})();

// getting the dog list element from index.html
var dogListElement = document.querySelector('.dog-list');

// get all the dogs for looping over
var dogs = dogRepository.getAll();

// loop over them
for (var dog of dogs) {
    dogRepository.addListItem(dog);
}