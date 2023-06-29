import React from "react";
import ReactDOM from 'react-dom'

//import {
//    loadModules
//} from 'react-arcgis';

// Use @arcgis/core or esri-loader directly in your React application
import { setDefaultOptions } from 'esri-loader';

// configure esri-loader to use version 4.25
// and the CSS for that version from the ArcGIS CDN
setDefaultOptions({ version: '4.25', css: true, insertCssBefore: 'style' });

class ArcticMapLocator extends React.Component {
    static displayName = "ArcticMapLocator";
    constructor(props) {
        super(props);

    }

    componentWillMount() {

    }

    componentDidMount() {
        var self = this;
        loadModules([

            'esri/widgets/Locate',
            'esri/widgets/BasemapGallery',
            'esri/widgets/Home',
      
            'esri/widgets/Search',
            'esri/layers/FeatureLayer',
            'esri/rest/locator',
            'esri/geometry/geometryEngine',
      
            "esri/request",
      
          ]).then(([
      
            Locate,
            BasemapGallery,
            Home,
      
            Search,
            FeatureLayer,
            Locator,
            geometryEngine,
      
            Request,
      
          ]) => {
            var searchsources = []
            
            
            var devaultSource = {
              locator: new Locator({ url: "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer" }),
              singleLineFieldName: "SingleLine",
              name: "Standard Geocoder",
              placeholder: "Find address",
              maxResults: 3,
              maxSuggestions: 6,
              suggestionsEnabled: true,
              minSuggestCharacters: 0
            }
            searchsources.push(devaultSource);
            var searchitems = self.props.am.childrenElements.filter(ele => {

                if (ele.search) {
                  return ele;
                }
                // if (ele.constructor.name.toLowerCase().includes('search')) {
                //   return ele;
                // }
      
              });

            var lldsSarchsources = searchitems.map(i => {
                if (i.search) { return i.search; }
            });

            searchsources.push(lldsSarchsources[0]);
           
            if (self.props.searchSources) {
                self.props.searchSources.map(searchSource => {
                  
                  var searchFeature = new FeatureLayer({
                    url: searchSource.scr + searchSource.layerid
                  });
                  searchSource.layer=searchFeature;
    
                  searchsources.push(searchSource);
                })
              }

            let locationServicesEnabled = true;  
            if (self.props.locationServicesEnabled !== undefined) {
              locationServicesEnabled = self.props.locationServicesEnabled;
            }

            var searchWidget2 = new Search({
                view: self.props.view,
                sources: searchsources,
                includeDefaultSources: false, // true will include standard locator
                locationEnabled: locationServicesEnabled
            });

            self.props.view.ui.add(searchWidget2, {
                position: "top-right",
                index: 1
            });

            searchWidget2.on('select-result', function (evt) {

                self.props.view.popup.currentSearchResultFeature = evt.result.feature;
                self.props.view.popup.close();
                //self.props.view.popup.close();
                // view.popup.open({
                //  location: evt.result.feature.geometry,  // location of the click on the view
                //  feature: evt.result.feature,
                //  title: "Search Result",  // title displayed in the popup
                //  content: evt.result.name, // content displayed in the popup
                // });
              });

        });


    }
    render() {
        return null;
    }
}

export default ArcticMapLocator;