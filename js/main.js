var fullNameInput = document.getElementById("fullName");
var phoneNumber = document.getElementById("phoneNumber");
var emailAddress = document.getElementById("emailAddress");
var address = document.getElementById("address");
var group = document.getElementById("group");
var notes = document.getElementById("notes");
var isFavorite = document.getElementById("isFavorite");
var isEmergency = document.getElementById("isEmergency");
var rowData = document.getElementById("rowData");
var totalContacts = document.getElementById("totalContacts");
var favoritesCount = document.getElementById("favoritesCount");
var emergencyCount = document.getElementById("emergencyCount");
var favoritesList = document.getElementById("favoritesList");
var emergencyList = document.getElementById("emergencyList");

var allContact = [];

if (localStorage.getItem("contacts")) {
  allContact = JSON.parse(localStorage.getItem("contacts"));
  console.log(allContact);
  display();
}

function addContact() {
  var newContact = {
    fullName: fullNameInput.value,
    phoneNumber: phoneNumber.value,
    email: emailAddress.value,
    address: address.value,
    group: group.value,
    notes: notes.value,
    isFavorite: isFavorite.checked,
    isEmergency: isEmergency.checked,
  };

  allContact.push(newContact);

  console.log(allContact);

  localStorage.setItem("contacts", JSON.stringify(allContact));

  closeModal();

  Swal.fire({
    title: "Added Successfully!",
    text: "You clicked the button!",
    icon: "success",
  });

  reset();

  display();
}

function reset() {
  fullName.value = "";
  phoneNumber.value = "";
  emailAddress.value = "";
  address.value = "";
  group.value = "";
  notes.value = "";
  isFavorite = false;
  isEmergency = false;
}

function display() {
  if (allContact.length === 0) {
    rowData.innerHTML = `
        
            <div class="col-12">
                    <p class="alert alert-warning text-center text-danger">
                      No contacts found
                    </p>
                </div>
        
        
        `;

    return;
  }

  var cartona = "";
  var favTotal = 0;
  var emgTotal = 0;
  var favCartona = "";
  var emgCartona = "";

  for (var i = 0; i < allContact.length; i++) {
    if (allContact[i].isFavorite) {
      favTotal++;
      favCartona += `
            
                 <div class="sidebar-contact-card">
                    <div class="sidebar-contact-avatar" style="background: #3b82f6">
                      ${allContact[i].fullName.charAt(0)}
                    </div>
                    <div class="sidebar-contact-info">
                      <h5>${allContact[i].fullName}</h5>
                      <p>${allContact[i].phoneNumber}</p>
                    </div>
                    <button class="sidebar-call-btn favorites-call">
                      <i class="fas fa-phone"></i>
                    </button >
                </div> 
            
            `;
    }

    if (allContact[i].isEmergency) {
      emgTotal++;
      emgCartona += `
            
                 <div class="sidebar-contact-card">
                    <div class="sidebar-contact-avatar" style="background: #3b82f6">
                      ${allContact[i].fullName.charAt(0)}
                    </div>
                    <div class="sidebar-contact-info">
                      <h5>${allContact[i].fullName}</h5>
                      <p>${allContact[i].phoneNumber}</p>
                    </div>
                    <button class="sidebar-call-btn favorites-call">
                      <i class="fas fa-phone"></i>
                    </button >
                </div> 
            
            `;
    }

    cartona += `
            <div class="col-md-6">

                    <div class="contact-card">
                      <div class="contact-header">
                        <div
                          class="contact-avatar bg-primary ${allContact[i].isFavorite ? "favorite" : ""} ${allContact[i].isEmergency ? "emergency" : ""}"
                        >
                          ${allContact[i].fullName.split(" ")[0].charAt(0)}${allContact[i].fullName.split(" ")[0].charAt(1)}
                        </div>
                        <div class="contact-info">
                          <h4>${allContact[i].fullName}</h4>
                        </div>
                      </div>
                      <div class="contact-details">
                        <div class="contact-detail phone">
                          <i class="fas fa-phone"></i>
                          <span>${allContact[i].phoneNumber}</span>
                        </div>
                        <div class="contact-detail email">
                          <i class="fas fa-envelope"></i>
                          <span>${allContact[i].email}</span>
                        </div>
                        <div class="contact-detail address">
                          <i class="fas fa-map-marker-alt"></i>
                          <span>${allContact[i].address}</span>
                        </div>
                      </div>
                      <div class="contact-tags">
                        <span class="tag family">${allContact[i].group}</span>
                        ${allContact[i].isEmergency ? '<span class="tag emergency"><i class="fas fa-heartbeat"></i> Emergency</span>' : ""}
                        ${allContact[i].isFavorite ? '<span class="tag emergency bg-warning"><i class="fas fa-heartbeat"></i> Favorite</span>' : ""}
                      </div>
                      <div class="contact-actions">
                        <button class="contact-action call" title="Call">
                          <i class="fas fa-phone"></i>
                        </button>
                        <button class="contact-action email" title="Email">
                          <i class="fas fa-envelope"></i>
                        </button>
                        <button onclick="toggleFav(${i})"
                          class="contact-action favorite ${allContact[i].isFavorite ? "active" : ""}">
                          <!-- title="Favorite" -->
                           <i class="fas fa-star"></i> 
                        </button>
                        <button onclick="toggleEmg(${i})"
                          class="contact-action emergency ${allContact[i].isEmergency ? "active" : ""}"
                          title="Emergency">
                           <i class="fas fa-heart"></i>
                         </button> 
                        <button class="contact-action" onclick="editData(${i})" data-bs-toggle="modal" data-bs-target="#addContactModal" title="Edit">
                          <i class="fas fa-edit"></i>
                         </button>
                         <button class="contact-action delete" onclick="deleteContact(${i})" title="Delete">
                          <i class="fas fa-trash"></i>
                        </button>
                      </div>
                    </div>

                 </div>
        
        
        `;
  }

  rowData.innerHTML = cartona;
  totalContacts.innerHTML = allContact.length;
  favoritesCount.innerHTML = favTotal;
  emergencyCount.innerHTML = emgTotal;
  favoritesList.innerHTML = favCartona;
  emergencyList.innerHTML = emgCartona;
}

function deleteContact(index) {
  console.log(index);

  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      allContact.splice(index, 1);

      display();

      localStorage.setItem("contacts", JSON.stringify(allContact));
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
    }
  });
}

var addBtn = document.getElementById("saveContactBtn");
var updateBtn = document.getElementById("updateContactBtn");

var currentIndex = 0;

function editData(index) {
  console.log(index);

  fullNameInput.value = allContact[index].fullName;
  phoneNumber.value = allContact[index].phoneNumber;
  emailAddress.value = allContact[index].email;
  address.value = allContact[index].address;
  group.value = allContact[index].group;
  notes.value = allContact[index].notes;
  isFavorite.checked = allContact[index].isFavorite;
  isEmergency.checked = allContact[index].isEmergency;

  addBtn.classList.add("d-none");
  updateBtn.classList.remove("d-none");

  currentIndex = index;
}

function updateContact() {
  var newContact = {
    fullName: fullNameInput.value,
    phoneNumber: phoneNumber.value,
    email: emailAddress.value,
    address: address.value,
    group: group.value,
    notes: notes.value,
    isFavorite: isFavorite.checked,
    isEmergency: isEmergency.checked,
  };

  allContact.splice(currentIndex, 1, newContact);

  closeModal();

  Swal.fire({
    title: "Updated Successfully!",
    text: "You clicked the button!",
    icon: "success",
  });

  display();

  localStorage.setItem("contacts", JSON.stringify(allContact));
}

function toggleFav(index) {
  console.log(allContact[index]);

  allContact[index].isFavorite = !allContact[index].isFavorite;

  display();

  localStorage.setItem("contacts", JSON.stringify(allContact));
}

function toggleEmg(index) {
  console.log(allContact[index]);

  allContact[index].isEmergency = !allContact[index].isEmergency;

  display();

  localStorage.setItem("contacts", JSON.stringify(allContact));
}

var searchInput = document.getElementById("searchInput");

function search() {
  var text = searchInput.value.toLowerCase();

  var box = "";

  for (var i = 0; i < allContact.length; i++) {
    if (
      allContact[i].fullName.toLowerCase().includes(text) ||
      allContact[i].email.includes(text) ||
      allContact[i].phoneNumber.toLowerCase().includes(text)
    ) {
      box += `
            <div class="col-md-6">

                    <div class="contact-card">
                      <div class="contact-header">
                        <div
                          class="contact-avatar bg-primary ${allContact[i].isFavorite ? "favorite" : ""} ${allContact[i].isEmergency ? "emergency" : ""}"
                        >
                          ${allContact[i].fullName.split(" ")[0].charAt(0)}${allContact[i].fullName.split(" ")[0].charAt(1)}
                        </div>
                        <div class="contact-info">
                          <h4>${allContact[i].fullName}</h4>
                        </div>
                      </div>
                      <div class="contact-details">
                        <div class="contact-detail phone">
                          <i class="fas fa-phone"></i>
                          <span>${allContact[i].phoneNumber}</span>
                        </div>
                        <div class="contact-detail email">
                          <i class="fas fa-envelope"></i>
                          <span>${allContact[i].email}</span>
                        </div>
                        <div class="contact-detail address">
                          <i class="fas fa-map-marker-alt"></i>
                          <span>${allContact[i].address}</span>
                        </div>
                      </div>
                      <div class="contact-tags">
                        <span class="tag family">${allContact[i].group}</span>
                        ${allContact[i].isEmergency ? '<span class="tag emergency"><i class="fas fa-heartbeat"></i> Emergency</span>' : ""}
                        ${allContact[i].isFavorite ? '<span class="tag emergency bg-warning"><i class="fas fa-heartbeat"></i> Favorite</span>' : ""}
                      </div>
                      <div class="contact-actions">
                        <button class="contact-action call" title="Call">
                          <i class="fas fa-phone"></i>
                        </button>
                        <button class="contact-action email" title="Email">
                          <i class="fas fa-envelope"></i>
                        </button>
                        <button onclick="toggleFav(${i})"
                          class="contact-action favorite ${allContact[i].isFavorite ? "active" : ""}">
                          <!-- title="Favorite" -->
                           <i class="fas fa-star"></i> 
                        </button>
                        <button onclick="toggleEmg(${i})"
                          class="contact-action emergency ${allContact[i].isEmergency ? "active" : ""}"
                          title="Emergency">
                           <i class="fas fa-heart"></i>
                         </button> 
                        <button class="contact-action" onclick="editData(${i})" data-bs-toggle="modal" data-bs-target="#addContactModal" title="Edit">
                          <i class="fas fa-edit"></i>
                         </button>
                         <button class="contact-action delete" onclick="deleteContact(${i})" title="Delete">
                          <i class="fas fa-trash"></i>
                        </button>
                      </div>
                    </div>

                 </div>
        
        
        `;
    }
  }

  if (box === "") {
    rowData.innerHTML = `
            <div class="col-12">
                    <p class="alert alert-danger text-center text-danger">
                      No Contacts Avalible
                    </p>
                </div>
        
        
        
        `;
  } else {
    rowData.innerHTML = box;
  }
}

function closeModal() {
  var Modal = document.getElementById("addContactModal");
  var bootstrapModal = bootstrap.Modal.getInstance(Modal);
  bootstrapModal.hide();
}

fullNameInput.addEventListener("input", function () {
  if (fullNameInput.value.length < 3) {
    fullNameInput.classList.add("is-invalid");
  } else {
    fullNameInput.classList.remove("is-invalid");
    fullNameInput.classList.add("is-valid");
  }
});
