$(document).ready(function(){
  const PROGRAMS = [
  	{id: "berlin",
    image: "images/berlin.jpg",
    image_title: "Berlin",
    heading: "Corporate internship",
    subheading: "Find your passion internationally!",
    type: "Internship",
    location: "Berlin, Germany",
    duration: "12 months",
    cost: "$12,000",
    show_more: "berlinMore",
    description_id: "berlinDesc",
    program_desc: "Berlin is a top destination for corporate employment opportunities, with a bustling financial sector and studious work culture.",
    show_less: "berlinLess"
  	},
    {id: "mumbai",
    image: "images/mumbai.jpg",
    image_title: "Mumbai",
    heading: "Essential social services",
    subheading: "Offer you skills for an NGO of your choice!",
    type: "Volunteering",
    location: "Mumbai, India",
    duration: "3 months",
    cost: "$4,000",
    show_more: "mumbaiMore",
    description_id: "mumbaiDesc",
    program_desc: "Mumbai is a place with drastic wealth inequality, and as a result struggles to provide adequate health services, housing, and education for all residents.",
    show_less: "mumbaiLess"
  	},
    {id: "kyoto",
    image: "images/kyoto.jpg",
    image_title: "Kyoto",
    heading: "Authentic Japanese experience",
    subheading: "Experience new cultures and environments!",
    type: "Travel",
    location: "Kyoto, Japan",
    duration: "1 month",
    cost: "$5,000",
    show_more: "kyotoMore",
    description_id: "kyotoDesc",
    program_desc: "Kyoto is on many travellers' bucket lists, with its distinctly beautiful scenery and culturally rich history.",
    show_less: "kyotoLess"
  	},
    {id: "ny",
    image: "images/ny.jpg",
    image_title: "New York",
    heading: "Wall Street opportunity",
    subheading: "Explore different working styles!",
    type: "Internship",
    location: "New York, USA",
    duration: "6 months",
    cost: "$6,000",
    show_more: "nyMore",
    description_id: "nyDesc",
    program_desc: "New York is one of the biggest and most internationally connected cities in the world, with many of the largest companies holding offices there.",
    show_less: "nyLess"
  	},
    {id: "abuja",
    image: "images/abuja.jpg",
    image_title: "Abuja",
    heading: "Charitable volunteering",
    subheading: "Help those desperately in need",
    type: "Volunteering",
    location: "Abuja, Nigeria",
    duration: "6 months",
    cost: "$3,000",
    show_more: "abujaMore",
    description_id: "abujaDesc",
    program_desc: "Abuja is one of the fastest growing cities in the world, but also faces crucial problems such as entrenched poverty and homelessness.",
    show_less: "abujaLess"
  	},
    {id: "lima",
    image: "images/lima.jpg",
    image_title: "Lima",
    heading: "Adventure travel",
    subheading: "Get a taste of lifestyle change!",
    type: "Travel",
    location: "Lima, Peru",
    duration: "2 months",
    cost: "$4,500",
    show_more: "limaMore",
    description_id: "limaDesc",
    program_desc: "Lima is a diverse city, from its traditional, colonial buildings to its modern skyscrapers. It is also in close proximity to some of the famous ancient Mayan ruins.",
    show_less: "limaLess"
  	}
  ];
  /* Dynamic Display of HTML */

  /* Creates the HTML required for display each program information */
  function createProgramHTML(program) {
  	let programHTML = $("<article>", {class: "program", id: program.id});

    let image = $("<img>", {src: program.image, alt: program.image_title, class: "location"});
    programHTML.append(image);

    let heading = $("<h3>" + program.heading + "</h3>");
    programHTML.append(heading);

    let subheading = $("<h4>" + program.subheading + "</h4>");
    programHTML.append(subheading);

    let list = $("<ul>");
    let type = $("<li> Type: " + program.type + "</li>");
    let location = $("<li> Location: " + program.location + "</li>");
    let duration = $("<li> Duration: " + program.duration + "</li>");
    let cost = $("<li> Cost: " + program.cost + "</li>");
    list.append(type);
    list.append(location);
    list.append(duration);
    list.append(cost);
    programHTML.append(list);

    let show_more = $("<p>Show more</p>").attr("id", program.show_more);
    programHTML.append(show_more);

    let program_desc = $("<p>" + program.program_desc + "</p>").attr("id", program.description_id).attr("class", "hidden");
    programHTML.append(program_desc);

    let show_less = $("<p>Show less</p>").attr("id", program.show_less).attr("class", "hidden");
    programHTML.append(show_less);

    return programHTML;
  }

/* Displays all programs */
  function displayPrograms(programs) {
  	let programsList = $("#programsList");

  	programsList.empty();
  	for(let program of programs) {
    	let programHTML = createProgramHTML(program);
  		programsList.append(programHTML);
  	}

    /* Toggle show more */
    $("#" + program.show_more).on("click", displayProgram);
    $("#mumbaiMore").on("click", displayProgram);
    $("#kyotoMore").on("click", displayProgram);
    $("#nyMore").on("click", displayProgram);
    $("#abujaMore").on("click", displayProgram);
    $("#limaMore").on("click", displayProgram);

    function displayProgram(){
      let programItem = $(this);
      $("#" + programItem.attr("id")).addClass("hidden");
      $("#" + programItem.attr("id").replace("More", "Desc")).toggle();
      $("#" + programItem.attr("id").replace("More", "Less")).toggle();
    }

    /* Toggle show less */
    $("#berlinLess").on("click", hideProgram);
    $("#mumbaiLess").on("click", hideProgram);
    $("#kyotoLess").on("click", hideProgram);
    $("#nyLess").on("click", hideProgram);
    $("#abujaLess").on("click", hideProgram);
    $("#limaLess").on("click", hideProgram);

    function hideProgram(){
      let programItem = $(this);
      $("#" + programItem.attr("id").replace("Less", "More")).removeClass("hidden");
      $("#" + programItem.attr("id").replace("Less", "Desc")).toggle();
      $("#" + programItem.attr("id")).toggle();
    }
  }

  let mainPrograms = [PROGRAMS[0], PROGRAMS[1]];

	displayPrograms(mainPrograms);

	// Registering the search event handler using event listeners (addEventListener)
	// $("#search").on("click", search);

	// Registering the search event handler using event handler properties (onevent properties)
	// let searchButton = document.getElementById('search');
	// searchButton.onclick = search;

	$("#searchText").on("keyup", search);

  /* SEARCH FEATURE */
  function search() {
  		let query = $("#searchText").val();
  		query = query.toLowerCase().trim();

  		let matches = [];
  		for(let program of PROGRAMS) {
  			let programTitle = program.id.toLowerCase();
  			if(programTitle.includes(query)) {
  				matches.push(program);
  			}
  		}

  		displayPrograms(matches);
  }
  /* END OF SEARCH FEATURE */


});
