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
            dogButton.innerText = breed[0].toUpperCase() + breed.slice(1);
            dogButton.classList.add('dog-button');
            dogButton.addEventListener('click', function(event) {
                this.showDetails(breed);
            }.bind(this));

            // create the list item and add it to the DOM
            listItem.append(dogButton);
            dogListElement.append(listItem);
        },
        showDetails: async function(breed) {
            const imageResponse = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
            const subBreedResponse = await fetch(`https://dog.ceo/api/breed/${breed}/list`)
            const imageJSON = await imageResponse.json();
            const subBreedJSON = await subBreedResponse.json();
            createReusableModal()
            showModal({ imageURL: imageJSON.message, subBreeds: subBreedJSON.message })
            console.log({ imageURL: imageJSON.message, subBreeds: subBreedJSON.message })

        }

    };


})();
var $modalContainer = document.getElementById("modal-container")

function createReusableModal() {

    var modal = document.createElement('div');
    var modalElement1 = document.createElement('div');
    var modalElement2 = document.createElement('div');
    modalElement2.classList.add('dog-info')
    modal.classList.add('modal');
    modal

    var closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    //closeButtonElement.addEventListener('click', hideModal)
    var titleElement = document.createElement('h3');
    titleElement.innerHTML = "SubBreeds"
    var imageElement = document.createElement('img');
    imageElement.classList.add('dog-img');
    var subBreedElement = document.createElement('ul');
    subBreedElement.classList.add('subbreeds');
    modal.appendChild(closeButtonElement);

    /* modal.appendChild(imageElement); 
    modal.appendChild(subBreedElement);
    modalElement1.appendChild(closeButtonElement);
    modal.appendChild(modalElement1); */
    modalElement2.appendChild(imageElement);
    modalElement2.appendChild(titleElement);
    modalElement2.appendChild(subBreedElement);
    modal.appendChild(modalElement2)
    $modalContainer.appendChild(modal);
}

//Function to show modal for dog data
function showModal(item) {

    //create element for dog name

    var subBreedElement = document.querySelector('.subbreeds');
    var imageElement = document.querySelector('.dog-img');
    imageElement.setAttribute('src', item.imageURL);
    if (item.subBreeds.length === 0) {
        var Element = document.createElement('p');
        Element.innerHTML = "no subbreeds"
        subBreedElement.appendChild(Element)
    } else {
        for (var i = 0; i < item.subBreeds.length; i++) {
            var element = document.createElement('li');
            element.innerHTML = item.subBreeds[i];
            subBreedElement.appendChild(element)

        }
    }
    $modalContainer.classList.add('is-visible');
}
//Function to hide modal
function hideModal() {
    //var $modalContainer = document.querySelector('#modal-container');
    $modalContainer.classList.remove('is-visible');
    $modalContainer.innerHTML = ""
}
//Function to show details of each dog
function showDetails(item) {
    dogRepository.loadDetails(item).then(function() {
        console.log(item);
        return item;
    }).then(function(item) {
        console.log('TCL: showDetails -> item', item);
        showModal(item);
    });
}
window.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && $modalContainer.classList.contains('is-visible')) {
        hideModal();
    }
});
$modalContainer.addEventListener('click', (e) => {
    // Since this is also triggered when clicking INSIDE the modal
    // We only want to close if the user clicks directly on the overlay
    var target = e.target;
    console.log('TCL: dogRepository -> target', target);
    var $modalClose = document.querySelector('.modal-close');
    if (target === $modalContainer || $modalClose) {
        hideModal();
    }
})

// getting the dog list element from index.html
var dogListElement = document.querySelector('.dog-list');

// get all the dogs for looping over
var dogs = dogRepository.getAll();
console.log(dogs.length);