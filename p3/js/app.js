/* ======= Model ======= */
var model = {
  siteTitle: 'Resume',
  navbar: [{
      name: 'Work Experience',
      url: '#workExperience'
  }, {
      name: 'Projects',
      url: '#projects'
  }, {
      name: 'Education',
      url: '#education'
  }, {
      name: 'Map',
      url: '#mapDiv'
  }],
  bio: [{
    name: 'Jared Lewis',
    role: 'Web Developer',
    contacts: {
        mobile: '614-565-9336',
        email: 'jslewis90@outlook.com',
        github: 'jslewis90',
        twitter: '@jslewis90',
        location: 'Columbus, OH'
    },
    welcomeMessage: 'Hello World!',
    skills: [
        'HTML',
        'PHP',
        'MySQL',
        'Music',
        'Observant'
    ],
    biopic: 'images/me.jpg'
  }],
  education: [{
    schools: [{
        name: 'Columbus State Community College',
        location: 'Columbus, OH',
        degree: 'None',
        majors: ['CIT - Software Development'],
        dates: '2012-2014',
        url: 'http://cscc.edu'
    }],
    onlineCourses: [{
        title: 'Intro to Programming',
        school: 'Udacity',
        date: '2016',
        url: 'http://udacity.com/'
    }, {
        title: 'Intro to Computer Science',
        school: 'Udacity',
        date: '2016',
        url: 'http://udacity.com/'
    }]
  }],
  work: [{
      employer: 'BFF Nation (Independent Contractor)',
      title: 'Data Validation',
      location: 'Hillard, OH',
      dates: 'Nov 2014 - Current',
      description: 'Data validation of products to be sold on Amazon. Collection of ASINs of Sams Club products on Amazon.'
  }, {
      employer: 'Employment Plus',
      title: 'Temp',
      location: 'Hillard, OH',
      dates: '2011 - Sept 2014',
      description: 'Manual labor positions through various companies including lifting bumpers in semi-trucks, wrapping products to be shipped, creating objects of special materials, inspection of car parts.'
  }],
  projects: [{
      title: 'Sokan Bravo Team',
      dates: '2016',
      description: 'Coleading a secondary raid team for the Knights of Sokan community. Also, designing a website for the team to display useful info saved in a database.',
      images: [
          'images/bravoSite-th.png',
          'http://placehold.it/148x260?text=Placeholder',
          'http://placehold.it/148x260?text=Placeholder'
      ]
  }]
};
/* ======= Octopus ======= */
var octopus = {
  init: function() {
    navbarView.init();
    bioView.init();
    workView.init();
    projectView.init();
    eduView.init();
  },
  getName: function() {
    return model.siteTitle;
  },
  getLinks: function() {
    return model.navbar;
  },
  getBio: function() {
    return model.bio[0];
  },
  displayContacts: function(idName) {
    var contacts = octopus.getBio().contacts;
    // Inserts the values into their respective variables
    var formattedLocation = HTMLlocation.replace(data, contacts.location);
    var formattedGithub = HTMLgithub.replace(data, contacts.github);
    var formattedTwitter = HTMLtwitter.replace(data, contacts.twitter);
    var formattedEmail = HTMLemail.replace(data, contacts.email);
    var formattedMobile = HTMLmobile.replace(data, contacts.mobile);
    // Displays the contact info in the section specified in the argument
    $(idName).prepend(formattedLocation);
    $(idName).prepend(formattedGithub);
    $(idName).prepend(formattedTwitter);
    $(idName).prepend(formattedEmail);
    $(idName).prepend(formattedMobile);
  },
  getWork: function() {
    return model.work;
  },
  getProjects: function() {
    return model.projects;
  },
  getEducation: function() {
    return model.education[0];
  }
};
/* ======= View ======= */
var navbarView = {
  init: function() {
    this.navData = octopus.getLinks();
    this.siteName = octopus.getName();
    this.render();
  },
  render: function() {
    // Inserts the brand into its formatted variable
    var formattedBrand = navbarBrand.replace(data, this.siteName);
    if (this.navData.length !== 0) {
      // Displays the navbar with brand name, and links to each section.
      $(navBar).append(navbarStart);
      $(container).append(navbarHeaderStart);
      $(navHead).append(formattedBrand);
      $(container).append(navbarEnd);
      $(container).append(navbarListStart);
      this.navData.forEach(function(val) {
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
  }
};
var bioView = {
  init: function() {
    this.bioData = octopus.getBio();
    this.render();
  },
  render: function() {
    // Inserts the values into their respective variables
    var formattedName = HTMLheaderName.replace(data, this.bioData.name);
    var formattedRole = HTMLheaderRole.replace(data, this.bioData.role);
    var formattedPic = HTMLbioPic.replace(data, this.bioData.biopic);
    var formattedWelcome = HTMLwelcomeMsg.replace(data, this.bioData.welcomeMessage);
    // Displays the header with contact info, and welcome message.
    $(header).prepend(formattedRole);
    $(header).prepend(formattedName);
    $(header).prepend(formattedPic);
    octopus.displayContacts(topContacts);
    octopus.displayContacts(footContacts);
    $(header).append(formattedWelcome);
    $(header).append(HTMLskillsStart);
    this.bioData.skills.forEach(function(val) {
        // Inserts the values from the skills array into their respective place
        var formattedSkill = HTMLskills.replace(data, val);
        // Appends the skill to the page via the variable
        $(skillEntry).append(formattedSkill);
    });
    $(map).append(googleMap);
  }
};
var workView = {
  init: function() {
    this.workData = octopus.getWork();
    this.render();
  },
  render: function() {
    this.workData.forEach(function(val) {
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
  }
};
var projectView = {
  init: function() {
    this.projectData = octopus.getProjects();
    this.render();
  },
  render: function() {
    this.projectData.forEach(function(val) {
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
  }
};
var eduView = {
  init: function() {
    this.eduData = octopus.getEducation();
    this.render();
  },
  render: function() {
    this.eduData.schools.forEach(function(val) {
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
    if (this.eduData.onlineCourses.length !== 0) {
        $(eduEntry).append(HTMLonlineClasses);
    }
    this.eduData.onlineCourses.forEach(function(val) {
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
  }
};
// make it go!
octopus.init();
