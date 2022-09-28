//48/51мин

const datailData = () => {
	const renderGanreList = (ganres) => {
		const dropDownBlock = document.querySelector('.header__menu .dropdown');
		ganres.forEach((ganre) => {
			dropDownBlock.insertAdjacentHTML('beforeend', `<li><a href="./categories.html?ganre=${ganre}">${ganre}</a></li>`)
		});

	}
	const renderAnimeDetails = (array, itemId) => {
		/* 	console.log(array);
			console.log(itemId); */
		const animeObj = array.find(item => item.id == itemId);
		const imageBlock = document.querySelector('.anime__details__pic');
		const viewsBlock = imageBlock.querySelector('.view');
		const titleBlock = document.querySelector('.anime__details__title h3');
		const subTitleBlock = document.querySelector('.anime__details__title span');
		const descriptionBlock = document.querySelector('.anime__details__text p');

		if (animeObj) {
			console.log(animeObj);

			imageBlock.dataset.setbg = animeObj.image//
			viewsBlock.innerHTML = '';
			viewsBlock.insertAdjacentHTML('beforeend', `<i class="fa fa-eye"></i>${animeObj.views}`);
			titleBlock.textContent = animeObj.title;
			subTitleBlock.textContent = animeObj['original-title'];
			descriptionBlock.textContent = animeObj.description;
			document.querySelectorAll('.set-bg').forEach((elem) => {
				elem.style.backgroundImage = `url(${elem.dataset.setbg}) `;
			});
		}
		else {
			console.log('Аниме отсутствует');
		}


	};



	fetch('./db.json')
		.then((response) => {

			return response.json();

		})
		.then((data) => {

			const ganres = new Set()

			const ganreParams = new URLSearchParams(window.location.search).get('itemId');


			data.anime.forEach((item) => {
				ganres.add(item.ganre)

			})

			renderGanreList(ganres);
			if (ganreParams) {
				renderAnimeDetails(data.anime, ganreParams);
			} else {
				console.log('Аниме отсутствует');

			}

		})
}
datailData();