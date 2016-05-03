/**
 * Represents the Model.
 * Contains all the hard-coded locations.
 * @constructor
 */
var Model = [{
  name: 'Lincoln Memorial',
  flickr: 'Lincoln+Memorial',
  lat: 38.889041,
  lng: -77.050123
}, {
  name: 'Tomb of the Unknown Soldier',
  flickr: 'Tomb+of+the+Unknown+Soldier',
  lat: 38.876212,
  lng: -77.071892
}, {
  name: 'US Holocaust Memorial Museum',
  flickr: 'US+Holocaust+Memorial+Museum',
  lat: 38.886768,
  lng: -77.032549
}, {
  name: 'White House',
  flickr: 'White+House+Washington+DC',
  lat: 38.89768,
  lng: -77.03653
}, {
  name: 'Washington Monument',
  flickr: 'Washington+Monument',
  lat: 38.88939,
  lng: -77.03516
}];
/**
 * Represents a Flickr Object.
 * Used for the Map's infoWindow.
 * @constructor
 */
var Flickr = function() {
  var self = this;
  var KEY = '161c128ea08e95e6760c4b48e7d6a2be';
  self.displayInfo = function(marker) {
    self.url = 'https://api.flickr.com/services/rest/?method=flickr.photos.' +
      'search&api_key=' + KEY + '&tags=' + marker.tag +
      '&format=json&jsoncallback=?';
    self.apiTimeout = setTimeout(function() {
      var title = "Couldn't Load Data";
      var src = 'http://placehold.it/150x150?text=Error!';
      mapModel.openWindow.setContent('<h5 class="panel-title">' + title +
        '</h5>' + '<hr><div class="text-center"><img alt="Error" src="' + src +
        '" class="img-thumbnail img-sm"></div>');
    }, 4000);
    $.ajax({
      url: self.url,
      dataType: 'json'
    }).fail(function() {
      var title = "Couldn't Load Data";
      var src = 'http://placehold.it/150x150?text=Error!';
      mapModel.openWindow.setContent('<h5 class="panel-title">' + title +
        '</h5>' + '<hr><div class="text-center"><img alt="Error" src="' + src +
        '" class="img-thumbnail img-sm"></div>');
    }).done(function(result) {
      var pic = result.photos.photo[0];
      var src;
      if (pic === '') {
        src = 'No image available';
      }
      else {
        src = 'http://farm' + pic.farm + '.static.flickr.com/' + pic.server +
          '/' + pic.id + '_' + pic.secret + '_m.jpg';
      }
      mapModel.openWindow.setContent('<h5 class="panel-title">' + marker.name +
        '</h5><hr><div class="text-center"><img alt="' + marker.name +
        '" src="' + src + '" class="img-thumbnail img-sm"></div>');
      clearTimeout(self.apiTimeout);
    });
  };
};
/**
 * Represents a Location.
 * @constructor
 * @param {Object} data - The information about each location.
 */
var Location = function(data) {
  var self = this;
  self.name = data.name;
  self.flickr = data.flickr;
  self.coords = {
    lat: data.lat,
    lng: data.lng
  };
};
/**
 * Represents a Google Map.
 * @constructor
 */
var Map = function() {
  var self = this;
  self.center = {
    lat: 38.884667,
    lng: -77.052741
  };
  self.markers = [];
  /**
   * @function resetMap
   * Resets the Map's center position and empties the search input.
   */
  self.resetMap = function() {
    appViewModel.focusLoc(self.center);
    appViewModel.locQuery('');
    self.map.setZoom(13);
  };
  /**
   * @function resetMarker
   * Resets the Map's markers to being visible.
   */
  self.resetMarkers = function() {
    self.markers.forEach(function(marker) {
      marker.setVisible(true);
    });
  };
  /**
   * @function closeWindow
   * Closes the open InfoWindow.
   */
  self.closeWindow = function() {
    if (self.openWindow) {
      self.openWindow.close();
    }
  };
  /** Hides the default POI to make the map cleaner. */
  self.style = [{
    featureType: 'poi',
    elementType: 'labels',
    stylers: [{
      visibility: 'off'
    }]
  }];
  /**
   * @function initMap
   * Initializes the Map Object.
   */
  self.initMap = function() {
    self.map = new google.maps.Map(document.getElementById('googleMap'), {
      center: self.center,
      disableDefaultUI: true,
      mapTypeId: google.maps.MapTypeId.HYBRID,
      minZoom: 3,
      maxZoom: 20,
      styles: self.style,
      zoom: 13,
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_BOTTOM
      }
    });
    /** Sets up the markers for the Map Object */
    appViewModel.filteredLocations().forEach(function(loc) {
      var marker = new google.maps.Marker({
        animation: google.maps.Animation.DROP,
        name: loc.name,
        tag: loc.flickr,
        position: loc.coords,
        map: self.map,
      });
      loc.marker = marker;
      self.markers.push(marker);
    });
    /** Connects an info window to each marker */
    self.markers.map(function(marker) {
      marker.info = new google.maps.InfoWindow();
      marker.addListener('click', function() {
        self.map.setZoom(15);
        self.map.setCenter(marker.position);
        flickrModel.displayInfo(marker);
        self.closeWindow();
        marker.setAnimation(google.maps.Animation.BOUNCE);
        window.setTimeout(function() {
          marker.setAnimation(null);
        }, 1500);
        marker.info.open(self.map, marker);
        self.openWindow = marker.info;
      });
      self.map.addListener('click', function() {
        self.map.setZoom(13);
        self.closeWindow();
      });
    });
  };
};
/**
 * Represents the View Model.
 */
var viewModel = function() {
  var self = this;
  self.windows = ko.observableArray([]);
  self.locations = ko.observableArray([]);
  self.locQuery = ko.observable('');
  self.filteredLocations = ko.computed(function() {
    var input = self.locQuery().toLowerCase();
    return ko.utils.arrayFilter(self.locations(), function(loc) {
      var checkItem = loc.name.toLowerCase().indexOf(input) !== -1;
      if (input) {
        if (checkItem) {
          loc.marker.setVisible(true);
        } else {
          loc.marker.setVisible(false);
          if (loc.marker.info == mapModel.openWindow) {
            mapModel.closeWindow();
          }
        }
        return checkItem;
      } else {
        if (checkItem) {
          mapModel.resetMarkers();
        }
        return self.locations();
      }
    });
  });
  /**
   * @function focusLoc
   * Centers the mapModel on the clicked location or recenters the mapModel.
   * @param {Location} loc - The Location to focus
   */
  self.focusLoc = function(loc) {
    mapModel.map.setZoom(15);
    if (loc.coords) {
      mapModel.closeWindow();
      mapModel.map.setCenter({
        lat: loc.coords.lat,
        lng: loc.coords.lng
      });
      flickrModel.displayInfo(loc.marker);
      loc.marker.info.open(mapModel.map, loc.marker);
      loc.marker.setAnimation(google.maps.Animation.BOUNCE);
      window.setTimeout(function() {
        loc.marker.setAnimation(null);
      }, 1500);
      mapModel.openWindow = loc.marker.info;
    } else {
      mapModel.map.setCenter(loc);
      mapModel.closeWindow();
    }
  };
};
/**
 * Creates an instance of the viewModel, Map and Flickr Objects.
 * Hides the error panel by default.
 */
var appViewModel = new viewModel();
var mapModel = new Map();
var flickrModel = new Flickr();
$('#error').hide();
/** Applies the bindings to newly instanced appViewModel Object. */
$(document).ready(function() {
  ko.applyBindings(appViewModel);
});
/**
 * @function initPage
 * Load the locations and map
 */
var initPage = function() {
  Model.forEach(function(place) {
    appViewModel.locations.push(new Location(place));
  });
  mapModel.initMap();
};
/**
 * @function googleError
 * Resets the Map's center position and empties the search input.
 */
var googleError = function() {
  Model.forEach(function(place) {
    appViewModel.locations.push(new Location(place));
  });
  $('#googleMap').hide();
  $('#error').show();
};
