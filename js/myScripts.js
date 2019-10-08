var dogRepository = (function() {
    var newdogRepository = [
        { name: "Baxter", height: 16, color: "Brown", breed: "Basenji" },
        { name: "Pokemon", height: 26, color: "Black", breed: "Doberman" },
        { name: "Lucy", height: 10, color: "Grey", breed: "Maltese" }
    ];
    return {
        getAll: function() {
            return newdogRepository;
        },
        add: function(item) {
            newdogRepository.push({ name: item.name, height: item.height, color: item.color, breed: item.breed });
        },
        addListItem: function(dog) {
            var listItem = document.createElement('li');
            var dogButton = document.createElement('button');

            // create the button
            dogButton.innerText = dog.name;
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