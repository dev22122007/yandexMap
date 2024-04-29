import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import {
  YMaps,
  Map,
  Placemark,
  RoutePanel,
  Panorama,
  GeolocationControl,
  TrafficControl,
  TypeSelector,
  SearchControl,
  withYMaps,
  ListBox,
  ListBoxItem
} from "react-yandex-map";

const App = () => {
  const LengthPrinter = useMemo(() => {
    return ({ ymaps, route }) => {
      const [routeLength, setRouteLength] = useState(null);

      useEffect(() => {
        let canceled = false;

        if (ymaps && ymaps.route) {
          ymaps.route(route).then((route) => {
            if (!canceled) {
              setRouteLength(route.getHumanLength().replace("&#160;", " "));
            }
          });
        }

        return () => (canceled = true);
      }, [ymaps, ...route]);

      return routeLength ? (
        <p>
          The route from <strong>{route[0]}</strong> to{" "}
          <strong>{route[1]}</strong> is <strong>{routeLength}</strong> long
        </p>
      ) : (
        <p>Loading...</p>
      );
    };
  }, []);

  const ConnectedLengthPrinter = useMemo(() => {
    return withYMaps(LengthPrinter, true, ["route"]);
  }, [LengthPrinter]);

  const handleGeolocation = (ymaps) => {
    if (ymaps && ymaps.geolocation) {
      ymaps.geolocation
        .get({
          provider: "auto",
          mapStateAutoApply: true,
        })
        .then((result) => {
          const coordinates = result.geoObjects
            .get(0)
            .geometry.getCoordinates();
          console.log("User location:", coordinates);
        });
    }
  };

  return (
    <div className="myMaps">
      <h1>Maps</h1>
      <YMaps
        onApiAvaliable={handleGeolocation}
        query={{
          lang: "uz_UZ",
          apikey: "6b999682-fd79-4820-968b-78b8b166ed59",
        }}
      >
        <Map
          className="cards"
          defaultState={{
            center: [40.54895743, 70.93760573],
            zoom: 11,
            controls: ["zoomControl", "fullscreenControl", "rulerControl"],
          }}
          modules={[
            "control.ZoomControl",
            "control.FullscreenControl",
            "control.RulerControl",
          ]}
        >
          <div className="wrapper">
            <GeolocationControl
              onApiAvaliable={handleGeolocation}
              options={{
                float: "right",
              }}
            />

            <Placemark defaultGeometry={[40.54895743, 70.93760573]} />

            <RoutePanel
              options={{
                float: "right",
                visible: true, // RoutePanelni ko'rsatish
              }}
            />

            <TrafficControl
              options={{
                float: "right",
              }}
            />

            <TypeSelector
              options={{
                float: "right",
              }}
            />

            <SearchControl
              options={{
                float: "left",
              }}
            />

            <ListBox
              data={{
                content: "Select city",
              }}
            >
              <ListBoxItem
                data={{
                  content: "Moscow",
                }}
              />
              <ListBoxItem
                data={{
                  content: "Saint Petersburg",
                }}
              />
            </ListBox>
          </div>
        </Map>
        <div className="flex">
          <Panorama width={200} height={200} defaultPoint={[55.779685, 37.578264]} />
          <Panorama width={200} height={200} defaultPoint={[55.749685, 37.578264]} />
          <Panorama width={200} height={200} defaultPoint={[55.729685, 37.578264]} />
          <Panorama width={200} height={200} defaultPoint={[55.717785, 37.578264]} />
          <Panorama width={200} height={200} defaultPoint={[55.713685, 37.578264]} />
          <Panorama width={200} height={200} defaultPoint={[55.712685, 37.578264]} />
          <Panorama width={200} height={200} defaultPoint={[55.722685, 37.578264]} />
          <Panorama width={200} height={200} defaultPoint={[55.743685, 37.578264]} />
          <Panorama width={200} height={200} defaultPoint={[55.654585, 37.578264]} />
          <Panorama width={200} height={200} defaultPoint={[55.715455, 37.578264]} />
          <Panorama width={200} height={200} defaultPoint={[55.716545, 37.578264]} />
          <Panorama width={200} height={200} defaultPoint={[55.964385, 37.578264]} />
          <Panorama width={200} height={200} defaultPoint={[55.719243, 37.578264]} />
          <Panorama width={200} height={200} defaultPoint={[55.71932, 37.578264]} />
          <Panorama width={200} height={200} defaultPoint={[55.743965, 37.578264]} />
        </div>
      </YMaps>
    </div>
  );
};

export default App;