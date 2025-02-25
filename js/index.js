const mainSection = () => {
	document
		.getElementById("main-section")
		.scrollIntoView({ behavior: "smooth" });
};

const removeActiveClass = () => {
	const categoryButtons = document.querySelectorAll(".btn-category");
	categoryButtons.forEach((button) => button.classList.remove("active"));
};

const loadCategory = async () => {
	const categoryUrl = `https://openapi.programming-hero.com/api/peddy/categories`;
	const res = await fetch(categoryUrl);
	const data = await res.json();
	displayCategory(data.categories);
};

const loadAllPet = async () => {
	const url = `https://openapi.programming-hero.com/api/peddy/pets`;
	const res = await fetch(url);
	const data = await res.json();
	displayPet(data.pets);
};

const loadCategoryPet = async (categoryName, categoryButtonId) => {
	const url = `https://openapi.programming-hero.com/api/peddy/category/${categoryName}`;
	const res = await fetch(url);
	const data = await res.json();

	removeActiveClass();
	document.getElementById(categoryButtonId).classList.add("active");
	displayPet(data.data);
};

const displayPet = (array) => {
	const petContainer = document.getElementById("pet-container");
	petContainer.textContent = "";

	array.forEach((item) => {
		const card = document.createElement("div");
		card.innerHTML = `
         <div class="card border">
            <figure class="px-4 pt-4">
               <img
                  src="${item.image}"
                  alt="pet"
                  class="rounded-xl w-full" />
            </figure>
            <div class="card-body items-start px-4 justify-between py-4">
               <h2 class="card-title font-bold">${item.pet_name}</h2>
              <div class="text-[#131313B3]">
                  <p>
                     <i class="fa-solid mr-2 w-2 fa-table-cells-large"></i>
                     Breed: ${item?.breed || "Not Available"}
                  </p>
                  <p>
                     <i class="fa-regular mr-2 w-2 fa-calendar"></i>
                     Birth: ${item?.date_of_birth || "Not Available"}
                  </p>
                  <p>
                     <i class="fa-solid mr-2 w-2 fa-venus"></i>
                     Gender: ${item?.gender || "Not Available"}
                  </p>
                  <p>
                     <i class="fa-solid mr-2 w-2 fa-dollar-sign"></i>
                     Price: ${item?.price || "Not Available"}
                  </p>
              </div>
               <div class="divider"></div>
               <div class="card-actions justify-between w-full">
                  <button class="btn btn-sm">
                     <i class="fa-regular fa-thumbs-up"></i>
                  </button>
                  <button class="btn btn-sm text-[#0E7A81]">Adopt</button>
                  <button class="btn btn-sm text-[#0E7A81]">Details</button>
               </div>
            </div>
         </div>
      `;
		petContainer.append(card);
	});
};

const displayCategory = (categoriesArray) => {
	const btnContainer = document.getElementById("cate-btn-container");

	categoriesArray.forEach((category) => {
		const div = document.createElement("div");
		div.classList.add("w-full");
		div.innerHTML = `
         <button
            id="btn-cate-${category.id}"
            onclick="loadCategoryPet('${category.category}', 'btn-cate-${category.id}')"
            class="btn btn-lg btn-outline border-gray-300 w-full btn-category text-xl"
         >  
               <figure class="w-8">
                  <img class="w-full" src="${category.category_icon}" alt="" />
               </figure>
               ${category.category}
         </button>
      `;

		btnContainer.append(div);
	});
};

loadCategory();
loadAllPet();
