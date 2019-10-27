var dogRepository = (function() {
    var newdogRepository = [

    ];
    fetch('https://dog.ceo/api/breeds/list/all').then(function(response) {
        return response.json(); // This returns a promise!
    }).then(function(dogList) {
        for (var breed in dogList.message) {

            dogRepository.add(breed)
            dogRepository.addListItem(breed)
        }
    }).catch(function() {
        // Error
    });
    return {
        getAll: function() {
            return newdogRepository;
        },
        add: function(breed) {
            newdogRepository.push({ breed: breed });
        },
        addListItem: function(breed) {
            console.log(breed);
            var listItem = document.createElement('li');
            var dogButton = document.createElement('button');

            // create the button
            dogButton.innerText = breed;
            dogButton.classList.add('dog-button');
            dogButton.addEventListener('click', function(event) {
                this.showDetails(breed);
            }.bind(this));

            // create the list item and add it to the DOM
            listItem.append(dogButton);
            dogListElement.append(listItem);
        },
        showDetails: function(breed) {
            fetch(`https://dog.ceo/api/breed/${breed}/images/random`).then(function(response) {
                return response.json(); // This returns a promise!
            }).then(function(image) {
                console.log(image); // The actual JSON response
            }).catch(function() {
                // Error
            });

        }
    };
})();

// getting the dog list element from index.html
var dogListElement = document.querySelector('.dog-list');

// get all the dogs for looping over
var dogs = dogRepository.getAll();
console.log(dogs.length);