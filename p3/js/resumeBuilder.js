/*
    This script generates and displays the content for index.html
 */
// Validated JSON objects
var navbar = {
    'name': 'Resume',
    'links': [{
        'name': 'Work Experience',
        'url': '#workExperience'
    }, {
        'name': 'Projects',
        'url': '#projects'
    }, {
        'name': 'Education',
        'url': '#education'
    }, {
        'name': 'Map',
        'url': '#mapDiv'
    }],
    display: function() {
        // Inserts the brand into its formatted variable
        var formattedBrand = navbarBrand.replace(data, navbar.name);
        if (navbar.links.length !== 0) {
            // Displays the navbar with brand name, and links to each section.
            $(navBar).append(navbarStart);
            $(container).append(navbarHeaderStart);
            $(navHead).append(formattedBrand);
            $(container).append(navbarEnd);
            $(container).append(navbarListStart);
            navbar.links.forEach(function(val) {
                // Inserts the values from the links array into their respective place
                var newLink = navbarUrl.replace(data, val.url);
                newLink = newLink.replace(title, val.name);
                // Appends the link to the page via the variable
                $(navEntry).append(newLink);
            });
            $(navEntry).append(internationalizeButton);
            $(container).append(navbarListEnd);
            $(container).append(navbarRightStart);
            $(container).append(navbarListEnd);
        }
        console.log('Navbar JSON Displayed');
    }
};

var bio = {
    'name': 'Jared Lewis',
    'role': 'Web Developer',
    'contacts': {
        'mobile': '614-565-9336',
        'email': 'jslewis90@outlook.com',
        'github': 'jslewis90',
        'twitter': '@jslewis90',
        'location': 'Columbus, OH',
        display: function(idName) {
            // Inserts the values into their respective variables
            var formattedLocation = HTMLlocation.replace(data, this.location);
            var formattedGithub = HTMLgithub.replace(data, this.github);
            var formattedTwitter = HTMLtwitter.replace(data, this.twitter);
            var formattedEmail = HTMLemail.replace(data, this.email);
            var formattedMobile = HTMLmobile.replace(data, this.mobile);
            // Displays the contact info in the section specified in the argument
            $(idName).prepend(formattedLocation);
            $(idName).prepend(formattedGithub);
            $(idName).prepend(formattedTwitter);
            $(idName).prepend(formattedEmail);
            $(idName).prepend(formattedMobile);
        }
    },
    'welcomeMessage': 'Hello World!',
    'skills': [
        'HTML',
        'PHP',
        'MySQL',
        'Music',
        'Observant'
    ],
    'biopic': 'images/me.jpg',
    display: function() {
        // Inserts the values into their respective variables
        var formattedName = HTMLheaderName.replace(data, bio.name);
        var formattedRole = HTMLheaderRole.replace(data, bio.role);
        var formattedPic = HTMLbioPic.replace(data, bio.biopic);
        var formattedWelcome = HTMLwelcomeMsg.replace(data, bio.welcomeMessage);
        // Displays the header with contact info, and welcome message.
        $(header).prepend(formattedRole);
        $(header).prepend(formattedName);
        $(header).prepend(formattedPic);
        bio.contacts.display(topContacts);
        bio.contacts.display(footContacts);
        $(header).append(formattedWelcome);
        $(header).append(HTMLskillsStart);
        bio.skills.forEach(function(val) {
            // Inserts the values from the skills array into their respective place
            var formattedSkill = HTMLskills.replace(data, val);
            // Appends the skill to the page via the variable
            $(skillEntry).append(formattedSkill);
        });
        $(map).append(googleMap);
        console.log('Bio JSON Displayed');
    }
};

var education = {
    'schools': [{
        'name': 'Columbus State Community College',
        'location': 'Columbus, OH',
        'degree': 'None',
        'majors': ['CIT - Software Development'],
        'dates': '2012-2014',
        'url': 'http://cscc.edu'
    }],
    'onlineCourses': [{
        'title': 'Intro to Programming',
        'school': 'Udacity',
        'date': '2016',
        'url': 'http://udacity.com/'
    }, {
        'title': 'Intro to Computer Science',
        'school': 'Udacity',
        'date': '2016',
        'url': 'http://udacity.com/'
    }],
    display: function() {
        education.schools.forEach(function(val) {
            // Inserts the values from the schools array into their respective variables
            var formattedSchool = HTMLschoolName.replace(data, val.name);
            var formattedDegree = HTMLschoolDegree.replace(data, val.degree);
            var formattedDates = HTMLschoolDates.replace(data, val.dates);
            var formattedLocation = HTMLschoolLocation.replace(data, val.location);
            // Concatenates the school name and the degree earned
            var formattedSchoolDegree = formattedSchool + formattedDegree;
            // Displays the concatenated school info, the dates attended, the location,
            // and major for each school
            $(eduStart).append(HTMLschoolStart);
            $(eduEntry).append(formattedSchoolDegree);
            $(eduEntry).append(formattedDates);
            $(eduEntry).append(formattedLocation);
            val.majors.forEach(function(major) {
                // Inserts the values from the majors array into their respective place
                var formattedMajor = HTMLschoolMajor.replace(data, major);
                // Appends the major to the page via the variable           
                $(eduEntry).append(formattedMajor);
            });
        });
        if (education.onlineCourses.length !== 0) {
            $(eduEntry).append(HTMLonlineClasses);
        }
        education.onlineCourses.forEach(function(val) {
            // Inserts the values from the onlineCourses array into their respective variables
            var formattedTitle = HTMLonlineTitle.replace(data, val.title);
            var formattedonlineSchool = HTMLonlineSchool.replace(data, val.school);
            var formattedonlineDates = HTMLonlineDates.replace(data, val.date);
            var formattedUrl = HTMLonlineURL.replace(data, val.url);
            // Concatenates the school name and the degree earned            
            var formattedCourse = formattedTitle + formattedonlineSchool;
            // Displays the concatenated course info, the dates attended, and the URL for each course
            $(eduEntry).append(formattedCourse);
            $(eduEntry).append(formattedonlineDates);
            $(eduEntry).append(formattedUrl);
        });
        console.log('Education JSON Displayed');
    }
};

var work = {
    'jobs': [{
        'employer': 'BFF Nation (Independent Contractor)',
        'title': 'Data Validation',
        'location': 'Hillard, OH',
        'dates': 'Nov 2014 - Current',
        'description': 'Data validation of products to be sold on Amazon. Collection of ASINs of Sams Club products on Amazon.'
    }, {
        'employer': 'Employment Plus',
        'title': 'Temp',
        'location': 'Hillard, OH',
        'dates': '2011 - Sept 2014',
        'description': 'Manual labor positions through various companies including lifting bumpers in semi-trucks, wrapping products to be shipped, creating objects of special materials, inspection of car parts.'
    }],
    display: function() {
        work.jobs.forEach(function(val) {
            // Inserts the values from the jobs array into their respective variables
            var formattedEmployer = HTMLworkEmployer.replace(data, val.employer);
            var formattedTitle = HTMLworkTitle.replace(data, val.title);
            var formattedEmployerTitle = formattedEmployer + formattedTitle;
            var formattedDates = HTMLworkDates.replace(data, val.dates);
            var formattedLocation = HTMLworkLocation.replace(data, val.location);
            var formattedDescription = HTMLworkDescription.replace(data, val.description);
            // Displays the work info, with the employer name, job title,
            // dates, and description for each job.
            $(workStart).append(HTMLworkStart);
            $(workEntry).append(formattedEmployerTitle);
            $(workEntry).append(formattedDates);
            $(workEntry).append(formattedLocation);
            $(workEntry).append(formattedDescription);
        });
        console.log('Work JSON Displayed');
    }
};

var projects = {
    'projects': [{
        'title': 'Sokan Bravo Team',
        'dates': '2016',
        'description': 'Coleading a secondary raid team for the Knights of Sokan community. Also, designing a website for the team to display useful info saved in a database.',
        'images': [
            'images/bravoSite-th.png',
            'http://placehold.it/148x260?text=Placeholder',
            'http://placehold.it/148x260?text=Placeholder'
        ]
    }],
    display: function() {
        projects.projects.forEach(function(val) {
            // Inserts the values from the projects array into their respective variables
            var formattedTitle = HTMLprojectTitle.replace(data, val.title);
            var formattedDates = HTMLprojectDates.replace(data, val.dates);
            var formattedDescription = HTMLprojectDescription.replace(data, val.description);
            // Displays the project info, with the project name,
            // dates, and description for each project.
            $(projectStart).append(HTMLprojectStart);
            $(projectEntry).append(formattedTitle);
            $(projectEntry).append(formattedDates);
            $(projectEntry).append(formattedDescription);
            val.images.forEach(function(image) {
                // Inserts the values from the images array into their respective place
                var formattedImage = HTMLprojectImage.replace(data, image);
                // Appends the image to the page via the variable
                $(projectEntry).append(formattedImage);
            });
        });
        console.log('Projects JSON Displayed');
    }
};

// Calls on the display functions to add the content to the page.
navbar.display();
bio.display();
education.display();
work.display();
projects.display();